const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const {
  addPerson,
  getPeople,
  updateNotesForPerson,
  deletePerson
} = require('./peopleUtils');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  const result = await addPerson(req.body.name);
  res.status(HttpStatus.CREATED).send(result.ops[0]);
});

router.get('/', async (req, res) => {
  const people = await getPeople();
  res.set('Cache-Control', 'no-store');
  res.status(HttpStatus.OK).send(people);
});

router.put('/:personId', async (req, res) => {
  await updateNotesForPerson(req.params.personId, req.body.newNotes);
  res.sendStatus(HttpStatus.NO_CONTENT);
});

router.delete('/:personId', async (req, res) => {
  await deletePerson(req.params.personId);

  const helper = require('sendgrid').mail;
  const from_email = new helper.Email('donotreply@example.com');
  const to_email = new helper.Email('liu.anray@gmail.com');
  const subject = 'Hello World from the SendGrid Node.js Library!';
  const content = new helper.Content('text/plain', 'Hello, Email!');
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

  res.sendStatus(HttpStatus.NO_CONTENT);
});

module.exports = router;
