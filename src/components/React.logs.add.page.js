import React from 'react';
import '../css/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes as fasTimes} from '@fortawesome/free-solid-svg-icons'

class AddPageLogs extends React.Component {
    constructor(props) {
        super(props);
        this.removeClick = this.removeClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            newPageData: {
                id: this.props.id,
                title: '',
                link: '',
                long: '',
                date: ''
            }
        };
    }

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
    
    removeClick = (event) => {
        this.props.remove(event.currentTarget.parentNode.parentNode.getAttribute('data-index'));
    };

    handleChange(event) {
        var i = event.currentTarget.parentNode.parentNode.getAttribute('data-index');
        var inputValue = event.target.value;
        var inputName = event.target.getAttribute('name');
        var pageInputs = this.state.newPageData;
        pageInputs.date = this.props.currentDate;

        if (inputName === 'title') {
            pageInputs.title = inputValue;
        } else if (inputName === 'link') {
            pageInputs.link = inputValue;
        } else if (inputName === 'long') {
            pageInputs.long = inputValue;
        }

        this.props.pageData(i, pageInputs);
    }

    render() {
        return (
            <div className="logs__page" data-index={this.props.index}>
                <div className="logs-add__node logs__node--title">
                    <label className="logs__label" htmlFor="title">Назавние отчета</label>
                    <input type="text" className="logs__input req normal-input" name="title" placeholder="Стартовый дашборд" onChange={this.handleChange}/>
                </div>
                <div className="logs__node logs__node--link">
                    <label className="logs__label" htmlFor="link">Адрес</label>
                    <input type="text" className="logs__input req normal-input" name="link" placeholder="/quarter" onChange={this.handleChange}/>
                </div>
                <div className="logs__node logs__node--long">
                    <label className="logs__label" htmlFor="long">Длительность</label>
                    <input type="text" className="logs__input req normal-input" name="long" placeholder="04:05" onChange={this.handleChange}/>
                </div>
                <div className="logs__node logs__node--delete">
                    <a className="logs__delete" onClick={this.removeClick}>
                        <FontAwesomeIcon icon={fasTimes} />
                    </a>
                </div>
            </div>
        );
    }
}

export default AddPageLogs;