const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const {
  addPersonToAccount,
  getPeople,
  updatePerson
} = require('./peopleUtils');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  await addPersonToAccount(req.forwardedParams.accountId, req.body.name);
  res.sendStatus(HttpStatus.CREATED);
});

router.get('/', async (req, res) => {
  const people = await getPeople(req.forwardedParams.accountId);
  res.send(HttpStatus.OK, people);
});

router.put('/:personId', async (req, res) => {
  const { accountId, personId } = req.forwardedParams;
  await updatePerson(accountId, personId, req.body);
  res.send(HttpStatus.NO_CONTENT);
});

module.exports = router;
