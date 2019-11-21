import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort as fasSort} from '@fortawesome/free-solid-svg-icons'
import VisitsRowTable from './React.visits.table.row';
import VisitsRowNull from './React.visits.table.rowNull';
import '../css/main.css';

const visitsTable = (props) => {
    let [rows, setRows] = useState(props.rows);
    let [sortingName, setSortingName] = useState(false);
    let [sortingCompany, setSortingCompany] = useState(false);
    let [sortingVisits, setSortingVisits] = useState(false);
    let [sortingViews, setSortingViews] = useState(false);

    useEffect(() => {
        let sortRows = props.rows;
        let toggleSort = sortingViews;

        sortRows.sort((a, b) => a.userViews - b.userViews);
        
        if (toggleSort) sortRows.reverse()
        toggleSort ? toggleSort = false : toggleSort = true;

        setRows(sortRows);
        setSortingViews(toggleSort);
    }, [props.rows])

    let sortByName = () => {
        let sortRows = rows;
        let toggleSort = sortingName;
        
        sortRows.sort((a, b) => {
            let nameA = a.userName.toLowerCase();
            let nameB = b.userName.toLowerCase();
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        });

        if (toggleSort) sortRows.reverse()
        toggleSort ? toggleSort = false : toggleSort = true;

        setRows(sortRows);
        setSortingName(toggleSort);
    };

    let sortByCompany = () => {
        let toggleSort = sortingCompany;
        let sortRows = rows;

        sortRows.sort((a, b) => {
            let companyA = a.userCompany.toLowerCase();
            let companyB = b.userCompany.toLowerCase();
            if (companyA < companyB)
                return -1
            if (companyA > companyB)
                return 1
            return 0
        });
        
        if (toggleSort) sortRows.reverse()
        toggleSort ? toggleSort = false : toggleSort = true;

        setRows(sortRows);
        setSortingCompany(toggleSort);
    };

    let sortByVisits = () => {
        let toggleSort = sortingVisits;
        let sortRows = rows;

        sortRows.sort((a, b) => a.userVisits - b.userVisits);
        
        if (toggleSort) sortRows.reverse()
        toggleSort ? toggleSort = false : toggleSort = true;

        setRows(sortRows);
        setSortingVisits(toggleSort);
    };

    let sortByViews = () => {
        let toggleSort = sortingViews;
        let sortRows = rows;

        sortRows.sort((a, b) => a.userViews - b.userViews);
        
        if (toggleSort) sortRows.reverse()
        toggleSort ? toggleSort = false : toggleSort = true;

        setRows(sortRows);
        setSortingViews(toggleSort);
    };

    return (
        <table className="visits__table">
            <thead>
                <tr className="visits__row visits__row--head">
                    <td className="visits__cell visits__cell--head visits__cell--user"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByName} /> Пользователь</td>
                    <td className="visits__cell visits__cell--head visits__cell--company"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByCompany} /> Организиция</td>
                    <td className="visits__cell visits__cell--head visits__cell--visits"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByVisits} /> Визитов</td>
                    <td className="visits__cell visits__cell--head visits__cell--views"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByViews} /> Просмотров</td>
                </tr>
            </thead>
            <tbody>
            {
                (rows.length !== 0) ? (
                rows.map((row, i) => (
                    <VisitsRowTable
                        key={i}
                        index={i}
                        id={row.id}
                        name={row.userName}
                        company={row.userCompany}
                        visits={row.userVisits}
                        views={row.userViews}
                    /> )
                )) : <VisitsRowNull />
            }
            </tbody>
        </table>
    );
}

export default visitsTable;