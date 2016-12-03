import React,{Component} from 'react';
import ChatMessage from './chatMessage';
import '../styles/ChatList.scss';

class ChatList extends Component{
  
  /*
   * Renders the chat log with messages.
   * Props required:
   * - messages [String]: List of messages in JSON {user: username, message: message}
   */
  render() {
    var clas = "chat-list-container " + this.props.cls;
    return (
      <div className={clas}>
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