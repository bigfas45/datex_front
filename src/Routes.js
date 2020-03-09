import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import UserRoute from './auth/UserRoute';
import Dashboard from './user/Dashbaord';
import AdminDashboard from './admin/AdminDashBoard';
import Inbox from './user/Inbox';
import InboxRead from './user/InboxRead';
import Security from './user/Securities';
import SecurityPerformance from './user/SecurityPerformance';
import Equity from './user/Equity';
import Price from './user/PriceList';
import PriceList from './user/PriceList';
import EquityMonthly from './user/EquityMontly';
import Brokers from './user/Brokers';
import BrokersTraders from './user/BrokersTraders';
import TopBrokers from './user/TopBrokers';
import BrokersBuyTrades from './user/BrokersBuyTrades';
import BrokersSellTrades from './user/BrokersSellTrades';
import BrokerTradeLog from './user/BrokerTradeLog';
import SecurityCreation from './admin/SecurityCreation';
import Annualreport from './admin/Annualreport';
import AnnualreportUser from './user/AnnualReport';
import ManageReport from './admin/ManageReport';
import UpdateReport from './admin/UpdateReport';
import Clients from './admin/Clients';
import CreateClientUser from './admin/CreateClientUser';
import ClientUserUpdate from './admin/ClientUserUpdate';
import Corporate_action from './user/Corporate_action';
import Bonds from './user/Bonds';
import NotAllowed from './user/NotAllowed';
import Logout from './user/Logout';













const Routes = () => {
    return (
    
        <BrowserRouter>

            <Switch>
                 <Route path="/" exact component={Home} />
                 <Route path="/signin" exact component={Signin} />
                 <Route path="/signup" exact component={Signup} />
                 <UserRoute path="/user/dashboard" exact component={Dashboard} />
                 <UserRoute path="/user/inbox" exact component={Inbox} />
                 <UserRoute path="/user/inboxRead/:date" exact component={InboxRead} />
                 <UserRoute path="/user/notallowed" exact component={NotAllowed} />
                 <UserRoute path="/user/logout" exact component={Logout} />
                 <PrivateRoute path="/user/securities" exact component={Security} />
                 <PrivateRoute path="/user/securities/performance" exact component={SecurityPerformance} />
                 <PrivateRoute path="/user/equity" exact component={Equity} />
                 <PrivateRoute path="/user/equity/pricelist" exact component={PriceList} />
                 <PrivateRoute path="/user/equity/monthly" exact component={EquityMonthly} />
                 <PrivateRoute path="/user/brokers" exact component={Brokers} />
                 <PrivateRoute path="/user/brokers/trades" exact component={BrokersTraders} />
                 <PrivateRoute path="/user/brokers/topTen" exact component={TopBrokers} />
                 <PrivateRoute path="/user/brokers/buy" exact component={BrokersBuyTrades} />
                 <PrivateRoute path="/user/brokers/sell" exact component={BrokersSellTrades} />
                 <PrivateRoute path="/user/brokers/tradelog" exact component={BrokerTradeLog} />
                 <PrivateRoute path="/user/annualreports" exact component={AnnualreportUser} />
                 <PrivateRoute path="/user/corporate" exact component={Corporate_action} />
                 <PrivateRoute path="/user/bonds" exact component={Bonds} />
                 <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                 <AdminRoute path="/admin/security" exact component={SecurityCreation} />
                 <AdminRoute path="/admin/annualreport" exact component={Annualreport} />
                 <AdminRoute path="/admin/manage/annualreport" exact component={ManageReport} />
                 <AdminRoute path="/admin/annualreport/update/:reportId" exact component={UpdateReport} />
                 <AdminRoute path="/admin/manage/clients" exact component={Clients} />
                 <AdminRoute path="/admin/user/create" exact component={CreateClientUser} />
                 <AdminRoute path="/admin/user/update/:itemId" exact component={ClientUserUpdate} />
            </Switch>
        </BrowserRouter>
    );
};


export default Routes;
