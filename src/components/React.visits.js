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
        dataLoad(urlLogs + '?period=' + period)
            .then(responseLogs => JSON.parse(responseLogs))
            .then(resultLogs => {
                setLogs(resultLogs);
                setLoading(false);
                console.log('Пришедшие логи:');
                console.log(resultLogs);
            })
            .catch(error => console.log('error ' + error));
    },[]);

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


    let changePeriod = (changedPeriod) => {
        setLoading(true);
        setPeriod(changedPeriod);
        dataLoad(urlLogs + '?period=' + changedPeriod)
            .then(responseLogs => JSON.parse(responseLogs))
            .then(resultLogs => {
                setLogs(resultLogs);
                setLoading(false);
                console.log('Пришедшие логи:');
                console.log(resultLogs);
            })
            .catch(error => console.log('error ' + error));
    }

    console.log('Текущие логи:');
    console.log();

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