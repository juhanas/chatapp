import React,{Component} from 'react';

class UserData extends Component{
  /*
   * Renders a single user with his data.
   * Props required:
   * - name [String]: Name of the user
   */
  render() {
    return (
      <div className="user-data-container" >
        <span className="user-data-name">{this.props.name}</span>
      </div>
    );
  }
}

export default UserData;