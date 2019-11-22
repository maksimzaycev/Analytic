import React, {useState, useEffect }from 'react';
import Userbar from './React.userbar';
import VisitsTable from './React.visits.table';
import FindVisits from './React.visits.find';
import '../css/main.css';

const visitsWorkspace = (props) => {
    let [visits, setVisits] = useState(props.visitsItems);
    let [presentVisits, setPresentVisits] = useState(props.visitsItems);
    
    useEffect(() => setVisits(props.visitsItems),[props.visitsItems]);
    useEffect(() => setPresentVisits(props.visitsItems),[props.visitsItems]);
    
    let findVisits = (filtredVisits) => setPresentVisits(filtredVisits);

    return (
        <div className="visits">
            <Userbar>
                <FindVisits visits={visits} findVisits={findVisits} />
                <select className="userbar__period" defaultValue={props.settingPeriod} onChange={(event) => props.setPeriod(event.target.value)}>
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
                </select>
            </Userbar>
            <div className="visits__data">
                <h2 className="visits__title">Количество обращений пользователей к системе</h2>
                <VisitsTable rows={presentVisits} />
            </div>
        </div>
    );
}

export default visitsWorkspace;