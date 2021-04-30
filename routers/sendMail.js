const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser')
const HttpStatus = require('http-status-codes');
const nodemailer = require("nodemailer");
const { getQuotes } = require('./quotesUtils');

const router = express.Router();
router.use(bodyParser.json());
router.use(cookieParser())

router.use(async (req, res, next) => {
    const digestHex = req.cookies['about_others_digest_hex'];
    if (digestHex !== process.env.ABOUT_OTHERS_DIGEST_HEX) {
        res.sendStatus(HttpStatus.UNAUTHORIZED);
    } else {
        next();
    }
})

router.post('/', async (req, res, next) => {
    try {
        const messageId = await sendEmail();
        res.send('Sent email with messageId: ' + messageId);
    } catch (error) {
        next(error)
    }
});

const transporter = nodemailer.createTransport({
    host: process.env.OHLIFE_TRANSPORT_HOST,
    port: process.env.OHLIFE_TRANSPORT_PORT,
    secure: true,
    auth: {
        user: process.env.OHLIFE_TRANSPORT_USER,
        pass: process.env.OHLIFE_TRANSPORT_PASS,
    },
});

const sendEmail = async () => {
    // Get random quote
    const quotes = await getQuotes();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const info = await transporter.sendMail({
        from: process.env.OHLIFE_MAIL_FROM,
        to: process.env.OHLIFE_MAIL_TO,
        subject: "Here's what you wrote on XX/XX/XXXX",
        text: randomQuote.text,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    return info.messageId;
};

module.exports = router;
