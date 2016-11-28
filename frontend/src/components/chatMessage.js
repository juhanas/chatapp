import React,{Component} from 'react';

class ChatMessage extends Component{
  
  /*
   * Renders a single message with user's name followed by the message.
   * Props required:
   * - user [String]: Name of the user
   * - message [String]: Message to display
   */
  render() {
    if( this.props.user != '') {
      return (
        <div className="chat-message-container">
          <span className="chat-message-user">{this.props.user}</span>
          <span className="chat-message-divider">: </span>
          <span className="chat-message-message">{this.props.message}</span>
        </div>
      );
    } else {
      return (
        <div className="chat-message-container">
          <span className="chat-message-message">{this.props.message}</span>
        </div>
      );
    }
  }
}

export default ChatMessage;