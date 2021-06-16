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

  const onClickImport = async () => {
    const importData = window.prompt('Import data:');
    if (importData && importData.trim().length > 0) {
      const peopleToImport = JSON.parse(importData);
      await Promise.all(
        peopleToImport.map(async person => {
          await axios.post('/api/about-others/people', {
            name: person.name,
            notes: person.notes
          });
        })
      );
      const response = await axios.get('/api/about-others/people');
      const people = response.data;
      setPeople(people);
    }
  }

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
      await axios.delete(
        `/api/about-others/people/${person.personId}`
      );
      await getPeople();
    }
  };

  const onClickDeleteAll = async () => {
    const response = window.prompt("Are you sure you want to DELETE ALL? If so, enter 'YES'.");
    if (response === 'YES') {
      await axios.delete('/api/about-others/people');
      await getPeople();
    }
  }

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
        await axios.put(
          `/api/about-others/people/${selectedPerson.personId}`,
          {
            newNotes
          }
        );
        setIsSynced(true);
      }, 1000)
    );
  };

  const aboutOthers = (
    <div className="container mt-3">
      <h4>About Others</h4>
      <ul className="list-group list-group-flush">
        {people.map(person => (
          <li
            className="list-group-item list-group-item-action"
            key={person.personId}
          >
            <button
              type="button"
              className="btn btn-link px-0 me-3"
              onClick={() => setSelectedPerson(person)}
            >
              {person.name}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={() => onClickDeletePerson(person)}
            >
              Rename
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
        className="btn btn-primary my-3 me-2"
        onClick={onClickAddPerson}
      >
        Add person
      </button>
      <button
        type="button"
        className="btn btn-secondary my-3 me-2"
        onClick={onClickImport}
      >
        Import
      </button>
      <button
        type="button"
        className="btn btn-danger my-3"
        onClick={onClickDeleteAll}
      >
        Delete all
      </button>
    </div>
  );

  const aboutPerson = selectedPerson && (
    <div className="container mt-3">
      <h4>About {selectedPerson.name}</h4>
      <div>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm px-3 my-3"
          onClick={onClickBack}
        >
          Back
        </button>{' '}
        {isSynced ? (
          <div className="alert alert-success small" role="alert">
            Synced
          </div>
        ) : (
          <div className="alert alert-info small" role="alert">
            Syncing...
          </div>
        )}
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          value={selectedPerson.notes}
          onChange={onChangeNotes}
          rows="10"
        />
      </div>
    </div>
  );

  return selectedPerson ? aboutPerson : aboutOthers;
};

export default AboutOthers;
