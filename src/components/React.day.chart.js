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
    {title: 'Пользователи', color: '#84c9f6', strokeWidth: 14},
    {title: 'Визиты', color: '#3fa6e9', strokeWidth: 14},
    {title: 'Просмотры', color: '#127bbf', strokeWidth: 14}
];

class DayChart extends React.Component {
    constructor(props) {
        super(props);
        this.toggleChart = this.toggleChart.bind(this);

        this.state = {
            charts: []
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            charts: this.restructuralCharts(nextProps.charts)
        });
    }

    restructuralCharts(charts) {
        var resultCharts = Object.keys(charts).map(function(key) {
            return charts[key];
        });

        return resultCharts;
    }

    toggleChart(event) {
        var charts = this.props.charts;
        var presentButton = event.target;
        var presentButtonType = presentButton.getAttribute('data-type');

        if (presentButton.classList.contains('title__button--active')) {
            presentButton.classList.remove('title__button--active');
            presentButton.classList.add('title__button--disabled');
            charts[presentButtonType].display = false;
            this.setState({
                charts: this.restructuralCharts(charts)
            });
        } else {
            presentButton.classList.remove('title__button--disabled');
            presentButton.classList.add('title__button--active');
            charts[presentButtonType].display = true;
            this.setState({
                charts: this.restructuralCharts(charts)
            });
        }
    }

    render() {
        var widthChart = Math.round(document.body.clientWidth * 0.80);
        return (
            <div>
                <div className="title__buttons">
                    <span className="title__button title__button--active" onClick={this.toggleChart} data-type="views">Просмотры</span>
                    <span className="title__button title__button--active" onClick={this.toggleChart} data-type="visits">Визиты</span>
                    <span className="title__button title__button--active" onClick={this.toggleChart} data-type="users">Пользователи</span>
                </div>  
                <XYPlot xType="ordinal" width={widthChart} height={300}>
                    <HorizontalGridLines/>
                    <VerticalGridLines />
                    <XAxis tickLabelAngle={0} />
                    <YAxis />
                    {   
                        this.state.charts.map(chart => (
                            chart.display ?
                            <VerticalBarSeries
                                key={chart.chartId}
                                data={chart.data}
                                color={chart.color}
                            /> : null
                        ))
                    }
                </XYPlot>
                <DiscreteColorLegend className="chart__legend" width={400} items={ITEMS} />
            </div>
        );
    }
}

export default DayChart;
