import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import { updateEod, getEodUpdate } from "./ApiAdmin";
import Spinner from "react-bootstrap/Spinner";
import { Link, Redirect} from "react-router-dom";

const Vwap = () => {




    return(
        <Fragment>
             <Dashboard></Dashboard>
      <div className="content-wrapper">
        <div className="container-fluid">
          <Ticker></Ticker>
         
        </div>
      </div>
        </Fragment>
    )
}


export default Vwap;