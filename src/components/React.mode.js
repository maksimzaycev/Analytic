import React from 'react';
import Navigation from './React.nav';
import Loader from './React.loader';
import moment from 'moment'
import ModeWorkspace from './React.mode.workspace';
import '../css/main.css';

const urlVisits = 'http://localhost:3000/visits';

class Mode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charts: {},
            defaultChart: [],
            strainData: [],
            startDate: '',
            finishDate: '',
            settingPeriod: moment(new Date()).format('MM.YYYY'),
            loading: false
        };
    }

    componentDidMount() {
        this.loadData(this.state.settingPeriod);
    }

    loadData(period) {
        console.log("Загружаемый период:");
        console.log(period);
        fetch(urlVisits + '?period=' + period)
            .then(function(response) {
                console.log(response);

                return response.json();
            })
            .then(result => this.parseData(result, period))
            .catch(e => console.log(e));
    }

    parseData(visits, period) {
        console.log('Результат загрузки:');
        console.log(visits);
        
        let startDate = moment('01.' + period, 'DD.MM.YYYY');
        console.log('Начальная дата:');
        console.log(startDate);

        let goodBegin = this.getGoodBeginData(visits, startDate);
        startDate.subtract(30, "days");
        let bedBegin = this.getBedBeginData(visits, startDate);
        startDate.subtract(30, "days");
        let goodEnd = this.getGoodEndData(visits, startDate);
        startDate.subtract(30, "days");
        let bedEnd = this.getBedEndData(visits, startDate);
        startDate.subtract(30, "days");
        let defaultChart = this.getDefaultChart(startDate);

        let charts = {
            goodBegin: {
                chartId: 4501,
                data: goodBegin,
                display: true,
                color: '#029455'
            },
            bedBegin: {
                chartId: 4502,
                data: bedBegin,
                display: true,
                color: '#c2012a'
            },
            goodEnd: {
                chartId: 4503,
                data: goodEnd,
                display: true,
                color: '#e799aa'
            },
            bedEnd: {
                chartId: 4504,
                data: bedEnd,
                display: true,
                color: '#9ad4bb'
            }
        };

        // let finishDate = moment(new Date(), 'DD.MM').subtract(1, "days");
        // let startDate = moment(new Date(), 'DD.MM').subtract(30, "days");
        let strainData = [];

        for (let i = 0; i < 30; i++) {
            let dayData = {
                date: charts.goodBegin.data[i].x,
                goodBegin: charts.goodBegin.data[i].y,
                bedBegin: charts.bedBegin.data[i].y,
                goodEnd: charts.goodEnd.data[i].y,
                bedEnd: charts.bedEnd.data[i].y
            }
            strainData.push(dayData);
        }

        this.setState({
            charts: charts,
            defaultChart: defaultChart,
            strainData: strainData,
            loading: true
        });
    }

    setPeriod = (changedPeriod) => {
        this.setState({
            loading: false
        });

        this.loadData(changedPeriod);
    }

    getGoodBeginData(visits, startDate) {
        let monthData = [];

        for (let i = 30; i > 0; i--) {
            let goodBeginsOnDay = 0;
            for (let j = 0; j < visits.length; j++) {
                if ((visits[j].startTime.slice(0, 10) === startDate.format('DD.MM.YYYY')) && (moment(visits[j].beginTime).isBefore(visits[j].startTime, 'minute'))) {
                    goodBeginsOnDay++;
                }
            }

            let oneDayValue = {
                x: startDate.format('DD.MM'),
                y: goodBeginsOnDay
            };

            startDate = startDate.add(1, "days");
            monthData.push(oneDayValue);
        }

        return monthData;
    }

    getBedBeginData(visits, startDate) {
        let monthData = [];

        for (let i = 30; i > 0; i--) {
            let bedBeginsOnDay = 0;
            for (let j = 0; j < visits.length; j++) {
                if ((visits[j].startTime.slice(0, 10) === startDate.format('DD.MM.YYYY')) && (moment(visits[j].beginTime).isAfter(visits[j].startTime, 'minute'))) {
                    bedBeginsOnDay++;
                }
            }

            let oneDayValue = {
                x: startDate.format('DD.MM'),
                y: bedBeginsOnDay
            };

            startDate = startDate.add(1, "days");
            monthData.push(oneDayValue);
        }

        return monthData;
    }

    getGoodEndData(visits, startDate) {
        let monthData = [];

        for (let i = 30; i > 0; i--) {
            let goodBeginsOnDay = 0;
            for (let j = 0; j < visits.length; j++) {
                if ((visits[j].startTime.slice(0, 10) === startDate.format('DD.MM.YYYY')) && (moment(visits[j].endTime).isBefore(visits[j].finishTime, 'minute'))) {
                    goodBeginsOnDay++;
                }
            }

            let oneDayValue = {
                x: startDate.format('DD.MM'),
                y: goodBeginsOnDay
            };

            startDate = startDate.add(1, "days");
            monthData.push(oneDayValue);
        }

        return monthData;
    }

    getBedEndData(visits, startDate) {
        let monthData = [];

        for (let i = 30; i > 0; i--) {
            let goodBeginsOnDay = 0;
            for (let j = 0; j < visits.length; j++) {
                if ((visits[j].startTime.slice(0, 10) === startDate.format('DD.MM.YYYY')) && (moment(visits[j].endTime).isAfter(visits[j].finishTime, 'minute'))) {
                    goodBeginsOnDay++;
                }
            }

            let oneDayValue = {
                x: startDate.format('DD.MM'),
                y: goodBeginsOnDay
            };

            startDate = startDate.add(1, "days");
            monthData.push(oneDayValue);
        }

        return monthData;
    }

    getDefaultChart(startDate) {
        let defaultDays = [];

        for (let i = 30; i > 0; i--) {

            let oneDay = {
                x: startDate.format('DD.MM'),
                y: 0
            };

            startDate = startDate.add(1, "days");
            defaultDays.push(oneDay);
        }

        return defaultDays;
    }

    render() {
        return (
            <div id="maskComponent">
                {!this.state.loading ? <Loader /> : null}
                <div className="sidebar" id="sidebar">
                    <Navigation activeItem={7715} />
                </div>
                <div className="panel" id="panel">
                    <ModeWorkspace
                        charts={this.state.charts}
                        defaultChart={this.state.defaultChart}
                        strainData={this.state.strainData}
                        setPeriod={this.setPeriod}
                    />
                </div>                        
            </div>
        );
    }
}

export default Mode;

