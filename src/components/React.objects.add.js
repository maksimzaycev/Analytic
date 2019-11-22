import React from 'react';
import '../css/main.css';

class AddObjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            person: '',
            active: 'Выбрать..',
            green: '',
            yellow: '',
            red: '',
            link: ''
        };
    }

    addClick = (event) => {
        let inputsValid = this.checkInputs();

        if (!inputsValid) {
            let newObjectId = this.getRandomObjectId();

            this.props.add(newObjectId, this.state.title, this.state.person, this.state.active, [this.state.green, this.state.yellow, this.state.red], this.state.link);

            this.setState({
                title: '',
                person: '',
                active: 'Выбрать..',
                green: '',
                yellow: '',
                red: '',
                link: ''
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

    getRandomObjectId() {
        var unUniqueId = true;
        var currentObjects = this.props.currentObjects;
        do {
            var rand = 1000 - 0.5 + Math.random() * (9999 - 1000 + 1)
            var newId = Math.round(rand);
            unUniqueId = false;

            for (let i = 0; i < currentObjects.length; i++) {
                if (currentObjects[i].id === newId) {
                    unUniqueId = true;
                }
            }
        } while (unUniqueId);

        return newId;
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
        var inputs = document.querySelectorAll('.objects__input');

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
            <form className="objects__form" id="send__form" method="post">
                <div className="objects__node">
                    <label class="objects__label" for="name">Название</label>
                    <input type="text" className="objects__input req normal-input" name="title" value={this.state.title} placeholder="Хранение газа" onChange={this.handleInputChange} />
                </div>
                <div className="objects__node">
                    <label class="objects__label" for="person">Ответственный</label>
                    <input type="text" className="objects__input req normal-input" name="person" value={this.state.person} placeholder="Департамент 313" onChange={this.handleInputChange} />
                </div>
                <div className="objects__node">
                    <label class="objects__label" for="active">Состояние</label>
                    <select className="objects__input req normal-input" name="active" value={this.state.active} onChange={this.handleInputChange}>
                        <option value="">Выбрать..</option>
                        <option value="1">Включен</option>
                        <option value="0">Выключен</option>
                    </select>
                </div>
                <div className="objects__node">
                    <label class="objects__label" for="green">Зеленый</label>
                    <input type="text" className="objects__input req normal-input" name="green" value={this.state.green} placeholder="31" onChange={this.handleInputChange} />
                </div>
                <div className="objects__node">
                    <label class="objects__label" for="yellow">Желтый</label>
                    <input type="text" className="objects__input req normal-input" name="yellow" value={this.state.yellow} placeholder="58" onChange={this.handleInputChange} />
                </div>
                <div className="objects__node">
                    <label class="objects__label" for="red">Красный</label>
                    <input type="text" className="objects__input req normal-input" name="red" value={this.state.red} placeholder="74" onChange={this.handleInputChange} />
                </div>
                <div className="objects__node">
                    <label class="objects__label" for="link">Адрес</label>
                    <input type="text" className="objects__input req normal-input" name="link" value={this.state.link} placeholder="/link" onChange={this.handleInputChange} />
                </div>
                <input type="button" className="objects__button" onClick={this.addClick} value="Добавить" />
            </form>
        );
    }
}

export default AddObjects;