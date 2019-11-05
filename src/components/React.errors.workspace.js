import React from 'react';
import ErrorsTable from './React.errors.table';
import FindErrors from './React.errors.find';
import Userbar from './React.userbar';
import '../css/main.css';

class ErrorsWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            type: 'criticals',
            changedRows: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rows: nextProps.errorsItems.criticals,
            changedRows: nextProps.errorsItems.criticals
        })
    }

    findRows = (foundRows) => {
        this.setState({
            changedRows: foundRows
        });
    };

    toggleTableType = (event) => {
        const target = event.target;
        const value = target.getAttribute('data-type');
        
        this.setState({
            rows: this.props.errorsItems[value],
            changedRows: this.props.errorsItems[value],
            type: value
        });
    }

    render() {
        return (
            <div className="errors">
                <Userbar>
                    <FindErrors presentRows={this.state.rows} find={this.findRows} />
                </Userbar>                
                <div className="errors__data">
                    <h2 className="errors__title">Учетные записи пользователей</h2>
                    <div className="errors__toggle">
                        <div className={'errors__button ' + (this.state.type == 'criticals' ? 'errors__button--active' : 'errors__button--normal')} data-type="criticals" onClick={this.toggleTableType}>Критические</div>
                        <div className={'errors__button ' + (this.state.type == 'errors' ? 'errors__button--active' : 'errors__button--normal')} data-type="errors" onClick={this.toggleTableType}>Ошибки</div>
                        <div className={'errors__button ' + (this.state.type == 'warnings' ? 'errors__button--active' : 'errors__button--normal')} data-type="warnings" onClick={this.toggleTableType}>Предупреждения</div>
                    </div>
                    <ErrorsTable rows={this.state.changedRows} />
                </div>
            </div>
        );
    }
}

export default ErrorsWorkspace;