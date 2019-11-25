const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const shortid = require('shortid');
const people = require('./people');
const connectRunClose = require('../connectRunClose');

const router = express.Router();
router.use(bodyParser.json());

// Create account
router.post('/', async (req, res) => {
  const accountId = shortid.generate();
  const result = await connectRunClose('accounts', async accounts => {
    return accounts.insertOne({ accountId, people: [] });
  });
  if (result.result.ok === 1) {
    res.status(HttpStatus.CREATED).json({ accountId });
    return;
  }
  res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
});

// Retrieve account
router.get('/:accountId', async (req, res) => {
  const { accountId } = req.params;
  const account = await connectRunClose('accounts', accounts =>
    accounts.findOne({ accountId })
  );
  if (account === null) {
    res.sendStatus(HttpStatus.NOT_FOUND);
    return;
  }
  res.status(HttpStatus.OK).json(account);
});

// Attach people router
const forwardParams = (req, res, next) => {
  req.forwardedParams = { ...req.params };
  next();
};

router.use('/:accountId/people', forwardParams, people);

module.exports = router;
