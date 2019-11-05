import React from 'react';
import Navigation from './React.nav';
import dataLoad from '../models/dataLoad';
import Loader from './React.loader';
import '../css/main.css';

class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false
        };
    }

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        var urlUsers = 'http://localhost:3000/users';

        
        dataLoad(urlUsers)
            .then(responseUsers => JSON.parse(responseUsers))
            .then(users => this.parseData(users))
            .catch(responseUsers => console.log('error ' + responseUsers));
    }

    parseData(users) {
        console.log('Полученный список пользователей');
        console.log(users);

        var test = users.map(element => {
            return parseInt(element.id);
        });

        console.log('Числа');
        console.log(test);

        console.log('Отсортированный список');
        console.log(test.sort((a, b) => a - b));

        this.setState({
            users: users,
            loading: true
        });
    }

    render() {
        return (
            <div id="maskComponent">
                {!this.state.loading ? <Loader /> : null}
                <div className="sidebar" id="sidebar">
                    <Navigation activeItem={7712} />
                </div>
                <div className="panel" id="panel">

                </div>                        
            </div>
        );
    }
}

export default People;