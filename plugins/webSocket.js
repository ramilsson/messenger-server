async function webSocket(fastify) {
  fastify.register(require('fastify-websocket'));
}

module.exports = webSocket;
