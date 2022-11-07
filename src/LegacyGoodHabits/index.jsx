import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LegacyGoodHabits = () => {
  const [habits, setHabits] = useState([]);

  const getHabits = async () => {
    const response = await axios.get('/api/legacy/good-habits/habits');
    const habits = response.data;
    setHabits(habits);
  };

  useEffect(() => {
    getHabits();
  }, []);

  const onClickAddHabit = async () => {
    const description = window.prompt('Description: ');
    if (description && description.trim().length > 0) {
      await axios.post('/api/legacy/good-habits/habits', { description });
      const response = await axios.get('/api/legacy/good-habits/habits');
      const habits = response.data;
      setHabits(habits);
    }
  };

  const onClickDeleteHabit = async habit => {
    if (window.confirm(`Delete ${habit.description}?`)) {
      await axios.delete(`/api/legacy/good-habits/habits/${habit.habitId}`);
      await getHabits();
    }
  };

  const onClickDoneToday = async habit => {
    const oldRecord = habit.record;
    const newRecord = oldRecord.slice(0, oldRecord.length - 1) + 'y';
    await axios.put(`/api/legacy/good-habits/habits/${habit.habitId}/record`, {
      newRecord
    });
    const response = await axios.get('/api/legacy/good-habits/habits');
    const habits = response.data;
    setHabits(habits);
  };

  const onClickNotDoneToday = async habit => {
    const oldRecord = habit.record;
    const newRecord = oldRecord.slice(0, oldRecord.length - 1) + '?';
    await axios.put(`/api/legacy/good-habits/habits/${habit.habitId}/record`, {
      newRecord
    });
    const response = await axios.get('/api/legacy/good-habits/habits');
    const habits = response.data;
    setHabits(habits);
  };

  const onClickEdit = async habit => {
    const newDescription = window.prompt('New description:');
    if (newDescription && newDescription.trim().length > 0) {
      await axios.put(
        `/api/legacy/good-habits/habits/${habit.habitId}/description`,
        {
          newDescription
        }
      );
      const response = await axios.get('/api/legacy/good-habits/habits');
      const habits = response.data;
      setHabits(habits);
    }
  };

  return (
    <main className="container mt-3">
      <h1>Good Habits</h1>
      <ul className="list-group list-group-flush">
        {habits.map(habit => {
          return (
            <li
              className="list-group-item list-group-item-action"
              key={habit.habitId}
            >
              <div>{habit.description}</div>
              <div className="my-2">
                {habit.record.replaceAll('y', '✅').replaceAll('?', '☯️')}
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => onClickDoneToday(habit)}
                >
                  Done
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() => onClickNotDoneToday(habit)}
                >
                  Not done
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() => onClickEdit(habit)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onClickDeleteHabit(habit)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="btn btn-primary my-3 me-2"
        onClick={onClickAddHabit}
      >
        Add habit
      </button>
    </main>
  );
};

export default LegacyGoodHabits;
