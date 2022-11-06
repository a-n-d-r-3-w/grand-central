const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const connectQueryEnd = require('../connectQueryEnd');

const router = express.Router();
router.use(bodyParser.urlencoded());

const validateUsernameAndPassword = async (username, password) => {
  const sql = `SELECT hashed_password FROM inclusive_web_apps.users WHERE username=?;`;
  const args = [username];
  const hashedPassword = (await connectQueryEnd(sql, args))[0].hashed_password;
  const usernameAndPasswordMatch = await bcrypt.compare(
    password,
    hashedPassword
  );
  if (!usernameAndPasswordMatch) {
    throw new Error('Username and password do not match.');
  }
};

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    await validateUsernameAndPassword(username, password);
    // Create session key.
    // Store session in database.
    // Generate session cookie.
    // Set response cookie.
    // Redirect user to their home page.
    res.send('Logged in.');
  } catch (error) {
    const encodedErrorMessage = encodeURIComponent(error.message); // To replace spaces with %20, for example.
    res.redirect(HttpStatus.SEE_OTHER, `/log-in?error=${encodedErrorMessage}`);
  }
});

module.exports = router;
