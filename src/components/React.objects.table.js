import React from 'react';
import ObjectsRowTable from './React.objects.table.row';
import ObjectsRowNull from './React.objects.table.rowNull';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort as fasSort} from '@fortawesome/free-solid-svg-icons'
import '../css/main.css';

class ObjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            waySortId: false,
            waySortTitle: false,
            waySortPerson: false,
            waySortLink: false
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

    sortByTitle = () => {
        var toggleSort = this.state.waySortTitle;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            var nameA = a.title.toLowerCase();
            var nameB = b.title.toLowerCase();
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
            waySortTitle: toggleSort
        });
    };

    sortByPerson = () => {
        var toggleSort = this.state.waySortPerson;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            var companyA = a.person.toLowerCase();
            var companyB = b.person.toLowerCase();
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
            waySortPerson: toggleSort
        });
    };

    sortByLink = () => {
        var toggleSort = this.state.waySortLink;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            var companyA = a.link.toLowerCase();
            var companyB = b.link.toLowerCase();
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
            waySortLink: toggleSort
        });
    };

    render() {
        return (
            <table className="objects__table">
                <thead>
                    <tr className="objects__row objects__row--head">
                        <td className="objects__cell objects__cell--head objects__cell--id"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortById} />{" "}ID</td>
                        <td className="objects__cell objects__cell--head objects__cell--title"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByTitle} />{" "}Название</td>
                        <td className="objects__cell objects__cell--head objects__cell--person"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByPerson} />{" "}Ответственный</td>
                        <td className="objects__cell objects__cell--head objects__cell--active">Активность</td>
                        <td className="objects__cell objects__cell--head objects__cell--rating" colspan="3">Показатели</td>
                        <td className="objects__cell objects__cell--head objects__cell--link"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByLink} />{" "}Адрес</td>
                        <td className="objects__cell objects__cell--head objects__cell--action"></td>
                    </tr>
                </thead>
                <tbody>
                {
                    (this.state.rows.length !== 0) ? (
                    this.state.rows.map(row => (
                        <ObjectsRowTable
                            key={row.id}
                            id={row.id}
                            title={row.title}
                            person={row.person}
                            active={row.active}
                            rating={row.rating}
                            link={row.link}
                            update={this.props.update}
                            remove={this.props.remove}
                        /> )
                    )) : <ObjectsRowNull />
                }
                </tbody>

            </table>
        );
    }

}

export default ObjectsTable;
