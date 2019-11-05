import React, { Component } from 'react';
import '../css/main.css';

class FindLogs extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event) {
        var searchQuery = event.target.value.toLowerCase();
        var foundUsers = this.props.presentRows.filter(function(el) {
            var searchValue1 = el.name.toLowerCase();
            var searchValue2 = el.company.toLowerCase();
            return ((searchValue1.indexOf(searchQuery) !== -1) || (searchValue2.indexOf(searchQuery) !== -1));
        });
        this.props.find(foundUsers);
    }

    render() {
        return (
            <div className="filter__elements">
                <input type="text" className="filter__finder" onChange={this.handleSearch} placeholder="Поиск пользователя по имени и организации..." />
            </div>
        );
    }
}

export default FindLogs;
