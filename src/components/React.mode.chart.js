import React from 'react';
import 'react-vis/dist/style.css';
import '../css/main.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  DiscreteColorLegend,
  VerticalBarSeries
} from 'react-vis';

const ITEMS = [
    {title: 'Пришло вовремя', color: '#159357', strokeWidth: 14},
    {title: 'Пришло с опазданием', color: '#c0092f', strokeWidth: 14},
    {title: 'Ушло раньше времени', color: '#e59aaa', strokeWidth: 14},
    {title: 'Ушло вовремя', color: '#9cd3bb', strokeWidth: 14}
];

class ModeChart extends React.Component {
    constructor(props) {
        super(props);
        this.toggleChart = this.toggleChart.bind(this);

        this.state = {
            charts: []
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(" * * * КОМПОНЕНТ ГРАФИКА С НОВЫМИ PROPS * * * ");
        console.log(this.restructuralCharts(nextProps.charts))

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
                    <span className="title__button title__button--active" onClick={this.toggleChart} data-type="goodBegin">Пришедшие во время</span>
                    <span className="title__button title__button--active" onClick={this.toggleChart} data-type="bedBegin">Пришедшие с опазданием</span>
                    <span className="title__button title__button--active" onClick={this.toggleChart} data-type="goodEnd">Ушедшие раньше</span>
                    <span className="title__button title__button--active" onClick={this.toggleChart} data-type="bedEnd">Ушедшие во время</span>
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
                            /> : 
                            <VerticalBarSeries
                                key={chart.chartId}
                                data={this.props.defaultChart}
                                color={chart.color}
                            />
                        ))
                    }
                </XYPlot>
                <DiscreteColorLegend className="chart__legend" width={770} items={ITEMS} />
            </div>
        );
    }
}

export default ModeChart;
