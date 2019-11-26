import Chance from 'chance';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const chance = new Chance();

const AboutOthers = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function getPeople() {
      const response = await axios.get('/api/about-others/people');
      const people = response.data;
      setPeople(people);
    }
    getPeople();
  });

  const onClickAddPerson = async () => {
    const name = chance.name();

    await axios.post('/api/about-others/people', { name });
    const response = await axios.get('/api/about-others/people');
    const people = response.data;
    setPeople(people);
  };

  return (
    <>
      <h1>About Others</h1>
      {people.map(person => (
        <div key={person.personId}>
          <a href="#">{person.name}</a>
        </div>
      ))}
      <button onClick={onClickAddPerson}>Add person</button>
    </>
  );
};

export default AboutOthers;
