import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OhLife = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [saveTimeoutId, setSaveTimeoutId] = useState(null);
  const [isSynced, setIsSynced] = useState(true);

  const getEntries = async () => {
    const response = await axios.get('/api/ohlife/entries');
    const entries = response.data;
    setEntries(entries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const onClickImport = async () => {
    const importData = window.prompt('Import data:');
    if (importData && importData.trim().length > 0) {
      const entriesToImport = JSON.parse(importData);
      await Promise.all(
        entriesToImport.map(async entry => {
          await axios.post('/api/ohlife/entries', {
            name: entry.name,
            notes: entry.notes
          });
        })
      );
      const response = await axios.get('/api/ohlife/entries');
      const entries = response.data;
      setEntries(entries);
    }
  }

  const onClickAddEntry = async () => {
    const name = Date.now().toString();
    await axios.post('/api/ohlife/entries', { name });
    const response = await axios.get('/api/ohlife/entries');
    const entries = response.data;
    setEntries(entries);
  };

  const onClickDeleteEntry = async entry => {
    if (window.confirm(`Delete ${new Date(Number.parseInt(entry.name)).toDateString()}?`)) {
      await axios.delete(
        `/api/ohlife/entries/${entry.entryId}`
      );
      await getEntries();
    }
  };

  const onClickDeleteAll = async () => {
    const response = window.prompt("Are you sure you want to DELETE ALL? If so, enter 'YES'.");
    if (response === 'YES') {
      await axios.delete('/api/ohlife/entries');
      await getEntries();
    }
  }

  const onClickBack = async () => {
    await getEntries();
    setSelectedEntry(null);
  };

  const onChangeNotes = async event => {
    setIsSynced(false);
    if (saveTimeoutId) {
      window.clearTimeout(saveTimeoutId);
    }
    const updatedEntry = { ...selectedEntry };
    const newNotes = event.target.value;
    updatedEntry.notes = newNotes;
    setSelectedEntry(updatedEntry);
    setSaveTimeoutId(
      window.setTimeout(async () => {
        await axios.put(
          `/api/ohlife/entries/${selectedEntry.entryId}`,
          {
            newNotes
          }
        );
        setIsSynced(true);
      }, 1000)
    );
  };

  const ohLife = (
    <div className="container mt-3">
      <h4>OhLife</h4>
      <ul className="list-group list-group-flush">
        {entries.map(entry => (
          <li
            className="list-group-item list-group-item-action"
            key={entry.entryId}
          >
            <button
              type="button"
              className="btn btn-link px-0 me-3"
              onClick={() => setSelectedEntry(entry)}
            >
              {new Date(Number.parseInt(entry.name)).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(',')[0]}
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onClickDeleteEntry(entry)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="btn-group" role="group" aria-label="Button group">
        <button
          type="button"
          className="btn btn-outline-primary my-3"
          onClick={onClickAddEntry}
        >
          Add entry
        </button>
        <button
          type="button"
          className="btn btn-outline-primary my-3"
          onClick={onClickImport}
        >
          Import
        </button>
        <button
          type="button"
          className="btn btn-outline-primary my-3"
          onClick={onClickDeleteAll}
        >
          Delete all
        </button>
      </div>
    </div>
  );

  const aboutEntry = selectedEntry && (
    <div className="container mt-3">
      <h4>Here's what happened on {new Date(Number.parseInt(selectedEntry.name)).toDateString()}</h4>
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
          value={selectedEntry.notes}
          onChange={onChangeNotes}
          rows="10"
        />
      </div>
    </div>
  );

  return selectedEntry ? aboutEntry : ohLife;
};

export default OhLife;
