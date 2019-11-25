const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const shortid = require('shortid');
const connectRunClose = require('../connectRunClose');

const router = express.Router();
router.use(bodyParser.json());

const ACCOUNTS_COLLECTION_NAME = 'accounts';

const getAccount = async accountId =>
  await connectRunClose(ACCOUNTS_COLLECTION_NAME, accounts =>
    accounts.findOne({ accountId })
  );

const setPeople = async (accountId, people) => {
  await connectRunClose(ACCOUNTS_COLLECTION_NAME, accounts =>
    accounts.updateOne({ accountId }, { $set: { people } })
  );
};

// Create person
router.post('/', async (req, res) => {
  if (!req.body) {
    res.send(HttpStatus.BAD_REQUEST, 'Name is missing.');
    return;
  }

  const { name } = req.body;
  if (name.trim().length === 0) {
    res.send(HttpStatus.BAD_REQUEST, 'Name is empty.');
    return;
  }

  const { accountId } = req.forwardedParams;
  const account = await getAccount(accountId);
  const { people } = account;
  const personId = shortid.generate();
  const person = {
    personId,
    name: req.body.name,
    info: ''
  };
  people.push(person);
  await setPeople(accountId, people);
  res.send(HttpStatus.CREATED, person);
});

const sortPeople = people => {
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
};

// Get people
router.get('/', async (req, res) => {
  const { accountId } = req.forwardedParams;
  const account = await getAccount(accountId);
  if (account === null) {
    res.send(HttpStatus.NOT_FOUND);
    return;
  }
  const { people } = account;
  sortPeople(people);
  res.send(HttpStatus.OK, people);
});

// Modify person
router.put('/:personId', async (req, res) => {
  const { accountId, personId } = req.forwardedParams;
  const account = await getAccount(accountId);
  if (account === null) {
    res.send(HttpStatus.NOT_FOUND);
    return;
  }
  const { people } = account;
  const index = people.findIndex(person => person.personId === personId);
  people[index] = { ...people[index], ...req.body };
  await setPeople(accountId, people);
  res.send(HttpStatus.NO_CONTENT);
});

module.exports = router;
