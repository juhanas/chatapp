import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import '../styles/ChatInput.scss';

class ChatInput extends Component{
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.messageHandler = this.messageHandler.bind(this)
  }
  
  /*
   * Modifies state.text based on event.target.value.
   * @param event: The triggering event
   */
  messageHandler(event)  {
    this.setState({text: event.target.value})
  }

  /*
   * Handles form submit for sending a message.
   * Modifies this.state.
   * Requires props:
   * - user [String]: Name of the user
   * - onMessageSend [function} Called with JSON message {user: username, message: message sent}
   * @param event: The triggering event
   */
  sendMessage = (event) => {
    event.preventDefault();
    var message = {
      user: this.props.user,
      message: this.state.text
    }
    this.props.onMessageSend(message);
    this.setState({text: ""})
  }

  /*
   * Renders the input for sending a chat message.
   * Calls this.messageHandler and this.sendMessage with change in input or for submit.
   */
  render() {
    return (
      <div className="chat-input-container">
        <form  onSubmit={this.sendMessage}>
          <div className="input-group">
            <label className="sr-only" htmlFor="msg">Message:</label>
            <input type="text" value={this.state.text} placeholder="type here" onChange={this.messageHandler} className="form-control in" id="msg"/>
            <span className="input-group-btn">
              <Button type="submit" bsStyle="primary">Send</Button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default ChatInput;