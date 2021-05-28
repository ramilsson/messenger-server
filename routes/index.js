async function routes(fastify) {
  fastify.register(require('./loginRoute'));
}

module.exports = routes;
