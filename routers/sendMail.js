const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const HttpStatus = require('http-status-codes');
const nodemailer = require('nodemailer');

const router = express.Router();
router.use(bodyParser.json());
router.use(cookieParser());

router.use(async (req, res, next) => {
  const digestHex = req.cookies['about_others_digest_hex'];
  if (digestHex !== process.env.ABOUT_OTHERS_DIGEST_HEX) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
  } else {
    next();
  }
});

router.post('/', async (req, res, next) => {
  try {
    const messageId = await sendEmail();
    res.send('Sent email with messageId: ' + messageId);
  } catch (error) {
    next(error);
  }
});

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
  const info = await transporter.sendMail({
    from: process.env.OHLIFE_MAIL_FROM,
    to: process.env.OHLIFE_MAIL_TO,
    subject: "Here's what you wrote on XX/XX/XXXX",
    text: 'randomQuote.text'
  });
  return info.messageId;
};

module.exports = router;
