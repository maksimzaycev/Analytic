import React from 'react';
import DayTable from './React.day.table';
import DayChart from './React.day.chart';
import FindDay from './React.day.find';
import moment from 'moment'
import Userbar from './React.userbar';
import 'react-vis/dist/style.css';
import '../css/main.css';

class DayWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.setDate = this.setDate.bind(this);

        this.state = {
            charts: props.chartDay,
            rows: props.tableDay,
            changedRows: props.tableDay
        };
    }

    setDate(event) {
        var newDate = event.target.value;
        this.props.setDate(newDate);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            charts: nextProps.chartDay,
            rows: nextProps.tableDay,
            changedRows: nextProps.tableDay
        });
    }

    findRows = (foundCharts) => {
        this.setState({
            changedRows: foundCharts
        });
    };

    render() {
        return (
            <div className="day">
                <Userbar>
                    <FindDay presentRows={this.state.rows} find={this.findRows} />
                    <input type="date" className="userbar__date" onChange={this.setDate} defaultValue={moment(new Date()).format('YYYY-MM-DD')}/>
                </Userbar>
                <div className="day__chart">
                    <h2 className="day__title">Суточный мониторинг нагрузки на систему за {this.props.settingDate}</h2>
                    <DayChart charts={this.props.charts} />
                </div>
                <div className="day__data">
                    <h2 className="day__title">Показатели активности по часам</h2>
                    <DayTable rows={this.state.changedRows} />
                </div>
            </div>
        );
    }
}

export default DayWorkspace;
