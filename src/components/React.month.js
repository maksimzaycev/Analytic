import React from 'react';
import Navigation from './React.nav';
import Loader from './React.loader';
import moment from 'moment'
import MonthWorkspace from './React.month.workspace';
import '../css/main.css';

const urlLogs = 'http://localhost:3000/logs';

class Month extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charts: {},
            defaultChart: [],
            strainData: [],
            settingPeriod: moment(new Date()).format('MM.YYYY'),
            loading: false
        };
    }

    componentDidMount() {
        this.loadData(this.state.settingPeriod);
    }

    loadData(period) {
        console.log("Загружаемый период:");
        console.log(period);
        fetch(urlLogs + '?period=' + period)
            .then(function(response) {
                return response.json();
            })
            .then(result => this.parseData(result, period))
            .catch(e => console.log(e));
    }

    parseData(usersLogs, period) {
        console.log('Результат загрузки:');
        console.log(usersLogs);
        
        var startDate = moment('01.' + period, 'DD.MM.YYYY');

        var usersChart = this.sortUsersChart(usersLogs, startDate);
        startDate.subtract(30, "days");
        var visitsChart = this.sortVisitsChart(usersLogs, startDate);
        startDate.subtract(30, "days");
        var viewsChart = this.sortViewsChart(usersLogs, startDate);
        startDate.subtract(30, "days");
        var defaultChart = this.getDefaultChart(startDate);

        var charts = {
            users: {
                chartId: 4501,
                data: usersChart,
                display: true,
                color: '#84c9f6'
            },
            visits: {
                chartId: 4502,
                data: visitsChart,
                display: true,
                color: '#3fa6e9'
            },
            views: {
                chartId: 4503,
                data: viewsChart,
                display: true,
                color: '#127bbf'
            }
        };

        var strainData = [];

        for (let i = 0; i < 30; i++) {
            var dayData = {
                date: charts.users.data[i].x,
                users: charts.users.data[i].y,
                visits: charts.visits.data[i].y,
                views: charts.views.data[i].y,
            }

            strainData.push(dayData);
        }

        this.setState({
            charts: charts,
            defaultChart: defaultChart,
            strainData: strainData,
            loading: true
        });   
    }

    setPeriod = (changedPeriod) => {
        this.setState({
            loading: false
        });

        this.loadData(changedPeriod);
    }

    sortVisitsChart(userLogs, start) {
        let sortVisits = [];

        for (let i = 30; i > 0; i--) {
            var visitsOnDay = 0;
            for (let j = 0; j < userLogs.length; j++) {
                if (userLogs[j].date.slice(0, 5) === start.format('DD.MM')) {
                    visitsOnDay++;
                }
            }

            var oneDayValue = {
                x: start.format('DD.MM'),
                y: visitsOnDay
            };

            start = start.add(1, "days");
            sortVisits.push(oneDayValue);
        }

        return sortVisits;
    }

    sortViewsChart(userLogs, start) {
        console.log('СТАРТ');
        console.log(start);
        let sortViews = [];

        for (let i = 30; i > 0; i--) {
            var viewsOnDay = 0;
            for (let j = 0; j < userLogs.length; j++) {
                if (userLogs[j].date.slice(0, 5) === start.format('DD.MM')) {
                    viewsOnDay = viewsOnDay + userLogs[j].pages;
                }
            }

            var oneDayValue = {
                x: start.format('DD.MM'),
                y: viewsOnDay
            };

            start = start.add(1, "days");
            sortViews.push(oneDayValue);
        }

        return sortViews;
    }

    sortUsersChart(userLogs, start) {
        console.log('СТАРТ');
        console.log(start);
        let sortUsers = [];

        for (let i = 30; i > 0; i--) {
            var uniqueUsers = [];
            
            for (let j = 0; j < userLogs.length; j++) {
                if ((userLogs[j].date.slice(0, 5) === start.format('DD.MM')) && (!uniqueUsers.includes(userLogs[j].userId))){
                    uniqueUsers.push(userLogs[j].userId);
                }
            }
            
            var oneDay = {
                x: start.format('DD.MM'),
                y: uniqueUsers.length
            };

            start = start.add(1, "days");
            sortUsers.push(oneDay);
        }

        return sortUsers;
    }

    getDefaultChart(start) {
        var defaultDays = [];

        for (let i = 30; i > 0; i--) {

            var oneDay = {
                x: start.format('DD.MM'),
                y: 0
            };

            start = start.add(1, "days");
            defaultDays.push(oneDay);
        }

        return defaultDays;
    }

    render() {
        return (
            <div id="maskComponent">
                {!this.state.loading ? <Loader /> : null}
                <div className="sidebar" id="sidebar">
                    <Navigation activeItem={7717} />
                </div>
                <div className="panel" id="panel">
                    <MonthWorkspace
                        charts={this.state.charts}
                        defaultChart={this.state.defaultChart}
                        strainData={this.state.strainData}
                        setPeriod={this.setPeriod}
                    />
                </div>                        
            </div>
        );
    }
}

export default Month;

