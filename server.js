const express = require('express');
const path = require('path');
const people = require('./routers/people');

const app = express();
const port = 3001;

app.use(express.static('build'));

app.use('/api/about-others/people', people);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
