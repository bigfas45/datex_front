import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import {Route, Redirect, Link} from 'react-router-dom';
import {signout} from '../auth';



const NotAllowed = ({history}) => {

const layout = () => {
    return(
        <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="text-center coming-soon">
                   
                    <h2 class="coming-soon-title text-success">YOU ARE NOT GRANTED ACCESS</h2>
                    <h6 class="text-white text-uppercase">Lets Join and work with us</h6>
                    <p class="text-white">Contact marketoperations@nasdng.com or (+234-902-455-9686) <br />for more information </p>
                 
                   
                    <div class="mt-4">
                      <Link to="/" class="btn btn-success btn-round shadow-success m-1">Go To Home </Link>
                      
                      <Link to="/user/dashboard" class="btn btn-success btn-round shadow-success m-1">Go To Dashboard </Link>
                     
                    </div>
                     
                    <div class="mt-4">
                        <p class="text-white">NASDPLC © 2020  <span class="text-success">NASD-DATA-PORTAL </span>| All rights reserved.</p>
                    </div>
                       <hr class="w-50" />
                     <div class="mt-2">
                       </div>
                </div>
            </div>
        </div>
    </div>
 
    
    )
}

    return(
        <Fragment>
            <Ticker></Ticker>
            {layout()}
        </Fragment>
    )

}

export default NotAllowed