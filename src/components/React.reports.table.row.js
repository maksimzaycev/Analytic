import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as fasColor} from '@fortawesome/free-solid-svg-icons'
import '../css/main.css';

const reportsRowTable = (props) => {
    let toggleChartClick = (event) => {
        var presentButtonType = event.currentTarget.getAttribute('data-type');
        props.toggleReport(presentButtonType);
    }
  
    return (
        <tr className={props.display ? 'reports__row reports__row--body reports__row--active' : 'reports__row reports__row--body reports__row--disabled'} onClick={toggleChartClick} data-id={props.id} data-type={props.type}>
            <td className="reports__cell reports__cell--body reports__cell--circle"><FontAwesomeIcon icon={fasColor} color={props.color} /></td>
            <td className="reports__cell reports__cell--body reports__cell--title">{props.name}</td>
            <td className="reports__cell reports__cell--body reports__cell--visits">{props.count}</td>
        </tr>
    );
}

export default reportsRowTable;
