const bcrypt = require('bcrypt');
const saltRounds = 10;
const connectQueryEnd = require('../connectQueryEnd');

const createUser = async (username, password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt); // The hash includes the salt.
  // Store hash into DB
  const sql = `INSERT INTO inclusive_web_apps.users (username, hashed_password) VALUES (?, ?);`;
  const args = [username, hashedPassword];
  return await connectQueryEnd(sql, args);
};

module.exports = {
  createUser
};
