const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const HttpStatus = require('http-status-codes');
const connectRunClose = require('../connectRunClose');
const people = require('./people');

const router = express.Router();
router.use(bodyParser.json());

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

router.use(
  '/:accountId/people',
  function(req, res, next) {
    req.forwardedParams = { ...req.params };
    next();
  },
  people
);

module.exports = router;
