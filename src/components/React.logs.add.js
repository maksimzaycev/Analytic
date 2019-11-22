import React from 'react';
import AddPageLogs from './React.logs.add.page';
import moment from 'moment'
import '../css/main.css';

class AddLogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.getRandomLogId(),
            userId: 'Выбрать...',
            time: '',
            date: '',
            period: '',
            name: '',
            company: '',
            pages: 0,
            long: '',
            logItems: [
                {   
                    id: this.getRandomPageId(),
                    title: '',
                    link: '',
                    long: '',
                    date: ''
                }
            ]
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        if (name === 'user') {
            const value = parseInt(target.value);
            this.setState({
                userId: parseInt(value)
            }, this.getUserData(value));
        } else if (name === 'time') {
            const value = target.value;
            this.setState({
                [name]: value
            });
        } else if (name === 'date') {
            const value = target.value;
            this.setState({
                [name]: value
            }, this.setCurrentDate(value));
        }
    }

    getUserData(userId) {
        let userData = this.props.users.filter( el => el.id === userId);
        
        this.setState({
            name: userData[0].name,
            company: userData[0].company
        });
            
    }

    setCurrentDate(time) {
        var logItems = this.state.logItems;
        var currentDate = time.slice(0,5);

        for (let i = 0; i < logItems.length; i++) {
            logItems[i].date = currentDate;
        }

        this.setState({
            logItems: logItems
        });        
    }
    
    addClick = (event) => {
        let inputsValid = this.checkInputs();

        if (!inputsValid) {
            var newVisit = {
                id: this.state.id,
                userId: this.state.userId,
                time: this.state.time,
                date:  this.state.date,
                period:  this.state.date.slice(3,10),
                name: this.state.name,
                company: this.state.company,
                pages: this.state.logItems.length,
                long: moment('00:00', 'mm:ss'),
                logItems: this.state.logItems
            };

            for (let i = 0; i < newVisit.logItems.length; i++) {
                var thisPageTime = moment(newVisit.logItems[i].long, 'mm:ss');
                var minutes = thisPageTime.format('mm');
                var seconds = thisPageTime.format('ss');
                newVisit.long = newVisit.long.add(seconds, 'seconds');
                newVisit.long = newVisit.long.add(minutes, 'minutes');
            }

            newVisit.long = newVisit.long.format('mm:ss');

            this.props.add(newVisit);
        
            this.setState({
                id: this.getRandomLogId(),
                userId: 0,
                time: '',
                date: '',
                name: '',
                company: '',
                pages: 0,
                long: '',
                logItems: [
                    {   
                        id: this.getRandomPageId(),
                        title: '',
                        link: '',
                        long: '',
                        date: ''
                    }
                ]
            });
        } else {
            event.preventDefault();
        }
    
    };

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

    getPageData = (i, page) => {
        var logItems = this.state.logItems;
        logItems[i] = page;

        this.setState({
            logItems: logItems
        });
    }

    getRandomLogId = () => {
        var unUniqueId = true;
        var currentLogs = this.props.currentLogs;
        do {
            var rand = 1000 - 0.5 + Math.random() * (9999 - 1000 + 1)
            var newId = Math.round(rand);
            unUniqueId = false;

            for (let i = 0; i < currentLogs.length; i++) {
                if (currentLogs[i].id === newId) {
                    unUniqueId = true;
                }
            }
        } while (unUniqueId);

        return newId
    }

    getRandomPageId = () => {
        var unUniqueId = true;
        var currentLogs = this.props.currentLogs;
        do {
            var rand = 10000 - 0.5 + Math.random() * (99999 - 1000 + 1)
            var newId = Math.round(rand);
            unUniqueId = false;

            for (let i = 0; i < currentLogs.length; i++) {
                for (let j = 0; j < currentLogs[i].logItems.length; j++) {
                    if (currentLogs[i].logItems[j].id === newId) {
                        unUniqueId = true;
                    }
                }
            }
        } while (unUniqueId);

        return newId
    }

    addNewPage = () => {
        var logItems = this.state.logItems;
        var newLogItem = {
            id: this.getRandomPageId(),
            title: '',
            link: '',
            long: '',
            date: this.state.time.slice(0,5)
        };

        logItems.push(newLogItem);

        this.setState({
            logItems: logItems,
        });
    }

    removeNewPage = (i) => {
        var logItems = this.state.logItems;
        
        if (this.state.logItems.length > 1) {
            logItems.splice(i, 1);
        }

        this.setState({
            logItems: logItems,
        });
    };

    componentDidMount() {
        var inputs = document.querySelectorAll('.logs__input');
        
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
            <form className="logs__form" id="send__form" method="post">
                <div className="logs__main">
                    <div className="logs__node logs__node--date">
                        <label className="logs__label" htmlFor="date">Дата визита</label>
                        <input type="text" className="logs__input req normal-input" value={this.state.date} name="date" onChange={this.handleInputChange} placeholder="30.04.2019" />
                    </div>
                    <div className="logs__node logs__node--time">
                        <label className="logs__label" htmlFor="time">Время визита</label>
                        <input type="text" className="logs__input req normal-input" value={this.state.time} name="time" onChange={this.handleInputChange} placeholder="11:30" />
                    </div>
                    <div className="logs__node logs__node--name">
                        <label className="logs__label" htmlFor="user">Пользователь</label>
                        <select className="logs__input req normal-input" name="user" value={this.state.userId} onChange={this.handleInputChange}>
                            <option value="" selected>Выбрать..</option>
                            {
                                this.props.users.map((user, i) => (
                                    <option key={user.id} value={user.id} data-company={user.company}>{user.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="logs__pages">
                {
                    this.state.logItems.map((row, i) => (
                        <AddPageLogs
                            index={i}
                            key={row.id}
                            id={row.id}
                            currentDate={row.date}
                            remove={this.removeNewPage}
                            pageData={this.getPageData}
                        />
                    ))
                }
                </div>
                <div className="logs__buttons">
                    <input type="button" className="logs__button" onClick={this.addNewPage} value="Новая страница" />
                    <input type="button" className="logs__button" onClick={this.addClick} value="Добавить запись" />
                </div>
            </form>
        );
    }
}

export default AddLogs;