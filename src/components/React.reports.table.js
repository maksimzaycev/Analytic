import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSortAlphaUp as fasSortAlphaUp} from '@fortawesome/free-solid-svg-icons'
import { faSortAlphaDown as fasSortAlphaDown} from '@fortawesome/free-solid-svg-icons'

import { faSortNumericUp as fasSortNumericUp} from '@fortawesome/free-solid-svg-icons'
import { faSortNumericDown as fasSortNumericDown} from '@fortawesome/free-solid-svg-icons'

import ReportsRowTable from './React.reports.table.row';
import ReportsRowNull from './React.reports.table.rowNull';
import '../css/main.css';

class ReportsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            waySortCount: false,
            waySortName: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rows: nextProps.rows
        });
    }

    sortByCount = () => {
        let toggleSort = this.state.waySortCount;
        let sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            return a.count - b.count
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
            waySortCount: toggleSort
        });
    };

    sortByName = () => {
        let toggleSort = this.state.waySortName;
        let sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
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

    render() {
        return (
            <table className="reports__table">
                <thead>
                    <tr className="reports__row reports__row--head">
                        <td className="reports__cell reports__cell--head reports__cell--circle"> </td>
                        <td className="reports__cell reports__cell--head reports__cell--title">
                            {
                                this.state.waySortName ?
                                <FontAwesomeIcon className="sortIcon" icon={fasSortAlphaDown} color="#0079c2" onClick={this.sortByName} /> :
                                <FontAwesomeIcon className="sortIcon" icon={fasSortAlphaUp} color="#0079c2" onClick={this.sortByName} />
                            }
                            {" Название отчета"}
                        </td>
                        <td className="reports__cell reports__cell--head reports__cell--visits">
                            {
                                this.state.waySortCount ?
                                <FontAwesomeIcon className="sortIcon" icon={fasSortNumericDown} color="#0079c2" onClick={this.sortByCount} /> :
                                <FontAwesomeIcon className="sortIcon" icon={fasSortNumericUp} color="#0079c2" onClick={this.sortByCount} />
                            }
                            {" Количество обращений"}
                        </td>
                    </tr>
                </thead>
                <tbody>
                {
                    (this.state.rows.length !== 0) ? (
                    this.state.rows.map((row, i) => (
                        <ReportsRowTable
                            key={i}
                            index={i}
                            id={row.id}
                            name={row.name}
                            count={row.count}
                            color={row.color}
                            type={row.link}
                            active={row.display}
                            toggleChart={this.props.toggleChart}
                        /> )
                    )) : <ReportsRowNull />
                }
                </tbody>
            </table>
        );
    }

}

export default ReportsTable;
