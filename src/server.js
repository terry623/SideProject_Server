require('../config.js');
// const express = require('express');

// const all_router = require('./routers/all_router.js');
// const requestLogger = require('./middleware/request-logger.js');
// const errorHandler = require('./middleware/error-handler.js');
// const app = express();

// var port = 8080;
// var server = app.listen(port, () => {
//     console.log(`Server is up and running on port ${port}...`);
// });
// var io = require('socket.io').listen(server);

// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

// app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// app.use('/api', all_router);
// app.get('/*', (req, res) => res.redirect('/'));
// app.use(errorHandler);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

// io.on('connection', function (socket) {
//     socket.on('chat message', function (msg) {
//         console.log("message: ", msg);
//         io.emit('chat message', msg);
//     });
// });

// http.listen(port, function () {
//     console.log('listening on *:' + port);
// });