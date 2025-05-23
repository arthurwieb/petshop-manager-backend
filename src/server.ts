import buildApp from './app';

const app = buildApp();

const start = async () => {
  try {
    await app.ready();
    console.log(app.printRoutes());
    await app.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server running on http://localhost:3001');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
