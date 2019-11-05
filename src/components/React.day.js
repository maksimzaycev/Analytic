import React from 'react';
import Navigation from './React.nav';
import Loader from './React.loader';
import dataLoad from '../models/dataLoad';
import moment from 'moment';
import DayWorkspace from './React.day.workspace';
import '../css/main.css';

const urlLogs = 'http://localhost:3000/logs';

class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartDayVisits: [],
            chartDayViews: [],
            tableDay: [],
            settingDate: moment(new Date()).format('DD.MM.YYYY'), 
            loading: false
        };
    }

    componentWillMount() {
        this.loadData(this.state.settingDate);
    }

    loadData(date) {
        dataLoad(urlLogs + '?date=' + date)
            .then(responseLogs => JSON.parse(responseLogs))
            .then(result => this.parseData(result, date))
            .catch(e => console.log(e));
    }

    parseData(usersLogs, date) {
        let chartDayUsers = this.getChartDayUsers(usersLogs);
        let chartDayVisits = this.getChartDayVisits(usersLogs);
        let chartDayViews = this.getChartDayViews(usersLogs);
        let chartDayDefault = this.getChartDayDefault();
        let tableDay = this.getTableDay(chartDayVisits, chartDayViews, chartDayUsers);
        let charts = {
            visits: {
                chartId: 4501,
                data: chartDayVisits,
                display: true,
                color: '#3fa6e9'
            },
            views: {
                chartId: 4502,
                data: chartDayViews,
                display: true,
                color: '#127bbf'
            },
            users: {
                chartId: 4503,
                data: chartDayUsers,
                display: true,
                color: '#84c9f6'
            },
            default: {
                chartId: 4504,
                data: chartDayDefault,
                display: true,
                color: '#127bbf'
            }
        };

        this.setState({
            charts: charts,
            tableDay: tableDay,
            settingDate: date,
            loading: true
        });
    }

    setDate = (changedDate) => {
        let formatedDate = moment(changedDate, 'YYYY-MM-DD').format('DD.MM.YYYY');

        this.setState({
            loading: false
        }, this.loadData(formatedDate));
    }

    getChartDayUsers(userLogs) {
        let dayData = [];
        let startHour = moment('00:00', 'HH:mm');
        let finishHour = moment('01:00', 'HH:mm');

        for (let i = 0; i < 24; i++) {
            let usersInThisHour = [];

            for (let j = 0; j < userLogs.length; j++) {
                let visitTime = moment(userLogs[j].time, 'HH:mm');
                if (visitTime.isBetween(startHour, finishHour, 'hours', '[)') && (usersInThisHour.indexOf(userLogs[j].userId) === -1)) {
                    usersInThisHour.push(userLogs[j].userId);
                }
            }

            let hourData = {
                x: startHour.format('HH:mm'),
                y: usersInThisHour.length
            }

            dayData.push(hourData);
            startHour = startHour.add(1, "hours");
            finishHour = finishHour.add(1, "hours");
        }

        return dayData;
    }

    getChartDayVisits(userLogs) {
        let dayData = [];
        let startHour = moment('00:00', 'HH:mm');
        let finishHour = moment('01:00', 'HH:mm');

        for (let i = 0; i < 24; i++) {
            let hourData = {
                x: startHour.format('HH:mm'),
                y: 0
            }

            for (let j = 0; j < userLogs.length; j++) {
                let visitTime = moment(userLogs[j].time, 'HH:mm');
                if (visitTime.isBetween(startHour, finishHour, 'hours', '[)')) {
                    hourData.y++;
                }
            }

            dayData.push(hourData);
            startHour = startHour.add(1, "hours");
            finishHour = finishHour.add(1, "hours");
        }

        return dayData;
    }

    getChartDayViews(userLogs) {
        let dayData = [];
        let startHour = moment('00:00', 'HH:mm');
        let finishHour = moment('01:00', 'HH:mm');

        for (let i = 0; i < 24; i++) {
            let hourData = {
                x: startHour.format('HH:mm'),
                y: 0
            }

            for (let j = 0; j < userLogs.length; j++) {
                let visitTime = moment(userLogs[j].time, 'HH:mm');
                if (visitTime.isBetween(startHour, finishHour, 'hours', '[)')) {
                    hourData.y += userLogs[j].logItems.length;
                }
            }

            dayData.push(hourData);
            startHour = startHour.add(1, "hours");
            finishHour = finishHour.add(1, "hours");
        }

        return dayData;
    }

    getChartDayDefault() {
        let dayData = [];
        let startHour = moment('00:00', 'HH:mm');
        let finishHour = moment('01:00', 'HH:mm');

        for (let i = 0; i < 24; i++) {
            let hourData = {
                x: startHour.format('HH:mm'),
                y: 0
            }

            dayData.push(hourData);
            startHour = startHour.add(1, "hours");
            finishHour = finishHour.add(1, "hours");
        }

        return dayData;
    }

    getTableDay(visitsChart,viewsChart,usersChart) {
        let tableData = [];

        let startHour = moment('00:00', 'HH:mm');
        let finishHour = moment('01:00', 'HH:mm');

        for (let i = 0; i < 24; i++) {
            let hourData = {
                start: startHour.format('HH:mm'),
                finish: finishHour.format('HH:mm'),
                users: usersChart[i].y,
                visits: visitsChart[i].y,
                views: viewsChart[i].y
            }

            tableData.push(hourData);
            startHour = startHour.add(1, "hours");
            finishHour = finishHour.add(1, "hours");
        }

        return tableData;
    }

    render() {
        return (
            <div id="maskComponent">
                {!this.state.loading ? <Loader /> : null}
                <div className="sidebar" id="sidebar">
                    <Navigation activeItem={7711} />
                </div>
                <div className="panel" id="panel">
                    <DayWorkspace
                        charts={this.state.charts}
                        tableDay={this.state.tableDay}
                        settingDate={this.state.settingDate}
                        setDate={this.setDate}
                    />
                </div>                        
            </div>
        );
    }
}

export default Day;

