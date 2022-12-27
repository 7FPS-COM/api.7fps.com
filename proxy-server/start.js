const httpProxy = require('http-proxy');
const http = require('http');
require('dotenv').config()

const proxy = httpProxy.createServer();

const guiUrl = `http://5.187.0.204:3000`;

const apiUrl = `${process.env.CLIENT_DOMAIN_NAME}:4000`;
const apiPrefix = '/api';

const fnApiUrl = 'http://5.187.0.204:1000';
const fnApiPrefix = '/fnapi';

const port = 80;

http.createServer((req, res) => {
  let target = guiUrl;
  if (req.url.startsWith(apiPrefix)) {
    req.url = req.url.replace(apiPrefix, '/');
    target = apiUrl;
  }
  if (req.url.startsWith(fnApiPrefix)) {
    req.url = req.url.replace(fnApiPrefix, '/');
    target = fnApiUrl;
  }
  proxy.web(req, res, { target })
}).listen(port);