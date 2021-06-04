const shortid = require('shortid');
const connectQueryEnd = require('../connectQueryEnd');
const { encrypt, decrypt } = require('../encryptionUtils');

const sortPeople = (people, encryptionKey) => {
  people.sort((person1, person2) => {
    const name1 = decrypt(person1.name, encryptionKey).toLowerCase();
    const name2 = decrypt(person2.name, encryptionKey).toLowerCase();
    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }
    return 0;
  });
};

const getPeople = async encryptionKey => {
  const sql = `SELECT * FROM about_others.people;`;
  const people = await connectQueryEnd(sql);
  sortPeople(people, encryptionKey);
  return people.map(person => ({
    personId: person.personId,
    name: decrypt(person.name, encryptionKey),
    notes: decrypt(person.notes, encryptionKey)
  }));
};

const addPerson = async (name, encryptionKey) => {
  const encryptedName = encrypt(name, encryptionKey);
  const sql = `INSERT INTO about_others.people (personId, name, notes) VALUES (?, ?, "");`;
  const args = [shortid.generate(), encryptedName];
  return await connectQueryEnd(sql, args);
};

const updateNotesForPerson = async (personId, newNotes, encryptionKey) => {
  const encryptedNotes = encrypt(newNotes, encryptionKey);
  const sql = `UPDATE about_others.people SET notes=? WHERE personId=?;`;
  const args = [encryptedNotes, personId];
  return await connectQueryEnd(sql, args);
};

const deletePerson = async personId => {
  const sql = `DELETE FROM about_others.people WHERE personId=?;`;
  const args = [personId];
  return await connectQueryEnd(sql, args);
};

module.exports = {
  addPerson,
  getPeople,
  updateNotesForPerson,
  deletePerson
};
