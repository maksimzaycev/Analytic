import React from 'react';
import Navigation from './React.nav';
import dataLoad from '../models/dataLoad';
import Loader from './React.loader';
import moment from 'moment';
import ReportsWorkspace from './React.reports.workspace';
import '../css/main.css';

const COLORS = [
    '#4461c2',
    '#16a65e',
    '#85d357',
    '#ffdc45',
    '#ff4716',
    '#6ab4ec',
    '#b63dbc',
    '#fdaa19',
    '#fcacfd',
    '#8e8cd8'
];

const urlLogs = 'http://localhost:3000/logs';

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartReports: [],
            startDate: '',
            finishDate: '',
            loading: false,
            settingPeriod: moment(new Date()).format('MM.YYYY')
        };
    }

    UNSAFE_componentWillMount() {
        this.loadData(this.state.settingPeriod);
    }

    loadData(period) {
        dataLoad(urlLogs + '?period=' + period)
            .then(responseLogs => JSON.parse(responseLogs))
            .then(logs => this.parseData(logs, period))
            .catch(e => console.log(e));
    }

    parseData(usersLogs, period) {
        let startDate = moment('01.' + period, 'DD.MM.YYYY');
        let finishDate = moment('01.' + period, 'DD.MM.YYYY').add(1, 'month');
        
        let allLogs = this.getAllLogs(usersLogs);
        let listReports = this.getReports(allLogs);
        let chartReports = this.getDataReports(listReports, allLogs, startDate.format('DD.MM.YYYY'), finishDate.format('DD.MM.YYYY'));
        let defaultChart = this.getDefaultChart();

        this.setState({
            chartReports: chartReports,
            defaultChart: defaultChart,
            startDate: startDate.format('DD.MM'),
            finishDate: finishDate.format('DD.MM'),
            loading: true
        });
    }

    setPeriod = (changedPeriod) => {
        this.setState({
            loading: false
        });

        this.loadData(changedPeriod);
    }

    getAllLogs(userLogs) {
        let allLogs = [];

        for (let i = 0; i < userLogs.length; i++) {
            let logItems = userLogs[i].logItems;
            for (let j = 0; j < logItems.length; j++) {
                allLogs.push(logItems[j]);
            }
        }

        return allLogs;
    }

    getReports(allLogs) {
        let reports = [];

        for (let i = 0; i < allLogs.length; i++) {
            let presentLog = allLogs[i];
            let havePresentLog = false;
            for (let j = 0; j < reports.length; j++) {
                if (presentLog.title === reports[j].name) {
                    havePresentLog = true;
                    reports[j].count++;
                }
            }
            if (!havePresentLog) {
                let addLogItem = {
                    name: presentLog.title,
                    color: COLORS[reports.length % 10],
                    link: presentLog.link,
                    display: true,
                    count: 1
                }

                reports.push(addLogItem);
            }
        }

        return reports;
    }

    getDataReports(listReports, allLogs, startDate, finishDate) {
        for (let i = 0; i < listReports.length; i++) {
            let presentReport = listReports[i];
            let start = moment(startDate, 'DD.MM.YYYY');
            let finish = moment(finishDate, 'DD.MM.YYYY');
            
            presentReport.monthData = [];

            while (moment(finish.format('YYYY-MM-DD')).isAfter(start.format('YYYY-MM-DD'))) {
                let visitsOnDay = 0;
                for (let z = 0; z < allLogs.length; z++) {
                    if ((allLogs[z].date === start.format('DD.MM')) && (allLogs[z].title === presentReport.name)) {
                        visitsOnDay++;
                    }
                }

                let oneDayValue = {
                    x: start.format('DD.MM'),
                    y: visitsOnDay
                };

                start = start.add(1, 'days');
                presentReport.monthData.push(oneDayValue);
            }
        }

        return listReports;
    }

    getDefaultChart() {
        let currentlyDate = moment(new Date(), 'DD.MM');
        let startDate = currentlyDate.subtract(15, "days");
        let defaultDays = [];

        for (let i = 15; i > 0; i--) {

            let oneDay = {
                x: startDate.format('DD.MM'),
                y: 0
            };

            startDate = startDate.add(1, "days");
            defaultDays.push(oneDay);
        }

        return defaultDays;
    }

    render() {
        return (
            <div id="maskComponent">
                {!this.state.loading ? <Loader /> : null}
                <div className="sidebar" id="sidebar">
                    <Navigation activeItem={7718} />
                </div>
                <div className="panel" id="panel">
                    <ReportsWorkspace
                        chartReports={this.state.chartReports}
                        startDate={this.state.startDate}
                        finishDate={this.state.finishDate}
                        defaultChart={this.state.defaultChart}
                        settingPeriod={this.state.settingPeriod}
                        setPeriod={this.setPeriod}
                    />
                </div>                        
            </div>
        );
    }
}

export default Reports;

