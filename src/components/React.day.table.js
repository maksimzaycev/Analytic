import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort as fasSort} from '@fortawesome/free-solid-svg-icons'
import DayRowTable from './React.day.table.row';
import '../css/main.css';

const dayTable = (props) => {
    let [rows, setRows] = useState(props.rows);
    let [sortingUsers, setSortingUsers] = useState(false);
    let [sortingTime, setSortingTime] = useState(false);
    let [sortingVisits, setSortingVisits] = useState(false);
    let [sortingViews, setSortingViews] = useState(false);

    useEffect(() => setRows(props.rows), [props.rows]);

    const sortByVisits = () => {
        var toggleSort = sortingVisits;
        var sortRows = rows;

        sortRows.sort((a, b) => a.visits - b.visits);

        if (toggleSort) sortRows.reverse()
        toggleSort ? toggleSort = false : toggleSort = true;

        setRows(sortRows);
        setSortingVisits(toggleSort);
    };

    const sortByViews = () => {
        var toggleSort = sortingViews;
        var sortRows = rows;

        sortRows.sort((a, b) => a.views - b.views);
        
        if (toggleSort) sortRows.reverse()
        toggleSort ? toggleSort = false : toggleSort = true;

        setRows(sortRows);
        setSortingViews(toggleSort);
    };
    
    const sortByUsers = () => {
        var toggleSort = sortingUsers;
        var sortRows = rows;

        sortRows.sort((a, b) => a.users - b.users);
        
        if (toggleSort) sortRows.reverse()
        toggleSort ? toggleSort = false : toggleSort = true;

        setRows(sortRows);
        setSortingUsers(toggleSort);
    };

    const sortByTime = () => {
        var toggleSort = sortingTime;
        var sortRows = rows;

        sortRows.sort(function(a, b) {
            var timeA = a.start.toLowerCase();
            var timeB = b.start.toLowerCase();
            if (timeA < timeB)
                return -1
            if (timeA > timeB)
                return 1
            return 0
        });

        if (toggleSort) sortRows.reverse()
        toggleSort ? toggleSort = false : toggleSort = true;

        setRows(sortRows);
        setSortingTime(toggleSort);
    };

    return (
        <table className="day__table">
            <thead>
                <tr className="day__row--head">
                    <td className="day__cell day__cell--head day__cell--period"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByTime} /> Интервал</td>
                    <td className="day__cell day__cell--head day__cell--users"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByUsers} /> Пользователи</td>
                    <td className="day__cell day__cell--head day__cell--visits"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByVisits} /> Визиты</td>
                    <td className="day__cell day__cell--head day__cell--views"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByViews} /> Просмотры</td>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, i) => (
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

export default dayTable;
