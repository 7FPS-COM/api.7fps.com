require('dotenv').config()
require('./fortnite/start')
const express = require('express');
const router = require('./routes/fortniteRouter');

const app = express();

var cors = require('cors');

var whitelist = [`http://${process.env.CLIENT_DOMAIN_NAME}`, `https://${process.env.CLIENT_DOMAIN_NAME}`]
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log({origin, whitelist})
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/', router)
app.get('*', (req, res) => {
  res.json({result: false, code: 'NOT_FOUND'})
})

app.listen(process.env.FORTNITE_API_SERVER_PORT, () =>
  console.log(`Fortnite API server is listening on port ${process.env.FORTNITE_API_SERVER_PORT}!`),
);