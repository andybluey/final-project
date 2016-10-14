import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import d3Chart from './d3Chart.js';

class UserActivityChart extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    if ( this.props.activity ) {
      d3Chart.createThirdChart(el, {

      }, this.props.activity);
    }
  }
  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this);


    if ( this.props.activity && !this.chartRendered ) {
      d3Chart.createThirdChart(el, {

      }, this.props.activity);

      this.chartRendered = true;
    }
  }
  render() {
    return (
      <div className="GroupThree">
        <div className="ChartThree"></div>
        <div>This shows the activity of the user over time</div>
      </div>
    );
  }
}

export default UserActivityChart;
