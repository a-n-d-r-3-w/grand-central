require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const serveIndex = require('serve-index')
const path = require('path');
const rateLimit = require("express-rate-limit");
const people = require('./routers/people');
const entries = require('./routers/entries');
const login = require('./routers/login');
require('./sendDailyEmail');

const app = express();

// Disable app.use(helmet.contentSecurityPolicy()); because it prevents the page from rendering on production builds.
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(express.static('build'));
app.use('/blog', express.static('blog'), serveIndex('blog', {
  filter: (filename, index, files, dir) => {
    return dir.slice(-6) === '/blog/' && filename.slice(-5) === '.html';
  },
  icons: true
}));

// Rate limiter
// Enable 'trust proxy' if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to `max` requests per `windowMs`
});
app.use(limiter);

app.use('/api/about-others/people', people);
app.use('/api/ohlife/entries', entries);
app.use('/api/login', login);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = process.env.PORT;
if (port == null || port === '') {
  port = 3001;
}

app.listen(port, () => console.log(`App listening on port ${port}!`));