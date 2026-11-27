export function checkTour(
    tour: number[],
): [boolean, { toNumber(): number }];

export type TourChecker = typeof checkTour;
