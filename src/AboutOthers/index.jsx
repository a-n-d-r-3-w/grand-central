import Chance from 'chance';
import React, { useState } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import { useSelector, useDispatch } from 'react-redux';

const chance = new Chance();

const AboutOthers = () => {
  const [people, setPeople] = useState([]);

  // const people = useSelector(state => state.aboutOthers.people);
  // const dispatch = useDispatch();

  const onClickAddPerson = async () => {
    const name = chance.name();

    await axios.post('/api/about-others/people', { name });
    const response = await axios.get('/api/about-others/people');
    const people = response.data;
    setPeople(people);
    //
    // dispatch({
    //   type: 'ADD_PERSON',
    //   person:
    // });
  };

  return (
    <>
      <h1>About Others</h1>
      {people.map(person => (
        <div key={person.personId}>{person.name}</div>
      ))}
      <button onClick={onClickAddPerson}>Add person</button>
    </>
  );
};

export default AboutOthers;
