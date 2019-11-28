import React, { useState, useEffect, useMemo } from 'react';
import Navigation from './React.nav';
import AppContext from './React.context';
import dataLoad from '../models/dataLoad';
import moment from 'moment';
import Loader from './React.loader';
import VisitsWorkspace from './React.visits.workspace';
import '../css/main.css';

const colors = ["#000000", "#eeeeee", "#ffffff", "#222222"];
const urlLogs = 'http://localhost:3000/logs';

const visits = () => {
    let [period, setPeriod] = useState(moment(new Date()).format('MM.YYYY'));
    let [logs, setLogs] = useState({loading:true, list:[]});

    useEffect(() => loadingData(), [period]);

    let loadingData = () => {
        dataLoad(urlLogs + '?period=' + period)
            .then(responseLogs => JSON.parse(responseLogs))
            .then(resultLogs => {
                setLogs({loading:false, list: resultLogs});
            })
            .catch(error => console.log('error: ' + error));
    };
    
    let activity = useMemo (() => {
        var usersActivity= [];
        
        for (let i = 0; i < logs.list.length; i++) {
            var logAdded = false;
            var userActivity = {
                userId: logs.list[i].userId,
                userName: logs.list[i].name,
                userCompany: logs.list[i].company,
                userViews: logs.list[i].logItems.length,
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
    }, [logs]);


    let changePeriod = (changedPeriod) => {
        setLogs({loading: true, list: []});
        setPeriod(changedPeriod);
    }

    return (
        <div id="maskComponent">
            {logs.loading ? <Loader /> : null}
            <div className="sidebar" id="sidebar">
                <Navigation activeItem={7713} />
            </div>
            <div className="panel" id="panel">
                <AppContext.Provider value={{colors: colors, activity: activity, logs: logs}}>
                    <VisitsWorkspace
                        visitsItems={activity}
                        setPeriod={changePeriod}
                        settingPeriod={period}
                    />
                </AppContext.Provider>
            </div>                        
        </div>
    );
}

export default visits;