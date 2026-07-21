import { calculateEuclideanDistance } from './utils';

describe('calculateEuclideanDistance', () => {
    it('calculates the correct distance between two points', () => {
        expect(calculateEuclideanDistance(0, 0, 3, 4)).toBe(5);
        expect(calculateEuclideanDistance(1, 1, 4, 5)).toBe(5);
        expect(calculateEuclideanDistance(-1, -1, 2, 3)).toBe(5);
    });

    it('returns 0 for the same point', () => {
        expect(calculateEuclideanDistance(10, 10, 10, 10)).toBe(0);
    });
});
