import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);

  const getQuotes = async () => {
    const response = await axios.get('/api/quotes');
    const quotes = response.data;
    setQuotes(quotes);
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const onClickAddQuote = async () => {
    const text = window.prompt('Text:');
    if (text && text.trim().length > 0) {
      await axios.post('/api/quotes', { text });
      const response = await axios.get('/api/quotes');
      const quotes = response.data;
      setQuotes(quotes);
    }
  };

  const onClickDeleteQuote = async quote => {
    if (window.confirm(`Delete "${quote.text}"?`)) {
      await axios.delete(`/api/quotes/${quote.quoteId}`);
      await getQuotes();
    }
  };

  return (
    <div className="container mt-3">
      <h4>Quotes</h4>
      <ul className="list-group list-group-flush">
        {quotes.map(quote => (
          <li
            className="list-group-item list-group-item-action"
            key={quote.quoteId}
          >
            {quote.text}
            <button
              type="button"
              className="btn btn-outline-danger btn-sm ml-3"
              onClick={() => onClickDeleteQuote(quote)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-primary my-3"
        onClick={onClickAddQuote}
      >
        Add quote
      </button>
    </div>
  );
};

export default Quotes;
