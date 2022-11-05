const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const { createUser } = require('./usersUtils');

const router = express.Router();
router.use(bodyParser.urlencoded());

router.post('/', async (req, res) => {
  try {
    await createUser(req.body.username, req.body.password);
    res.redirect(HttpStatus.SEE_OTHER, '/create-account');
    return;
  } catch (error) {
    if (error.message === 'Username already exists.') {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

module.exports = router;
