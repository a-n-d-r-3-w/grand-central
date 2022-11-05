const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const { createUser } = require('./usersUtils');

const router = express.Router();
router.use(bodyParser.urlencoded());

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Validate username.
  if (username.length < 4 || username.length > 20) {
    res.redirect(
      HttpStatus.SEE_OTHER,
      `/create-account?error=invalid-username`
    );
  }

  const usernameContainsValidCharacters = username
    .split('')
    .map(character => character.charCodeAt())
    .every(charCode => {
      if (charCode >= 48 && charCode <= 57) {
        // It's a digit.
        return true;
      }
      if (charCode >= 97 && charCode <= 122) {
        // It's a lowercase letter.
        return true;
      }
      return false;
    });

  if (!usernameContainsValidCharacters) {
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
