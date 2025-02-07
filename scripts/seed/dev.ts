import db from '../../src/modules/db';

const run = async () => {
  await db.pet.createMany({
    data: [
      {
        name: 'Yuki',
        breed: 'Vira Lata Premium Stonkz Lobo Auuuuuuuuuuuuuuuuuuu',
        age: 8,
      },
      {
        name: 'Polly',
        breed: 'Pinscher',
        age: 4
      },
    ],
  });
};

// Auto-run if main script (not imported)
if (require.main === module) {
  run().then(() => {
    console.log('Data seed complete');
    process.exit();
  });
}