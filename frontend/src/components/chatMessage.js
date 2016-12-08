import React,{Component} from 'react';
import moment from 'moment';
import '../styles/ChatMessage.scss';

class ChatMessage extends Component{
  
  constructor(props) {
    super(props);
    this.state = { date: moment().format("HH:mm:ss") };
  }

  /*
   * Renders a single message with user's name followed by the message.
   * Props required:
   * - user [String]: Name of the user
   * - message [String]: Message to display
   */
  render() {
    if( this.props.user !== '') {
      return (
        <div className="chat-message-container">
          <span className="chat-message-time">[{this.state.date}] </span>
          <span className="chat-message-user">{this.props.user}</span>
          <span className="chat-message-divider">: </span>
          <span className="chat-message-message">{this.props.message}</span>
        </div>
      );
    } else {
      return (
        <div className="chat-message-container">
          <span className="chat-message-time">[{this.state.date}] </span>
          <span className="chat-message-message">{this.props.message}</span>
        </div>
      );
    }
  }
}

export default ChatMessage;