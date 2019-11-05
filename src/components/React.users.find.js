import React from 'react';
import '../css/main.css';

class FindUsersManager extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event) {
        var searchQuery = event.target.value.toLowerCase();
        var foundProjects = this.props.presentRows.filter(function(el) {
            var searchValue1 = el.name.toLowerCase();
            var searchValue2 = el.company.toLowerCase();
            var searchValue3 = el.unit.toLowerCase();
            return ((searchValue1.indexOf(searchQuery) !== -1) || (searchValue2.indexOf(searchQuery) !== -1) || (searchValue3.indexOf(searchQuery) !== -1));
        });
        this.props.find(foundProjects);
    }

    render() {
        return (
            <input type="text" className="userbar__finder" onChange={this.handleSearch} placeholder="Поиск пользователя..." />
        );
    }
}

export default FindUsersManager;
