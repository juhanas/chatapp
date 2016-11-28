import React,{Component} from 'react';
import ChatList from './chatList';
import ChatInput from './chatInput';
import UserList from './userList';
import ioClient from 'socket.io-client';

var socket;
 
class Chat extends Component{
  constructor(props) {
    super(props);
    this.state = { messages: [],
      users: [ {name:"user1"}]
    };
  }
  
  componentDidMount = () => {
    socket = ioClient.connect();
    var self = this;
    
    socket.on('chat message', function(msg){
      var messages = self.state.messages;
      messages.push(msg);
      self.setState(messages);
    });
    
    socket.on('server message', function(msg){
      var messages = self.state.messages;
      messages.push(msg);
      self.setState(messages);
    });
  }
  
  /*
    * Handles sending a new message by pushing it to the screen and
    * sending it to the service through the socket.
    * Sets the state for this.state.messages.
    * @param message JSON containing the message: {user: username, message: message}
  */
  handleMessageSend = (message) => {
    var self = this;
    var messages = self.state.messages;
    messages.push(message);
    self.setState(messages);
    socket.emit('chat message', message);
  }
  
  /*
    * Renders the main view with chat log, input window and list of users.
  */
  render() {
    return (
      <div className="chat-container">
        <ChatList messages={this.state.messages}/>
        <ChatInput user="User1" onMessageSend={this.handleMessageSend}/>
        <UserList users={this.state.users}/>
      </div>
    );
  }
}

export default Chat;