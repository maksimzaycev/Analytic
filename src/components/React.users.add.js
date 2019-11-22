import React from 'react';
import '../css/main.css';

class AddUsersManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            company: '',
            unit: '',
            finishDate: ''
        };
    }

    addClick = (event) => {
        let inputsValid = this.checkInputs();

        if (!inputsValid) {
            let newUserId = this.getRandomUserId();

            this.props.add(newUserId, this.state.name, this.state.company, this.state.unit, this.state.finishDate);

            this.setState({
                name: '',
                company: '',
                unit: '',
                finishDate:''
            });
        } else {
            event.preventDefault();
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    getRandomUserId() {
        var unUniqueId = true;
        var currentUsers = this.props.currentUsers;
        do {
            var rand = 1000 - 0.5 + Math.random() * (9999 - 1000 + 1)
            var newId = Math.round(rand);
            unUniqueId = false;

            for (let i = 0; i < currentUsers.length; i++) {
                if (currentUsers[i].id === newId) {
                    unUniqueId = true;
                }
            }
        } while (unUniqueId);

        return newId
    }

    checkInputs() {
        var reqInputs = document.querySelectorAll('.req');
        var error = false;

        for (let i = 0; i < reqInputs.length; i++) {
            if (reqInputs[i].value === '') {
                reqInputs[i].classList.remove('normal-input');
                reqInputs[i].previousSibling.classList.remove('normal-label');
                reqInputs[i].classList.add('error-input');
                reqInputs[i].previousSibling.classList.add('error-label');
                error = true;
            } 
        }
        
        return error;
    }

    componentDidMount() {
        var inputs = document.querySelectorAll('.users__input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].onfocus = function() {
                this.classList.remove('normal-input');
                this.previousSibling.classList.remove('normal-label');
                this.classList.remove('error-input');
                this.previousSibling.classList.remove('error-label');
                this.classList.add('active-input');
                this.previousSibling.classList.add('active-label');
            }
        }

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].onblur = function() {
                this.classList.remove('active-input');
                this.previousSibling.classList.remove('active-label');
                this.classList.add('normal-input');
                this.previousSibling.classList.add('normal-label');
            } 
        }
    }

    render() {

        return (
            <form className="users__form" id="send__form" method="post">
                <div className="users__node">
                    <label className="users__label" htmlFor="name">Имя пользователя</label>
                    <input type="text" className="users__input req normal-input" name="name" value={this.state.name} placeholder="Иванов Иван Иванович" onChange={this.handleInputChange} />
                </div>
                <div className="users__node">
                    <label className="users__label" htmlFor="company">Компания</label>
                    <input type="text" className="users__input req normal-input" name="company" value={this.state.company} placeholder="Газпром Нефть" onChange={this.handleInputChange} />
                </div>
                <div className="users__node">
                    <label className="users__label" htmlFor="unit">Подразделение</label>
                    <input type="text" className="users__input req normal-input" name="unit" value={this.state.unit} placeholder="Отдел методологии" onChange={this.handleInputChange} />
                </div>
                <div className="users__node">
                    <label className="users__label" htmlFor="finishDate">Дата истечения пароля</label>
                    <input type="text" className="users__input req normal-input" name="finishDate" value={this.state.finishDate} placeholder="09.09.2019" onChange={this.handleInputChange} />
                </div> 
                <input type="button" className="users__button" onClick={this.addClick} value="Добавить" />
            </form>
        );
    }
}

export default AddUsersManager;