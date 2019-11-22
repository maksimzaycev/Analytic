import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort as fasSort} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import UserRowTable from './React.user.table.row';
import UserRowNull from './React.user.table.rowNull';
import '../css/main.css';

class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            waySortTime: false,
            waySortLong: false,
            waySortPages: false
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        var sortRows = nextProps.rows;

        sortRows.sort(function(a, b) {
            var dateA = moment(b.time, 'DD.MM HH:mm');
            var dateB = moment(a.time, 'DD.MM HH:mm');
            return dateA > dateB ? -1 : a < b ? 1 : 0;
        });

        sortRows.reverse();

        this.setState({
            rows: sortRows,
            waySortTime: false,
        });
    }

    sortByTime = () => {
        let toggleSort = this.state.waySortTime;
        let sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            let dateA = moment(b.time, 'DD.MM HH:mm');
            let dateB = moment(a.time, 'DD.MM HH:mm');
            return dateA > dateB ? -1 : a < b ? 1 : 0;
        });

        if (toggleSort) {
            sortRows.reverse();
        }

        if (toggleSort) {
            toggleSort = false;
        } else {
            toggleSort = true;
        }

        this.setState({
            rows: sortRows,
            waySortTime: toggleSort
        });
    };

    sortByLong = () => {
        let toggleSort = this.state.waySortLong;
        let sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            let dateA = moment(b.long, 'HH:mm');
            let dateB = moment(a.long, 'HH:mm');
            return dateA > dateB ? -1 : a < b ? 1 : 0;
        });

        if (toggleSort) {
            sortRows.reverse();
        }

        if (toggleSort) {
            toggleSort = false;
        } else {
            toggleSort = true;
        }

        this.setState({
            rows: sortRows,
            waySortLong: toggleSort
        });
    };

    sortByPages = () => {
        var toggleSort = this.state.waySortPages;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            return a.pages - b.pages
        });
        
        if (toggleSort) {
            sortRows.reverse();
        }

        if (toggleSort) {
            toggleSort = false;
        } else {
            toggleSort = true;
        }

        this.setState({
            rows: sortRows,
            waySortPages: toggleSort
        });
    };

    sortBySize = () => {
        var toggleSort = this.state.waySortSize;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            var nameA = a.size.toLowerCase();
            var nameB = b.size.toLowerCase();
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        });

        if (toggleSort) {
            sortRows.reverse();
        }

        if (toggleSort) {
            toggleSort = false;
        } else {
            toggleSort = true;
        }

        this.setState({
            rows: sortRows,
            waySortSize: toggleSort
        });
    };

    sortByLast = () => {
        var toggleSort = this.state.waySortLast;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            return a.last - b.last
        });
        
        if (toggleSort) {
            sortRows.reverse();
        }

        if (toggleSort) {
            toggleSort = false;
        } else {
            toggleSort = true;
        }

        this.setState({
            rows: sortRows,
            waySortLast: toggleSort
        });
    };

    sortByServer = () => {
        var toggleSort = this.state.waySortServer;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            var nameA = a.server.toLowerCase();
            var nameB = b.server.toLowerCase();
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        });

        if (toggleSort) {
            sortRows.reverse();
        }

        if (toggleSort) {
            toggleSort = false;
        } else {
            toggleSort = true;
        }

        this.setState({
            rows: sortRows,
            waySortServer: toggleSort
        });
    };

    render() {
        return (
            <div className="user__table">
                <div className="user__head-row">
                    <div className="user__head-cell user__head-cell--action"></div>
                    <div className="user__head-cell user__head-cell--time"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByTime} /> Дата визита</div>
                    <div className="user__head-cell user__head-cell--longFull"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByLong} /> Длительность</div>
                    <div className="user__head-cell user__head-cell--pages"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByPages} /> Просмотров</div>
                </div>
                {
                    (this.state.rows.length !== 0) ? (
                    this.state.rows.map((row, i) => (
                        <UserRowTable
                            key={row.id}
                            id={row.id}
                            index={i}
                            time={row.time}
                            long={row.long}
                            pages={row.logItems.length}
                            logItems={row.logItems}
                        /> )
                    )) : <UserRowNull />
                }
            </div>
        );
    }

}

export default UserTable;
