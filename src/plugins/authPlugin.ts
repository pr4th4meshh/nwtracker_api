import { Plugin } from '@hapi/hapi';
import User from '../models/User';

const validateToken = async (decoded: any) => {
  const user = await User.findById(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true };
};

export const authPlugin: Plugin<null> = {
  name: 'auth',
  register: async function (server) {
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_SECRET,
      validate: validateToken,
      verifyOptions: { algorithms: ['HS256'] },
    });

    // I have disabled sever auth with jwt for testing
    // server.auth.default('jwt');
  },
};

