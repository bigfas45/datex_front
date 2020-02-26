import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';
import logo from '../img/NASD-LOGO-PLC (1).png';
import Layout from './Layout';
import {signout, isAuthenticated} from '../auth'







const isActive = (history, path) =>{
    if(history.location.pathname === path){
        return{color: '#ff9900'};
    }else{
        return{color: '#1164ac'};
    }
};



const date = () => {
  
   let date = new Date().toLocaleString();
    return date;
}
//Saturday
const marketStatus = () => {
    let date2 = new Date().getHours();
    let weekday = new Date().toLocaleString('en-us', {  weekday: 'long' });
  if (date2 >= 10 && date2 < 15 && weekday !=='Saturday' && weekday !=='Sunday' ) {
      return <p className="badge badge-primary" style={{fontSize: "1rem"}}>MARKET OPEN</p>;
  }else{
    return  <p className="badge badge-danger" style={{fontSize: "1rem"}}>MARKET CLOSED</p>;
  }
}

const Menu = ({history}) => (
   <div  style={{backgroundColor:"white"}}>
    <div className="row" style={{marginBottom:"-12px"}}>
       
       <div className="col-xs-12 col-s-12 col-3">
                <Link className="nav-link " style={isActive(history, '/')} to="/"> {marketStatus()} </Link>
      </div>
      <div className="col-xs-12 col-s-12  col-5">
<Link className="nav-link" style={isActive(history, '/')} to="/"><span className="badge badge-warning text-uppercase font-weight-bolder" style={{fontSize: "1rem"}}>Market Numbers For: {date()}</span></Link>
       </div>
       <div className="col-xs-12 col-s-12  col-2">
                <Link className="nav-link" style={isActive(history, '/')} to="/"><img style={{marginTop: "-2"}} src={logo} height="30" className="App-logo mt5" alt="logo" /></Link>
          </div>
        {!isAuthenticated() && (
              <div className="col-xs-12 col-s-12  col-2">
                <Link className="nav-link" style={isActive(history, '/signin')} to="/signin"> <span className="badge badge-warning text-uppercase font-weight-bolder" style={{fontSize: "1rem"}}>LOGIN</span> </Link>
            </div>
        )}

        {isAuthenticated() && (
            <Fragment>
            {/* <div className="col-1">
                <span className="nav-link" style={{cursor: 'pointer'}}  onClick={() => signout(() => {
                    history.push('/');
                })}>
                    <span className="badge badge-warning text-uppercase font-weight-bolder" style={{fontSize: "1rem"}}>SIGNOUT</span>
                </span>
            </div> */}


            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                 <div className="col-xs-12 col-s-12  col-1">
                 <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard"><span className="badge badge-primary text-uppercase font-weight-bolder" style={{fontSize: "1rem"}}> {isAuthenticated().user.name} <i class="icon-home"></i> </span></Link>
            </div>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                 <div className="col-xs-12 col-s-12  col-1">
                 <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard"><span className="badge badge-primary text-uppercase font-weight-bolder" style={{fontSize: "1rem"}}>ADMIN <i class="icon-home"></i></span></Link>
            </div>
            )}
           
            </Fragment>
           
         
        )}
       
          
    </div>
    </div>
   
);


export default withRouter(Menu);


