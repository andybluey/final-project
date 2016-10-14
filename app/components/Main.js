import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Main extends Component {
  render() {
    return (
      <div className="main-container">
        <ReactCSSTransitionGroup transitionName="appear"
          transitionEnterTimeout={5000}
          transitionLeaveTimeout={5000}>
          {this.props.children}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Main;
