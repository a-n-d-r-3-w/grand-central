const shortid = require('shortid');
const connectQueryEnd = require('../connectQueryEnd');

const getHabits = async () => {
  const sql = `SELECT * FROM good_habits.habits;`;
  const habits = await connectQueryEnd(sql);
  return habits;
};

const addHabit = async description => {
  const sql = `INSERT INTO good_habits.habits (habitId, description) VALUES (?, ?);`;
  const args = [shortid.generate(), description];
  return await connectQueryEnd(sql, args);
};

const updateRecordForHabit = async (habitId, newRecord) => {
  const sql = `UPDATE good_habits.habits SET record=? WHERE habitId=?`;
  const args = [newRecord, habitId];
  return await connectQueryEnd(sql, args);
};

const deleteHabit = async habitId => {
  const sql = `DELETE FROM good_habits.habits WHERE habitId=?`;
  const args = [habitId];
  return await connectQueryEnd(sql, args);
};

module.exports = {
  addHabit,
  getHabits,
  updateRecordForHabit,
  deleteHabit
};
