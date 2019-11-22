import React, { useState, useEffect } from 'react';
import Navigation from './React.nav';
import moment from 'moment'
import UsersWorkspace from './React.users.workspace';
import dataLoad from '../models/dataLoad';
import dataAdd from '../models/dataAdd';
import dataUpdate from '../models/dataUpdate';
import dataDelete from '../models/dataDelete';
import Loader from './React.loader';
import '../css/main.css';

const urlUsers = 'http://localhost:3000/users';

const users = () => {
    let [users, setUsers] = useState({loading: true, list: []});
    
    useEffect(() => loadingData(), []);

    const loadingData = () => {
        dataLoad(urlUsers)
            .then(responseUsers => JSON.parse(responseUsers))
            .then(result => {
                parseData(result);
            })
            .catch(e => console.log(e));
    }

    const parseData = (usersList) => {
        let newUsersList = usersList.map(user => getAddInfo(user))
        setUsers({loading: false, list: newUsersList});
    }

    const getAddInfo = (user) => {
        let newUserData = user;
        let different = moment(user.finishDate, 'DD-MM-YYYY').diff(moment(new Date(), 'DD-MM-YYYY'), 'days');
        
        newUserData.days = different;

        if (different <= 4) {
            newUserData.status = ' power5';
        } else if ((different >= 5) && (different <= 9)) {
            newUserData.status = ' power4';
        } else if ((different >= 10) && (different <= 14)) {
            newUserData.status = ' power3';
        } else if ((different >= 15) && (different <= 19)) {
            newUserData.status = ' power2';
        } else if (different >= 20) {
            newUserData.status = ' power1';
        }

        return newUserData;
    }

    const deleteUser = (deleteId) => {
        let allUsersData = this.state.rows;
        let index;

        for (let i = 0; i < allUsersData.length; i++) {
            if (allUsersData[i].id === deleteId) {
                index = i;     
            }
        }

        allUsersData.splice(index, 1);

        dataDelete(urlUsers, deleteId).then(() => {
            setUsers({loading: false, list: allUsersData});
        }).catch(function(users) {
            console.log('error ' + users);
        })
    };

    const updateUser = (id, name, company, unit, finishDate) => {
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
            setUsers({loading: false, list: allUsersData});
        }).catch(function(users) {
            console.log('error ' + users);
        })
    };

    const addUser = (id, name, company, unit, finishDate) => {
        var allUsersData = this.state.rows;
        var newUserData = {
            id: id,
            name: name,
            company: company,
            unit: unit,
            finishDate: finishDate
        };

        allUsersData.push(newUserData);

        dataAdd(urlUsers, newUserData).then(() => {
            setUsers({loading: false, list: allUsersData});
        }).catch(function(users) {
            console.log('error ' + users);
        })
    };
    
    return (
        <div id="maskComponent">
            {users.loading ? <Loader /> : null}
            <div className="sidebar" id="sidebar">
                <Navigation activeItem={7712} />
            </div>
            <div className="panel" id="panel">
                <UsersWorkspace
                    users={users.list}
                    addUser={addUser}
                    deleteUser={deleteUser}
                    updateUser={updateUser}
                />
            </div>                        
        </div>
    );
}

export default users;