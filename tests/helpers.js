const jwt = require('jsonwebtoken');

const helpers = {
  generateBearerToken: () => `Bearer ${jwt.sign({ username: 'foo' }, process.env.JWT_KEY)}`,
};

module.exports = helpers;
