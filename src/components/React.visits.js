import React, { useState, useEffect, useMemo } from 'react';
import Navigation from './React.nav';
import dataLoad from '../models/dataLoad';
import moment from 'moment';
import Loader from './React.loader';
import VisitsWorkspace from './React.visits.workspace';
import '../css/main.css';

const urlLogs = 'http://localhost:3000/logs';

const visits = () => {
    let [loading, setLoading] = useState(true);
    let [period, setPeriod] = useState(moment(new Date()).format('MM.YYYY'));
    let [logs, setLogs] = useState([]);

    useEffect(() => {
        loadData(period);
    },[]);

    function loadData(curPeriod) {
        dataLoad(urlLogs + '?period=' + curPeriod)
            .then(responseLogs => JSON.parse(responseLogs))
            .then(resultLogs => {
                setLogs(resultLogs);
                setLoading(false);
            })
            .catch(error => console.log('error ' + error));
    }

    
    let usersVisitsData = useMemo (() => {
        var usersActivity= [];

        for (let i = 0; i < logs.length; i++) {
            var logAdded = false;
            var userActivity = {
                userId: logs[i].userId,
                userName: logs[i].name,
                userCompany: logs[i].company,
                userViews: logs[i].logItems.length,
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
    }, [visits]);


    let changePeriod = (changedDate) => {
        setLoading(true);
        setPeriod(moment(changedDate, 'YYYY-MM-DD').format('DD.MM.YYYY'));
    }

    return (
        <div id="maskComponent">
            {loading ? <Loader /> : null}
            <div className="sidebar" id="sidebar">
                <Navigation activeItem={7713} />
            </div>
            <div className="panel" id="panel">
                <VisitsWorkspace
                    visitsItems={usersVisitsData}
                    setPeriod={changePeriod}
                />
            </div>                        
        </div>
    );
}

export default visits;