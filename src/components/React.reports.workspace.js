import React from 'react';
import moment from 'moment';
import ReportsTable from './React.reports.table';
import Userbar from './React.userbar';
import ReportsChart from './React.reports.chart';
import FindReports from './React.reports.find';
import 'react-vis/dist/style.css';
import '../css/main.css';

class ReportsWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.toggleChart = this.toggleChart.bind(this);
        this.setPeriod = this.setPeriod.bind(this);

        this.state = {
            charts: props.chartReports,
            changedCharts: props.chartReports
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            charts: nextProps.chartReports,
            changedCharts: nextProps.chartReports
        });
    }

    toggleChart(necessaryChart) {
        let charts = this.state.charts;
        
        for (let i = 0; i < charts.length; i++) {
            if (necessaryChart === charts[i].link) {
                charts[i].display = !charts[i].display;
            }
        }

        this.setState({
            charts: charts
        });
    }

    setPeriod(event) {
        let newPeriod = event.target.value;
        this.props.setPeriod(newPeriod);
    }

    findCharts = (foundCharts) => {
        this.setState({
            changedCharts: foundCharts
        });
    };

    render() {
        let curMonth = moment(new Date()).format('MM');
        let curYear = moment(new Date()).format('YYYY');
        let defaultPeriod;
        switch(curMonth) {
            case '01': 
                defaultPeriod = 'Январь ' + curYear;
                break;
            case '02': 
                defaultPeriod = 'Февраль ' + curYear;
                break;
            case '03': 
                defaultPeriod = 'Март ' + curYear;
                break;
            case '04': 
                defaultPeriod = 'Апрель ' + curYear;
                break;
            case '05': 
                defaultPeriod = 'Май ' + curYear;
                break;
            case '06': 
                defaultPeriod = 'Июнь ' + curYear;
                break;
            case '07': 
                defaultPeriod = 'Июль ' + curYear;
                break;
            case '08': 
                defaultPeriod = 'Август ' + curYear;
                break;
            case '09': 
                defaultPeriod = 'Сентябрь ' + curYear;
                break;
            case '10': 
                defaultPeriod = 'Октябрь ' + curYear;
                break;
            case '11': 
                defaultPeriod = 'Ноябрь ' + curYear;
                break;
            case '12': 
                defaultPeriod = 'Декабрь ' + curYear;
                break;
            default:
                defaultPeriod = 'Январь ' + curYear;
                break;
        };
        return (
            <div className="reports">
                <Userbar>
                    <FindReports presentRows={this.state.charts} find={this.findCharts} />
                    <select className="userbar__period" onChange={this.setPeriod} defaultValue={defaultPeriod}>
                        <option value="10.2019">Октябрь 2019</option>
                        <option value="09.2019">Сентябрь 2019</option>
                        <option value="08.2019">Август 2019</option>
                        <option value="07.2019">Июль 2019</option>
                        <option value="06.2019">Июнь 2019</option>
                        <option value="05.2019">Май 2019</option>
                        <option value="04.2019">Апрель 2019</option>
                        <option value="03.2019">Март 2019</option>
                        <option value="02.2019">Февраль 2019</option>
                        <option value="01.2019">Январь 2019</option>
                        <option value="12.2018">Декабрь 2018</option>
                        <option value="11.2018">Ноябрь 2018</option>
                    </select>
                </Userbar>
                <div className="reports__chart">
                    <h2 className="reports__title">Динамика обращений к отчетам с {this.props.startDate} по {this.props.finishDate}</h2>
                    <ReportsChart
                        chartReports={this.state.changedCharts}
                        defaultChart={this.props.defaultChart}
                        toggleChart={this.toggleChart}
                    />
                </div>
                <div className="reports__data">
                    <h2 className="reports__title">Статистика обращений к отчетам с {this.props.startDate} по {this.props.finishDate}</h2>
                    <ReportsTable
                        rows={this.state.changedCharts}
                        toggleChart={this.toggleChart}
                    />
                </div>
            </div>
        );
    }
}

export default ReportsWorkspace;
