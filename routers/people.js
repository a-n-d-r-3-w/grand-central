const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser')
const HttpStatus = require('http-status-codes');
const {
  addPerson,
  getPeople,
  updateNotesForPerson,
  deletePerson
} = require('./peopleUtils');

const router = express.Router();
router.use(bodyParser.json());
router.use(cookieParser())

router.use(async (req, res, next) => {
  const digestHex = req.cookies['about_others_digest_hex'];
  if (digestHex !== '8768e6805db8260ba56539dc0a9eb079511c8e83663cd0d0ba686ee1528b0744') {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
  } else {
    next();
  }
})

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
