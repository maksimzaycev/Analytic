import React, { Component } from 'react';
import LogsRowSub from './React.logs.table.rowSub';
import LogsRowSubEdit from './React.logs.table.rowSubEdit';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus as fasPlus} from '@fortawesome/free-solid-svg-icons'
import { faMinus as fasMinus} from '@fortawesome/free-solid-svg-icons'
import { faCheck as fasCheck} from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt as fasTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt as fasPencilAlt} from '@fortawesome/free-solid-svg-icons'
import '../css/main.css';

class LogsRowTable extends Component {
    constructor(props) {
        super(props);
        this.toggleShow = this.toggleShow.bind(this);
        this.state = {
            condition: 'close',
            id: this.props.id,
            userId: this.props.userId,
            time: this.props.time,
            date: this.props.date,
            name: this.props.name,
            company: this.props.company,
            pages: this.props.logItems.length,
            long: this.props.long,
            logItems: this.props.logItems
        };
    }

    editClick = () => {
        this.setState({
            condition: 'edit'
        });
    };

    saveClick = () => {
        var long = moment('00:00', 'mm:ss');
        let currentDate = this.state.date.slice(0,5);
        let currentLogItems = this.state.logItems;

        for (let i = 0; i < currentLogItems.length; i++) {
            var thisPageTime = moment(currentLogItems[i].long, 'mm:ss');
            var minutes = thisPageTime.format('mm');
            var seconds = thisPageTime.format('ss');
            long = long.add(seconds, 'seconds');
            long = long.add(minutes, 'minutes');
        }
        
        long = long.format('mm:ss');

        for (let i = 0; i < currentLogItems.length; i++) {
            currentLogItems[i].date = currentDate;
        }
        
        this.setState({
            condition: 'open',
            logItems: currentLogItems,
            long: long,
        }, this.props.updateRow(this.props.id, this.state.userId, this.state.time, this.state.date, this.state.name, this.state.company, this.state.logItems.length, long, currentLogItems));
    };

    removeClick = () => {
        this.props.removeRow(this.state.id);
    };

    getPageData = (i, page) => {
        var logItems = this.state.logItems;
        logItems[i] = page;

        this.setState({
            logItems: logItems
        });

    }

    toggleShow = () => {
        if (this.state.condition === 'open') {
            this.setState({
                condition: 'close'
            }); 
        } else if (this.state.condition === 'close') {
            this.setState({
                condition: 'open'
            });
        }
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    open() {
        return (
            <div className="logs__body-row logs__body-row--open">
                <div className="logs__body-row logs__body-row--main">
                    <div className="logs__body-cell logs__body-cell--action"><FontAwesomeIcon className="sortIcon" size="xs" icon={fasMinus} color="#0079c2" onClick={this.toggleShow} /></div>
                    <div className="logs__body-cell logs__body-cell--date">{this.state.date}</div>
                    <div className="logs__body-cell logs__body-cell--time">{this.state.time}</div>
                    <div className="logs__body-cell logs__body-cell--name">{this.state.name}</div>
                    <div className="logs__body-cell logs__body-cell--company">{this.state.company}</div>
                    <div className="logs__body-cell logs__body-cell--pages">{this.state.pages}</div>
                    <div className="logs__body-cell logs__body-cell--longFull">{this.state.long}</div>
                    <div className="logs__body-cell logs__body-cell--actions">
                        <FontAwesomeIcon size="xs" icon={fasPencilAlt} color="#0079c2" onClick={this.editClick}/>
                        {" "}
                        <FontAwesomeIcon size="xs" icon={fasTrashAlt} color="#0079c2" onClick={this.removeClick} />
                    </div>
                </div>
                { 
                    this.state.logItems.map((row, i) => (
                        <LogsRowSub
                            key={row.id}
                            id={row.id}
                            index={i}
                            title={row.title}
                            link={row.link}
                            long={row.long}
                        />
                    ))
                }
            </div>
        );
    }

    close() {
        return (
            <div className="logs__body-row logs__body-row--close">
                <div className="logs__body-cell logs__body-cell--action"><FontAwesomeIcon className="sortIcon" size="xs" icon={fasPlus} color="#0079c2" onClick={this.toggleShow} /></div>
                <div className="logs__body-cell logs__body-cell--date">{this.state.date}</div>
                <div className="logs__body-cell logs__body-cell--time">{this.state.time}</div>
                <div className="logs__body-cell logs__body-cell--name">{this.state.name}</div>
                <div className="logs__body-cell logs__body-cell--company">{this.state.company}</div>
                <div className="logs__body-cell logs__body-cell--pages">{this.state.pages}</div>
                <div className="logs__body-cell logs__body-cell--longFull">{this.state.long}</div>
                <div className="logs__body-cell logs__body-cell--actions">
                    <FontAwesomeIcon size="xs" icon={fasPencilAlt} color="#0079c2" onClick={this.editClick}/>
                    {" "}
                    <FontAwesomeIcon size="xs" icon={fasTrashAlt} color="#0079c2" onClick={this.removeClick} />
                </div>
            </div>
        );
    }

    edit() {
        return (
            <div className="logs__body-row logs__body-row--open">
                <div className="logs__body-row logs__body-row--main">
                    <div className="logs__body-cell logs__body-cell--action"><FontAwesomeIcon className="sortIcon" size="xs" icon={fasMinus} color="#0079c2"/></div>
                    <div className="logs__body-cell logs__body-cell--date">
                        <input className="logs__table-input" type="text" name="date" value={this.state.date} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="logs__body-cell logs__body-cell--time">
                        <input className="logs__table-input" type="text" name="time" value={this.state.time} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="logs__body-cell logs__body-cell--name">
                        <input className="logs__table-input" type="text" name="name" value={this.state.name} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="logs__body-cell logs__body-cell--company">
                        <input className="logs__table-input" type="text" name="company" value={this.state.company} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="logs__body-cell logs__body-cell--pages">
                        <input className="logs__table-input" type="text" name="pages" value={this.state.logItems.length} disabled></input>
                    </div>    
                    <div className="logs__body-cell logs__body-cell--longFull">
                        <input className="logs__table-input" type="text" name="long" value={this.state.long} disabled></input>
                    </div>
                    <div className="logs__body-cell logs__body-cell--actions">
                        <FontAwesomeIcon className="table__actionIcon" size="xs" icon={fasCheck} onClick={this.saveClick} />
                    </div>
                </div>
                { 
                    this.state.logItems.map((row, i) => (
                        <LogsRowSubEdit
                            key={row.id}
                            id={row.id}
                            index={i}
                            title={row.title}
                            link={row.link}
                            long={row.long}
                            pageData={this.getPageData}
                            removeSubRow={this.removeSubRow}
                        />
                    ))
                }
            </div>
        );
    }

    render() {
        if (this.state.condition === 'open') {
            return this.open();
        } else if (this.state.condition === 'close') {
            return this.close();
        } else if (this.state.condition === 'edit') {
            return this.edit();
        }
    }
}

export default LogsRowTable;

