const pino = require('pino');
const fp = require('fastify-plugin');
const pinoPretty = require('pino-pretty');

const fastify = require('fastify')({
  logger: pino({
    level: 'info',
    prettifier: pinoPretty,
    prettyPrint: { levelFirst: true },
  }),
});

// Plugins
fastify.register(fp(require('./plugins/mysql')));
fastify.register(fp(require('./plugins/session')));
fastify.register(fp(require('./plugins/webSocket')));
fastify.register(fp(require('./plugins/moduleAlias')));

// Routes
fastify.register(fp(require('./routes')));

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3001);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
