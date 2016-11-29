import React,{Component} from 'react';
import ChatList from './chatList';
import ChatInput from './chatInput';
import UserList from './userList';
import ChangeNameModal from './changeNameModal';
import ioClient from 'socket.io-client';

var socket;
 
class Chat extends Component{
  constructor(props) {
    super(props);
    this.state = { messages: [],
      users: [],
      username: 'User1',
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
      var messages = self.state.messages;
      messages.push('Username ' + data.oldName + ' changed to: ' + data.newName);
      self.setState(messages);
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
    });
  }
  
  /**
   * Handles sending a new username to the server.
   * Sets the state for this.state.username.
   * @param data JSON containing the data: {oldName: oldUsername, newName: newUserName}
   */
  handleNameChange = (data) => {
    this.setState({username: data.newName});
    if( this.state.start) {
      socket.emit('user start', {username: data.newName});
      this.setState({start: false});
    } else socket.emit('user name', data);
  }

  /**
   * Handles sending a new message by pushing it to the screen and
   * sending it to the service through the socket.
   * Sets the state for this.state.messages.
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
      <div className="chat-container">
        <div className="chat-header">
          <h3>Your name: {this.state.username}</h3>
        </div>
        <ChatList messages={this.state.messages}/>
        <ChatInput user={this.state.username} onMessageSend={this.handleMessageSend}/>
        <UserList users={this.state.users}/>
        <ChangeNameModal start={this.state.start} username={this.state.username} onSave={this.handleNameChange}/>
      </div>
    );
  }
}

export default Chat;