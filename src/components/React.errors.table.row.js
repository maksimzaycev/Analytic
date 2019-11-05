import React from 'react';
import '../css/main.css';

function ErrorsRowTable(props) {
    console.log(props);
    return (
        <tr className="table__row table__row--body table__row--error" data-id={props.id}>
            <td className="table__cell table__cell--body table__cell--time">{props.time}</td>
            <td className="table__cell table__cell--body table__cell--code">{props.code}</td>
            <td className="table__cell table__cell--body table__cell--text">{props.text}</td>
        </tr>
    );
}

export default ErrorsRowTable;
