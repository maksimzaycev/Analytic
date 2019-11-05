import React, { Component } from 'react';
import UserRowSub from './React.user.table.rowSub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus as fasPlus} from '@fortawesome/free-solid-svg-icons'
import { faMinus as fasMinus} from '@fortawesome/free-solid-svg-icons'
import '../css/main.css';

class UserRowTable extends Component {
    constructor(props) {
        super(props);
        this.toggleShow = this.toggleShow.bind(this);
        this.state = {
            open: false
        };
    }

    toggleShow = () => {
        if (this.state.open) {
            this.setState({
                open: false
            });    
        } else {
            this.setState({
                open: true
            });
        }
    };

    open() {
        return (
            <div className="user__body-row user__body-row--open" >
                <div className="user__body-row user__body-row--main" data-id={this.props.id} data-index={this.props.index}>
                    <div className="user__body-cell user__body-cell--action"><FontAwesomeIcon className="sortIcon" size="xs" icon={fasMinus} color="#0079c2" onClick={this.toggleShow} /></div>
                    <div className="user__body-cell user__body-cell--time">{this.props.time}</div>
                    <div className="user__body-cell user__body-cell--longFull">{this.props.long}</div>
                    <div className="user__body-cell user__body-cell--pages">{this.props.pages}</div>
                </div>
                {    
                    this.props.logItems.map(row => (
                        <UserRowSub
                            key={row.id}
                            id={row.id}
                            title={row.title}
                            link={row.link}
                            long={row.long}
                        /> )
                    )
                }
            </div>
        );
    }

    close() {
        return (
            <div className="user__body-row user__body-row--close" data-id={this.props.id}  data-index={this.props.index}>
                <div className="user__body-cell user__body-cell--action"><FontAwesomeIcon className="sortIcon" size="xs" icon={fasPlus} color="#0079c2" onClick={this.toggleShow} /></div>
                <div className="user__body-cell user__body-cell--time">{this.props.time}</div>
                <div className="user__body-cell user__body-cell--longFull">{this.props.long}</div>
                <div className="user__body-cell user__body-cell--pages">{this.props.pages}</div>
            </div>
        );
    }

    render() {
        if (this.state.open) {
            return this.open();
        } else {
            return this.close();
        }
    }
}

export default UserRowTable;
