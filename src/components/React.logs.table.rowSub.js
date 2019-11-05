import React, { Component } from 'react';
import '../css/main.css';

class LogsRowSub extends Component {

    render() {
        return (
            <div className="logs__body-row logs__body-row--more" data-id={this.props.id} data-index={this.props.index}>
                <div className="logs__body-cell logs__body-cell--empty"></div>
                <div className="logs__body-cell logs__body-cell--title">{this.props.title}</div>
                <div className="logs__body-cell logs__body-cell--pages">{this.props.link}</div>
                <div className="logs__body-cell logs__body-cell--longFull">{this.props.long}</div>
                <div className="logs__body-cell logs__body-cell--actions"></div>
            </div>
        );
    }
}

export default LogsRowSub;