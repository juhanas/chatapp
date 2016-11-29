import React,{Component} from 'react';
import Modal from 'react-modal';

class ChangeNameModal extends Component {
  constructor () {
    super();
    this.state = { open: true,
      text: ''
    };

    this.openModal = this.openModal.bind(this);
    this.save = this.save.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
   * Handles form submit for changing a name.
   * Modifies this.state.
   * Requires props:
   * - user [String]: Name of the user
   * - onMessageSend [function} Called with JSON message {user: username, message: message sent}
   * @param event: The triggering event
   */
  save = (event) => {
    event.preventDefault();
    var data = {
      oldName: this.props.username,
      newName: this.state.text
    }
    this.props.onSave(data);
    this.setState({text: ""})
  }

  openModal() { this.setState({open: true}); }

  closeModal() { this.setState({open: false}); }

  render() {
    return (
      <div className="changeNameModal">
        <button onClick={this.openModal}>Change Name</button>
        <Modal
          className="ModalClass"
          overlayClassName="OverlayClass"
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
        >
          <h2>Change name</h2>
          <h3>Please enter your new username</h3>
          <input type="text" value={this.state.text} placeholder={this.props.username} onChange={this.messageHandler} />
          <button onClick={this.save}>Save</button>
          <button hidden={this.props.start && 'hidden'} onClick={this.closeModal}>Close</button>
        </Modal>
      </div>
    );
  }
}

export default ChangeNameModal;