const shortid = require('shortid');
const connectQueryEnd = require('../connectQueryEnd');

const sortHabits = habits => {
  habits.sort((habit1, habit2) => {
    const description1 = habit1.description;
    const description2 = habit2.description;
    if (description1 < description2) {
      return -1;
    }
    if (description1 > description2) {
      return 1;
    }
    return 0;
  });
};

const getHabits = async () => {
  const sql = `SELECT * FROM good_habits.habits;`;
  const habits = await connectQueryEnd(sql);
  sortHabits(habits);
  return habits;
};

const addHabit = async description => {
  const sql = `INSERT INTO good_habits.habits (habitId, description, record) VALUES (?, ?, ?);`;
  const args = [shortid.generate(), description, '?'];
  return await connectQueryEnd(sql, args);
};

const updateRecordForHabit = async (habitId, newRecord) => {
  const sql = `UPDATE good_habits.habits SET record=? WHERE habitId=?`;
  const args = [newRecord, habitId];
  return await connectQueryEnd(sql, args);
};

const updateDescriptionForHabit = async (habitId, newDescription) => {
  const sql = `UPDATE good_habits.habits SET description=? WHERE habitId=?`;
  const args = [newDescription, habitId];
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
  updateDescriptionForHabit,
  deleteHabit
};
