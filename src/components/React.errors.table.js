import React from 'react';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort as fasSort} from '@fortawesome/free-solid-svg-icons'
import ErrorsRowTable from './React.errors.table.row';
import ErrorsRowNull from './React.errors.table.rowNull';
import '../css/main.css';

class ErrorsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            waySortCode: false,
            waySortTime: false
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        var sortRows = nextProps.rows;
        var toggleSort = this.state.waySortTime;

        sortRows.sort(function(a, b) {
            let dateA = moment(b.time, 'DD.MM HH:mm');
            let dateB = moment(a.time, 'DD.MM HH:mm');
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
            waySortTime: toggleSort
        });

    }

    sortByTime = () => {
        let toggleSort = this.state.waySortTime;
        let sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            let dateA = moment(b.time, 'DD.MM HH:mm');
            let dateB = moment(a.time, 'DD.MM HH:mm');
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
            waySortTime: toggleSort
        });
    };


    sortByCode = () => {
        var toggleSort = this.state.waySortCode;
        var sortRows = this.state.rows;

        sortRows.sort(function(a, b) {
            return a.code - b.code
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
            waySortCode: toggleSort
        });
    };

    render() {
        return (
            <table className="errors__table">
                <thead>
                    <tr className="errors__row errors__row--head">
                        <td className="errors__cell errors__cell--head errors__cell--time"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByTime} /> Дата</td>
                        <td className="errors__cell errors__cell--head errors__cell--code"><FontAwesomeIcon className="sortIcon" icon={fasSort} color="#0079c2" onClick={this.sortByCode} /> Код события</td>
                        <td className="errors__cell errors__cell--head errors__cell--text">Описание события</td>
                    </tr>
                </thead>
                <tbody>

                {
                    (this.state.rows.length !== 0) ? (
                    this.state.rows.map((row, i) => (
                        <ErrorsRowTable
                            key={i}
                            index={i}
                            id={row.id}
                            time={row.time}
                            code={row.code}
                            text={row.text}
                        /> )
                    )) : <ErrorsRowNull />
                }
                </tbody>

            </table>
        );
    }

}

export default ErrorsTable;
