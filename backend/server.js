var express = require('express'),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var chatLog = [];
var chatLogSize = 20;
var users = {};
var userCounter = 1;

app.use("/static", express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var usrs = Object.keys(users).map(key => users[key]);
  users.socket = 'User' + userCounter++;
  console.log(users.socket + ' connected.');
  socket.emit('user name', { username: users.socket});
  
  socket.broadcast.emit('user enter', {username: users.socket});
  
  socket.emit('server message', { type: 'welcome', users: usrs, message: 'Welcome to The Chat!'});
  for (var i = 0; i < chatLog.length; i++) {
    socket.emit('chat message', chatLog[i]);
  }

  socket.on('user name', function(msg){ // TODO: Verify no duplicates
    console.log('Username ' + users.socket + ' changed to: ' + msg.newName);
    var oldname = users.socket;
    users.socket = msg.newName;
    socket.broadcast.emit('user namechange', {oldName: oldname, newName: users.socket});
  });
  
  /**
   * Broadcasts the sent message to every other user in the chat.
   * Also adds the message to the chatlog and removes the oldest message
   * if more messages than indicated by chatLogSize.
   * Uses the socket to identify correct username.
   * @param msg [String]: The message sent
   */
  socket.on('chat message', function(msg){
    console.log('message by user ' + users.socket + ': ' + msg.message);
    var message = {user: users.socket, message: msg.message};
    socket.broadcast.emit('chat message', message);
    chatLog.push(message);
    if (chatLog.length > chatLogSize) chatLog.shift();
  });

  socket.on('disconnect', function(){
    console.log(users.socket + ' disconnected');
    io.emit('user exit', { username: users.socket});
    delete users.socket;
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});