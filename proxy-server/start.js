const httpProxy = require('http-proxy');
const http = require('http');
const { maintenanceHtml } = require('./maintenanceHtml');


const proxy = httpProxy.createServer();

const guiUrl = 'http://localhost:3000';

const apiUrl = 'http://localhost:4000';
const apiPrefix = '/api';

const fnApiUrl = 'http://localhost:1000';
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

    proxy.on('error', (error) => {
      console.log(error.message)
      res.end(maintenanceHtml);
    })
}).listen(port, () => {
  console.log(`Proxy server has started on port 80`)
});