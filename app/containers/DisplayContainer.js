import React, { Component } from 'react';
import Display from '../components/Display.js';
import GithubHelpers from '../utils/GithubHelpers.js';
import UserProfile from '../components/UserProfile.js';
import CommitActivity from '../components/CommitActivity.js';
import PopularUsers from '../components/PopularUsers.js';
import { Link } from 'react-router';

class DisplayContainer extends Component {
  constructor() {
    super();
    this.state={
      user: {},
    };
  }

  componentWillMount() {
    // console.log( "Component will mount" + this.props.routeParams );
    const commits = this.props.routeParams.commits;

    GithubHelpers.getCommitInfo(commits).then( function (info) {
      // console.log( info.data[0].type );
      this.setState({
        commits: info.data
      });
    }.bind(this) );
  }

  render() {
    // console.log( this );
    return (

      <div>
        <div className="header"></div>
          <Link to ='/' >
            <button className="home-button">Home</button>
          </ Link>
            <br />
            <Display />
            <CommitActivity commits={this.state.commits} />
            <PopularUsers />
      </div>
    );
  }
}

export default DisplayContainer;
