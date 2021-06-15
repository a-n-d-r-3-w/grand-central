const shortid = require('shortid');
const connectQueryEnd = require('../connectQueryEnd');
const { encrypt, decrypt } = require('../encryptionUtils');

const sortEntries = (entries, encryptionKey) => {
  entries.sort((entry1, entry2) => {
    const name1 = decrypt(entry1.name, encryptionKey).toLowerCase();
    const name2 = decrypt(entry2.name, encryptionKey).toLowerCase();
    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }
    return 0;
  });
};

const getEntries = async encryptionKey => {
  const sql = `SELECT * FROM ohlife.entries;`;
  const entries = await connectQueryEnd(sql);
  sortEntries(entries, encryptionKey);
  return entries.map(entry => ({
    entryId: entry.entryId,
    name: decrypt(entry.name, encryptionKey),
    notes: decrypt(entry.notes, encryptionKey)
  }));
};

const addEntry = async (name, notes = '', encryptionKey) => {
  const encryptedName = encrypt(name, encryptionKey);
  const encryptedNotes = encrypt(notes, encryptionKey);
  const sql = `INSERT INTO ohlife.entries (entryId, name, notes) VALUES (?, ?, ?);`;
  const args = [shortid.generate(), encryptedName, encryptedNotes];
  return await connectQueryEnd(sql, args);
};

const updateNotesForEntry = async (entryId, newNotes, encryptionKey) => {
  const encryptedNotes = encrypt(newNotes, encryptionKey);
  const sql = `UPDATE ohlife.entries SET notes=? WHERE entryId=?;`;
  const args = [encryptedNotes, entryId];
  return await connectQueryEnd(sql, args);
};

const deleteEntry = async entryId => {
  const sql = `DELETE FROM ohlife.entries WHERE entryId=?;`;
  const args = [entryId];
  return await connectQueryEnd(sql, args);
};

module.exports = {
  addEntry,
  getEntries,
  updateNotesForEntry,
  deleteEntry
};
