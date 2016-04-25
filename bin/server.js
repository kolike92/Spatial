#!/usr/bin/env node

var app = require('../app');
var fs = require('fs');
var debug = require('debug')('testapp:server');
var https = require('https');
var options = {
    key: fs.readFileSync('private.key'),
    cert: fs.readFileSync('certificate.pem')
};

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);
var server = https.createServer(options,app);
server.listen(port);
console.log('Listening on port ' + port)
server.on('error', onError);
server.on('listening', onListening);

app.all('*', function(req, res, next){
    if (req.secure) {
        return next();
    };
    res.redirect('https://' + req.hostname + ':' + app.get('port_https') + req.url);
});

// normalize port value
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Event listener for http error
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// event listener for http listening
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
