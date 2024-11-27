const mongoose = require('mongoose');
const { init } = require('../src/server');
const User  = require('../src/models/User').default;

describe('User API', () => {
  let server;

  beforeAll(async () => {
    // Connect to the MongoDB database before the tests run
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Initialize the server
    server = await init();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase(); // (Optionally) drop the test database
    await mongoose.connection.close(); // Close MongoDB connection
    await server.stop(); // Stop the Hapi.js server
  });

  test('Create a new user', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username: 'prath',
        email: 'prath@example.com',
        password: 'prath124',
        fullName: 'Prath User',
        dateOfBirth: '1999-01-01',
        ssn: '123-45-6789',
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.result).toHaveProperty('userId');
  });

  test('Get user by ID', async () => {
    const user = await User.create({
      username: 'getuser',
      email: 'get@example.com',
      password: 'password123',
      fullName: 'Get User',
      dateOfBirth: '1990-01-01',
      ssn: '123-45-6789',
    });

    const response = await server.inject({
      method: 'GET',
      url: `/users/${user.id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.result).toHaveProperty('username', 'getuser');
  });
});