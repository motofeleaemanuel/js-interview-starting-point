import { renderHook, waitFor } from '@testing-library/react';
import { useShops } from './useShops';
import { apiFetch } from '@/interceptors/shopsInterceptor';
import { Shop } from '@/types';

jest.mock('@/interceptors/shopsInterceptor', () => ({
    apiFetch: jest.fn()
}));

const mockApiFetch = apiFetch as jest.Mock;

const MOCK_SHOPS: Shop[] = [
    { id: 1, name: 'Costa Coffee', x: 10, y: 10 },
    { id: 2, name: 'Starbucks', x: 20, y: 20 },
];

describe('useShops', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('initializes with loading true and empty shops', () => {
        mockApiFetch.mockImplementation(() => new Promise(() => { }));

        const { result } = renderHook(() => useShops());

        expect(result.current.loading).toBe(true);
        expect(result.current.shops).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    it('fetches and sets shops successfully', async () => {
        mockApiFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => MOCK_SHOPS
        });

        const { result } = renderHook(() => useShops());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.shops).toEqual(MOCK_SHOPS);
        expect(result.current.error).toBeNull();
        expect(mockApiFetch).toHaveBeenCalledTimes(1);
    });

    it('handles fetch failure when response is not ok', async () => {
        mockApiFetch.mockResolvedValueOnce({
            ok: false
        });

        const { result } = renderHook(() => useShops());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.shops).toEqual([]);
        expect(result.current.error).toBe("We could not load the shops.");
    });

    it('handles network errors / exceptions correctly', async () => {
        mockApiFetch.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useShops());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.shops).toEqual([]);
        expect(result.current.error).toBe("We could not load the shops.");
    });
});
