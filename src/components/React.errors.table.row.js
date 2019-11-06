import React from 'react';
import '../css/main.css';

function ErrorsRowTable(props) {
    return (
        <tr className="errors__row errors__row--body errors__row--error" data-id={props.id}>
            <td className="errors__cell errors__cell--body errors__cell--time">{props.time}</td>
            <td className="errors__cell errors__cell--body errors__cell--code">{props.code}</td>
            <td className="errors__cell errors__cell--body errors__cell--text">{props.text}</td>
        </tr>
    );
}

export default ErrorsRowTable;
