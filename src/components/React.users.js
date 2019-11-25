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
            .then(result => parseData(result))
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
        let allUsers = users.list.filter(user => user.id !== deleteId);
        dataDelete(urlUsers, deleteId)
            .then(() => setUsers({loading: false, list: allUsers}))
            .catch(error => console.log('error ' + error));
    };

    const updateUser = (user) => {
        let allUsers = users.list;
        let refreshUser = getAddInfo(user);

        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id === user.id) allUsers[i] = refreshUser;
        }

        dataUpdate(urlUsers, refreshUser, user.id)
            .then(() => setUsers({loading: false, list: allUsers}))
            .catch(error => console.log('error ' + error));
    };

    const addUser = (newUser) => {
        var allUsersData = users.list;

        allUsersData.push(getAddInfo(newUser));

        dataAdd(urlUsers, newUser)
            .then(() => setUsers({loading: false, list: allUsersData}))
            .catch(error => console.log('error ' + error));
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