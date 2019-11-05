import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort as fasSort} from '@fortawesome/free-solid-svg-icons'
import VisitsRowTable from './React.visits.table.row';
import VisitsRowNull from './React.visits.table.rowNull';
import '../css/main.css';

class VisitsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            waySortName: false,
            waySortCompany: false,
            waySortVisits: false,
            waySortViews: true
        };
    }

    componentWillReceiveProps(nextProps) {
        var sortRows = nextProps.rows;
        var toggleSort = this.state.waySortViews;

        sortRows.sort(function(a, b) {
            return a.userViews - b.userViews
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

    }

    sortByName = () => {
        var toggleSort = this.state.waySortName;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            var nameA = a.userName.toLowerCase();
            var nameB = b.userName.toLowerCase();
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
            var companyA = a.userCompany.toLowerCase();
            var companyB = b.userCompany.toLowerCase();
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

    sortByVisits = () => {
        var toggleSort = this.state.waySortVisits;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            return a.userVisits - b.userVisits
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
            return a.userViews - b.userViews
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
            <table className="visits__table">
                <thead>
                    <tr className="visits__row visits__row--head">
                        <td className="visits__cell visits__cell--head visits__cell--user"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByName} /> Пользователь</td>
                        <td className="visits__cell visits__cell--head visits__cell--company"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByCompany} /> Организиция</td>
                        <td className="visits__cell visits__cell--head visits__cell--visits"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByVisits} /> Визитов</td>
                        <td className="visits__cell visits__cell--head visits__cell--views"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByViews} /> Просмотров</td>
                    </tr>
                </thead>
                <tbody>
                {
                    (this.state.rows.length !== 0) ? (
                    this.state.rows.map((row, i) => (
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

}

export default VisitsTable;
