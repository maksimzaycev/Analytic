import React from 'react';
import ModeTable from './React.mode.table';
import ModeChart from './React.mode.chart';
import moment from 'moment';
import 'react-vis/dist/style.css';
import '../css/main.css';

class ModeWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.setPeriod = this.setPeriod.bind(this);

        this.state = {
            defaultPeriod: moment(new Date()).format('MM.YYYY')
        };
    }

    setPeriod(event) {
        var newPeriod = event.target.value;
        this.props.setPeriod(newPeriod);
    }

    render() {
        return (
            <div className="mode">                
                <div className="mode__chart">
                    <h2 className="mode__title">График нарушений режима за</h2>
                    <select className="mode__period" onChange={this.setPeriod} defaultValue={this.state.defaultPeriod}>
                        <option value="12.2019">Декабрь 2019</option>
                        <option value="11.2019">Ноябрь 2019</option>
                        <option value="10.2019">Октябрь 2019</option>
                        <option value="09.2019">Сентябрь 2019</option>
                        <option value="08.2019">Август 2019</option>
                        <option value="07.2019">Июль 2019</option>
                        <option value="06.2019">Июнь 2019</option>
                        <option value="05.2019">Май 2019</option>
                        <option value="04.2019">Апрель 2019</option>
                        <option value="03.2019">Март 2019</option>
                        <option value="02.2019">Февраль 2019</option>
                        <option value="01.2019">Январь 2019</option>
                        <option value="12.2018">Декабрь 2018</option>
                        <option value="11.2018">Ноябрь 2018</option>
                    </select>
                    <ModeChart
                        charts={this.props.charts}
                        defaultChart={this.props.defaultChart}
                    />
                </div>
                <div className="mode__data">
                    <h2 className="mode__title">Таблица показателей активности</h2>
                    <ModeTable rows={this.props.strainData} />
                </div>
            </div>
        );
    }
}

export default ModeWorkspace;
