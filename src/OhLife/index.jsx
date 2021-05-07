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

  const onClickAddEntry = async () => {
    const name = Date.now().toString();
    await axios.post('/api/ohlife/entries', { name });
    const response = await axios.get('/api/ohlife/entries');
    const entries = response.data;
    setEntries(entries);
  };

  const onClickDeleteEntry = async entry => {
    if (window.confirm(`Delete ${entry.name}?`)) {
      await axios.delete(
        `/api/ohlife/entries/${entry.entryId}`
      );
      await getEntries();
    }
  };

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
              className="btn btn-link px-0 mr-3"
              onClick={() => setSelectedEntry(entry)}
            >
              {new Date(Number.parseInt(entry.name)).toDateString()}
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
      <button
        type="button"
        className="btn btn-primary my-3"
        onClick={onClickAddEntry}
      >
        Add entry
      </button>
    </div>
  );

  const aboutEntry = selectedEntry && (
    <div className="container mt-3">
      <h4>About {selectedEntry.name}</h4>
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
