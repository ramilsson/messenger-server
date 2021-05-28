const loginQuery = `
  SELECT
    user.id 'id',
    user.login 'login',
    user.name 'name',
    user.email 'email',
    user.registeredAt 'registeredAt'
  FROM user
  WHERE user.login = ? AND user.password = ?
`;

class UserService {
  constructor(mysql) {
    this.mysql = mysql;
  }

  login = async (user) => {
    const { login, password } = user;
    try {
      const connection = await this.mysql.getConnection();
      const [rows] = await connection.query(loginQuery, [login, password]);
      if (!rows || !rows[0]) {
        await Promise.reject({
          code: 400,
          payload: 'Invalid login and(or) password',
        });
      }
      connection.release();
      return rows[0];
    } catch (error) {
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
