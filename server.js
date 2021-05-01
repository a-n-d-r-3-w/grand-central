require('dotenv').config();
const express = require('express');
const path = require('path');
const people = require('./routers/people');
const quotes = require('./routers/quotes');
const sendMail = require('./routers/sendMail');
const login = require('./routers/login');

const app = express();

app.use(express.static('build'));
app.use('/blog', express.static('blog'));
app.use('/login', express.static('login'));

app.use('/616e64726577/api/about-others/people', people);
app.use('/616e64726577/api/quotes', quotes);
app.use('/616e64726577/api/send-mail', sendMail);
app.use('/api/login', login);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = process.env.PORT;
if (port == null || port === '') {
  port = 3001;
}

app.listen(port, () => console.log(`App listening on port ${port}!`));

// Disable because of error:
// "The provided authorization grant is invalid, expired, or revoked"
// sendEmail();

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

// Start quotes email timer
// setInterval(sendEmail, ONE_HOUR);
