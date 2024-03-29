import React, { useState, useEffect, useContext } from 'react';
import AppContext from './React.context';
import '../css/main.css';

const findVisits = (props) => {
    let [presentVisits, setPresentVisits] = useState(props.visits);
    useEffect(() => {
        setPresentVisits(props.visits);
    },[props.visits]);
    
    let handleSearch = (event) => {
        var searchQuery = event.target.value.toLowerCase();
        var foundUsers = presentVisits.filter(function(el) {
            var searchValue1 = el.userName.toLowerCase();
            var searchValue2 = el.userCompany.toLowerCase();
            return ((searchValue1.indexOf(searchQuery) !== -1) || (searchValue2.indexOf(searchQuery) !== -1));
        });

        props.findVisits(foundUsers);
    }

    const colors = useContext(AppContext);
    console.log('Цвета в поиске');
    console.log(colors);

    return (
        <input type="text" className="userbar__finder" onChange={(event) => handleSearch(event)} placeholder="Поиск..." />
    );
    
}

export default findVisits;
