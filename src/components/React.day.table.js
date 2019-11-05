import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort as fasSort} from '@fortawesome/free-solid-svg-icons'
import DayRowTable from './React.day.table.row';
import '../css/main.css';

class DayTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            waySortUsers: true,
            waySortVisits: true,
            waySortViews: true,
            waySortTime: true
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rows: nextProps.rows
        });
    }

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
        var toggleSort = this.state.waySortViews;
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

    sortByTime = () => {
        var toggleSort = this.state.waySortTime;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            var timeA = a.start.toLowerCase();
            var timeB = b.start.toLowerCase();
            if (timeA < timeB)
                return -1
            if (timeA > timeB)
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
            waySortTime: toggleSort
        });
    };

    render() {
        return (
            <table className="day__table">
                <thead>
                    <tr className="day__row--head">
                        <td className="day__cell day__cell--head day__cell--period"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByTime} /> Интервал</td>
                        <td className="day__cell day__cell--head day__cell--users"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByUsers} /> Пользователи</td>
                        <td className="day__cell day__cell--head day__cell--visits"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByVisits} /> Визиты</td>
                        <td className="day__cell day__cell--head day__cell--views"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByViews} /> Просмотры</td>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.rows.map((row, i) => (
                        <DayRowTable
                            key={i}
                            index={i}
                            id={row.id}
                            start={row.start}
                            finish={row.finish}
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

export default DayTable;
