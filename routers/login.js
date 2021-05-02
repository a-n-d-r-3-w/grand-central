const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const router = express.Router();
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
router.use(cookieParser());

router.post('/', async (req, res) => {
  const password = req.body.password;
  if (!password) {
    res.sendStatus(401);
    return;
  }
  const secret = 'crayola';
  const hash = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');
  if (hash !== '16d5bcfa3137d76ecd9dff459fadff5c8e18bca22226e4582386e19e9da18cbb') {
    res.sendStatus(401);
    return;
  }
  const token = crypto.randomBytes(16).toString('hex');
  global.token = token;
  res.cookie('token', token, {
    httpOnly: true
  });
  res.redirect('/616e64726577/about-others');
});

module.exports = router;
