const express = require('express');
const bodyParser = require('body-parser');
const connectRunClose = require('../connectRunClose');
const shortid = require('shortid');
const HttpStatus = require('http-status-codes');

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

router.post('/:accountId/people', async (req, res) => {
  if (!req.body) {
    res.send(HttpStatus.BAD_REQUEST, 'Name is missing.');
    return;
  }

  const { name } = req.body;
  if (name.trim().length === 0) {
    res.send(HttpStatus.BAD_REQUEST, 'Name is empty.');
    return;
  }

  const { accountId } = req.params;
  const account = await connectRunClose('accounts', accounts =>
    accounts.findOne({ accountId })
  );
  const { people } = account;
  const personId = shortid.generate();
  const person = {
    personId,
    name: req.body.name,
    info: ''
  };
  people.push(person);
  await connectRunClose('accounts', accounts =>
    accounts.updateOne({ accountId }, { $set: { people } })
  );
  res.send(HttpStatus.CREATED, person);
});

router.get('/:accountId/people', async (req, res) => {
  const { accountId } = req.params;
  const account = await connectRunClose('accounts', accounts =>
    accounts.findOne({ accountId })
  );
  if (account === null) {
    res.send(HttpStatus.NOT_FOUND);
    return;
  }
  const { people } = account;
  people.sort((person1, person2) => {
    const name1 = person1.name.toLowerCase();
    const name2 = person2.name.toLowerCase();
    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }
    return 0;
  });
  res.send(HttpStatus.OK, people);
});

router.put('/:accountId/people/:personId', async (req, res) => {
  const { accountId, personId } = req.params;
  const account = await connectRunClose('accounts', accounts =>
    accounts.findOne({ accountId })
  );
  const { people } = account;
  const index = people.findIndex(person => person.personId === personId);
  people[index] = { ...people[index], ...req.body };
  await connectRunClose('accounts', accounts =>
    accounts.updateOne({ accountId }, { $set: { people } })
  );
  res.send(HttpStatus.NO_CONTENT);
});

module.exports = router;
