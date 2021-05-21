const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const HttpStatus = require('http-status-codes');
const validator = require('validator');

const router = express.Router();
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
router.use(cookieParser());

router.delete('/', (req, res) => {
  delete global.token;
  res.clearCookie('token').end();
});

router.post('/', (req, res) => {
  const selectedApp = req.body['selected-app'];
  if (!validator.isIn(selectedApp, ['about-others', 'ohlife'])) {
    res.sendStatus(HttpStatus.BAD_REQUEST);
  }

  const password = req.body.password;
  if (!password) {
    res.sendStatus(HttpStatus.FORBIDDEN);
    return;
  }
  const secret = 'crayola';
  const hash = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');
  if (hash !== '16d5bcfa3137d76ecd9dff459fadff5c8e18bca22226e4582386e19e9da18cbb') {
    res.sendStatus(HttpStatus.FORBIDDEN);
    return;
  }
  const token = crypto.randomBytes(16).toString('hex');
  global.token = token;
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });

  res.redirect('/' + selectedApp);
});

module.exports = router;
