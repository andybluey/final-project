import React, { Component } from 'react';

class UserRepositories extends Component {
  render() {
    if ( !this.props.repos ) {
      return (
        <div></div>
      );
    }
    let userRepos = this.props.repos.map((r) => {
      return (
        <li key={r.id}>
          <a href={r.html_url} target="_blank">
            {r.name}
          </a>
          {(r.stargazers_count)} {(r.watchers)} {(r.forks * 5)} -
          {r.language}
        </li>
      )
    });
    return (
      <div>
        <h5>Repositories</h5>
        <ul>
          {userRepos}
        </ul>
      </div>
    );
  }
}

export default UserRepositories;
