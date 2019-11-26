import Chance from 'chance';
import React from 'react';
import axios from 'axios';
import shortid from 'shortid';
import { useSelector, useDispatch } from 'react-redux';

const chance = new Chance();

const AboutOthers = () => {
  const people = useSelector(state => state.aboutOthers.people);
  const dispatch = useDispatch();

  const onClickAddPerson = async () => {
    const name = chance.name();

    const response = await axios.post('/api/about-others/people', { name });

    dispatch({
      type: 'ADD_PERSON',
      person: {
        id: shortid.generate(),
        name,
        notes: ''
      }
    });
  };

  return (
    <>
      <h1>About Others</h1>
      {people.map(person => (
        <div>{person.name}</div>
      ))}
      <button onClick={onClickAddPerson}>Add person</button>
    </>
  );
};

export default AboutOthers;
