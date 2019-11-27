import Chance from 'chance';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const chance = new Chance();

const AboutOthers = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

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

  const onClickBack = () => {
    setSelectedPerson(null);
  };

  const onChangeNotes = event => {
    const updatedPerson = { ...selectedPerson };
    updatedPerson.notes = event.target.value;
    setSelectedPerson(updatedPerson);
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
      <textarea value={selectedPerson.notes} onChange={onChangeNotes} />
    </>
  );

  return selectedPerson ? aboutPerson : aboutOthers;
};

export default AboutOthers;
