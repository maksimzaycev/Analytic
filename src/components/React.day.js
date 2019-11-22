import React, {useState, useEffect} from 'react';
import Navigation from './React.nav';
import Loader from './React.loader';
import dataLoad from '../models/dataLoad';
import moment from 'moment';
import DayWorkspace from './React.day.workspace';
import '../css/main.css';

const urlLogs = 'http://localhost:3000/logs';

const day = () => {
    let [period, setPeriod] = useState(moment(new Date()).format('DD.MM.YYYY'));
    let [logs, setLogs] = useState({loading:true, list:[]});
    let [charts, setCharts] = useState([]);
    let [table, setTable] = useState([]);

    useEffect(() => loadingData(), [period]);

    const loadingData = () => {
        dataLoad(urlLogs + '?date=' + period)
            .then(responseLogs => JSON.parse(responseLogs))
            .then(result => {
                setLogs({loading: false, list: result})
                parseData(result, period);
            })
            .catch(e => console.log(e));
    }

    const parseData = (logsList) => {
        let chartDayUsers = getChartDayUsers(logsList);
        let chartDayVisits = getChartDayVisits(logsList);
        let chartDayViews = getChartDayViews(logsList);
        let chartDayDefault = getChartDayDefault();

        setCharts(
            [
                {
                    chartId: 4501,
                    title: 'Визиты',
                    name: 'visits',
                    data: chartDayVisits,
                    strokeWidth: 14,
                    display: false,
                    color: '#3fa6e9'
                },
                {
                    chartId: 4502,
                    title: 'Просмотры',
                    name: 'views',
                    data: chartDayViews,
                    strokeWidth: 14,
                    display: true,
                    color: '#127bbf'
                },
                {
                    chartId: 4503,
                    title: 'Пользователи',
                    name: 'users',
                    data: chartDayUsers,
                    strokeWidth: 14,
                    display: true,
                    color: '#84c9f6'
                },
                {
                    chartId: 4504,
                    title: '',
                    name: 'default',
                    data: chartDayDefault,
                    strokeWidth: 14,
                    display: true,
                    color: '#127bbf'
                }
            ]
        );

        setTable(getTable(chartDayVisits, chartDayViews, chartDayUsers));
    }

    const getTable = (visitsChart, viewsChart, usersChart) => {
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
    
    const getChartDayUsers = (userLogs) => {
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
    
    const getChartDayVisits = (userLogs) => {
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
    
    const getChartDayViews = (userLogs) => {
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
    
    const getChartDayDefault = () => {
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

    const changePeriod = (changedDate) => {
        let formatedChangedDate = moment(changedDate, 'YYYY-MM-DD').format('DD.MM.YYYY');
        setLogs({loading: true, list: []});
        setPeriod(formatedChangedDate);
    }

    return (
        <div id="maskComponent">
            {logs.loading ? <Loader /> : null}
            <div className="sidebar" id="sidebar">
                <Navigation activeItem={7711} />
            </div>
            <div className="panel" id="panel">
                <DayWorkspace
                    charts={charts}
                    table={table}
                    period={period}
                    changePeriod={changePeriod}
                />
            </div>                        
        </div>
    );
    
}

export default day;

