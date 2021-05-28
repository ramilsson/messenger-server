async function mysql(fastify) {
  fastify.register(require('fastify-mysql'), {
    promise: true,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
}

module.exports = mysql;
