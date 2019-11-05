import React from 'react';
import '../css/main.css';

function FindUsers(props) {
    function handleSearch(event) {
        var searchQuery = event.target.value.toLowerCase();
        var foundUsers = props.presentRows.filter(function(el) {
            var searchValue1 = el.time.toLowerCase();
            var searchValue2 = el.code.toLowerCase();
            var searchValue3 = el.text.toLowerCase();
            return ((searchValue1.indexOf(searchQuery) !== -1) || (searchValue2.indexOf(searchQuery) !== -1) || (searchValue3.indexOf(searchQuery) !== -1));
        });
        props.find(foundUsers);
    }

    return (
        <input type="text"  className="userbar__finder" onChange={handleSearch} placeholder="Поиск пользователя по имени, организации и подразделению..." />
    );
}

export default FindUsers;
