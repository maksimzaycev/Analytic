import React from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';

class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <div className="login__left">
                    <Link to="/">
                        <img className="login__logo" src={require('../img/blue.png')} data-id="7700" alt="Gazprom logotype" />
                    </Link>
                    <div className="login__block">
                        <form method="post">
                            <label className="login__label" htmlFor="login">Логин</label>
                            <input type="text" name="login" placeholder="Логин" className="login__input login__input--normal check animated" autocomplete="off"/>
                            <label className="login__label" htmlFor="time">Пароль</label>
                            <input type="password" name="email" placeholder="Пароль" className="login__input login__input--normal check animated"/>
                            <input type="submit" className="login__submit login__submit--normal check animated"value="Войти"/>
                        </form>
                    </div>
                </div>
                <div className="login__right">

                </div>
            </div>
        );
    }
}

export default Login;
