const { LOGIN } = require('./queries');

class UserService {
  constructor(mysql) {
    this.mysql = mysql;
  }

  login = async (user) => {
    const { login, password } = user;
    try {
      const connection = await this.mysql.getConnection();
      const [rows] = await connection.execute(LOGIN, [login, password]);
      if (!rows || !rows[0]) {
        // TODO: use custom errors
        throw {
          code: 400,
          payload: 'Invalid login and(or) password',
        };
      }
      connection.release();
      return rows[0];
    } catch (error) {
      // TODO: use custom errors
      if (error.code && error.payload) {
        await Promise.reject(error);
      } else {
        await Promise.reject({
          code: 500,
          payload: error,
        });
      }
    }
  };
}

async function userService(fastify) {
  fastify.decorate('userService', new UserService(fastify.mysql));
}

module.exports = userService;
