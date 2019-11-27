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
  const people = await connectRunClose(PEOPLE, people =>
    people.find({}).toArray()
  );
  sortPeople(people);
  return people;
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

const updateNotesForPerson = async (personId, newNotes) => {
  console.log(personId, newNotes);
  await connectRunClose(PEOPLE, people =>
    people.findOneAndUpdate({ personId }, { $set: { notes: newNotes } })
  );
};

const deletePerson = async personId => {
  await connectRunClose(PEOPLE, people => people.deleteOne({ personId }));
};

module.exports = {
  addPerson,
  getPeople,
  updateNotesForPerson,
  deletePerson
};
