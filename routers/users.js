const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const { createUser } = require('./usersUtils');

const router = express.Router();
router.use(bodyParser.urlencoded());

router.post('/', async (req, res) => {
  await createUser(req.body.username, req.body.password);
  res.redirect(HttpStatus.CREATED, '/create-account');
});

module.exports = router;
