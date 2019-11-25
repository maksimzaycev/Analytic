import React, { useState, useEffect } from 'react';
import UsersTable from './React.users.table';
import FindUsers from './React.users.find';
import AddUsers from './React.users.add';
import Userbar from './React.userbar';

import 'react-vis/dist/style.css';
import '../css/main.css';

const usersWorkspace = (props) => {
    let [users, setUsers] = useState(props.users);
    let [presentUsers, setPresentUsers] = useState(props.users);

    useEffect(() => setUsers(props.users),[props.users]);
    useEffect(() => setPresentUsers(props.users),[props.users]);

    let findUsers = (filtredVisits) => setPresentUsers(filtredVisits);

    return (
        <div>
            <Userbar>
                <FindUsers presentRows={users} find={findUsers} />
            </Userbar>
            <div className="users__addbar">
                <h2 className="users__title">Панель управления пользователями</h2>
                <AddUsers add={props.addUser} currentUsers={users}/>
            </div>
            <div className="users__data">
                <h2 className="users__title">Учетные записи пользователей</h2>
                <UsersTable
                    users={presentUsers}
                    deleteUser={props.deleteUser}
                    updateUser={props.updateUser}/>
            </div>
        </div>
    );
}

export default usersWorkspace;
