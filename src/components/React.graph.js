import React from 'react';
import 'react-vis/dist/style.css';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    Crosshair
} from 'react-vis';

const DATA = [
    [{x: 1, y: 10}, {x: 2, y: 7}, {x: 3, y: 15}],
    [{x: 1, y: 20}, {x: 2, y: 5}, {x: 3, y: 15}]
];
  
  export default class DynamicCrosshair extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        crosshairValues: []
      };
    }
  
    _onMouseLeave = () => {
      this.setState({crosshairValues: []});
    };
  
    _onNearestX = (value, {index}) => {
      this.setState({crosshairValues: DATA.map(d => d[index])});
    };
  
    render() {
      return (
        <XYPlot onMouseLeave={this._onMouseLeave} width={300} height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries onNearestX={this._onNearestX} data={DATA[0]} />
          <LineSeries data={DATA[1]} />
          <Crosshair
            values={this.state.crosshairValues} />
        </XYPlot>
      );
    }
  }