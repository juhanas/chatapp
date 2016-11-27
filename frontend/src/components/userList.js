import React,{Component} from 'react';
import UserData from './userData';

class UserList extends Component{
  /*
   * Renders the list of users.
   * Props required:
   * - users [list]: List of user names
   */
  render() {
    return (
      <div className="user-list-container">
        <div className="user-list">
        {
          this.props.users.map((user, i) => {
            return (
              <UserData key={i.toString()} name={user.name}/>
            );
          })
        }
        </div>
      </div>
    );
  }
}

export default UserList;