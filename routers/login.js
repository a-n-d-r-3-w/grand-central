const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(bodyParser.json());
router.use(cookieParser());

router.post('/', async (req, res) => {
  res.redirect('/616e64726577/about-others');
});

module.exports = router;
