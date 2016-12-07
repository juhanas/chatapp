import React,{Component} from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import '../styles/ChangeNameModal.scss';

class ChangeNameModal extends Component {
  constructor () {
    super();
    this.state = { open: true,
      text: '',
      starting: true,
      error: ''
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
    this.setState({error: ''});
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
    if( this.state.starting) {
      this.setState({starting: false})
      this.setState({open: false});
    }
    this.setState({text: ''})
    this.setState({error: ''});
  }

  openModal() { this.setState({open: true}); }

  closeModal() { 
    if (!this.state.starting) {
      this.setState({open: false});
    } else this.setState({error: 'Please choose a name'});
  }

  render() {
    const starting = this.state.starting;
    return (
      <div className="change-name-modal-container">
        <div className={this.props.cls}>
          <Button onClick={this.openModal}>Change name</Button>
          <Modal
            className="modal-class"
            overlayClassName="modal-container"
            isOpen={this.state.open}
            onRequestClose={this.closeModal}
          >
            <div className="change-name-modal-content">
              <h2>{starting ? 'Enter' : 'Change'} name</h2>
              <input type="text" value={this.state.text} placeholder={this.props.username} onChange={this.messageHandler} />
              <Button onClick={this.save} bsStyle="primary">Save</Button>
              <Button hidden={this.props.start && 'hidden'} onClick={this.closeModal}>Close</Button>
              <p className="modal-error-message">{this.state.error}</p>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ChangeNameModal;