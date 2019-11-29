import React, { useState, useEffect } from 'react';
import Navigation from './React.nav';
import Graph from './React.graph';
import dataLoad from '../models/dataLoad';
import Loader from './React.loader';
import '../css/main.css';

const urlUsers = 'http://localhost:3000/users';

const people = (props) => {
    let [loading, setLoading] = useState(true);
    let [users, setUsers] = useState(null);

    useEffect(() => {
        dataLoad(urlUsers)
            .then(responseUsers => JSON.parse(responseUsers))
            .then(resultUsers => {
                console.log(resultUsers);
                console.log(users);
                setUsers(resultUsers);
                setLoading(false);
            })
            .catch(responseUsers => console.log('error ' + responseUsers));
    },[]);

    return (
        <div id="maskComponent">
            {loading ? <Loader /> : null}
            <div className="sidebar" id="sidebar">
                <Navigation activeItem={7712} />
            </div>
            <div className="panel" id="panel">
                <Graph/>
            </div>                       
        </div>
    );
}

export default people;