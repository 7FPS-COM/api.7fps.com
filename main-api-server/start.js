require('dotenv').config()
const express = require('express');
require('./main/database/start.js')

const app = express();
app.enable('trust proxy');
app.set('subdomain offset', 0);

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


const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = {
  origin: [process.env.CLIENT_DOMAIN_NAME,
          `http://${process.env.CLIENT_DOMAIN_NAME}`,
          `https://${process.env.CLIENT_DOMAIN_NAME}`,
          `http://www.${process.env.CLIENT_DOMAIN_NAME}`,
          `https://www.${process.env.CLIENT_DOMAIN_NAME}`
        ]
}

app.all('*', function(req, res, next) {
  const origin = cors.origin.includes(req.get('host').toLowerCase()) ? "*" : "null";
  console.log({cors})
  console.log({subdomains: req.subdomains})
  console.log(req.get('host'))
  console.log({secure: req.secure})
  res.header("Access-Control-Allow-Origin", "fortnite-tools.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Sec-Fetch-Site", "same-origin");
  next();
});


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