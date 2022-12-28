require('./fortnite-api-server/start')
require('./main-api-server/start')
require('./proxy-server/start')
process.on('uncaughtException', function (err) {
    console.error(err);
}); 