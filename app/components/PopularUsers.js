import React, { Component } from 'react';
import Loading from './Loading';
import { Link } from 'react-router';

class PopularUsers extends Component {

  constructor() {
    super();
    this.state = {
      popularUsers: [
        "jashkenas",
        "mbostock",
        "sindresorhus",
        "substack",
        "tj"
      ],
    };
  }

  render() {
    let popUsers = this.state.popularUsers.map((r, i) => {
      return (
        <li key={i}>
          <Link to={'/users/' + r}>
            {r}
          </Link>
        </li>
      )
    });

    return (
      <div className="popular-users">
        <h4 className="activity" >List of Popular Users</h4>
        <ul>
          {popUsers}
        </ul>
      </div>
    )
  }
}

export default PopularUsers;
