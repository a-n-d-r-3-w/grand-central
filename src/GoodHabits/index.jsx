import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoodHabits = () => {
  const [habits, setHabits] = useState([]);

  const getHabits = async () => {
    const response = await axios.get('/api/good-habits/habits');
    const habits = response.data;
    setHabits(habits);
  };

  useEffect(() => {
    getHabits();
  }, []);

  const onClickAddHabit = async () => {
    const description = window.prompt('Description: ');
    if (description && description.trim().length > 0) {
      await axios.post('/api/good-habits/habits', { description });
      const response = await axios.get('/api/good-habits/habits');
      const habits = response.data;
      setHabits(habits);
    }
  };

  const onClickDeleteHabit = async habit => {
    if (window.confirm(`Delete ${habit.description}?`)) {
      await axios.delete(`/api/good-habits/habits/${habit.habitId}`);
      await getHabits();
    }
  };

  return (
    <div className="container mt-3">
      <h4>Good Habits</h4>
      Check the box if the item was done today.
      <ul className="list-group list-group-flush">
        {habits.map(habit => {
          return (
            <li className="list-group-item list-group-item-action">
              <div>{habit.description}</div>
              <div className="my-2">✅✅⭕✅✅✅✅❓</div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm me-2"
                >
                  Done today
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm me-2"
                >
                  Not done today
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm me-2"
                >
                  Rename
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
    </div>
  );
};

export default GoodHabits;
