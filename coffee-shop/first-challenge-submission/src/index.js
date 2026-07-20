import { z } from 'zod';
import { getNearestShops } from './app.js';
import { positionSchema } from './validators.js';

async function main() {
  try {
    const position = positionSchema.parse({
      x: process.argv[2],
      y: process.argv[3],
    });

    const nearest = await getNearestShops(position);

    nearest.forEach(shop => {
      console.log(`${shop.name}, ${shop.distance.toFixed(4)}`);
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach(err => console.error(`Validation Error: ${err.message}`));
    } else {
      console.error(`Error: ${error.message}`);
    }
  }
}

main();