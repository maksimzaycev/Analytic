import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as fasTrash} from '@fortawesome/free-solid-svg-icons'
import { faChartBar as fasChartBar} from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt as fasPencil} from '@fortawesome/free-solid-svg-icons'
import { faCheck as fasCheck} from '@fortawesome/free-solid-svg-icons'

import '../css/main.css';

class UsersManagerRowTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            id: props.id,
            name: props.name,
            company: props.company,
            unit: props.unit,
            finishDate: props.finishDate,
            days: props.days,
            status: props.status
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            name: nextProps.name,
            company: nextProps.company,
            unit: nextProps.unit,
            finishDate: nextProps.finishDate,
            days: nextProps.days,
            status: nextProps.status
        });
    }

    saveClick = () => {
        this.setState({
            edit: false,
        }, this.props.update(this.state.id, this.state.name, this.state.company, this.state.unit, this.state.finishDate));
    };

    editClick = () => {
        this.setState({
            edit: true
        });
    };

    removeClick = () => {
        this.props.remove(this.state.id);
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    handleDateChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    rendNorm () {
        return (
            <tr className="users__row users__row--body">
                <td className="users__cell users__cell--body users__cell--action">
                    <Link to={{ pathname: '/user/' + this.state.id}}>
                        <FontAwesomeIcon className="users__actionIcon" size="xs" icon={fasChartBar} onClick={this.editClick} />
                    </Link>
                </td>
                <td className="users__cell users__cell--body users__cell--name left">{this.state.name}</td>
                <td className="users__cell users__cell--body users__cell--company left">{this.state.company}</td>
                <td className="users__cell users__cell--body users__cell--unit left">{this.state.unit}</td>
                <td className={"users__cell users__cell--body users__cell--finishDate" + this.state.status}>{this.state.finishDate}</td>
                <td className={"users__cell users__cell--body users__cell--days" + this.state.status}>{this.state.days}</td>
                <td className="users__cell users__cell--body users__cell--actions">
                    <FontAwesomeIcon className="users__actionIcon" size="xs" icon={fasPencil} onClick={this.editClick} />
                    {" "}
                    <FontAwesomeIcon className="users__actionIcon" size="xs" icon={fasTrash} onClick={this.removeClick} />
                </td>
            </tr>
        );
    }

    rendEdit () {
        return (
            <tr className="users__row users__row--body">
                <td className="users__cell users__cell--body users__cell--action"></td>
                <td className="users__cell users__cell--body users__cell--name">
                    <input className="users__edit left" type="text" name="name" value={this.state.name} onChange={this.handleInputChange}></input>
                </td>
                <td className="users__cell users__cell--body users__cell--company">
                    <input className="users__edit left" type="text" name="company" value={this.state.company} onChange={this.handleInputChange}></input>
                </td>
                <td className="users__cell users__cell--body users__cell--unit">
                    <input className="users__edit left" type="text" name="unit" value={this.state.unit} onChange={this.handleInputChange}></input>
                </td>
                <td className="users__cell users__cell--body users__cell--finishDate">
                    <input className="users__edit" type="text" name="finishDate" value={this.state.finishDate} onChange={this.handleInputChange}></input>
                </td>
                <td className="users__cell users__cell--body users__cell--days">
                    <input className={"users__edit" + this.state.status} type="text" name="days" value={this.state.days} disabled></input>
                </td>
                <td className="users__cell users__cell--body users__cell--actions">
                    <FontAwesomeIcon className="users__actionIcon" size="xs" icon={fasCheck} onClick={this.saveClick} />
                </td>
            </tr>
        );
    }

    render() {
        if (this.state.edit) {
            return this.rendEdit();
        } else {
            return this.rendNorm();
        }
    }

}

export default UsersManagerRowTable;
