import React from 'react';
import dataLoad from '../models/dataLoad';
import { NavLink, Link } from 'react-router-dom';
import '../css/main.css';

const urlObjects = 'http://localhost:3000/objects';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systemObjects: [
                {
                    id: 7713,
                    title: "Обращения к системе",
                    person: "Департамент 840",
                    active: true,
                    rating: 93,
                    link: "/visits"
                },
                {
                    id: 7714,
                    title: "Пользователи системы",
                    person: "Департамент 840",
                    active: true,
                    rating: 63,
                    link: "/users"
                },
                {
                    id: 7716,
                    title: "Журнал посещений",
                    person: "Департамент 840",
                    active: true,
                    rating: 23,
                    link: "/logs"
                }
            ],
            loading: false,
            itemStyle: 'sidebar__nav-item '
        };
    }

    UNSAFE_componentWillMount() {
        this.loadData();
    }

    loadData() {
        dataLoad(urlObjects)
            .then(responseObjects => JSON.parse(responseObjects))
            .then(result => this.parseData(result))
            .catch(responseObjects => console.log('error ' + responseObjects)
        );
    }

    parseData(menuItems) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].active === false) {
                menuItems[i].status = 'sidebar__nav-item--disabled';
            } else {
                if (menuItems[i].id === this.props.activeItem) {
                    menuItems[i].status = 'sidebar__nav-item--selected';
                } else {
                    menuItems[i].status = 'sidebar__nav-item--clickable';
                }
            }
        }

        this.setState({
            systemObjects: menuItems,
            loading: true
        });
    }

    handleClick = event => {
        if (event.currentTarget.classList.contains('sidebar__nav-item--disabled')) {
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="sidebar">
                <Link to="/">
                    <img className="sidebar__logotype" src={require('../img/logostart.png')} data-id="7700" alt="Gazprom logotype" />
                </Link>
                <div className="sidebar__navigation">
                    {
                        this.state.systemObjects.map(button => (

                            <NavLink
                                key={button.id}
                                className={this.state.itemStyle + button.status}
                                to={button.link}
                                onClick={this.handleClick}
                            >
                                {button.title}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Navigation;
