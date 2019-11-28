import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAlphaUp as fasSortAlphaUp} from '@fortawesome/free-solid-svg-icons'
import { faSortAlphaDown as fasSortAlphaDown} from '@fortawesome/free-solid-svg-icons'
import { faSortNumericUp as fasSortNumericUp} from '@fortawesome/free-solid-svg-icons'
import { faSortNumericDown as fasSortNumericDown} from '@fortawesome/free-solid-svg-icons'
import ReportsRowTable from './React.reports.table.row';
import ReportsRowNull from './React.reports.table.rowNull';
import '../css/main.css';

const reportsTable = (props) => {
    let [rows, setRows] = useState(props.presentReports);
    let [sortingName, setSortingName] = useState(false);
    let [sortingCount, setSortingCount] = useState(false);

    useEffect(() => setRows(props.presentReports), [props.presentReports])

    let sortByCount = () => {
        let toggleSort = sortingCount;
        let sortRows = rows;

        sortRows.sort((a, b) => a.count - b.count);
        
        if (toggleSort) sortRows.reverse();

        toggleSort = !toggleSort;

        setRows(sortRows);
        setSortingCount(toggleSort);
    };

    let sortByName = () => {
        let toggleSort = sortingName;
        let sortRows = rows;

        sortRows.sort(function(a, b) {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        });

        if (toggleSort) sortRows.reverse();

        toggleSort = !toggleSort;

        setRows(sortRows);
        setSortingName(toggleSort);
    };

    return (
        <table className="reports__table">
            <thead>
                <tr className="reports__row reports__row--head">
                    <td className="reports__cell reports__cell--head reports__cell--circle"> </td>
                    <td className="reports__cell reports__cell--head reports__cell--title">
                        {
                            sortingName ?
                            <FontAwesomeIcon className="sortIcon" icon={fasSortAlphaDown} color="#0079c2" onClick={sortByName} /> :
                            <FontAwesomeIcon className="sortIcon" icon={fasSortAlphaUp} color="#0079c2" onClick={sortByName} />
                        }
                        {" Название отчета"}
                    </td>
                    <td className="reports__cell reports__cell--head reports__cell--visits">
                        {
                            sortingCount ?
                            <FontAwesomeIcon className="sortIcon" icon={fasSortNumericDown} color="#0079c2" onClick={sortByCount} /> :
                            <FontAwesomeIcon className="sortIcon" icon={fasSortNumericUp} color="#0079c2" onClick={sortByCount} />
                        }
                        {" Количество обращений"}
                    </td>
                </tr>
            </thead>
            <tbody>
            {
                (rows.length !== 0) ? (
                rows.map((row, i) => (
                    <ReportsRowTable
                        key={i}
                        index={i}
                        id={row.id}
                        name={row.name}
                        count={row.count}
                        color={row.color}
                        type={row.link}
                        display={row.display}
                        toggleReport={props.toggleReport}
                    /> )
                )) : <ReportsRowNull />
            }
            </tbody>
        </table>
    );
}

export default reportsTable;
