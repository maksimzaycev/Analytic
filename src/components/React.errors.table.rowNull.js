import React from 'react';
import '../css/main.css';

function VisitsRowNull(props) {
    return (
        <tr className="errors__row--body" data-id={props.id}>
            <td className="errors__cell errors__cell--null" colSpan="4">
                Пользователей не найдено
            </td>
        </tr>
    );
}

export default VisitsRowNull;
