import { positionSchema } from '../src/validators';
import { z } from 'zod';

describe('positionSchema', () => {
  describe('valid inputs', () => {
    it('should parse valid numeric strings', () => {
      const result = positionSchema.parse({ x: '47.6', y: '-122.4' });
      expect(result).toEqual({ x: 47.6, y: -122.4 });
    });

    it('should parse actual numbers', () => {
      const result = positionSchema.parse({ x: 0, y: 0 });
      expect(result).toEqual({ x: 0, y: 0 });
    });

    it('should accept boundary values', () => {
      expect(positionSchema.parse({ x: -90, y: -180 })).toEqual({ x: -90, y: -180 });
      expect(positionSchema.parse({ x: 90, y: 180 })).toEqual({ x: 90, y: 180 });
    });
  });

  describe('invalid inputs', () => {
    it('should reject non-numeric x coordinate', () => {
      expect(() => positionSchema.parse({ x: 'abc', y: '10' }))
        .toThrow(z.ZodError);
    });

    it('should reject non-numeric y coordinate', () => {
      expect(() => positionSchema.parse({ x: '10', y: 'abc' }))
        .toThrow(z.ZodError);
    });

    it('should reject missing x coordinate', () => {
      expect(() => positionSchema.parse({ y: '10' }))
        .toThrow(z.ZodError);
    });

    it('should reject missing y coordinate', () => {
      expect(() => positionSchema.parse({ x: '10' }))
        .toThrow(z.ZodError);
    });

    it('should reject undefined values (no args provided)', () => {
      expect(() => positionSchema.parse({ x: undefined, y: undefined }))
        .toThrow(z.ZodError);
    });
  });

  describe('range validation', () => {
    it('should reject latitude below -90', () => {
      expect(() => positionSchema.parse({ x: '-91', y: '0' }))
        .toThrow(z.ZodError);
    });

    it('should reject latitude above 90', () => {
      expect(() => positionSchema.parse({ x: '91', y: '0' }))
        .toThrow(z.ZodError);
    });

    it('should reject longitude below -180', () => {
      expect(() => positionSchema.parse({ x: '0', y: '-181' }))
        .toThrow(z.ZodError);
    });

    it('should reject longitude above 180', () => {
      expect(() => positionSchema.parse({ x: '0', y: '181' }))
        .toThrow(z.ZodError);
    });
  });
});
