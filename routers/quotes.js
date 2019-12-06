const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const { addQuote, getQuotes, deleteQuote } = require('./quotesUtils');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  const result = await addQuote(req.body.text);
  res.status(HttpStatus.CREATED).send(result.ops[0]);
});

router.get('/', async (req, res) => {
  const quotes = await getQuotes();
  res.set('Cache-Control', 'no-store');
  res.status(HttpStatus.OK).send(quotes);
});

router.delete('/:quoteId', async (req, res) => {
  await deleteQuote(req.params.quoteId);
  res.sendStatus(HttpStatus.NO_CONTENT);
});

module.exports = router;
