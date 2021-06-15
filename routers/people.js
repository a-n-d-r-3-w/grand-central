const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const HttpStatus = require('http-status-codes');
const {
  addPerson,
  getPeople,
  updateNotesForPerson,
  deletePerson
} = require('./peopleUtils');

const router = express.Router();
router.use(bodyParser.json());
router.use(cookieParser());

router.use(async (req, res, next) => {
  const token = req.cookies['token'];
  if (!token || !global.token || token !== global.token) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
  } else {
    next();
  }
});

router.post('/', async (req, res) => {
  await addPerson(req.body.name, req.body.notes, req.cookies['encryptionKey']);
  res.sendStatus(HttpStatus.CREATED);
});

router.get('/', async (req, res) => {
  const people = await getPeople(req.cookies['encryptionKey']);
  res.set('Cache-Control', 'no-store');
  res.status(HttpStatus.OK).send(people);
});

router.put('/:personId', async (req, res) => {
  await updateNotesForPerson(req.params.personId, req.body.newNotes, req.cookies['encryptionKey']);
  res.sendStatus(HttpStatus.NO_CONTENT);
});

router.delete('/:personId', async (req, res) => {
  await deletePerson(req.params.personId);
  res.sendStatus(HttpStatus.NO_CONTENT);
});

router.delete('/', async (req, res) => {
  const people = await getPeople(req.cookies['encryptionKey']);
  await Promise.all(
    people.map(async person => {
      await deletePerson(person.personId);
    })
  );
  res.sendStatus(HttpStatus.NO_CONTENT);
});

module.exports = router;
