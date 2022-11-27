require('dotenv').config()
const express = require('express');

const app = express();
const path = require("path");

var superNumber = 1
app.use((req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  console.log(`${superNumber} | ${ip} [${req.method}] ${req.originalUrl}`)
  superNumber++
  next()
})

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors({credentials: true, origin: process.env.CLIENT_DOMAIN_NAME}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/', require('./routes/routes'))


app.get('*', (req, res) => { res.status(404).json({error: true, code: 'NOT_FOUND'}) });

app.listen(process.env.MAIN_API_SERVER_PORT, () =>
  console.log(`Main API server is listening on port ${process.env.MAIN_API_SERVER_PORT}!`),
);

// {
//   "auth": true,
//   "discord_id": "202004819265716225",
//   "discord_username": "Alexander1337",
//   "discord_discriminator": "8355",
//   "discord_avatar": "c6e5e5d79a9476be97ac5ad223a13f1f",
//   "ban_until": 0,
//   "user_role": 1
// }