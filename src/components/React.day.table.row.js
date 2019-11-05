import React from 'react';
import '../css/main.css';

class DayRowTable extends React.Component {
    render() {
        return (
            <tr className="day__row--body" data-id={this.props.id}>
                <td className="day__cell day__cell--body">{this.props.start} - {this.props.finish}</td>
                <td className="day__cell day__cell--body">{this.props.users}</td>
                <td className="day__cell day__cell--body">{this.props.visits}</td>
                <td className="day__cell day__cell--body">{this.props.views}</td>
            </tr>
        );
    }
}

export default DayRowTable;
