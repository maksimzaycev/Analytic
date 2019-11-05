import React from 'react';
import Navigation from './React.nav';
import moment from 'moment';
import Loader from './React.loader';
import VisitsWorkspace from './React.visits.workspace';
import '../css/main.css';

const urlLogs = 'http://localhost:3000/logs';

class Visits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: [],
            loading: false,
            settingPeriod: moment(new Date()).format('MM.YYYY')
        };
    }

    componentWillMount() {
        this.loadData(this.state.settingPeriod);
    }

    loadData(period) {
        console.log("Загружаемый период:");
        console.log(period);
        fetch(urlLogs + '?period=' + period)
            .then(function(response) {
                console.log(response);
                return response.json();
            })
            .then(result => this.parseData(result, period))
            .catch(e => console.log(e));    
    }

    parseData(usersLogs) {
        var usersVisitsData = this.sortUsersViews(usersLogs);
        this.setState({
            activity: usersVisitsData,
            loading: true
        });
    }

    setDate = (changedDate) => {
        this.setState({
            loading: false
        });

        var formatedDate = moment(changedDate, 'YYYY-MM-DD').format('DD.MM.YYYY');
        this.loadData(formatedDate);
    }

    setPeriod = (changedPeriod) => {
        this.setState({
            loading: false
        });

        this.loadData(changedPeriod);
    }

    sortUsersViews(usersLogs) {

        var usersActivity= [];

        for (let i = 0; i < usersLogs.length; i++) {
            var logAdded = false;
            var userActivity = {
                userId: usersLogs[i].userId,
                userName: usersLogs[i].name,
                userCompany: usersLogs[i].company,
                userViews: usersLogs[i].logItems.length,
                userVisits: 1
            };
            
            for (let j = 0; j < usersActivity.length; j++) {
                if (userActivity.userId === usersActivity[j].userId) {
                    usersActivity[j].userViews += userActivity.userViews;
                    usersActivity[j].userVisits += 1;
                    logAdded = true;
                }
            }
            
            if (!logAdded) {
                usersActivity.push(userActivity);
            }    
        }

        return usersActivity;
    }

    render() {
        return (
            <div id="maskComponent">
                {!this.state.loading ? <Loader /> : null}
                <div className="sidebar" id="sidebar">
                    <Navigation activeItem={7713} />
                </div>
                <div className="panel" id="panel">
                    <VisitsWorkspace
                        visitsItems={this.state.activity}
                        setPeriod={this.setPeriod}
                    />
                </div>                        
            </div>
        );
    }
}

export default Visits;

