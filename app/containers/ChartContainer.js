import React, { Component } from 'react';
import RepoBubbles from '../components/RepoBubbles.js';
import LanguageChart from '../components/LanguageChart.js';
import UserActivityChart from '../components/UserActivityChart.js';


const Tab = (props) => {
  const updateState = () => {
    props.onClick( props.name );
  }
  return (
    <li onClick={updateState}>{props.name}</li>
  )
};

const TabNavigation = ( props ) => {
  return (
    <ul className="tab">
      <button className="button-primary"><Tab className="tablinks" onClick={props.updateChart} name="Repos" /></button>
      <button className="button-primary"><Tab className="tablinks" onClick={props.updateChart} name="Languages" /></button>
      <button className="button-primary"><Tab className="tablinks" onClick={props.updateChart} name="Activity" /></button>
    </ul>
  );
}

class ChartContainer extends Component {
  constructor() {
    super();
    this.state={
      user: {},
      chartShown: "Repos"
    };
  }
  updateChart(name) {
    this.setState({
      chartShown: name
    });
  }
  componentDidMount() {
    console.log( this.props );
  }
  componentWillReceiveProps(props) {
    console.log( props );
  }
  render() {
    if ( this.state.chartShown === "Languages" ) {
      return (
        <div className="charts">
          <TabNavigation updateChart={this.updateChart.bind(this)} />
          <LanguageChart langs={this.props.langs} />
        </div>
      );
    } else if ( this.state.chartShown === "Activity" ) {
      return (
        <div className="charts">
          <TabNavigation updateChart={this.updateChart.bind(this)} />
          <UserActivityChart activity={this.props.activity} />
        </div>
      );
    }
    return (
      <div className="charts">
        <TabNavigation updateChart={this.updateChart.bind(this)} />
        <RepoBubbles data={this.props.data} domain={this.props.domain} />
      </div>
    );

  }
}

export default ChartContainer;
