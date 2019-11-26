const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const {
  addPerson,
  getPeople,
  updatePerson,
  deletePerson
} = require('./peopleUtils');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  const result = await addPerson(req.body.name);
  res.send(HttpStatus.CREATED, result.ops[0]);
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

router.delete('/:personId', async (req, res) => {
  const { accountId, personId } = req.forwardedParams;
  await deletePerson(accountId, personId);
  res.send(HttpStatus.NO_CONTENT);
});

module.exports = router;
