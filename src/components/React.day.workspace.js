import React from 'react';
import DayTable from './React.day.table';
import DayChart from './React.day.chart';
import moment from 'moment';
import 'react-vis/dist/style.css';
import '../css/main.css';

const dayWorkspace = (props) => {
    return (
        <div className="day">
            <div className="day__chart">
                <h2 className="day__title">Суточный мониторинг нагрузки на систему за</h2>
                <input type="date" className="day__period" onChange={(event) => {props.changePeriod(event.target.value)}} defaultValue={moment(props.period, 'DD.MM.YYYY').format('YYYY-MM-DD')}/>
                <DayChart charts={props.charts} toggleChart={props.toggleChart} />
            </div>
            <div className="day__data">
                <h2 className="day__title">Показатели активности по часам</h2>
                <DayTable rows={props.table} />
            </div>
        </div>
    );
}

export default dayWorkspace;
