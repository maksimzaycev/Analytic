import React from 'react';
import ModeTable from './React.mode.table';
import ModeChart from './React.mode.chart';
import moment from 'moment';
import 'react-vis/dist/style.css';
import '../css/main.css';

class ModeWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.setPeriod = this.setPeriod.bind(this);

        this.state = {
            curMonth: moment(new Date()).format('MM'),
            curYear: moment(new Date()).format('YYYY')
        };
    }

    setPeriod(event) {
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
            <div className="mode">                
                <div className="mode__chart">
                    <h2 className="mode__title">График нарушений режима за</h2>
                    <select className="mode__period" onChange={this.setPeriod} defaultValue={defaultPeriod}>
                        <option value="08.2019">Август 2019</option>
                        <option value="07.2019">Июль 2019</option>
                        <option value="06.2019">Июнь 2019</option>
                        <option value="05.2019">Май 2019</option>
                        <option value="04.2019">Апрель 2019</option>
                        <option value="03.2019">Март 2019</option>
                        <option value="02.2019">Февраль 2019</option>
                        <option value="01.2019">Январь 2019</option>
                        <option value="12.2018">Декабрь 2018</option>
                        <option value="11.2018">Ноябрь 2018</option>
                    </select>
                    <ModeChart
                        charts={this.props.charts}
                        defaultChart={this.props.defaultChart}
                    />
                </div>
                <div className="mode__data">
                    <h2 className="mode__title">Таблица показателей активности</h2>
                    <ModeTable rows={this.props.strainData} />
                </div>
            </div>
        );
    }
}

export default ModeWorkspace;
