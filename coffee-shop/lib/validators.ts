import { z } from 'zod';

export const positionSchema = z.object({
    x: z.coerce.number({ message: 'X coordinate must be a valid number' })
        .min(-90, 'X must be >= -90')
        .max(90, 'X must be <= 90'),
    y: z.coerce.number({ message: 'Y coordinate must be a valid number' })
        .min(-180, 'Y must be >= -180')
        .max(180, 'Y must be <= 180'),
});
