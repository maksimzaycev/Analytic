import React from 'react';
import '../css/main.css';

class ReportsRowNull extends React.Component {

    render() {
        return (
            <tr className="reports__row reports__row--body" data-id={this.props.id}>
                <td className="reports__cell reports__cell--body reports__cell--null" colSpan="3">
                    Отчетов не найдено
                </td>
            </tr>
        );
    }

}

export default ReportsRowNull;
