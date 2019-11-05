import React from 'react';
import 'react-vis/dist/style.css';
import '../css/main.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  VerticalBarSeries,
  DiscreteColorLegend
} from 'react-vis';

const ITEMS = [
  {title: 'Количество входов в систему', color: '#3fa6e9', strokeWidth: 14},
  {title: 'Количество просмотренных отчетов', color: '#127bbf', strokeWidth: 14}
];

function UserWorkspace(props) {
    var widthChart = Math.round(document.body.clientWidth * 0.80);
    return (
        <div>
            <XYPlot xType="ordinal" width={widthChart} height={300}>
                <HorizontalGridLines/>
                <VerticalGridLines />
                <XAxis tickLabelAngle={0} />
                <YAxis />
                <VerticalBarSeries
                    data={props.chartVisits}
                    color="#3fa6e9"
                />
                <VerticalBarSeries
                    data={props.chartViews}
                    color="#127bbf"
                />
            </XYPlot>
            <DiscreteColorLegend className="chart__legend" width={470} items={ITEMS} />
        </div>
    );
}

export default UserWorkspace;
