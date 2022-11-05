const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const { createUser } = require('./usersUtils');

const router = express.Router();
router.use(bodyParser.urlencoded());

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  // TODO: Validate username
  if (username.length < 4 || username.length > 20) {
    res.redirect(
      HttpStatus.SEE_OTHER,
      `/create-account?error=invalid-username`
    );
  }

  // TODO: Validate password

  try {
    await createUser(username, password);
    res.redirect(
      HttpStatus.SEE_OTHER,
      `/create-account/success?username=${username}`
    );
    return;
  } catch (error) {
    if (error.message.startsWith('Username not available: ')) {
      res.redirect(
        HttpStatus.SEE_OTHER,
        `/create-account?error=username-not-available`
      );
    } else {
      res.redirect(
        HttpStatus.SEE_OTHER,
        `/create-account/error?username=${username}`
      );
    }
  }
});

module.exports = router;
