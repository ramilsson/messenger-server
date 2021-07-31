const LOGIN = `
  SELECT
    user.id 'id',
    user.login 'login',
    user.name 'name',
    user.email 'email',
    user.registeredAt 'registeredAt'
  FROM user
  WHERE user.login = ? AND user.password = ?
`;

module.exports = { LOGIN };
