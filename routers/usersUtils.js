const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = async (username, password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt); // The hash includes the salt.
  // Store hash into DB
};

module.exports = {
  createUser
};
