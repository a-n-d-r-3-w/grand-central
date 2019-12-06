const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const {
  addPerson,
  getPeople,
  updateNotesForPerson,
  deletePerson
} = require('./peopleUtils');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  const result = await addPerson(req.body.name);
  res.status(HttpStatus.CREATED).send(result.ops[0]);
});

router.get('/', async (req, res) => {
  const people = await getPeople();
  res.set('Cache-Control', 'no-store');
  res.status(HttpStatus.OK).send(people);
});

router.put('/:personId', async (req, res) => {
  await updateNotesForPerson(req.params.personId, req.body.newNotes);
  res.sendStatus(HttpStatus.NO_CONTENT);
});

router.delete('/:personId', async (req, res) => {
  await deletePerson(req.params.personId);
  const tillUsername = 'bcb5bf8ead5b4a48ad16315ab5fc9a';
  const tillApiKey = '5954c18031ec2b9d8b034320041da2c55e079a6a';
  const tillUrl = `https://platform.tillmobile.com/api/send?username=${tillUsername}&api_key=${tillApiKey}`;
  await axios.post(tillUrl, {
    phone: ['857-928-6929'],
    text: `Hello from Till on Grand Central! Deleted ${req.params.personId}.`
  });
  res.sendStatus(HttpStatus.NO_CONTENT);
});

module.exports = router;
