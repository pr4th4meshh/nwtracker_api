import { Request, ResponseToolkit } from '@hapi/hapi';
import bcrypt from 'bcrypt';
import User from '../models/User';

export const createUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const userData = request.payload as any;

    const existingUser = await User.findOne({ email: userData.email });

    // find existing user with the same email
    if (existingUser) {
      return h.response({ message: 'User already exists' }).code(400);
    }

    // hash SSN with bcrypt
    const hashedSsn = await bcrypt.hash(userData.ssn, 10);
    userData.ssn = hashedSsn;

    // hash the password with bcrypt if it's not already hashed
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const user = new User(userData);
    await user.save();

    return h.response({ message: 'User created successfully', userId: user._id }).code(201);
  } catch (error) {
    console.error('Error creating user:', error);
    return h.response({ message: 'Error creating user' }).code(500);
  }
};

// Get user and exclude password
export const getUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const userId = request.params.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return h.response({ message: 'User not found' }).code(404);
    }

    return h.response(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return h.response({ message: 'Error fetching user' }).code(500);
  }
};
