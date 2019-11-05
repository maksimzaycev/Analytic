import React from 'react';
import UserTable from './React.user.table';
import UserChart from './React.user.chart';
import moment from 'moment';
import '../css/main.css';

class UserWorkspace extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultPerdiod: moment(new Date()).format('MM.YYYY'),
        };
    }

    setPeriod = event => {
        var newPeriod = event.target.value;
        this.props.setPeriod(newPeriod);
    }

    render() {
        return (
            <div className="month">
                <div className="user__title">
                    <h1>{this.props.userName}</h1>
                    <h2>{this.props.userCompany}</h2>
                    <h3>{this.props.userUnit}</h3>
                    <h4>Отчетный период: </h4>
                    <select className="user__period" onChange={this.setPeriod} defaultValue={this.state.defaultPerdiod}>
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
                        <option value="02.2018">Февраль 2019</option>
                        <option value="01.2018">Январь 2019</option>
                    </select>
                </div>
                <div className="user__chart">
                    <h2>График посещаемости пользователя в период с {this.props.startDate} по {this.props.finishDate}</h2>
                    <UserChart
                        chartVisits={this.props.chartVisits}
                        chartViews={this.props.chartViews}
                    />
                </div>
                <div className="user__data">
                    <h2>Журнал посещаемости пользователя в период с {this.props.startDate} по {this.props.finishDate}</h2>
                    <UserTable rows={this.props.userLogs} />
                </div>
            </div>
        )
    }
}

export default UserWorkspace;
