import React, { useState, useEffect } from 'react';
import UsersRowTable from './React.users.table.row';
import UsersRowNull from './React.users.table.rowNull';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort as fasSort} from '@fortawesome/free-solid-svg-icons'
import '../css/main.css';

const usersTable = (props) => {
    let [users, setUsers] = useState(props.users);
    let [sortingName, setSortingName] = useState(false);
    let [sortingCompany, setSortingCompany] = useState(false);
    let [sortingUnit, setSortingUnit] = useState(false);
    let [sortingFinishDate, setSortingFinishDate] = useState(false);
    let [sortingDays, setSortingDays] = useState(false);

    useEffect(() => {
        let sortRows = props.users;
        let toggleSort = sortingName;

        sortRows.sort((a, b) => {
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        });
        
        if (toggleSort) sortRows.reverse()
        toggleSort = !toggleSort;

        setUsers(sortRows);
        setSortingName(toggleSort);

    }, [props.users]);

    const sortByName = () => {
        var toggleSort = sortingName;
        var sortRows = users;

        sortRows.sort((a, b) => {
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        });

        if (toggleSort) sortRows.reverse();

        toggleSort = !toggleSort;

        setUsers(sortRows);
        setSortingName(toggleSort);
    };

    const sortByDays = () => {
        var toggleSort = sortingDays;
        var sortRows = users;

        sortRows.sort((a, b) => a.days - b.days);
        
        if (toggleSort) sortRows.reverse();

        toggleSort = !toggleSort;

        setUsers(sortRows);
        setSortingDays(toggleSort);
    };

    const sortByCompany = () => {
        var toggleSort = sortingCompany;
        var sortRows = users;

        sortRows.sort(function(a, b) {
            var companyA = a.company.toLowerCase();
            var companyB = b.company.toLowerCase();
            if (companyA < companyB)
                return -1
            if (companyA > companyB)
                return 1
            return 0
        });
        
        if (toggleSort) sortRows.reverse();

        toggleSort = !toggleSort;

        setUsers(sortRows);
        setSortingCompany(toggleSort);
    };

    const sortByUnit = () => {
        var toggleSort = sortingUnit;
        var sortRows = users;

        sortRows.sort((a, b) => {
            var companyA = a.unit.toLowerCase();
            var companyB = b.unit.toLowerCase();
            if (companyA < companyB)
                return -1
            if (companyA > companyB)
                return 1
            return 0
        });
        
        if (toggleSort) sortRows.reverse();

        toggleSort = !toggleSort;

        setUsers(sortRows);
        setSortingUnit(toggleSort);
    };

    const sortByFinishDate = () => {
        let toggleSort = sortingFinishDate;
        let sortRows = users;

        sortRows.sort((a, b) => {
            let dateA = moment(b.finishDate, 'DD.MM.YY');
            let dateB = moment(a.finishDate, 'DD.MM.YY');
            return dateA > dateB ? -1 : a < b ? 1 : 0;
        });

        if (toggleSort) sortRows.reverse();

        toggleSort = !toggleSort;

        setUsers(sortRows);
        setSortingFinishDate(toggleSort);
    };

    console.log(users);

    return (
        <table className="users__table">
            <thead className="users__thead">
                <tr className="users__row table__row--head">
                    <td className="users__cell users__cell--head users__cell--action"></td>
                    <td className="users__cell users__cell--head users__cell--name left"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByName} />{" "}Имя пользователя</td>
                    <td className="users__cell users__cell--head users__cell--company left"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByCompany} />{" "}Компания</td>
                    <td className="users__cell users__cell--head users__cell--unit left"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByUnit} />{" "}Отдел</td>
                    <td className="users__cell users__cell--head users__cell--finishDate"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByFinishDate} />{" "}Окончание пароля</td>
                    <td className="users__cell users__cell--head users__cell--days"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={sortByDays} />{" "}Дней</td>
                    <td className="users__cell users__cell--head users__cell--actions"></td>
                </tr>
            </thead>
            <tbody>
            {
                (users.length !== 0) ? (
                users.map(user => (
                    <UsersRowTable
                        key={user.id}
                        user={user}
                        updateUser={props.updateUser}
                        deleteUser={props.deleteUser}
                    /> )
                )) : <UsersRowNull />
            }
            </tbody>
        </table>
    );
}

export default usersTable;