import React from 'react';
import '../css/main.css';

class MonthRowTable extends React.Component {
    render() {
        return (
            <tr className="month__row--body" data-id={this.props.id}>
                <td className="month__cell month__cell--body month__cell--date">{this.props.date}</td>
                <td className="month__cell month__cell--body month__cell--users">{this.props.users}</td>
                <td className="month__cell month__cell--body month__cell--visits">{this.props.visits}</td>
                <td className="month__cell month__cell--body month__cell--views">{this.props.views}</td>
            </tr>
        );
    }
}

export default MonthRowTable;
