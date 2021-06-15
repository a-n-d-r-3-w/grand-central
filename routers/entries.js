const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const HttpStatus = require('http-status-codes');
const {
  addEntry,
  getEntries,
  updateNotesForEntry,
  deleteEntry
} = require('./entriesUtils');

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
  await addEntry(req.body.name, req.body.notes, req.cookies['encryptionKey']);
  res.sendStatus(HttpStatus.CREATED);
});

router.get('/', async (req, res) => {
  const entries = await getEntries(req.cookies['encryptionKey']);
  res.set('Cache-Control', 'no-store');
  res.status(HttpStatus.OK).send(entries);
});

router.put('/:entryId', async (req, res) => {
  await updateNotesForEntry(req.params.entryId, req.body.newNotes, req.cookies['encryptionKey']);
  res.sendStatus(HttpStatus.NO_CONTENT);
});

router.delete('/:entryId', async (req, res) => {
  await deleteEntry(req.params.entryId);
  res.sendStatus(HttpStatus.NO_CONTENT);
});

router.delete('/', async (req, res) => {
  const entries = await getEntries(req.cookies['encryptionKey']);
  await Promise.all(
    entries.map(async entry => {
      await deleteEntry(entry.entryId);
    })
  );
  res.sendStatus(HttpStatus.NO_CONTENT);
})

module.exports = router;
