import React, { useContext } from 'react';
import Context from './React.context';
import '../css/main.css';

const findUsersManager = () => {
    console.log(useContext(Context));
    const { users } = useContext(Context);
    const { findUsers } = useContext(Context);

    const handleSearch = (event) => {
        var searchQuery = event.target.value.toLowerCase();
        var foundProjects = users.filter((el) => {
            var searchValue1 = el.name.toLowerCase();
            var searchValue2 = el.company.toLowerCase();
            var searchValue3 = el.unit.toLowerCase();
            return ((searchValue1.indexOf(searchQuery) !== -1) || (searchValue2.indexOf(searchQuery) !== -1) || (searchValue3.indexOf(searchQuery) !== -1));
        });
        findUsers(foundProjects);
    }


    return (
        <input type="text" className="userbar__finder" onChange={handleSearch} placeholder="Поиск пользователя..." />
    );
}

export default findUsersManager;
