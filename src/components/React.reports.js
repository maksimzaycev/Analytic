import React, { useState, useEffect } from 'react';
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

const reports = () => {
    let [period, setPeriod] = useState('06.2019');
    let [startDate, setStartDate] = useState('');
    let [finishDate, setFinishDate] = useState('');
    let [logs, setLogs] = useState({loading:true, list:[]});
    let [reports, setReports] = useState([]);
    let [presentReports, setPresentReports] = useState([]);
    let [defaultChart, setDefaultChart] = useState([]);

    useEffect(() => loadingData(), []);

    let loadingData = () => {
        dataLoad(urlLogs + '?period=' + period)
            .then(responseLogs => JSON.parse(responseLogs))
            .then(resultLogs => {
                parseData(resultLogs);
            })
            .catch(error => console.log('error: ' + error));
    };

    let parseData = (resultLogs) => {
        
        let startDate = moment('01.' + period, 'DD.MM.YYYY');
        let finishDate = moment('01.' + period, 'DD.MM.YYYY').add(1, 'month');        
        let allLogs = getAllLogs(resultLogs);
        let listReports = getReports(allLogs);
        let chartReports = getDataReports(listReports, allLogs, startDate.format('DD.MM.YYYY'), finishDate.format('DD.MM.YYYY'));

        setLogs({loading: false, list: resultLogs});
        setReports(chartReports);
        setPresentReports(chartReports);
        setDefaultChart(getDefaultChart());
        setStartDate(startDate.format('DD.MM'));
        setFinishDate(finishDate.format('DD.MM'));
    };

    let changePeriod = (changedPeriod) => {
        setLogs({loading: true, list: logs.list});
        setPeriod(changedPeriod);
        loadingData();
    };

    let getAllLogs = (userLogs) => {
        let allLogs = [];

        for (let i = 0; i < userLogs.length; i++) {
            let logItems = userLogs[i].logItems;
            for (let j = 0; j < logItems.length; j++) {
                allLogs.push(logItems[j]);
            }
        }

        return allLogs;
    };

    let getReports = (allLogs) => {
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
    };

    let getDataReports = (listReports, allLogs, startDate, finishDate) => {
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
    };

    let getDefaultChart = () => {
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
    };

    const findReports = (foundReports) => setPresentReports(foundReports);

    const toggleReport = (type) => {
        let changedCharts = presentReports.map((report) => {
            if (report.link === type) report.display = !report.display;
            return report
        });

        setPresentReports(changedCharts);
    }

    return (
        <div id="maskComponent">
            {logs.loading ? <Loader /> : null}
            <div className="sidebar" id="sidebar">
                <Navigation activeItem={7718} />
            </div>
            <div className="panel" id="panel">
                <ReportsWorkspace
                    reports={reports}
                    presentReports={presentReports}
                    startDate={startDate}
                    finishDate={finishDate}
                    defaultChart={defaultChart}
                    settingPeriod={period}
                    changePeriod={changePeriod}
                    findReports={findReports}
                    toggleReport={toggleReport}
                />
            </div>                        
        </div>
    );
}

export default reports;

