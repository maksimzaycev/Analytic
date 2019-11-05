import React from 'react';
import '../css/main.css';

function VisitsRowNull(props) {
    return (
        <tr className="table__row--body" data-id={props.id}>
            <td className="table__cell table__cell--null" colSpan="4">
                Пользователей не найдено
            </td>
        </tr>
    );
}

export default VisitsRowNull;
