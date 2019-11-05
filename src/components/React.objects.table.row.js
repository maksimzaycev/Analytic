import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as fasTrash} from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt as fasPencil} from '@fortawesome/free-solid-svg-icons'
import { faCheck as fasCheck} from '@fortawesome/free-solid-svg-icons'
import '../css/main.css';

class UsersManagerRowTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            id: props.id,
            title: props.title,
            person: props.person,
            active: props.active,
            green: props.rating[0],
            yellow: props.rating[1],
            red: props.rating[2],
            link: props.link
        };
    }

    saveClick = () => {
        this.setState({
            edit: false
        }, this.props.update(this.state.id, this.state.title, this.state.person, this.state.active, [this.state.green, this.state.yellow, this.state.red], this.state.link));
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

        if (name === 'active') {
            this.setState({
                active: value === '1' ? true : false
            });    
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    rendNorm () {
        return (
            <tr className="objects__row objects__row--body">
                <td className="objects__cell objects__cell--body objects__cell--id">{this.state.id}</td>
                <td className="objects__cell objects__cell--body objects__cell--title ">{this.state.title}</td>
                <td className="objects__cell objects__cell--body objects__cell--person">{this.state.person}</td>
                <td className="objects__cell objects__cell--body objects__cell--active">
                    { this.state.active ? 'Включен' : 'Выключен' }
                </td>
                <td className="objects__cell objects__cell--body objects__cell--color">
                    <span className="objects__circle objects__circle--green"></span>{' ' + this.state.green + ' '}
                </td>
                <td className="objects__cell objects__cell--body objects__cell--color"> 
                    <span className="objects__circle objects__circle--yellow"></span>{' ' + this.state.yellow + ' '}
                </td>
                <td className="objects__cell objects__cell--body objects__cell--color">
                    <span className="objects__circle objects__circle--red"></span>{' ' + this.state.red + ' '}
                </td>
                <td className="objects__cell objects__cell--body objects__cell--link">{this.state.link}</td>
                <td className="objects__cell objects__cell--body objects__cell--action">
                    <FontAwesomeIcon size="xs" className="objects__actionIcon" icon={fasPencil} onClick={this.editClick} />
                    {" "}
                    <FontAwesomeIcon size="xs" className="objects__actionIcon" icon={fasTrash} onClick={this.removeClick} />
                </td>
            </tr>
        );
    }

    rendEdit () {
        return (
            <tr className="objects__row objects__row--body">
                <td className="objects__cell objects__cell--body objects__cell--id">{this.state.id}</td>
                <td className="objects__cell objects__cell--body objects__cell--title">
                    <input className="objects__edit" type="text" name="title" value={this.state.title} onChange={this.handleInputChange}></input>
                </td>
                <td className="objects__cell objects__cell--body objects__cell--person">
                    <input className="objects__edit" type="text" name="person" value={this.state.person} onChange={this.handleInputChange}></input>
                </td>
                <td className="objects__cell objects__cell--body objects__cell--active">
                    {
                        this.state.active ?
                        <select className="objects__edit objects__edit--select" name="active" onChange={this.handleInputChange}>
                            <option className="objects__option" value="1" selected>Включен</option>
                            <option className="objects__option" value="0">Выключен</option>
                        </select> :
                        <select className="objects__edit objects__edit--select" name="active" onChange={this.handleInputChange}>
                            <option className="objects__option" value="1">Включен</option>
                            <option className="objects__option" value="0" selected>Выключен</option>
                        </select>
                    }
                </td>
                <td className="objects__cell objects__cell--body objects__cell--color">
                    <span className="objects__circle objects__circle--green"></span>{' '}
                    <input className="objects__edit objects__edit--rating" maxLength="3" type="text" name="green" value={this.state.green} onChange={this.handleInputChange}></input>
                </td>
                <td className="objects__cell objects__cell--body objects__cell--color">
                    <span className="objects__circle objects__circle--yellow"></span>{' '}
                    <input className="objects__edit objects__edit--rating" maxLength="3" type="text" name="yellow" value={this.state.yellow} onChange={this.handleInputChange}></input>
                </td>
                <td className="objects__cell objects__cell--body objects__cell--color">
                    <span className="objects__circle objects__circle--red"></span>{' '}
                    <input className="objects__edit objects__edit--rating" maxLength="3" type="text" name="red" value={this.state.red} onChange={this.handleInputChange}></input>
                </td>
                <td className="objects__cell objects__cell--body objects__cell--link">
                    <input className="objects__edit objects__edit--link" type="text" name="link" value={this.state.link} onChange={this.handleInputChange}></input>
                </td>
                <td className="objects__cell objects__cell--body objects__cell--action">
                    <FontAwesomeIcon size="xs" className="objects__actionIcon" icon={fasCheck} onClick={this.saveClick} />
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
