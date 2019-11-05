import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as fasColor} from '@fortawesome/free-solid-svg-icons'
import '../css/main.css';

class ReportsRowTable extends React.Component {
    constructor(props) {
        super(props);
        this.toggleChartClick = this.toggleChartClick.bind(this);

        this.state = {
            charts: props.chartReports
        };
    }

    toggleChartClick(event) {
        var presentButton = event.currentTarget;
        var presentButtonType = presentButton.getAttribute('data-type');
        this.props.toggleChart(presentButtonType);
        if (presentButton.classList.contains('reports__row--active')) {
            presentButton.classList.remove('reports__row--active');
            presentButton.classList.add('reports__row--disabled');
        } else {
            presentButton.classList.remove('reports__row--disabled');
            presentButton.classList.add('reports__row--active');
        }
    }

    render() {
        var rowActivity = this.props.active ? 'reports__row reports__row--body reports__row--active' : 'reports__row reports__row--body reports__row--disabled';        
        return (
            <tr className={rowActivity} onClick={this.toggleChartClick} data-id={this.props.id} data-type={this.props.type}>
                <td className="reports__cell reports__cell--body reports__cell--circle"><FontAwesomeIcon icon={fasColor} color={this.props.color} /></td>
                <td className="reports__cell reports__cell--body reports__cell--title">{this.props.name}</td>
                <td className="reports__cell reports__cell--body reports__cell--visits">{this.props.count}</td>
            </tr>
        );
    }
}

export default ReportsRowTable;
