const express = require('express');
const path = require('path');
const people = require('./routers/people');

const app = express();

app.use(express.static('build'));

app.use('/api/about-others/people', people);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = process.env.PORT;
if (port == null || port === '') {
  port = 3001;
}

app.listen(port, () => console.log(`App listening on port ${port}!`));
