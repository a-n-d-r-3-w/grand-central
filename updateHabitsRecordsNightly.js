const schedule = require('node-schedule');
const { getHabits, updateRecordForHabit } = require('./routers/habitsUtils');

const updateRecords = async () => {
  const habits = await getHabits();
  Promise.all(
    habits.map(habit => {
      const oldRecord = habit.record;
      const newRecord = oldRecord + '?';
      return updateRecordForHabit(habit.habitId, newRecord);
    })
  );
};

schedule.scheduleJob('0 4 * * *', function() {
  // Every day at 4 a.m. UTC (12 a.m. EDT)
  updateRecords();
});
