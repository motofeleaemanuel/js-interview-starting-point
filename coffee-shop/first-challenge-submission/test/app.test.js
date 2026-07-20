import { calculateEuclideanDistance, getNearestShops } from '../src/app';
import { apiFetch } from '../src/interceptor';

jest.mock('../src/interceptor');

describe('calculateEuclideanDistance', () => {
  it('should handle negative coordinates', () => {
    const distance = calculateEuclideanDistance(-1, -1, 2, 3);
    expect(distance).toBeCloseTo(5, 10);
  });

  it('should handle decimal coordinates', () => {
    const distance = calculateEuclideanDistance(47.6, -122.4, 47.5, -122.3);
    expect(distance).toBeCloseTo(0.1414, 4);
  });
});

describe('getNearestShops', () => {
  const mockShops = [
    { name: 'Brew Lab', x: '100', y: '100' },
    { name: 'Mud Coffee', x: '1', y: '1' },
    { name: 'Dark Horse Espresso', x: '10', y: '10' },
    { name: 'The Roastery', x: '0.1', y: '0.1' },
    { name: 'Grind House', x: '160', y: '160' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the 3 nearest shops sorted by distance', async () => {
    apiFetch.mockResolvedValue({
      ok: true,
      json: async () => mockShops,
    });

    const result = await getNearestShops({ x: 0, y: 0 });

    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('The Roastery');
    expect(result[1].name).toBe('Mud Coffee');
    expect(result[2].name).toBe('Dark Horse Espresso');
  });

  it('should round distances to 4 decimal places', async () => {
    apiFetch.mockResolvedValue({
      ok: true,
      json: async () => mockShops,
    });

    const result = await getNearestShops({ x: 0, y: 0 });

    result.forEach(shop => {
      const decimalPart = shop.distance.toString().split('.')[1] || '';
      expect(decimalPart.length).toBeLessThanOrEqual(4);
    });
  });

  it('should return only name and distance fields', async () => {
    apiFetch.mockResolvedValue({
      ok: true,
      json: async () => mockShops,
    });

    const result = await getNearestShops({ x: 0, y: 0 });

    result.forEach(shop => {
      expect(Object.keys(shop)).toEqual(['name', 'distance']);
    });
  });

  it('should throw an error when the API response is not ok', async () => {
    apiFetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getNearestShops({ x: 0, y: 0 }))
      .rejects.toThrow('Failed to fetch coffee shops status 500');
  });

  it('should handle shops with string coordinates', async () => {
    apiFetch.mockResolvedValue({
      ok: true,
      json: async () => [
        { name: 'Shop A', x: '5', y: '5' },
        { name: 'Shop B', x: '10', y: '10' },
        { name: 'Shop C', x: '15', y: '15' },
      ],
    });

    const result = await getNearestShops({ x: '0', y: '0' });

    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('Shop A');
  });
});
