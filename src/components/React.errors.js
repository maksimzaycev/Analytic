import React from 'react';
import dataLoad from '../models/dataLoad';
import Navigation from './React.nav';
import Loader from './React.loader';
import ErrorsWorkspace from './React.errors.workspace';
import '../css/main.css';

class Errors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            loading: false
        };
    }

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        let urlErrors = 'http://localhost:3000/errors';

        let systemErrors;
        dataLoad(urlErrors).then(errors => {

            systemErrors = JSON.parse(errors);
            let systemErrorsData = this.sortSystemErrors(systemErrors);
            console.log('Отсортированные ошибки:');
            console.log(systemErrorsData);
            
            this.setState({
                errors: systemErrorsData,
                loading: true
            });
        }).catch(function(logs) {
            console.log('error ' + logs);
        })
    }

    sortSystemErrors(systemErrors) {
        let errorTypes = {
            errors: [],
            criticals: [],
            warnings: []
        };

        

        for (let i = 0; i < systemErrors.length; i++) {
            if (systemErrors[i].type === 'error') {
                errorTypes.errors.push(systemErrors[i]);
            } else if (systemErrors[i].type === 'critical') {
                errorTypes.criticals.push(systemErrors[i]);
            } else if (systemErrors[i].type === 'warning') {
                errorTypes.warnings.push(systemErrors[i]);
            }
        }

        return errorTypes;
    }

    render() {
        return (
            <div id="maskComponent">
                {!this.state.loading ? <Loader /> : null}
                <div className="sidebar" id="sidebar">
                    <Navigation activeItem={7713} />
                </div>
                <div className="panel" id="panel">
                    <ErrorsWorkspace errorsItems={this.state.errors} />
                </div>                        
            </div>
        );
    }
}

export default Errors;