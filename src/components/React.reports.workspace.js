import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ReportsTable from './React.reports.table';
import Userbar from './React.userbar';
import ReportsChart from './React.reports.chart';
import FindReports from './React.reports.find';
import 'react-vis/dist/style.css';
import '../css/main.css';

const reportsWorkspace = (props) => {
    console.log('Aaa');
    console.log(props.aaa);
    let [reports, setReports] = useState(props.reports);
    let [presentReports, setPresentReports] = useState(props.presentReports);
    let [defaultPeriod, setDefaultPeriod] = useState(moment(new Date()).format('MM.YYYY'));

    useEffect(() => {
        setReports(props.reports);
        setPresentReports(props.presentReports);
        
        console.log('Обновились PROPS в WORKSPACE');
        console.log(props);
    }, [props]);

    return (
        <div className="reports">
            <Userbar>
                <FindReports reports={reports} findReports={props.findReports} />
                <select className="userbar__period" onChange={(event) => props.changePeriod(event.target.value)} defaultValue={defaultPeriod}>
                    <option value="12.2019">Декабрь 2019</option>
                    <option value="11.2019">Ноябрь 2019</option>
                    <option value="10.2019">Октябрь 2019</option>
                    <option value="09.2019">Сентябрь 2019</option>
                    <option value="08.2019">Август 2019</option>
                    <option value="07.2019">Июль 2019</option>
                    <option value="06.2019">Июнь 2019</option>
                    <option value="05.2019">Май 2019</option>
                    <option value="04.2019">Апрель 2019</option>
                    <option value="03.2019">Март 2019</option>
                    <option value="02.2019">Февраль 2019</option>
                    <option value="01.2019">Январь 2019</option>
                </select>
            </Userbar>
            <div className="reports__chart">
                <h2 className="reports__title">Динамика обращений к отчетам с {props.startDate} по {props.finishDate}</h2>
                <ReportsChart
                    presentReports={presentReports}
                    defaultChart={props.defaultChart}
                />
            </div>
            <div className="reports__data">
                <h2 className="reports__title">Статистика обращений к отчетам с {props.startDate} по {props.finishDate}</h2>
                <ReportsTable
                    presentReports={presentReports}
                    toggleReport={props.toggleReport}
                />
            </div>
        </div>
    );
}

export default reportsWorkspace;
