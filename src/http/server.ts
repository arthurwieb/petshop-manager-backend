import fastify from 'fastify'
import db from '../modules/db';

const app = fastify()

app.get('/', async (req, res) => {
  const pets = await db.pet.findMany();
  res.send(pets);
});

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})