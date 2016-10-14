import App from '../components/App.js';
import ChartContainer from './ChartContainer.js';
import GithubHelpers from '../utils/GithubHelpers.js';
import { Link } from 'react-router';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserProfile from '../components/UserProfile.js';
import UserRepositories from '../components/UserRepositories.js';

class UserContainer extends Component {
  constructor() {
    super();
    this.state={
      user:{},
    };
  // console.log( this );
  }
  componentWillMount() {
  // console.log( this.props.routeParams.username );
  const username = this.props.routeParams.username;
  // console.log( username );
  GithubHelpers.getUserInfo(username).then( function (info) {
    // console.log( info );
    this.setState({
      user: info.data
    });
  }.bind(this) );

  GithubHelpers.getUserRepos(username).then( function (info) {
    this.setState({
      repos: info.data
    });
  }.bind(this) );

  GithubHelpers.getUserActivity(username).then( function (info) {
    this.setState({
      activity: info.data
    });
  }.bind(this) );

}
  render() {
    return (
      <div>
        <div className="header"></div>
          <h2 className="github-name">Username: {this.props.routeParams.username}</h2>
          <Link to ='/display' >
            <button className="back-button">Back</button>
          </ Link>
          <Link to ='/' >
            <button className="home-button">Home</button>
          </ Link>
          <br/>
          <br/>
          <App repos={this.state.repos} user={this.state.user} langs={this.state.langs} activity={this.state.activity} />
          <br/>
      </div>
    );
  }
}

export default UserContainer;
