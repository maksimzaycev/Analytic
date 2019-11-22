import React from 'react';
import ObjectsTable from './React.objects.table';
import FindObjects from './React.objects.find';
import AddObjects from './React.objects.add';
import Userbar from './React.userbar';
import dataAdd from '../models/dataAdd';
import dataUpdate from '../models/dataUpdate';
import dataDelete from '../models/dataDelete';
import 'react-vis/dist/style.css';
import '../css/main.css';

const urlObjects = 'http://localhost:3000/objects';

class ObjectsWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            changedRows: []
        };
    }

    componentWillMount() {
        this.setState({ 
            rows: this.props.objects,
            changedRows: this.props.objects
        });
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ 
            rows: nextProps.objects,
            changedRows: nextProps.objects
        });
    }

    remove = (deleteId) => {
        var allObjectsData = this.state.rows;
        let index;

        for (let i = 0; i < allObjectsData.length; i++) {
            if (allObjectsData[i].id === deleteId) {
                index = i;
            }
        }

        console.log("INDEX УДАЛЯЕМОГО ОБЪЕКТА:");
        console.log(index);
        
        allObjectsData.splice(index, 1);

        dataDelete(urlObjects, deleteId).then(objects => {
            this.setState({
                rows: allObjectsData,
                changedRows: allObjectsData
            });
        }).catch(function(objects) {
            console.log('error ' + objects);
        })
    };

    update = (id, title, person, active, rating, link) => {
        var allObjectsData = this.state.rows;
        var updateObjectData = {
            id: id,
            title: title,
            person: person,
            active: active,
            rating: rating,
            link: link
        };

        for (let i = 0; i < allObjectsData.length; i++) {
            if (allObjectsData[i].id === id) {
                allObjectsData[i] = updateObjectData;
            }
        }

        dataUpdate(urlObjects, updateObjectData, id).then(objects => {
            this.setState({
                rows: allObjectsData,
                changedRows: allObjectsData
            });
        }).catch(function(objects) {
            console.log('error ' + objects);
        })

    };

    addRow = (id, title, person, active, rating, link) => {
        var allObjectsData = this.state.rows;
        var newObjectsData = {
            id: id,
            title: title,
            person: person,
            active: active,
            rating: rating,
            link: link
        };

        allObjectsData.push(newObjectsData);

        dataAdd(urlObjects, newObjectsData).then(users => {
            this.setState({
                rows: allObjectsData,
                changedRows: allObjectsData
            });
        }).catch(function(users) {
            console.log('error ' + users);
        })
    };

    findRows = (foundRows) => {
        this.setState({
            changedRows: foundRows
        });
    };

    render() {

        return (
            <div className="objects">
                <Userbar>
                    <FindObjects presentRows={this.state.rows} find={this.findRows} />
                </Userbar>
                <div className="objects__addbar">
                    <h2 className="objects__title">Панель управления объектами мониторинга</h2>
                    <AddObjects add={this.addRow} currentObjects={this.state.rows}/>
                </div>
                <div className="objects__data">
                    <h2 className="objects__title">Таблица посещений пользователей</h2>
                    <ObjectsTable
                        rows={this.state.changedRows}
                        remove={this.remove}
                        update={this.update}
                    />
                </div>
            </div>
        );
    }
}

export default ObjectsWorkspace;
