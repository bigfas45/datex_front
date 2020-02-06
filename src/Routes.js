import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/Dashbaord';
import AdminDashboard from './user/AdminDashboardLayout';
import Inbox from './user/Inbox';
import InboxRead from './user/InboxRead';
import Security from './user/Securities';
import SecurityPerformance from './user/SecurityPerformance';
import Equity from './user/Equity';







const Routes = () => {
    return (
    
        <BrowserRouter>
         
      
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/user/inbox" exact component={Inbox} />
                <PrivateRoute path="/user/inboxRead/:date" exact component={InboxRead} />
                <PrivateRoute path="/user/securities" exact component={Security} />
                 <PrivateRoute path="/user/securities/performance" exact component={SecurityPerformance} />
                 <PrivateRoute path="/user/equity" exact component={Equity} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            </Switch>
        </BrowserRouter>
    );
};


export default Routes;
