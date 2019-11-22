const express = require('express');
const path = require('path');
const connectRunClose = require('./connectRunClose');
const shortid = require('shortid');

const app = express();
const port = 3000;

app.use(express.static('build'));

app.post('/api/accounts', async (req, res) => {
  const accountId = shortid.generate();
  const result = await connectRunClose('accounts', async accounts => {
    return await accounts.insertOne({accountId, people: []});
  });
  return res.json({
    accountId: result.ops[0].accountId,
    people: result.ops[0].people
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));