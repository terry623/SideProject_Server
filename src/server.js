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
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

io.on('connection', function (socket) {

  io.clients((error, clients) => {
    if (error) throw error;
    console.log(clients);
  });

  socket.on('chat message', function (id, msg) {
    console.log("id: " + id + " , msg: " + msg);
    socket.broadcast.to(id).emit('my message', msg);
  });

});