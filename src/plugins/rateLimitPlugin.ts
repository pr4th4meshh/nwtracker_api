import { Plugin } from '@hapi/hapi';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of points
  duration: 1, // Per second
});

export const rateLimitPlugin: Plugin<null> = {
  name: 'rateLimit',
  register: async function (server) {
    server.ext('onPreAuth', async (request, h) => {
      try {
        await rateLimiter.consume(request.info.remoteAddress);
        return h.continue;
      } catch (error) {
        return h.response('Too Many Requests').code(429).takeover();
      }
    });
  },
};

