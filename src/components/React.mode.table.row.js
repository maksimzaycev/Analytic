import React from 'react';
import '../css/main.css';

class ModeRowTable extends React.Component {
    render() {
        return (
            <tr className="mode__row mode__row--body" data-id={this.props.id}>
                <td className="mode__cell mode__cell--body">{this.props.date}</td>
                <td className="mode__cell mode__cell--body">{this.props.goodBegin}</td>
                <td className="mode__cell mode__cell--body">{this.props.bedBegin}</td>
                <td className="mode__cell mode__cell--body">{this.props.goodEnd}</td>
                <td className="mode__cell mode__cell--body">{this.props.bedEnd}</td>
            </tr>
        );
    }
}

export default ModeRowTable;
