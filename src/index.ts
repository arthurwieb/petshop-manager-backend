import express from 'express';
import morgan from 'morgan';
import db from './modules/db';

const app = express();
app.use(morgan('dev')); // logger

app.get('/', async (req, res) => {
  //const pets = await db.pet.findMany();
  //res.json(pets);

  console.log('teste');
});

const port = Number(process.env.PORT ?? 5000);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
