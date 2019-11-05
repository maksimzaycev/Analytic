import React from 'react';
import '../css/main.css';

class FindDay extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event) {
        var searchQuery = event.target.value.toLowerCase();
        var foundUsers = this.props.presentRows.filter(function(el) {
            var searchValue1 = el.start;
            var searchValue2 = el.finish;
            return ((searchValue1.indexOf(searchQuery) !== -1) || (searchValue2.indexOf(searchQuery) !== -1));
        });

        this.props.find(foundUsers);
    }

    render() {
        return (
            <input type="text" className="userbar__finder" onChange={this.handleSearch} placeholder="Поиск..." />
        );
    }
}

export default FindDay;
