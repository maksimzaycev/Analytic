import React from 'react';
import Navigation from './React.nav';
import UsersWorkspace from './React.users.workspace';
import dataLoad from '../models/dataLoad';
import Loader from './React.loader';
import '../css/main.css';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false
        };
    }
    
    UNSAFE_componentWillMount() {
        this.loadData();
    }

    loadData() {
        var urlUsers = 'http://localhost:3000/users';

        dataLoad(urlUsers).then(users => {
            var usersItems = JSON.parse(users);
            this.setState({
                users: usersItems,
                loading: true
            });
        }).catch(function(users) {
            console.log('error ' + users);
        })
    }

    render() {
        return (
            <div id="maskComponent">
                {!this.state.loading ? <Loader /> : null}
                <div className="sidebar" id="sidebar">
                    <Navigation activeItem={7712} />
                </div>
                <div className="panel" id="panel">
                    <UsersWorkspace users={this.state.users}/>
                </div>                        
            </div>
        );
    }
}

export default Users;