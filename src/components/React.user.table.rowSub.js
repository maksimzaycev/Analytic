import React from 'react';
import '../css/main.css';

function UserRowSub(props) {
    return (
        <div className="user__body-row user__body-row--more" data-id={props.id} data-index={props.index}>
            <div className="user__body-cell user__body-cell--action"></div>
            <div className="user__body-cell user__body-cell--title">{props.title}</div>
            <div className="user__body-cell user__body-cell--longFull">{props.long}</div>
            <div className="user__body-cell user__body-cell--link">{props.link}</div>
        </div>
    );
}

export default UserRowSub;
