import React, { Component } from 'react';
import Loading from './Loading';
import { Link } from 'react-router';

class CommitActivity extends Component {
  constructor() {
    super();
    this.state = {
      shownEvents: [],
      timerStarted: false,
      currentEvent: 10
    };
  }

  componentWillMount() {
    if ( this.state.id || !this.props.commits ) { return false; }
  }

  updateEvents() {
    this.state.currentEvent += 1;

    // console.log( this.state.currentEvent );

    if ( this.state.currentEvent > this.props.commits.length ) {
      return false;
    }
    const oldEvents = this.state.shownEvents;
    oldEvents.push( this.props.commits[this.state.currentEvent] );
    this.setState({
      shownEvents: oldEvents
    });
    // Move one element from this.props.commits to this.state.shownEvents
    // let element = this.props.commits.forEach((r) => {
    //   this.state.shownEvents.push( element );
    // });
    if ( this.state.timerStarted ) {
      window.setTimeout(this.updateEvents.bind(this), Math.random() * 3000);
    }
  }

  componentWillUnmount() {
    this.state.timerStarted = false;
  }
  componentDidUpdate() {
    if ( this.state.id || !this.props.commits) { return false; }

    if ( this.state.shownEvents.length < 10 ) {
      this.setState({
        shownEvents: this.props.commits.slice( 0, 10 )
      });
    }

    if ( !this.state.timerStarted ) {
      console.log("TIMER HAS NOT BEEN STARTED");
      window.setTimeout(this.updateEvents.bind(this), Math.random() * 3000);
      this.state.timerStarted = true;
    }
  }

  render() {
    if ( !this.props.commits ) {
      return <Loading text='Loading' speed={200} />;
    }
    let commitType = this.state.shownEvents.reverse().map((r) => {

      // PushEvent, CommitEvent, WatchEvent, IssueCommentEvent, DeleteEvent, PullRequestEvent, IssuesEvent
      let message = '';
      switch (r.type) {
        case "PushEvent":
          message = "pushed to";
          break;
        case "CommitEvent":
          message = "committed to";
          break;
        case "WatchEvent":
          message = "watched";
          break;
        case "IssueCommentEvent":
          message = "commented on an issue of";
          break;
        case "DeleteEvent":
          message = "deleted";
          break;
        case "PullRequestEvent":
          message = "made a pull request to";
          break;
        case "IssuesEvent":
          message = "filed an issue on";
          break;
        case "CreateEvent":
          message = "created";
          break;
        case "PullRequestReviewCommentEvent":
          message = "review a comment on";
          break;
        case "ReleaseEvent":
          message = "released";
          break;
        default:
          message = r.type;
      }
      // console.log( r.repo );
      const url = "https://github.com/" + r.repo.name;
      return (
        <li>
          <Link to={"/users/" + r.actor.display_login}>
            {r.actor.display_login}
          </Link> {message} <a href={url} target="_blank">{r.repo.name}</a>
        </li>
      );
      return (
        <tr key={r.id}>
          <td  >{r.type}</td>
          <td  >{r.actor.display_login}</td>
          <td  ><a href={r.repo.url} target="_blank">
            {r.repo.name}</a></td>
        </tr>
      )
    });
    return (
      <div className="commit-activity">
        <div>
          <h4 className="activity">Latest Github Activity</h4>
          <ul>
            {commitType}
          </ul>
        </div>
      </div>
    );
  }
}

export default CommitActivity;
