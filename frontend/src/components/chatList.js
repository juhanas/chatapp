import React,{Component} from 'react';
import ChatMessage from './chatMessage';

class ChatList extends Component{
  
  /*
   * Renders the chat log with messages.
   * Props required:
   * - messages [String]: List of messages in JSON {user: username, message: message}
   */
  render() {
    return (
      <div className="chat-list-container">
        <h2>Messages</h2>
        <div className="chat-list">
        {
          this.props.messages.map((message, i) => {
            var username = '';
            if (message.hasOwnProperty('user')) username = message.user;
            return (
              <ChatMessage key={i.toString()} user={username} message={message.message}/>
            );
          })
        }
        </div>
      </div>
    );
  }
}

export default ChatList;