import React from 'react';
import dataLoad from '../models/dataLoad';
import Navigation from './React.nav';
import Loader from './React.loader';
import moment from 'moment'
import UserWorkspace from './React.user.workspace';
import '../css/main.css';

const urlUsers = 'http://localhost:3000/users';
const urlLogs = 'http://localhost:3000/logs';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: parseInt(this.props.match.params.userId),
            userName: '',
            userUnit: '',
            userCompany: '',
            userLogs: [],
            systemObjects: [],
            chartVisits: [],
            chartViews: [],
            settingPeriod: moment(new Date()).format('MM.YYYY'),
            startDate: '',
            finishDate: '',
            loading: false
        };
    }

    UNSAFE_componentWillMount() {
        this.loadData(this.state.settingPeriod);
    }

    loadData(period) {
        dataLoad(urlUsers + '?id=' + this.state.userId)
            .then(responseUser => JSON.parse(responseUser))
            .then(resultUser => {
                dataLoad(urlLogs + '?userId=' + this.state.userId + '&period=' + period)
                .then(responseLogs => JSON.parse(responseLogs))
                .then(resultLogs => this.parseData(resultUser[0], resultLogs, period))
                .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    parseData(user, logs, period) {
        let startDate = moment('01.' + period, 'DD.MM.YYYY')
        let finishDate = moment('01.' + period, 'DD.MM.YYYY').add(29, "days");
        let chartVisits = this.sortVisitsChart(logs);
        let chartViews = this.sortViewsChart(logs);

        this.setState({
            userName: user.name,
            userUnit: user.unit,
            userCompany: user.company,
            userLogs: logs,
            chartVisits: chartVisits,
            chartViews: chartViews,
            startDate: startDate.format('DD.MM'),
            finishDate: finishDate.format('DD.MM'),
            settingPeriod: period,
            loading: true
        });
    }

    sortVisitsChart(userLogs) {
        let currentlyDate = moment('01.' + this.state.settingPeriod, 'DD.MM.YYY');
        let sortVisits = [];
        
        for (let i = 30; i > 0; i--) {
            let visitsOnDay = 0;
            for (let j = 0; j < userLogs.length; j++) {
                if (userLogs[j].date.slice(0, 5) === currentlyDate.format('DD.MM')) {
                    visitsOnDay++;
                }
            }

            let oneDayValue = {
                x: currentlyDate.format('DD.MM'),
                y: visitsOnDay
            };

            currentlyDate = currentlyDate.add(1, "days");
            sortVisits.push(oneDayValue);
        }

        return sortVisits;
    }

    sortViewsChart(userLogs) {
        let currentlyDate = moment('01.' + this.state.settingPeriod, 'DD.MM.YYYY');
        let sortViews = [];

        for (let i = 30; i > 0; i--) {
            let viewsOnDay = 0;
            for (let j = 0; j < userLogs.length; j++) {
                if (userLogs[j].date.slice(0, 5) === currentlyDate.format('DD.MM')) {
                    viewsOnDay = viewsOnDay + userLogs[j].pages;
                }
            }

            let oneDayValue = {
                x: currentlyDate.format('DD.MM'),
                y: viewsOnDay
            };

            currentlyDate = currentlyDate.add(1, "days");
            sortViews.push(oneDayValue);
        }

        return sortViews;
    }

    setPeriod = (changedPeriod) => {
        this.setState({
            settingPeriod: changedPeriod,
            loading: false
        }, this.loadData(changedPeriod));
    }

    render() {
        return (
            <div id="maskComponent">
                {!this.state.loading ? <Loader /> : null}
                <div id="sidebar">
                    <Navigation activeItem={this.props.activeItem}/>
                </div>
                <div className="panel" id="panel">
                    <UserWorkspace
                        userName={this.state.userName}
                        userUnit={this.state.userUnit}
                        userCompany={this.state.userCompany}
                        userLogs={this.state.userLogs}
                        chartVisits={this.state.chartVisits}
                        chartViews={this.state.chartViews}
                        startDate={this.state.startDate}
                        finishDate={this.state.finishDate}
                        setPeriod={this.setPeriod}
                    />
                </div>                        
            </div>
        );
    }
}

export default User;

