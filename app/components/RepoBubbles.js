import React, { Component } from 'react';
import d3Chart from './d3Chart';
import App from './App';
import ReactDOM from 'react-dom';

class RepoBubbles extends Component {
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object,
    langs: React.PropTypes.array
  }

  componentDidMount() {
    // console.log("TEST\n\n", this);
    // debugger;
    const el = ReactDOM.findDOMNode(this);

    // console.log( el );
    const chartData = this.getChartState();

    if ( chartData ) {
      d3Chart.createChart(el, {
        // width: '80%',
        // height: '300px'
      }, chartData);

      this.chartRendered = true;
    }
  }

  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this);

    const chartData = this.getChartState();

    if ( chartData && !this.chartRendered ) {
      d3Chart.createChart(el, {
        // width: '80%',
        // height: '300px'
      }, chartData);

      this.chartRendered = true;
    }
  }

  getChartState() {
    if ( !this.props.data || !this.props.domain ) {
      return false;
    }
    return {
      data: this.props.data,
      domain: this.props.domain,
      langs: this.props.langs
    };
  }

  // componentWillUnmount() {
  //   const el = ReactDOM.findDOMNode(this);
  //   d3Chart.destroy(el);
  // }

  render() {
    return (
      <div className="Group">
        <div className="Chart"></div>
        <div>This chart shows the popularity of a repo, using stars, watchers and forks</div>
      </div>
    );
  }
};

export default RepoBubbles;
