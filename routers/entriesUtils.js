const shortid = require('shortid');
const connectQueryEnd = require('../connectQueryEnd');

const sortEntries = entries => {
  entries.sort((entry1, entry2) => {
    const name1 = entry1.name.toLowerCase();
    const name2 = entry2.name.toLowerCase();
    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }
    return 0;
  });
};

const getEntries = async () => {
  const sql = `SELECT * FROM ohlife.entries;`;
  const entries = await connectQueryEnd(sql);
  sortEntries(entries);
  return entries;
};

const addEntry = async name => {
  const sql = `INSERT INTO ohlife.entries (entryId, name, notes) VALUES (?, ?, "");`;
  const args = [shortid.generate(), name];
  return await connectQueryEnd(sql, args);
};

const updateNotesForEntry = async (entryId, newNotes) => {
  const sql = `UPDATE ohlife.entries SET notes=? WHERE entryId=?;`;
  const args = [newNotes, entryId];
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
