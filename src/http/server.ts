import fastify from 'fastify'

const app = fastify()

app.get('/', async (req, res) => {
  console.log('teste')
});

app.listen({ port: 5000 }).then(() => {
  console.log(`Server running at http://localhost:5000`);
})