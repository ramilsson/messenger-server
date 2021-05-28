async function session(fastify) {
  fastify.register(require('fastify-cookie'));
  fastify.register(require('fastify-session'), {
    cookieName: 'sessionId',
    secret: process.env.COOKIE_SECRET,
    cookie: { secure: false },
    expires: 1800000,
    httpOnly: true,
  });
}

module.exports = session;
