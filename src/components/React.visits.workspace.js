import React from 'react';
import moment from 'moment';
import Userbar from './React.userbar';
import VisitsTable from './React.visits.table';
import FindVisits from './React.visits.find';
import '../css/main.css';

class VisitsWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.setPeriod = this.setPeriod.bind(this);
        this.state = {
            rows: props.visitsItems,
            changedRows: props.visitsItems,
            curMonth: moment(new Date()).format('MM'),
            curYear: moment(new Date()).format('YYYY')
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rows: nextProps.visitsItems,
            changedRows: nextProps.visitsItems
        })
    }

    setPeriod(event) {
        var newPeriod = event.target.value;
        this.props.setPeriod(newPeriod);
    }

    findRows = (foundRows) => {
        this.setState({
            changedRows: foundRows
        });
    };

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
            <div className="visits">
                <Userbar>
                    <FindVisits presentRows={this.state.rows} find={this.findRows} />
                    <select className="userbar__period" onChange={this.setPeriod} defaultValue={defaultPeriod}>
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
                </Userbar>

                <div className="visits__data">
                    <h2 className="visits__title">Количество обращений пользователей к системе</h2>
                    <VisitsTable rows={this.state.changedRows} />
                </div>
            </div>
        );
    }
}

export default VisitsWorkspace;
