require('dotenv').config();
const express = require('express');
const path = require('path');
const people = require('./routers/people');
const quotes = require('./routers/quotes');

const app = express();

app.use(express.static('build'));

app.use('/616e64726577/api/about-others/people', people);
app.use('/616e64726577/api/quotes', quotes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = process.env.PORT;
if (port == null || port === '') {
  port = 3001;
}

app.listen(port, () => console.log(`App listening on port ${port}!`));
