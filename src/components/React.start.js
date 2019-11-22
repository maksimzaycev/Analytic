import React from 'react';
import dataLoad from '../models/dataLoad';
import Loader from './React.loader';
import { Link } from 'react-router-dom';
import '../css/main.css';

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startElements: [],
            loading: false
        };
    }

    UNSAFE_componentWillMount() {
        this.loadData();
    }

    loadData() {
        var urlObjects = 'http://localhost:3000/objects';

        dataLoad(urlObjects)
            .then(responseObjects => {
                this.setState({
                    startElements: JSON.parse(responseObjects),
                    loading: true
                });
            })
            .catch(e => console.log('error ' + e));
    }

    handleClick = event => {
        if (event.currentTarget.classList.contains('start__button--disable')) {
            event.preventDefault();
        }
    }

    render() {
        var monObjects = this.state.startElements;

        return (
            <div className="start">
                {!this.state.loading ? <Loader /> : null}
                <div className="start__logotype">
                    <img src={require('../img/logostart.png')} alt="Gazprom logotype" />
                </div> 
                <div className="start__block">
                    <div className="start__head">
                        Аудит использования САРМ ПП
                    </div>
                    <div className="start__elements">
                        {
                            monObjects.map(button => (
                                <Link
                                    className={button.active ? "start__button start__button--clickable" : "start__button start__button--disable"}
                                    data-id={button.id}
                                    key={button.id}
                                    to={button.link}
                                    onClick={this.handleClick}
                                >
                                    <div className="start__title">
                                        {button.title}
                                    </div>
                                    <div className="start__person">
                                        {button.person} 
                                    </div>
                                    {
                                        button.active ? (
                                            <div className={'start__indicator'} >
                                                <div className={'start__indicator--green'} >
                                                    <div
                                                        className="start__label start__label--green"
                                                        style={{ height: button.rating[0] + "%"}}
                                                    />
                                                </div>
                                                <div className={'start__indicator--yellow'} >
                                                    <div
                                                        className="start__label start__label--yellow"
                                                        style={{ height: button.rating[1] + '%'}}
                                                    />
                                                </div>
                                                <div className={'start__indicator--red'} >
                                                    <div
                                                        className="start__label start__label--red"
                                                        style={{ height: button.rating[2] + '%'}}
                                                    />
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Start;
