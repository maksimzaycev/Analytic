import React from 'react';
import 'react-vis/dist/style.css';
import '../css/main.css';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    VerticalBarSeries
} from 'react-vis';

class ReportsChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            charts: props.chartReports
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            charts: nextProps.chartReports
        });
    }

    render() {
        

        var reports = this.state.charts;
        var viewed = 0;

        for (let i = 0; i < reports.length; i++) {
            if (reports[i].display) {
                viewed++;
            }
        }

        var widthChart = Math.round(document.body.clientWidth * 0.80);
        return (
            <div>              
                <XYPlot xType="ordinal" width={widthChart} height={300}>
                    <HorizontalGridLines/>
                    <VerticalGridLines />
                    <XAxis tickLabelAngle={0} />
                    <YAxis />
                    {   (viewed > 0) ? 
                        this.state.charts.map((report, i) => (
                            report.display ?
                            <VerticalBarSeries
                                data={report.monthData}
                                color={report.color}
                            /> : null
                        )) :
                        <VerticalBarSeries
                            data={this.props.defaultChart}
                        />
                    }
                </XYPlot>
            </div>
        );
    }
}

export default ReportsChart;
