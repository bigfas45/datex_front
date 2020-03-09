import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';


const PrivateRoute = ({component: Component, ...rest}) => (

  
     
    <Route {...rest} render={props => isAuthenticated() && isAuthenticated().user.group === 1 ? (
        <Component {...props} />
    ) : (
        
        // <Redirect to={{pathname: '/signin', state:{from: props.location}}} />
        <Redirect to={{pathname: '/user/notallowed'}} />
    )} />
);

export default PrivateRoute