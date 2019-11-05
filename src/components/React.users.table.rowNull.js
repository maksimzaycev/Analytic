import React from 'react';
import '../css/main.css';

function UsersManagerRowNull(props) {
    return (
        <tr className="users__row users__row--body users__row--null" data-id={props.id}>
            <td className="users__cell users__cell--body users__cell--null" colSpan="7">
                Пользователи не найдены
            </td>
        </tr>
    );
}

export default UsersManagerRowNull;
