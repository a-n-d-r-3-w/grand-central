require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const serveIndex = require('serve-index');
const path = require('path');
const rateLimit = require('express-rate-limit');
const people = require('./routers/people');
const entries = require('./routers/entries');
const habits = require('./routers/habits');
const login = require('./routers/login');
const users = require('./routers/users');
const sessions = require('./routers/sessions');
require('./sendDailyEmail');
require('./updateHabitsRecordsNightly');

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
app.use(
  '/blog',
  express.static('blog'),
  serveIndex('blog', {
    filter: (filename, index, files, dir) => {
      return dir.slice(-6) === '/blog/' && filename.slice(-5) === '.html';
    },
    icons: true
  })
);

// Rate limiter
// Enable 'trust proxy' if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60 // limit each IP to `max` requests per `windowMs`
});
app.use(limiter);

// APIs for new apps.
app.use('/api/users', users);
app.use('/api/sessions', sessions);

// APIs for legacy apps.
app.use('/api/legacy/about-others/people', people);
app.use('/api/legacy/ohlife/entries', entries);
app.use('/api/legacy/good-habits/habits', habits);
app.use('/api/legacy/login', login);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = process.env.PORT;
if (port == null || port === '') {
  port = 3001;
}

app.listen(port, () => console.log(`App listening on port ${port}!`));
