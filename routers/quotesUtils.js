const shortid = require('shortid');
const connectRunClose = require('../connectRunClose');

const QUOTES = 'quotes';

const getQuotes = async () =>
  await connectRunClose(QUOTES, quote => quote.find({}).toArray());

const addQuote = async text => {
  const quote = {
    quoteId: shortid.generate(),
    text
  };
  return await connectRunClose(QUOTES, quotes => quotes.insertOne(quote));
};

const deleteQuote = async quoteId => {
  await connectRunClose(QUOTES, quotes => quotes.deleteOne({ quoteId }));
};

module.exports = {
  addQuote,
  getQuotes,
  deleteQuote
};
