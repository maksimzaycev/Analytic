import React from 'react';
import '../css/main.css';

class UsersManagerRowNull extends React.Component {

    render() {
        return (
            <tr className="objects__row objects__row--body objects__row--null" data-id={this.props.id}>
                <td className="objects__cell objects__cell--body objects__cell--null" colSpan="9">
                    Пользователи не найдены
                </td>
            </tr>
        );
    }

}

export default UsersManagerRowNull;
