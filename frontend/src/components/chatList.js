import React,{Component} from 'react';
import ChatMessage from './chatMessage';
import '../styles/ChatList.scss';

class ChatList extends Component{
  
  /**
   * Scrolls the chat list to the last message when a new message is added
   */
  componentDidUpdate() {
    // get the messagelist container and set the scrollTop to the height of the container
    const objDiv = document.getElementById('chat-list');
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  
  /*
   * Renders the chat log with messages.
   * Props required:
   * - messages [String]: List of messages in JSON {user: username, message: message}
   */
  render() {
    return (
      <div className="chat-list" id="chat-list">
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
    );
  }
}

export default ChatList;