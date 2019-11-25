const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const { createAccount, getAccount } = require('./accountsUtils');
const { forwardParams } = require('./routerUtils');
const people = require('./people');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  const result = await createAccount();
  if (result.result.ok === 1) {
    res.status(HttpStatus.CREATED).json({ accountId: result.ops[0].accountId });
    return;
  }
  res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
});

router.get('/:accountId', async (req, res) => {
  const { accountId } = req.params;
  const account = await getAccount(accountId);
  if (account === null) {
    res.sendStatus(HttpStatus.NOT_FOUND);
    return;
  }
  res.status(HttpStatus.OK).json(account);
});

router.use('/:accountId/people', forwardParams, people);

module.exports = router;
