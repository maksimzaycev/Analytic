import React from 'react';
import UsersTable from './React.users.table';
import FindUsers from './React.users.find';
import AddUsers from './React.users.add';
import Userbar from './React.userbar';

import 'react-vis/dist/style.css';
import '../css/main.css';

const usersWorkspace = () => {
    return (
        <div>
            <Userbar>
                <FindUsers/>
            </Userbar>
            <div className="users__addbar">
                <h2 className="users__title">Панель управления пользователями</h2>
                <AddUsers/>
            </div>
            <div className="users__data">
                <h2 className="users__title">Учетные записи пользователей</h2>
                <UsersTable/>
            </div>
        </div>
    );
}

export default usersWorkspace;
