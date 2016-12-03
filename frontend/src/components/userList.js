import React,{Component} from 'react';
import UserData from './userData';
import '../styles/UserList.scss';

class UserList extends Component{
  /*
   * Renders the list of users.
   * Props required:
   * - users [list]: List of user names
   */
  render() {
    var clas = "user-list-container " + this.props.cls;
    return (
      <div className={clas}>
        <h3>Users</h3>
        <div className="user-list pre-scrollable">
        {
          this.props.users.map((user, i) => {
            return (
              <UserData key={i.toString()} name={user}/>
            );
          })
        }
        </div>
      </div>
    );
  }
}

export default UserList;