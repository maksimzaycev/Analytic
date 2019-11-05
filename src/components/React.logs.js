import React from 'react';
import Navigation from './React.nav';
import LogsWorkspace from './React.logs.workspace';
import '../css/main.css';

class Logs extends React.Component {
    render() {
        return (
            <div id="maskComponent">
                <div className="sidebar" id="sidebar">
                    <Navigation activeItem={7716} />
                </div>
                <div className="panel" id="panel">
                    <LogsWorkspace />
                </div>                        
            </div>
        );
    }
}

export default Logs;