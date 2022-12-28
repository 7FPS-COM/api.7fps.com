require('dotenv').config()
require('./fortnite/start')
const express = require('express');
const router = require('./routes/fortniteRouter');

const app = express();

const cors = {
  origin: [`http://${process.env.CLIENT_DOMAIN_NAME}`, `https://${process.env.CLIENT_DOMAIN_NAME}`],
  default: `https://${process.env.CLIENT_DOMAIN_NAME}`
}

app.all('*', function(req, res, next) {
  const origin = cors.origin.includes(req.header('origin').toLowerCase()) ? req.headers.origin : cors.default;
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/', router)
app.get('*', (req, res) => {
  res.json({result: false, code: 'NOT_FOUND'})
})

app.listen(process.env.FORTNITE_API_SERVER_PORT, () =>
  console.log(`Fortnite API server is listening on port ${process.env.FORTNITE_API_SERVER_PORT}!`),
);