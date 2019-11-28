import React from 'react';
import '../css/main.css';

const findReports = (props) => {
    const handleSearch = (event) => {
        var searchQuery = event.target.value.toLowerCase();
        var foundUsers = props.reports.filter(function(el) {
            var searchValue1 = el.name.toLowerCase();
            return (searchValue1.indexOf(searchQuery) !== -1);
        });
        props.findReports(foundUsers);
    }

    return (
        <input type="text" className="userbar__finder" onChange={handleSearch} placeholder="Поиск..." />
    );
}

export default findReports;
