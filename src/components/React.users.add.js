import React, {useState, useEffect} from 'react';
import '../css/main.css';

const addUsersManager = (props) => {
    let [newUser, setNewUser] = useState({
        name: '',
        company: '',
        unit: '',
        finishDate: ''
    });
    
    useEffect(() => {
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
    }, []);

    const addClick = (event) => {
        let inputsValid = checkInputs();

        if (!inputsValid) {
            props.addUser({
                id: getRandomUserId(),
                name: newUser.name,
                company: newUser.company,
                unit: newUser.unit,
                finishDate: newUser.finishDate
            });

            setNewUser({
                name: '',
                company: '',
                unit: '',
                finishDate:''
            });
        } else {
            event.preventDefault();
        }
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;        
        let curNewUser = newUser;

        curNewUser[name] = value;
        setNewUser(curNewUser);
    }

    const getRandomUserId = () => {
        var unUniqueId = true;
        var currentUsers = props.currentUsers;
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

    const checkInputs = () => {
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

    return (
        <form className="users__form" id="send__form" method="post">
            <div className="users__node">
                <label className="users__label" htmlFor="name">Имя пользователя</label>
                <input type="text" className="users__input req normal-input" name="name" defaultValue={newUser.name} placeholder="Иванов Иван Иванович" onChange={handleInputChange} />
            </div>
            <div className="users__node">
                <label className="users__label" htmlFor="company">Компания</label>
                <input type="text" className="users__input req normal-input" name="company" defaultValue={newUser.company} placeholder="Газпром Нефть" onChange={handleInputChange} />
            </div>
            <div className="users__node">
                <label className="users__label" htmlFor="unit">Подразделение</label>
                <input type="text" className="users__input req normal-input" name="unit" defaultValue={newUser.unit} placeholder="Отдел методологии" onChange={handleInputChange} />
            </div>
            <div className="users__node">
                <label className="users__label" htmlFor="finishDate">Дата истечения пароля</label>
                <input type="text" className="users__input req normal-input" name="finishDate" defaultValue={newUser.finishDate} placeholder="09.09.2019" onChange={handleInputChange} />
            </div> 
            <input type="button" className="users__button" onClick={addClick} value="Добавить" />
        </form>
    );
}

export default addUsersManager;