import React from 'react';
import MonthTable from './React.month.table';
import MonthChart from './React.month.chart';
import moment from 'moment';
import 'react-vis/dist/style.css';
import '../css/main.css';

class MonthWorkspace extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            curMonth: moment(new Date()).format('MM'),
            curYear: moment(new Date()).format('YYYY')
        };
    }

    setPeriod = event => {
        var newPeriod = event.target.value;
        this.props.setPeriod(newPeriod);
    }

    render() {
        var defaultPeriod;
        switch(this.state.curMonth) {
            case '01': 
                defaultPeriod = 'Январь ';
                break;
            case '02': 
                defaultPeriod = 'Февраль ';
                break;
            case '03': 
                defaultPeriod = 'Март ';
                break;
            case '04': 
                defaultPeriod = 'Апрель ';
                break;
            case '05': 
                defaultPeriod = 'Май ';
                break;
            case '06': 
                defaultPeriod = 'Июнь ';
                break;
            case '07': 
                defaultPeriod = 'Июль ';
                break;
            case '08': 
                defaultPeriod = 'Август ';
                break;
            case '09': 
                defaultPeriod = 'Сентябрь ';
                break;
            case '10': 
                defaultPeriod = 'Октябрь ';
                break;
            case '11': 
                defaultPeriod = 'Ноябрь ';
                break;
            case '12': 
                defaultPeriod = 'Декабрь ';
                break;
            default:
                defaultPeriod = 'Январь ';
                break;
        };
        defaultPeriod += this.state.curYear;

        return (
            <div className="month">                
                <div className="month__chart">
                    <h2 className="month__title">Нагрузка на систему за </h2>
                    <select className="month__period" onChange={this.setPeriod} defaultValue={defaultPeriod}>
                        <option value="10.2019">Октябрь 2019</option>
                        <option value="09.2019">Сентябрь 2019</option>
                        <option value="08.2019">Август 2019</option>
                        <option value="07.2019">Июль 2019</option>
                        <option value="06.2019">Июнь 2019</option>
                        <option value="05.2019">Май 2019</option>
                        <option value="04.2019">Апрель 2019</option>
                        <option value="03.2019">Март 2019</option>
                        <option value="02.2018">Февраль 2019</option>
                        <option value="01.2018">Январь 2019</option>
                    </select>
                    <MonthChart
                        charts={this.props.charts}
                        defaultChart={this.props.defaultChart}
                    />
                </div>
                <div className="month__data">
                    <h2 className="month__title">Таблица показателей активности</h2>
                    <MonthTable rows={this.props.strainData} />
                </div>
            </div>
        );
    }
}

export default MonthWorkspace;
