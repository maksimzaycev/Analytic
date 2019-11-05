import React, { Component } from 'react';
import '../css/main.css';

class LogsRowNull extends Component {

    render() {
        return (
            <div className="logs__body-row logs__body-row--null" data-id={this.props.id}>
                <div className="logs__body-cell logs__body-cell--null">
                    Посещений не найдено
                </div>
            </div>
        );
    }

}

export default LogsRowNull;
