import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as fasTrash} from '@fortawesome/free-solid-svg-icons'
import { faChartBar as fasChartBar} from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt as fasPencil} from '@fortawesome/free-solid-svg-icons'
import { faCheck as fasCheck} from '@fortawesome/free-solid-svg-icons'
import { faBars as fasBars} from '@fortawesome/free-solid-svg-icons'

import '../css/main.css';

const usersManagerRowTable = (props) => {
    let [user, setUser] = useState({});
    let [edit, setEdit] = useState(false);
    let [actions, setActions] = useState(false);
    
    useEffect(() => setUser(props.user), [props.user]);

    let saveClick = () => {
        setEdit(false)
        setActions(false)
        props.updateUser(user);
    };

    let editClick = () => setEdit(true);

    let removeClick = () => props.deleteUser(user.id);

    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;        
        let curUser = user;

        curUser[name] = value;
        setUser(curUser);
    };

    let toggleActions = () => {
        setActions(!actions);
    };

    let rendNorm = () => {
        return (
            <tr className="users__row users__row--body" data-id={user.id}>
                <td className="users__cell users__cell--body users__cell--action">
                    <Link to={{ pathname: '/user/' + user.id}}>
                        <FontAwesomeIcon className="users__actionIcon users__actionIcon--unpushed" size="xs" icon={fasChartBar} onClick={editClick} />
                    </Link>
                </td>
                <td className="users__cell users__cell--body users__cell--name left">{user.name}</td>
                <td className="users__cell users__cell--body users__cell--company left">{user.company}</td>
                <td className="users__cell users__cell--body users__cell--unit left">{user.unit}</td>
                <td className={"users__cell users__cell--body users__cell--finishDate" + user.status}>{user.finishDate}</td>
                <td className={"users__cell users__cell--body users__cell--days" + user.status}>{user.days}</td>
                <td className="users__cell users__cell--body users__cell--actions">
                    { (!actions) ? <FontAwesomeIcon className="users__actionIcon--unpushed" size="xs" icon={fasBars} onClick={toggleActions} /> : (
                    <span>
                        <FontAwesomeIcon className="users__actionIcon users__actionIcon--unpushed" size="xs" icon={fasPencil} onClick={editClick} />
                        <FontAwesomeIcon className="users__actionIcon users__actionIcon--unpushed" size="xs" icon={fasTrash} onClick={removeClick} />
                        <FontAwesomeIcon className="users__actionIcon users__actionIcon--pushed" size="xs" icon={fasBars} onClick={toggleActions} />
                    </span>
                    )}
                </td>
            </tr>
        );
    }

    let rendEdit = () => {
        return (
            <tr className="users__row users__row--body">
                <td className="users__cell users__cell--body users__cell--action"></td>
                <td className="users__cell users__cell--body users__cell--name">
                    <input className="users__edit left" type="text" name="name" defaultValue={user.name} onChange={handleInputChange}></input>
                </td>
                <td className="users__cell users__cell--body users__cell--company">
                    <input className="users__edit left" type="text" name="company" defaultValue={user.company} onChange={handleInputChange}></input>
                </td>
                <td className="users__cell users__cell--body users__cell--unit">
                    <input className="users__edit left" type="text" name="unit" defaultValue={user.unit} onChange={handleInputChange}></input>
                </td>
                <td className="users__cell users__cell--body users__cell--finishDate">
                    <input className="users__edit" type="text" name="finishDate" defaultValue={user.finishDate} onChange={handleInputChange}></input>
                </td>
                <td className="users__cell users__cell--body users__cell--days">
                    <input className={"users__edit" + user.status} type="text" name="days" defaultValue={user.days} disabled></input>
                </td>
                <td className="users__cell users__cell--body users__cell--actions">
                    <FontAwesomeIcon className="users__actionIcon users__actionIcon--unpushed" size="xs" icon={fasCheck} onClick={saveClick} />
                </td>
            </tr>
        );
    }

    if (edit) {
        return rendEdit();
    } else {
        return rendNorm();
    }

}

export default usersManagerRowTable;
