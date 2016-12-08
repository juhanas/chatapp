import React,{Component} from 'react';
import MediaQuery from 'react-responsive';
import UserData from './userData';
import '../styles/UserList.scss';

class UserList extends Component{
  
  constructor(props) {
    super(props);
    this.state = { 
      usersVisible: true
    };
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  /*
   * Modifies state.text based on event.target.value.
   * @param event: The triggering event
   */
  buttonHandler(event) {
    this.setState({usersVisible: !this.state.usersVisible});
  }

  /*
   * Renders the list of users.
   * Props required:
   * - users [list]: List of user names
   */
  render() {
    var cls = "user-list-container";
    var cls2 = "btn btn-primary";
    if(!this.state.usersVisible) {
      cls = "user-list-container hidden";
      cls2 = "btn btn-default";
    }
    
    return (
      <div className="user-container">
        <MediaQuery maxDeviceWidth={767}>
          <button className={cls2} onClick={this.buttonHandler}>{this.state.usersVisible ? 'Hide users' : 'Show users'}</button>
        </MediaQuery>
        <div className={cls}>
          <h3>Users</h3>
          <div className="user-list">
            <UserData name={this.props.username} owner={true}/>
          {
            this.props.users.map((user, i) => {
              return (
                <UserData key={i.toString()} name={user}/>
              );
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;