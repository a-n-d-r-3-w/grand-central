const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const { getEntries } = require('./routers/entriesUtils');

const transporter = nodemailer.createTransport({
  sendmail: true,
  host: process.env.OHLIFE_TRANSPORT_HOST,
  port: process.env.OHLIFE_TRANSPORT_PORT,
  secure: true,
  auth: {
    user: process.env.OHLIFE_TRANSPORT_USER,
    pass: process.env.OHLIFE_TRANSPORT_PASS
  }
});

const sendEmail = async () => {
  const entries = await getEntries(
    process.env.ENCRYPTION_KEY_FOR_SENDING_EMAILS
  );
  const numEntries = entries.length;
  if (numEntries > 0) {
    const randomIndex = Math.floor(Math.random() * numEntries);
    const randomEntry = entries[randomIndex];
    const date = new Date(Number.parseInt(randomEntry.name)).toDateString();
    const text =
      'Hello from https://grandcentral.nfshost.com/legacy/login! Do you remember this?\n\n---\n\n' +
      randomEntry.notes;
    await transporter.sendMail({
      from: process.env.OHLIFE_MAIL_FROM,
      to: process.env.OHLIFE_MAIL_TO,
      subject: "Here's what you wrote on " + date,
      text
    });
  }
};

schedule.scheduleJob('0 22 * * *', function() {
  // Every day at 10 p.m. UTC (6 p.m. EDT)
  sendEmail();
});
