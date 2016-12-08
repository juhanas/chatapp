import React,{Component} from 'react';
import '../styles/UserData.scss';

class UserData extends Component{
  /*
   * Renders a single user with his data.
   * Props required:
   * - name [String]: Name of the user
   */
  render() {
    var cls = "user-data-name";
    if( this.props.owner) {
      cls = "user-data-name user";
    }
    
    return (
      <div className="user-data-container" >
        <span className={cls}>{this.props.name}</span>
      </div>
    );
  }
}

export default UserData;