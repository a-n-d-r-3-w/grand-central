import Chance from 'chance';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const chance = new Chance();

const AboutOthers = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const getPeople = async () => {
    const response = await axios.get('/api/about-others/people');
    const people = response.data;
    setPeople(people);
  };

  useEffect(() => {
    getPeople();
  }, []);

  const onClickAddPerson = async () => {
    const name = chance.name();

    await axios.post('/api/about-others/people', { name });
    const response = await axios.get('/api/about-others/people');
    const people = response.data;
    setPeople(people);
  };

  const onClickBack = async () => {
    await getPeople();
    setSelectedPerson(null);
  };

  const onChangeNotes = async event => {
    const updatedPerson = { ...selectedPerson };
    const newNotes = event.target.value;
    updatedPerson.notes = newNotes;
    setSelectedPerson(updatedPerson);
    await axios.put(`/api/about-others/people/${selectedPerson.personId}`, {
      newNotes
    });
  };

  const aboutOthers = (
    <>
      <h1>About Others</h1>
      {people.map(person => (
        <div key={person.personId}>
          <button onClick={() => setSelectedPerson(person)}>
            {person.name}
          </button>
        </div>
      ))}
      <button onClick={onClickAddPerson}>Add person</button>
    </>
  );

  const aboutPerson = selectedPerson && (
    <>
      <h1>About {selectedPerson.name}</h1>
      <button onClick={onClickBack}>Back</button>
      <div>
        <textarea
          value={selectedPerson.notes}
          onChange={onChangeNotes}
          rows="26"
          cols="36"
        />
      </div>
    </>
  );

  return selectedPerson ? aboutPerson : aboutOthers;
};

export default AboutOthers;
