import React from 'react';
import '../css/main.css';

function VisitsRowNull(props) {
    return (
        <tr className="visits__row visits__row--body" data-id={props.id}>
            <td className="visits__cell visits__cell--body visits__cell--null" colSpan="4">
                Пользователей не найдено
            </td>
        </tr>
    );
}

export default VisitsRowNull;
