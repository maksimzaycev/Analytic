import React from 'react';
import '../css/main.css';

function VisitsRowTable(props) {
    return (
        <tr className="visits__row visits__row--body" data-id={props.id}>
            <td className="visits__cell visits__cell--body visits__cell--user">{props.name}</td>
            <td className="visits__cell visits__cell--body visits__cell--company">{props.company}</td>
            <td className="visits__cell visits__cell--body visits__cell--visits">{props.visits}</td>
            <td className="visits__cell visits__cell--body visits__cell--views">{props.views}</td>
        </tr>
    );
}

export default VisitsRowTable;
