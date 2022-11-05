const bcrypt = require('bcrypt');
const saltRounds = 10;
const connectQueryEnd = require('../connectQueryEnd');

const createUser = async (username, password) => {
  // Check if username already exists.
  const sql1 = `SELECT * FROM inclusive_web_apps.users;`;
  const args1 = [username];
  const users = await connectQueryEnd(sql1, args1);
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    throw new Error('Username already exists.');
  }

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt); // The hash includes the salt.
  const sql2 = `INSERT INTO inclusive_web_apps.users (username, hashed_password) VALUES (?, ?);`;
  const args2 = [username, hashedPassword];
  return await connectQueryEnd(sql2, args2);
};

module.exports = {
  createUser
};
