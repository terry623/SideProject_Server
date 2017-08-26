require('../config.js');
var express = require('express');
var all_router = require('./routers/all_router.js');
var requestLogger = require('./middleware/request-logger.js');
var errorHandler = require('./middleware/error-handler.js');
var app = express();

var port = 8080;
var server = app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
var io = require('socket.io').listen(server);

app.use(express.static('dist'));
app.use('/api', all_router);
app.get('/chat', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

io.on('connection', function (socket) {
  socket.emit('news', {
    hello: 'world'
  });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});