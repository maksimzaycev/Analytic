import React from 'react';
import moment from 'moment';
import LogsTable from './React.logs.table';
import AddLogs from './React.logs.add';
import Userbar from './React.userbar';
import dataLoad from '../models/dataLoad';
import dataAdd from '../models/dataAdd';
import dataDelete from '../models/dataDelete';
import dataUpdate from '../models/dataUpdate';
import FindLogs from './React.logs.find';
import Loader from './React.loader';
import '../css/main.css';

const urlLogs = 'http://localhost:3000/logs';
const urlUsers = 'http://localhost:3000/users';

class LogsWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.setPeriod = this.setPeriod.bind(this);
        this.state = {
            rows: [],
            changedRows: [],
            users: [],
            loading: false,
            settingPeriod: moment(new Date()).format('MM.YYYY')
        };
    }

    UNSAFE_componentWillMount() {
        this.loadData(this.state.settingPeriod);
    }

    loadData(period) {
        dataLoad(urlLogs + '?period=' + period)
            .then(responseLogs => JSON.parse(responseLogs))
            .then(resultLogs => {
                dataLoad(urlUsers)
                    .then(responseUsers => JSON.parse(responseUsers))
                    .then(resultUsers => this.parseData(resultUsers, resultLogs, period))
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    parseData(users, logs, period) {
        this.setState({
            rows: logs,
            changedRows: logs,
            users: users,
            settingPeriod: period,
            loading: true
        });
    }

    findRows = (foundRows) => {
        this.setState({
            changedRows: foundRows
        });
    };

    setPeriod(event) {
        this.setState({
            loading: false
        }, this.loadData(event.target.value));
    }

    addRow = (newLogsData) => {
        let allLogsData = this.state.rows;

        allLogsData.push(newLogsData);

        dataAdd(urlLogs, newLogsData).then(() => {
            this.setState({
                rows: allLogsData,
                changedRows: allLogsData
            });
        }).catch(function(logs) {
            console.log('error ' + logs);
        })
    };

    removeRow = (i) => {
        let allLogsData = this.state.rows;
        let deleteId = allLogsData[i].id;
        
        allLogsData.splice(i, 1);
        
        dataDelete(urlLogs, deleteId).then(logs => {
            this.setState({
                rows: allLogsData,
                changedRows: allLogsData
            });
        }).catch(function(logs) {
            console.log('error ' + logs);
        })
    };

    updateRow = (id, userId, time, date, name, company, pages, long, logItems) => {
        let allLogsData = this.state.rows;

        let updateLogData = {
            id: id,
            userId: userId,
            time: time,
            date: date,
            period: date.slice(3,10),
            name: name,
            company: company,
            pages: pages,
            long: long,
            logItems: logItems
        };

        for (let i = 0; i < allLogsData.length; i++) {
            if (allLogsData[i].id === id) {
                allLogsData[i] = updateLogData;
            }
        }

        dataUpdate(urlLogs, updateLogData, updateLogData.id).then(logs => {
            this.setState({
                rows: allLogsData,
                changedRows: allLogsData
            });
        }).catch(function(logs) {
            console.log('error ' + logs);
        })

    };

    render() {
        return (
            <div className="logs">
                {(!this.state.loading) ? <Loader /> : null}
                <Userbar>
                    <FindLogs presentRows={this.state.rows} find={this.findRows} />
                    <select className="userbar__period" onChange={this.setPeriod} defaultValue={this.state.settingPeriod}>
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
                        <option value="12.2018">Декабрь 2018</option>
                        <option value="11.2018">Ноябрь 2018</option>
                    </select>
                </Userbar>
                <div className="logs__addbar">
                    <h2 className="logs__title">Панель управления посещениями пользователей</h2>
                    <AddLogs add={this.addRow} currentLogs={this.state.rows} users={this.state.users}/>
                </div>
                <div className="logs__data">
                    <h2 className="logs__title">Таблица посещений пользователей</h2>
                    <LogsTable
                        rows={this.state.changedRows}
                        removeRow={this.removeRow}
                        updateRow={this.updateRow}
                    />
                </div>
            </div>
        );
    }
}

export default LogsWorkspace;
