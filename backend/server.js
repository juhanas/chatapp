var express = require('express'),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var chatLog = [];
var chatLogSize = 20;

app.use("/static", express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.broadcast.emit('server message', { message: 'A new user entered the chat.'});
  console.log('Broadcast');
  socket.emit('server message', { message: 'Welcome to The Chat!'});
  console.log('welcome message');
  for (var i = 0; i < chatLog.length; i++) {
      socket.emit('chat message', chatLog[i]);
  }
  console.log('log sent.');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('server message', { message: 'User has left the chat.'});
  });
  
  socket.on('chat message', function(msg){
    console.log('message by user ' + msg.user + ': ' + msg.message);
    socket.broadcast.emit('chat message', msg);
    chatLog.push(msg);
    if (chatLog.length > chatLogSize) chatLog.shift();
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});