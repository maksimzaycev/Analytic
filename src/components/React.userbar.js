import React from 'react';
import '../css/main.css';

class Userbar extends React.Component {
    render() {
        return (
            <div className="userbar">
                {this.props.children}
                    
                <div className="userbar__info">
                    <h3>Зайцев Максим Олегович</h3>
                    <h4>Газпром Информ</h4>
                </div>
                <input className="userbar__logout" type="button" value="Выйти" />
            </div>
        );
    }
}

export default Userbar;
