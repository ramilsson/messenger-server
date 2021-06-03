const fp = require('fastify-plugin');
const userService = fp(require('@services/userService'));

async function loginRoute(fastify) {
  await fastify.register(userService);

  fastify.post('/login', (request, reply) => {
    fastify.userService
      .login(request.body)
      .then((user) => {
        request.session.user = user;
        reply.send(user);
      })
      .catch((error) => {
        reply.code(error.code).send(error);
      });
  });

  fastify.options('/login', (request, reply) => {
    reply.code(200).send();
  });

  fastify.addHook('onSend', async (request, reply, payload) => {
    reply.headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_URL,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json',
    });
  });
}

module.exports = loginRoute;
