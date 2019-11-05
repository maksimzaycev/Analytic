import React, { Component } from 'react';
import '../css/main.css';

class LogsRowSub extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            newPageInputs: {
                id: this.props.id,
                title: this.props.title,
                link: this.props.link,
                long: this.props.long
            }
        };
    }

    handleChange(event) {
        var i = event.currentTarget.parentNode.parentNode.getAttribute('data-index');
        var inputValue = event.target.value
        var inputName = event.target.getAttribute('name');
        var pageInputs = this.state.newPageInputs;

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
            <div className="logs__body-row logs__body-row--more" data-id={this.props.id} data-index={this.props.index}>
                <div className="logs__body-cell logs__body-cell--action"></div>
                <div className="logs__body-cell logs__body-cell--time"></div>
                <div className="logs__body-cell logs__body-cell--title">
                    <input className="logs__table-input" type="text" name="title" defaultValue={this.props.title} onChange={this.handleChange}></input>
                </div>
                <div className="logs__body-cell logs__body-cell--pages">
                    <input className="logs__table-input" type="text" name="link" defaultValue={this.props.link} onChange={this.handleChange}></input>
                </div>
                <div className="logs__body-cell logs__body-cell--longFull">
                    <input className="logs__table-input" type="text" name="long" defaultValue={this.props.long} onChange={this.handleChange}></input>
                </div>
                <div className="logs__body-cell logs__body-cell--actions"></div>
            </div>
        );
    }
}

export default LogsRowSub;