import { renderHook, act } from '@testing-library/react';
import { useFilters } from './useFilters';
import { Shop } from '@/types';

const MOCK_SHOPS: Shop[] = [
    { id: 1, name: 'Costa Coffee', x: 10, y: 10 },
    { id: 2, name: 'Starbucks', x: 20, y: 20 },
    { id: 3, name: 'Local Cafe', x: 5, y: 5 },
    { id: 4, name: 'No Coords Cafe' },
];

describe('useFilters', () => {
    it('returns all shops initially with no distance calculated', () => {
        const { result } = renderHook(() => useFilters(MOCK_SHOPS));

        expect(result.current.filteredShops.length).toBe(4);
        expect(result.current.filteredShops[0].distance).toBeUndefined();
        expect(result.current.filteredShops[0].name).toBe('Costa Coffee');
    });

    it('filters shops by searchName correctly (case insensitive)', () => {
        const { result } = renderHook(() => useFilters(MOCK_SHOPS));

        act(() => {
            result.current.setSearchName('costa');
        });

        expect(result.current.filteredShops.length).toBe(1);
        expect(result.current.filteredShops[0].name).toBe('Costa Coffee');
    });

    it('calculates distance and sorts shops when valid coords are provided', () => {
        const { result } = renderHook(() => useFilters(MOCK_SHOPS));

        act(() => {
            result.current.setXCoord(0);
            result.current.setYCoord(0);
        });

        const shops = result.current.filteredShops;

        expect(shops[0].name).toBe('Local Cafe');
        expect(shops[0].distance).toBeCloseTo(7.071, 3);

        expect(shops[1].name).toBe('Costa Coffee');
        expect(shops[1].distance).toBeCloseTo(14.142, 3);

        expect(shops[2].name).toBe('Starbucks');

        expect(shops[3].name).toBe('No Coords Cafe');
        expect(shops[3].distance).toBeUndefined();
    });

    it('does not calculate distance if coords are invalid (out of bounds)', () => {
        const { result } = renderHook(() => useFilters(MOCK_SHOPS));

        act(() => {
            result.current.setXCoord(100);
            result.current.setYCoord(0);
        });

        const shops = result.current.filteredShops;

        expect(shops[0].name).toBe('Costa Coffee');
        expect(shops[0].distance).toBeUndefined();
    });
});
