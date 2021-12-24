import app from './app';
// import config from './config';

/**
 * Port number for express app
 */
// const port = config.port || 3006;
const port = 3006;

/**
 * Start listening
 */
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
