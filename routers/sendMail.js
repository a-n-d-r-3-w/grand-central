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
    if (digestHex !== '8768e6805db8260ba56539dc0a9eb079511c8e83663cd0d0ba686ee1528b0744') {
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
    host: "smtp.migadu.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.OHLIFE_USER,
        pass: process.env.OHLIFE_PASS,
    },
});

const sendEmail = async () => {
    // Get random quote
    const quotes = await getQuotes();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const info = await transporter.sendMail({
        from: 'ohlife@pomelomail.com',
        to: "andrew@pomelomail.com",
        subject: "Here's what you wrote on XX/XX/XXXX",
        text: randomQuote.text,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    return info.messageId;
};

module.exports = router;
