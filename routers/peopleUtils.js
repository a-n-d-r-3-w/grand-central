const shortid = require('shortid');
const connectRunClose = require('../connectRunClose');

const PEOPLE = 'people';

const getAccount = async accountId =>
  await connectRunClose(PEOPLE, accounts => accounts.findOne({ accountId }));

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

const getPeople = async () => {
  return await connectRunClose(PEOPLE, people => people.find({}).toArray());
};

const setPeople = async (accountId, people) => {
  await connectRunClose(PEOPLE, accounts =>
    accounts.updateOne({ accountId }, { $set: { people } })
  );
};

const addPerson = async name => {
  const person = {
    personId: shortid.generate(),
    name,
    notes: ''
  };
  return await connectRunClose(PEOPLE, people => people.insertOne(person));
};

const updatePerson = async (accountId, personId, newData) => {
  const people = await getPeople(accountId);
  const index = people.findIndex(person => person.personId === personId);
  people[index] = { ...people[index], ...newData };
  await setPeople(accountId, people);
};

const deletePerson = async (accountId, personId) => {
  const people = await getPeople(accountId);
  const index = people.findIndex(person => person.personId === personId);
  people.splice(index, 1);
  await setPeople(accountId, people);
};

module.exports = {
  addPerson,
  getPeople,
  updatePerson,
  deletePerson
};
