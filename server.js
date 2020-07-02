require('dotenv').config();
const express = require('express');
const path = require('path');
const people = require('./routers/people');
const quotes = require('./routers/quotes');
const { getQuotes } = require('./routers/quotesUtils');

const app = express();

app.use(express.static('build'));

app.use('/616e64726577/api/about-others/people', people);
app.use('/616e64726577/api/quotes', quotes);
app.post('/616e64726577/api/ohlife', (req, res) => {
  res.status(200).send('Received email');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = process.env.PORT;
if (port == null || port === '') {
  port = 3001;
}

app.listen(port, () => console.log(`App listening on port ${port}!`));

const sendEmail = async () => {
  // Get random quote
  const quotes = await getQuotes();
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Send email
  const helper = require('sendgrid').mail;
  const from_email = new helper.Email('donotreply@sendgrid.me');
  const to_email = new helper.Email('liu.anray@gmail.com');
  const subject = 'Hello from Grand Central Quotes!';
  const content = new helper.Content('text/plain', randomQuote.text);
  const mail = new helper.Mail(from_email, subject, to_email, content);

  const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
};

sendEmail();

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

// Start quotes email timer
// setInterval(sendEmail, ONE_HOUR);
