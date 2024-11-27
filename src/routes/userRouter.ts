import Joi from 'joi';
import { ServerRoute } from '@hapi/hapi';
import { createUser, getUser } from '../controllers/userController';

export const userRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/users',
    handler: createUser,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(8).required(),
          fullName: Joi.string().required(),
          dateOfBirth: Joi.date().iso().required(),
          ssn: Joi.string().pattern(/^\d{3}-\d{2}-\d{4}$/).required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: getUser,
    options: {
      auth: false,
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  },
];

