import React, { useState, useEffect } from 'react';
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

const dayChart = (props) => {
    let [charts, setCharts] = useState(props.charts);
    useEffect(() => setCharts(props.charts), [props.charts]);

    let legend = props.charts.filter((chart) => chart.title !== '')

    const toggleChart = (event) => {
        let buttonName = event.target.getAttribute('data-type');
        let toggleCharts = charts;

        for (let i = 0; i < toggleCharts.length; i++) {
            if (toggleCharts[i].name === buttonName) {
                toggleCharts[i].display = !toggleCharts[i].display;
            }
        }

        setCharts(toggleCharts);
    }

    const widthChart = Math.round(document.body.clientWidth * 0.80);

    return (
        <div>
            <div className="title__buttons">
                {
                    charts.map(chart => (
                        (chart.title !== '') ?
                        <span
                            key={chart.chartId}
                            className={chart.display ? 'title__button title__button--active' : 'title__button title__button--disabled' }
                            onClick={toggleChart}
                            data-type={chart.name}
                        >
                            {chart.title}
                        </span> : null  
                    ))
                }
            </div>
            <XYPlot xType="ordinal" width={widthChart} height={300}>
                <HorizontalGridLines/>
                <VerticalGridLines />
                <XAxis tickLabelAngle={0} />
                <YAxis />
                {   
                    charts.map(chart => (
                        chart.display ?
                        <VerticalBarSeries
                            key={chart.chartId}
                            data={chart.data}
                            color={chart.color}
                        /> : null
                    ))
                }
            </XYPlot>
            <DiscreteColorLegend className="chart__legend" width={400} items={legend} />
        </div>
    );
}

export default dayChart;
