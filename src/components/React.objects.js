import React from 'react';
import Navigation from './React.nav';
import ObjectsWorkspace from './React.objects.workspace';
import dataLoad from '../models/dataLoad';
import Loader from './React.loader';
import '../css/main.css';

class Objects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [],
            loading: false
        };
    }

    UNSAFE_componentWillMount() {
        this.loadData();
    }

    loadData() {
        var urlObjects = 'http://localhost:3000/objects';

        dataLoad(urlObjects).then(objects => {
            var objectsItems = JSON.parse(objects);
            this.setState({
                objects: objectsItems,
                loading: true
            });
            
        }).catch(function(objects) {
            console.log('error ' + objects);
        })
    }

    render() {
        return (
            <div id="maskComponent">
                {!this.state.loading ? <Loader /> : null}
                <div className="sidebar" id="sidebar">
                    <Navigation activeItem={7710} />
                </div>
                <div className="panel" id="panel">
                    <ObjectsWorkspace objects={this.state.objects}/>
                </div>                        
            </div>
        );
    }
}

export default Objects;