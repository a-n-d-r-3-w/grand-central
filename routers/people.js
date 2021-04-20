const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const {
  addPerson,
  getPeople,
  updateNotesForPerson,
  deletePerson
} = require('./peopleUtilsMariaDb');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  await addPerson(req.body.name);
  res.sendStatus(HttpStatus.CREATED);
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
  res.sendStatus(HttpStatus.NO_CONTENT);
});

module.exports = router;
