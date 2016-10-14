import React, { Component } from 'react';
import Loading from './Loading';

class UserProfile extends Component {
  render() {
    if ( !this.props.user.login ) {
      return (
        <Loading text='Loading' speed={1000} />
      );
    }
    // console.log( this.props.user );
    return (
      <div>
        <h5>Stats</h5>
        <p>Public Repositories: {this.props.user.public_repos}</p>

      </div>
    );
  }
}

export default UserProfile;
