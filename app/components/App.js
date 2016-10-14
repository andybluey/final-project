import React, { Component } from 'react';
import _ from 'lodash';
import d3Chart from './d3Chart.js';
import ChartContainer from '../containers/ChartContainer.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      domain: {x: [0, 100], y: [0, 100]},
      langs: null
    };
  }
  componentWillMount() {
    this.setState({
      data: this.userRepos(),
      langs: this.userLanguages()
    });
  }

  userLanguages( languages ) {
    if ( !this.props.repos ) {
      return false;
    }

    let langs = {};
    let userLanguages = this.props.repos.forEach((r) => {
      if ( !langs[r.language] ) { langs[r.language] = 0; }
      langs[r.language] += 1;
    });
    this.setState({
      langs: langs
    });
    return langs;
  }

  userRepos( repos ) {
    if ( !repos ) {
      return false;
    }
    let userRepos = repos.map((r) => {
      return {
        value: (r.stargazers_count * 5) + (r.watchers * 5) + (r.forks * 5),
        name: r.name
      };
    });
    return userRepos;
  }

  userActivity( activity ) {
    console.log( activity );
    if ( !activity ) {
      return false;
    }
    let userActivity = activity.map((r) => {
      return {
        value: r.time_stamp,
        name: r.name
      };
    });
    return userActivity;
  }

  componentWillReceiveProps( props ) {
    this.setState({
      data: this.userRepos( props.repos ),
      langs: this.userLanguages( props.languages ),
      activity: this.userActivity( props.activity )
    });
  }
  render() {
    return (
      <div className="App">
        <ChartContainer
          data={this.state.data}
          domain={this.state.domain}
          langs={this.state.langs}
          activity={this.state.activity} />
      </div>
    );
  }
};

export default App;
