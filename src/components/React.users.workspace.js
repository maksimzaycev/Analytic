import React from 'react';
import moment from 'moment'
import UsersTable from './React.users.table';
import FindUsers from './React.users.find';
import AddUsers from './React.users.add';
import Userbar from './React.userbar';
import dataAdd from '../models/dataAdd';
import dataUpdate from '../models/dataUpdate';
import dataDelete from '../models/dataDelete';
import 'react-vis/dist/style.css';
import '../css/main.css';

const urlUsers = 'http://localhost:3000/users';

class UsersWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            changedRows: []
        };
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        let users = nextProps.users;
        for (let i = 0; i < users.length; i++) {
            users[i].status = this.getStatus(users[i].finishDate);
            users[i].days = this.getDays(users[i].finishDate);
        }

        this.setState({
            rows: users,
            changedRows: users
        });
    }

    remove = (deleteId) => {
        let allUsersData = this.state.rows;
        let index;

        for (let i = 0; i < allUsersData.length; i++) {
            if (allUsersData[i].id === deleteId) {
                index = i;     
            }
        }

        allUsersData.splice(index, 1);

        dataDelete(urlUsers, deleteId).then(users => {
            this.setState({
                rows: allUsersData,
                changedRows: allUsersData
            });
        }).catch(function(users) {
            console.log('error ' + users);
        })
    };

    update = (id, name, company, unit, finishDate) => {
        let allUsersData = this.state.rows;
        let updateShortUserData = {
            id: id,
            name: name,
            company: company,
            unit: unit,
            finishDate: finishDate
        };

        let updateLongUserData = {
            id: id,
            name: name,
            company: company,
            unit: unit,
            finishDate: finishDate,
            status: this.getStatus(finishDate),
            days: this.getDays(finishDate)
        };

        

        for (let i = 0; i < allUsersData.length; i++) {
            if (allUsersData[i].id === id) {
                allUsersData[i] = updateLongUserData;
            }
        }

        dataUpdate(urlUsers, updateShortUserData, id).then(users => {
            this.setState({
                rows: allUsersData,
                changedRows: allUsersData
            });
        }).catch(function(users) {
            console.log('error ' + users);
        })
    };

    addRow = (id, name, company, unit, finishDate) => {
        var allUsersData = this.state.rows;
        var newUserData = {
            id: id,
            name: name,
            company: company,
            unit: unit,
            finishDate: finishDate
        };

        allUsersData.push(newUserData);

        dataAdd(urlUsers, newUserData).then(users => {
            console.log('ЗАПИСЬ ДОБАВЛЕНА УСПЕШНО');
            this.setState({
                rows: allUsersData,
                changedRows: allUsersData
            });
        }).catch(function(users) {
            console.log('error ' + users);
        })
    };

    findRows = (foundRows) => {
        this.setState({
            changedRows: foundRows
        });
    };

    getDays(finishDate) {
        var now = moment(new Date(), 'DD-MM-YYYY');
        var different = moment(finishDate, 'DD-MM-YYYY').diff(now, 'days');
            
        return different;
    }

    getStatus(finishDate) {
        var now = moment(new Date(), 'DD-MM-YYYY');
        var different = moment(finishDate, 'DD-MM-YYYY').diff(now, 'days');
        var status = '';

        if (different <= 4) {
            status = ' power5';
        } else if ((different >= 5) && (different <= 9)) {
            status = ' power4';
        } else if ((different >= 10) && (different <= 14)) {
            status = ' power3';
        } else if ((different >= 15) && (different <= 19)) {
            status = ' power2';
        } else if (different >= 20) {
            status = ' power1';
        }

        return status;
    }

    render() {
        return (
            <div>
                <Userbar>
                    <FindUsers presentRows={this.state.rows} find={this.findRows} />
                </Userbar>
                <div className="users__addbar">
                    <h2 className="users__title">Панель управления пользователями</h2>
                    <AddUsers add={this.addRow} currentUsers={this.state.rows}/>
                </div>
                <div className="users__data">
                    <h2 className="users__title">Учетные записи пользователей</h2>
                    <UsersTable
                        rows={this.state.changedRows}
                        remove={this.remove}
                        update={this.update}/>
                </div>
            </div>
        );
    }
}

export default UsersWorkspace;
