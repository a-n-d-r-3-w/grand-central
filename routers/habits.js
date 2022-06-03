const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const HttpStatus = require('http-status-codes');
const {
  addHabit,
  getHabits,
  updateRecordForHabit,
  updateDescriptionForHabit,
  deleteHabit
} = require('./habitsUtils');

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
  await addHabit(req.body.description);
  res.sendStatus(HttpStatus.CREATED);
});

router.get('/', async (_, res) => {
  const entries = await getHabits();
  res.set('Cache-Control', 'no-store');
  res.status(HttpStatus.OK).send(entries);
});

router.put('/:habitId/record', async (req, res) => {
  await updateRecordForHabit(req.params.habitId, req.body.newRecord);
  res.sendStatus(HttpStatus.NO_CONTENT);
});

router.put('/:habitId/description', async (req, res) => {
  await updateDescriptionForHabit(req.params.habitId, req.body.newDescription);
  res.sendStatus(HttpStatus.NO_CONTENT);
});

router.delete('/:habitId', async (req, res) => {
  await deleteHabit(req.params.habitId);
  res.sendStatus(HttpStatus.NO_CONTENT);
});

module.exports = router;
