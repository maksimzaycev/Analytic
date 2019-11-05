import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort as fasSort} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import MonthRowTable from './React.month.table.row';
import '../css/main.css';

class MonthTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            waySortDate: true,
            waySortUser: false,
            waySortVisits: false,
            waySortViews: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rows: nextProps.rows
        });
    }

    sortByDate = () => {
        let toggleSort = this.state.waySortDate;
        let sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            let dateA = moment(b.date, 'DD.MM');
            let dateB = moment(a.date, 'DD.MM');
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

    sortByUsers = () => {
        var toggleSort = this.state.waySortUsers;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            return a.users - b.users
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
            waySortUsers: toggleSort
        });
    };

    sortByVisits = () => {
        var toggleSort = this.state.waySortVisits;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            return a.visits - b.visits
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
            waySortVisits: toggleSort
        });
    };

    sortByViews = () => {
        var toggleSort = this.state.waySortConversions;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            return a.views - b.views
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
            waySortViews: toggleSort
        });
    };

    render() {
        return (
            <table className="month__table">
                <thead>
                    <tr className="month__row--head">
                        <td className="month__cell month__cell--head month__cell--date"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByDate} /> Дата</td>
                        <td className="month__cell month__cell--head month__cell--users"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByUsers} /> Пользователей</td>
                        <td className="month__cell month__cell--head month__cell--visits"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByVisits} /> Визитов</td>
                        <td className="month__cell month__cell--head month__cell--views"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByViews} /> Просмотров</td>
                    </tr>
                </thead>
                <tbody>

                {
                    this.state.rows.map((row, i) => (
                        <MonthRowTable
                            key={i}
                            index={i}
                            id={row.id}
                            date={row.date}
                            users={row.users}
                            visits={row.visits}
                            views={row.views}
                        /> )
                    )
                }
                </tbody>

            </table>
        );
    }

}

export default MonthTable;
