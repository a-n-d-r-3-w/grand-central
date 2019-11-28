import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutOthers = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [saveTimeoutId, setSaveTimeoutId] = useState(null);
  const [isSynced, setIsSynced] = useState(true);

  const getPeople = async () => {
    const response = await axios.get('/api/about-others/people');
    const people = response.data;
    setPeople(people);
  };

  useEffect(() => {
    getPeople();
  }, []);

  const onClickAddPerson = async () => {
    const name = window.prompt('Name:');
    if (name && name.trim().length > 0) {
      await axios.post('/api/about-others/people', { name });
      const response = await axios.get('/api/about-others/people');
      const people = response.data;
      setPeople(people);
    }
  };

  const onClickDeletePerson = async person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      await axios.delete(`/api/about-others/people/${person.personId}`);
      await getPeople();
    }
  };

  const onClickBack = async () => {
    await getPeople();
    setSelectedPerson(null);
  };

  const onChangeNotes = async event => {
    setIsSynced(false);
    if (saveTimeoutId) {
      window.clearTimeout(saveTimeoutId);
    }
    const updatedPerson = { ...selectedPerson };
    const newNotes = event.target.value;
    updatedPerson.notes = newNotes;
    setSelectedPerson(updatedPerson);
    setSaveTimeoutId(
      window.setTimeout(async () => {
        await axios.put(`/api/about-others/people/${selectedPerson.personId}`, {
          newNotes
        });
        setIsSynced(true);
      }, 1000)
    );
  };

  const aboutOthers = (
    <div className="container mt-3">
      <h1>About Others</h1>
      <ul className="list-group list-group-flush">
        {people.map(person => (
          <li
            className="list-group-item list-group-item-action"
            key={person.personId}
          >
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setSelectedPerson(person)}
            >
              {person.name}
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onClickDeletePerson(person)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-primary my-3"
        onClick={onClickAddPerson}
      >
        Add person
      </button>
    </div>
  );

  const aboutPerson = selectedPerson && (
    <div className="container mt-3">
      <h1>About {selectedPerson.name}</h1>
      <div className="my-3">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm px-3"
          onClick={onClickBack}
        >
          Back
        </button>{' '}
        <span>{isSynced ? 'Synced' : 'Syncing...'}</span>
      </div>
      <div>
        <textarea
          value={selectedPerson.notes}
          onChange={onChangeNotes}
          rows="26"
          cols="36"
        />
      </div>
    </div>
  );

  return selectedPerson ? aboutPerson : aboutOthers;
};

export default AboutOthers;
