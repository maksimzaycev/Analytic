import React, {useState, useEffect} from 'react';
import DayTable from './React.day.table';
import DayChart from './React.day.chart';
import moment from 'moment';
import 'react-vis/dist/style.css';
import '../css/main.css';

const dayWorkspace = (props) => {
    let [period, setPeriod] = useState(props.period);
    let [charts, setCharts] = useState(props.charts);
    let [table, setTable] = useState(props.table);

    useEffect(() => setPeriod(props.period), [props.period]);
    useEffect(() => setCharts(props.charts), [props.charts]);
    useEffect(() => setTable(props.table), [props.table]);

    return (
        <div className="day">
            <div className="day__chart">
                <h2 className="day__title">Суточный мониторинг нагрузки на систему за</h2>
                <input type="date" className="day__period" onChange={(event) => {props.changePeriod(event.target.value)}} defaultValue={moment(period, 'DD.MM.YYYY').format('YYYY-MM-DD')}/>
                <DayChart charts={charts} />
            </div>
            <div className="day__data">
                <h2 className="day__title">Показатели активности по часам</h2>
                <DayTable rows={table} />
            </div>
        </div>
    );
    
}

export default dayWorkspace;
