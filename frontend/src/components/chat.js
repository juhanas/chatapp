import React,{Component} from 'react';
import ChatList from './chatList';
import ChatInput from './chatInput';
import UserList from './userList';
import ChangeNameModal from './changeNameModal';
import ioClient from 'socket.io-client';
import '../styles/Chat.scss';

var socket;
 
class Chat extends Component{
  constructor(props) {
    super(props);
    this.state = { messages: [],
      users: ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','b','a','a','a','a','a','a','b','a','a','a','a','a','a','b'],
      username: '',
      start: true
    };
  }
  
  componentDidMount = () => {
    socket = ioClient.connect('http://localhost:3000'); // Remove address for production
    var self = this;
    
    /**
     * Sets the name for the chat user as instructed by server.
     * @param data: JSON containing the name {username: newUsername}
     */
    socket.on('user name', function(data){
      self.setState({username: data.username});
    });

    /**
     * Changes the name for another user and pushes a chat message
     * to indicate the name change.
     * @param data: JSON containing the new and old names:
     *   {oldName: oldUserName, newName: newUserName}
     */
    socket.on('user namechange', function(data){
      console.log("User namechange.");
      var messages = self.state.messages;
      messages.push({message: 'Username ' + data.oldName + ' changed to: ' + data.newName});
      self.setState(messages);
      
      var users = self.state.users;
      var i = users.indexOf(data.oldName);
      users.splice(i, 1);
      users.push(data.newName);
      self.setState(users);
    });

    /**
     * Adds a new user to the chat.
     * Modifies state.messages and state.users.
     * @param data: JSON containing the username
     */
    socket.on('user enter', function(data){
      console.log("User enter");
      var messages = self.state.messages;
      messages.push({message: data.username + ' has entered the chat'});
      self.setState(messages);
      
      var users = self.state.users;
      users.push(data.username);
      self.setState(users);
    });
    
    /**
     * Removes a user from chat.
     * Modifies state.messages and state.users.
     * @param data: JSON containing the username
     */
    socket.on('user exit', function(data){
      var messages = self.state.messages;
      messages.push({message: data.username + ' has left the chat'});
      self.setState(messages);
      
      var users = self.state.users;
      var i = users.indexOf(data.username);
      users.splice(i, 1);
      self.setState(users);
    });
    
    /**
     * Adds a new received message to the chat.
     * Modifies state.messages.
     * @param msg: JSON containing the message
     */
    socket.on('chat message', function(msg){
      var messages = self.state.messages;
      messages.push(msg);
      self.setState(messages);
    });
    
    /**
     * Adds a new received message to the chat.
     * Modifies state.messages.
     * @param msg: JSON containing the message
     */
    socket.on('server message', function(msg){
      var messages = self.state.messages;
      messages.push(msg);
      self.setState(messages);
      
      if( msg.type === 'welcome') {
        console.log("Welcome. Message:" + JSON.stringify(msg));
        console.log("Users length: " + msg.users.length);
        var users = self.state.users;
        for (var i = 0; i < msg.users.length; i++) {
          users.push(msg.users[i]);
        }
        self.setState(users);
      }
    });
  }
  
  /**
   * Handles sending a new username to the server.
   * Sets the state for this.state.username.
   * Emits 'user name' with the data.
   * @param data JSON containing the data: {oldName: oldUsername, newName: newUserName}
   */
  handleNameChange = (data) => {
    this.setState({username: data.newName});
    if( this.state.start)
      this.setState({start: false});
    socket.emit('user name', data);
    console.log("Emit user name");
  }

  /**
   * Handles sending a new message by pushing it to the screen and
   * sending it to the service through the socket.
   * Sets the state for this.state.messages.
   * Emits 'chat message' with the message.
   * @param message JSON containing the message: {user: username, message: message}
   */
  handleMessageSend = (message) => {
    var messages = this.state.messages;
    messages.push(message);
    this.setState(messages);
    socket.emit('chat message', message);
  }
  
  /**
   * Renders the main view with chat log, input window and list of users.
   */
  render() {
    return (
      <div className="chat-container row">
        <div className="chat-list-container col-sm-10">
          <ChatList messages={this.state.messages}/>
          <ChatInput user={this.state.username} onMessageSend={this.handleMessageSend}/>
        </div>
        <div className="info-container col-sm-2">
          <UserList users={this.state.users} cls=""/>
          <ChangeNameModal start={this.state.start} username={this.state.username} onSave={this.handleNameChange}/>
        </div>
      </div>
    );
  }
}

export default Chat;