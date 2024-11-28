import * as Hapi from '@hapi/hapi';
import { connectToDatabase } from './database';
import { userRoutes } from './routes/userRouter';
import { authPlugin } from './plugins/authPlugin';
import { rateLimitPlugin } from './plugins/rateLimitPlugin';
import * as dotenv from 'dotenv';

// changed name from DockerFile to Dockerfile
dotenv.config();
// this init function that will be used in tests
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  });

  console.log('Starting the server...');

  // Log environment variables
  console.log('Environment Variables:', {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
  });

  try {
    // Connect to the database
    await connectToDatabase();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // exit if database connection fails
  }

  // register plugins
  await server.register([authPlugin, rateLimitPlugin]);

  // Register routes
  server.route(userRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);

  return server;
};

// Automatically start the server in development environment 
// at the moment we are in NODE_ENV  = dev
if (process.env.NODE_ENV !== 'test') {
  init().catch((err) => {
    console.error('Server startup failed:', err);
    process.exit(1);
  });
}

// Export init for testing purposes
export { init };

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});
