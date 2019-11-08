import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Reports from './React.reports';
import Objects from './React.objects';
import Visits from './React.visits';
import Users from './React.users';
import Login from './React.login';
import Month from './React.month';
import Start from './React.start';
import People from './React.people';
import Mode from './React.mode';
import Errors from './React.errors';
import Logs from './React.logs';
import User from './React.user';
import Day from './React.day';


const Main = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Start} exact />
            <Route path="/logs" component={Logs} />
            <Route path='/user/:userId' component={User}/>
            <Route path="/users" component={Users} />
            <Route path="/reports" component={Reports} />
            <Route path="/objects" component={Objects} />
            <Route path="/visits" component={Visits} />
            <Route path="/month" component={Month} />
            <Route path="/login" component={Login} />
            <Route path="/errors" component={Errors} />
            <Route path="/day" component={Day} />
            <Route path="/mode" component={Mode} />
            <Route path="/people" component={People} />
        </Switch>
    </BrowserRouter> 
)

export default Main;