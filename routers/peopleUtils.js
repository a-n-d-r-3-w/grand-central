const shortid = require('shortid');
const connectQueryEnd = require('../connectQueryEnd');

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
  const sql = `UPDATE about_others.people SET notes="${newNotes}" WHERE personId="${personId}";`;
  return await connectQueryEnd(sql);
};

const deletePerson = async personId => {
  const sql = `DELETE FROM about_others.people WHERE personId="${personId}";`;
  return await connectQueryEnd(sql);
};

module.exports = {
  addPerson,
  getPeople,
  updateNotesForPerson,
  deletePerson
};
