const shortid = require('shortid');
const connectQueryEnd = require('../connectQueryEnd');

const PEOPLE = 'people';

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
  const sql = `SELECT * FROM about_others.people;`;
  const people = await connectQueryEnd(sql);
  sortPeople(people);
  return people;
};

const addPerson = async name => {
  const sql = `INSERT INTO about_others.people (personId, name, notes) VALUES ("${shortid.generate()}", "${name}", "");`;
  return await connectQueryEnd(sql);
};

const updateNotesForPerson = async (personId, newNotes) => {
  await connectQueryEnd(PEOPLE, people =>
    people.findOneAndUpdate({ personId }, { $set: { notes: newNotes } })
  );
};

const deletePerson = async personId => {
  await connectQueryEnd(PEOPLE, people => people.deleteOne({ personId }));
};

module.exports = {
  addPerson,
  getPeople,
  updateNotesForPerson,
  deletePerson
};
