const express = require('express');
const path = require('path');
const connectRunClose = require('./connectRunClose');
const shortid = require('shortid');
const HttpStatus = require('http-status-codes');

const app = express();
const port = 3000;

app.use(express.static('build'));

app.post('/api/accounts', async (req, res) => {
  const accountId = shortid.generate();
  const result = await connectRunClose('accounts', async accounts => {
    return accounts.insertOne({accountId, people: []});
  });
  if (result.result.ok === 1) {
    res.status(HttpStatus.CREATED).json({ accountId });
    return;
  }
  res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
});

app.get('/api/accounts/:accountId', async (req, res) => {
  const { accountId } = req.params;
  const account = await connectRunClose('accounts', accounts => accounts.findOne({ accountId }))
  if (account === null) {
    res.sendStatus(HttpStatus.NOT_FOUND);
    return;
  }
  res.status(HttpStatus.OK).json(account);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));