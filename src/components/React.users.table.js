import React from 'react';
import UsersRowTable from './React.users.table.row';
import UsersRowNull from './React.users.table.rowNull';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort as fasSort} from '@fortawesome/free-solid-svg-icons'
import '../css/main.css';

class UsersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            waySortId: false,
            waySortName: false,
            waySortCompany: false,
            waySortUnit: false,
            waySortFinishDate: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rows: nextProps.rows
        });
    }

    sortById = () => {
        var toggleSort = this.state.waySortId;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            return a.id - b.id
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
            waySortId: toggleSort
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

    sortByDays = () => {
        var toggleSort = this.state.waySortDays;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            return a.days - b.days
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
            waySortDays: toggleSort
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

    sortByUnit = () => {
        var toggleSort = this.state.waySortUnit;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            var companyA = a.unit.toLowerCase();
            var companyB = b.unit.toLowerCase();
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
            waySortUnit: toggleSort
        });
    };

    sortByFinishDate = () => {
        let toggleSort = this.state.waySortFinishDate;
        let sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            let dateA = moment(b.finishDate, 'DD.MM.YY');
            let dateB = moment(a.finishDate, 'DD.MM.YY');
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
            waySortFinishDate: toggleSort
        });
    };

    sortByLastDate = () => {
        let toggleSort = this.state.waySortLastDate;
        let sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            let dateA = moment(b.lastDate, 'DD.MM.YY');
            let dateB = moment(a.lastDate, 'DD.MM.YY');
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
            waySortLastDate: toggleSort
        });
    };

    render() {
        return (
            <table className="users__table">
                <thead>
                    <tr className="users__row table__row--head">
                        <td className="users__cell users__cell--head users__cell--action"></td>
                        <td className="users__cell users__cell--head users__cell--name left"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByName} />{" "}Имя пользователя</td>
                        <td className="users__cell users__cell--head users__cell--company left"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByCompany} />{" "}Компания</td>
                        <td className="users__cell users__cell--head users__cell--unit left"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByUnit} />{" "}Отдел</td>
                        <td className="users__cell users__cell--head users__cell--finishDate"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByFinishDate} />{" "}Окончание пароля</td>
                        <td className="users__cell users__cell--head users__cell--days"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByDays} />{" "}Дней</td>
                        <td className="users__cell users__cell--head users__cell--actions"></td>
                    </tr>
                </thead>
                <tbody>
                {
                    (this.state.rows.length !== 0) ? (
                    this.state.rows.map(row => (
                        <UsersRowTable
                            key={row.id}
                            id={row.id}
                            name={row.name}
                            company={row.company}
                            unit={row.unit}
                            status={row.status}
                            days={row.days}
                            finishDate={row.finishDate}
                            update={this.props.update}
                            remove={this.props.remove}
                        /> )
                    )) : <UsersRowNull />
                }
                </tbody>
            </table>
        );
    }
}

export default UsersTable;