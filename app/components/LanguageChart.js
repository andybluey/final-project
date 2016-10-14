import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import d3Chart from './d3Chart.js';

class LanguageChart extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    if ( this.props.langs ) {
      d3Chart.createSecondChart(el, {

      }, this.props.langs);
    }
  }
  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this);

    if ( this.props.langs && !this.chartRendered ) {
      d3Chart.createSecondChart(el, {

      }, this.props.langs);

      this.chartRendered = true;
    }
  }
  render() {
    return (
      <div className="GroupTwo">
        <div className="ChartTwo"></div>
        <div>This chart shows the total number of languages used</div>
      </div>
    );
  }
}

export default LanguageChart;
