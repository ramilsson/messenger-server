const path = require('path');
const moduleAlias = require('module-alias');

module.exports = async function () {
  moduleAlias.addAlias('@services', path.join(__dirname, '../services'));
};
