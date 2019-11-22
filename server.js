const express = require('express');
const path = require('path');
const connectRunClose = require('./connectRunClose');

const app = express();
const port = 3000;

app.use(express.static('build'));

app.post('/api/accounts', async (req, res) => {
  const result = await connectRunClose('accounts', accounts => accounts.insertOne({ accountId, people: [] }));
  return res.send(result);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));