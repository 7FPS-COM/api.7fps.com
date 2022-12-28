require('dotenv').config()
require('./fortnite/start')
const express = require('express');
const router = require('./routes/fortniteRouter');

const app = express();
app.enable('trust proxy');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/', router)
app.get('*', (req, res) => {
  res.json({result: false, code: 'NOT_FOUND'})
})

app.listen(process.env.FORTNITE_API_SERVER_PORT, () =>
  console.log(`Fortnite API server is listening on port ${process.env.FORTNITE_API_SERVER_PORT}`),
);