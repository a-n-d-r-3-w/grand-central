const express = require('express');
const path = require('path');
const accounts = require('./routers/accounts');

const app = express();
const port = 3001;

app.use(express.static('build'));

app.use('/api/accounts', accounts);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
