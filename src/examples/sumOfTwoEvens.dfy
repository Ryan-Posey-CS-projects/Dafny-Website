// This form takes a less rigorous, but generally viable approach to the problem
predicate IsEven(n: int) {
    n % 2 == 0
}

lemma SumOfTwoEvensIsEven(a: int, b: int) 
    requires IsEven(a) && IsEven(b)
    ensures IsEven(a + b)
{
}

method example() {
    var n := 2;
    var m := 4;
    var l := 6;
    var k := 8;
 
    SumOfTwoEvensIsEven(n, m);
    SumOfTwoEvensIsEven(l, k);
    SumOfTwoEvensIsEven((n + m), (l + k));

    var tot := n + m + l + k;

    expect IsEven((n + m) + (l+k)), "Sum should be even";
    print "Example: ", "(", n, " + ", m, ")", " + ", "(", l, " + ", k, ")",
          " = ", 20, " (even: ", IsEven(tot), ")\n";

}

method Main() {
    example();
}