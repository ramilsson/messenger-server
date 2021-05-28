const fp = require('fastify-plugin');
const userService = fp(require('@services/userService'));

async function loginRoute(fastify) {
  await fastify.register(userService);

  fastify.post('/login', (request, reply) => {
    fastify.userService
      .login(request.body)
      .then((user) => {
        request.session.authenticated = true;
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
}

module.exports = loginRoute;
