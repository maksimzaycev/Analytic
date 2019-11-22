import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort as fasSort} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import LogsRowTable from './React.logs.table.row';
import LogsRowNull from './React.logs.table.rowNull';
import '../css/main.css';

class LogsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            waySortTime: false,
            waySortDate: false,
            waySortName: false,
            waySortCompany: false,
            waySortLong: false,
            waySortPages: false
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            rows: nextProps.rows
        });
    }

    sortByTime = () => {
        let toggleSort = this.state.waySortTime;
        let sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            let timeA = moment(b.time, 'HH:mm');
            let timeB = moment(a.time, 'HH:mm');
            return timeA > timeB ? -1 : a < b ? 1 : 0;  
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

    sortByDate = () => {
        let toggleSort = this.state.waySortDate;
        let sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            let dateA = moment(b.date, 'DD.MM.YYYY');
            let dateB = moment(a.date, 'DD.MM.YYYY');
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
            waySortDate: toggleSort
        });
    };

    sortByName = () => {
        var toggleSort = this.state.waySortName;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
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
            waySortName: toggleSort
        });
    };

    sortByCompany = () => {
        var toggleSort = this.state.waySortCompany;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            var companyA = a.company.toLowerCase();
            var companyB = b.company.toLowerCase();
            if (companyA < companyB)
                return -1
            if (companyA > companyB)
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
            waySortCompany: toggleSort
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

    render() {
        return (
            <div className="logs__table">
                <div className="logs__head-row">
                    <div className="logs__head-cell logs__head-cell--action"></div>
                    <div className="logs__head-cell logs__head-cell--date"><FontAwesomeIcon icon={fasSort} color="#0079c2" onClick={this.sortByDate} /> Дата</div>
                    <div className="logs__head-cell logs__head-cell--time"><FontAwesomeIcon icon={fasSort} color="#0079c2" onClick={this.sortByTime} /> Время</div>
                    <div className="logs__head-cell logs__head-cell--name"><FontAwesomeIcon icon={fasSort} color="#0079c2" onClick={this.sortByName} /> Пользователь</div>
                    <div className="logs__head-cell logs__head-cell--company"><FontAwesomeIcon icon={fasSort} color="#0079c2" onClick={this.sortByCompany} /> Организиция</div>
                    <div className="logs__head-cell logs__head-cell--pages"><FontAwesomeIcon icon={fasSort} color="#0079c2" onClick={this.sortByPages} /> Просмотров</div>
                    <div className="logs__head-cell logs__head-cell--longFull"><FontAwesomeIcon icon={fasSort} color="#0079c2" onClick={this.sortByLong} /> Длительность</div>
                    <div className="logs__head-cell logs__head-cell--actions"></div>
                </div>
                {
                    (this.state.rows.length !== 0) ? (
                        this.state.rows.map((row, i) => (
                            <LogsRowTable
                                key={row.id}
                                id={row.id}
                                userId={row.userId}
                                index={i}
                                date={row.date}
                                time={row.time}
                                name={row.name}
                                company={row.company}
                                long={row.long}
                                pages={row.logItems.length}
                                logItems={row.logItems}
                                updateRow={this.props.updateRow}
                                removeRow={this.props.removeRow}
                            />
                        ))
                    ) : <LogsRowNull />
                }
            </div>
        );
    }
}

export default LogsTable;