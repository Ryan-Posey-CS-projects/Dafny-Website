const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const browserProcessPath = path.resolve(__dirname, 'src/browser-process.ts')

/** @param {string} [mode] */
module.exports = (env, argv) => {
    const isProduction = (argv.mode ?? 'production') !== 'development'

    /** @type {import('webpack').Configuration} */
    return {
        entry: './src/main.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'assets/[name].[contenthash:8].js',
            publicPath: '',
            clean: true,
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                process: browserProcessPath,
            },
        },
        module: {
            rules: [
                { test: /\.tsx?$/, exclude: /node_modules/, use: 'ts-loader' },
                {
                    test: /(?:RudimentaryTravelingSalesman|Maze)\.js$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/examples/[name][ext]',
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.dfy$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/sources/[name].[contenthash:8][ext]',
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
                    type: 'asset/resource',
                    generator: { filename: 'assets/images/[name].[contenthash:8][ext]' },
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: { filename: 'assets/fonts/[name].[contenthash:8][ext]' },
                },
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: [browserProcessPath, 'default'],
            }),
            new HtmlWebpackPlugin({ template: './src/index.html' }),
            // Production only: extract CSS into its own file and drop the Bootstrap
            // rules that are not used anywhere in src/.
            ...(isProduction
                ? [
                    new MiniCssExtractPlugin({
                        filename: 'assets/[name].[contenthash:8].css',
                    }),
                    new PurgeCSSPlugin({
                        // Files scanned for class names (any class written here is kept).
                        paths: () =>
                            glob.sync('src/**/*.{html,ts,tsx,css}', { nodir: true }),
                        safelist: {
                            // Classes (and the `a` element) that never appear literally in
                            // src/ but are needed at runtime. Everything else is purged
                            // and comes back automatically as soon as you use it.
                            standard: [
                                // react-router's <NavLink> renders <a> elements, and the
                                // letter "a" is not guaranteed to occur in the source text.
                                'a',
                                // States toggled at runtime by Bootstrap's JS and by
                                // NavLink (which appends `active`).
                                'active',
                                'show',
                                'fade',
                                'showing',
                                'hiding',
                                'collapse',
                                'collapsing',
                                'collapsed',
                                // Form validation classes, often set by JS.
                                'was-validated',
                                'is-valid',
                                'is-invalid',
                                // Backdrop is created by the modal JS.
                                'modal-backdrop',
                                'modal-open',
                                // Tooltip/popover markup is generated entirely by JS.
                                'tooltip-inner',
                                'tooltip-arrow',
                                'popover-arrow',
                                'popover-header',
                                'popover-body',
                                // .bs-tooltip-* / .bs-popover-* placement classes.
                                /^bs-/,
                                // Prism adds these token classes to highlighted source at runtime.
                                'token',
                                'comment',
                                'block-comment',
                                'prolog',
                                'doctype',
                                'cdata',
                                'tag',
                                'attr-name',
                                'namespace',
                                'deleted',
                                'function-name',
                                'function',
                                'boolean',
                                'number',
                                'property',
                                'class-name',
                                'constant',
                                'symbol',
                                'selector',
                                'important',
                                'atrule',
                                'keyword',
                                'builtin',
                                'string',
                                'char',
                                'attr-value',
                                'regex',
                                'variable',
                                'inserted',
                                'annotation',
                                'punctuation',
                                'operator',
                                'entity',
                                'url',
                            ],
                        },
                    }),
                ]
                : []),
        ],
        devtool: 'source-map',
        devServer: {
            port: 8080,
            hot: true,
        },
    }
}
