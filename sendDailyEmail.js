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
    const entries = await getEntries();
    const numEntries = entries.length;
    if (numEntries > 0) {
        const randomIndex = Math.floor(Math.random() * numEntries);
        const randomEntry = entries[randomIndex];
        const date = new Date(Number.parseInt(randomEntry.name)).toDateString()
        const text = randomEntry.notes; 
        await transporter.sendMail({
            from: process.env.OHLIFE_MAIL_FROM,
            to: process.env.OHLIFE_MAIL_TO,
            subject: "Here's what you wrote on " + date,
            text
        });
    }
};

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

setInterval(sendEmail, ONE_HOUR);