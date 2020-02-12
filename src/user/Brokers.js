import React, { Fragment, useState, useEffect, Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Ticker from "../core/Ticker";
import Dashboard from "./UserDashboardLayout";


const Brokers = () => {





  const buttonLink = () => {
    return (
      <Fragment>
        <div className="clearfix"></div>

        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Buttons</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
               <Link to="/">Home</Link>
               
              </li>
              <li className="breadcrumb-item">
              <Link to="/user/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Brokers
              </li>
            </ol>
          </div>
          <div className="col-sm-3">
            <div className="btn-group float-sm-right">
              <button
                type="button"
                className="btn btn-outline-primary waves-effect waves-light"
              >
                <i className="fa fa-cog mr-1"></i> Setting
              </button>
              <button
                type="button"
                className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split waves-effect waves-light"
                data-toggle="dropdown"
              >
                <span className="caret"></span>
              </button>
              <div className="dropdown-menu"></div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header text-uppercase">
                Brokers Trades 2020
              </div>
              <div className="card-body">
                <Link to="/user/brokers/trades" className="waves-effect">
                  {" "}
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light m-1"
                  >
                    ALL BROKERS TRADES
                  </button>
                </Link>
                <Link to="/user/brokers/topTen" className="waves-effect">
                  {" "}
                <button
                  type="button"
                  className="btn btn-danger waves-effect waves-light m-1"
                >
                  TOP 10 BROKERS
                </button>
                </Link>
                <Link to="/user/brokers/buy" className="waves-effect">
                <button
                  type="button"
                  className="btn btn-success waves-effect waves-light m-1"
                >
                  MY BUY TRADES
                </button>
                </Link>
                <Link to="/user/brokers/sell" className="waves-effect">
                <button
                  type="button"
                  className="btn btn-info waves-effect waves-light m-1"
                >
                  MY SELL TRADES
                </button>
                </Link>
                <Link to="/user/brokers/tradelog" className="waves-effect">
                <button
                  type="button"
                  className="btn btn-warning waves-effect waves-light m-1"
                >
                  TRADE LOG
                </button>
                </Link>
                {/* <button type="button" className="btn btn-dark waves-effect waves-light m-1">DARK</button>
			<button type="button" className="btn btn-secondary waves-effect waves-light m-1">SECONDARY</button>
			<button type="button" className="btn btn-light waves-effect waves-light m-1">LIGHT</button>
			<button type="button" className="btn btn-link m-1">LINK</button> */}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

 

  return (
    <Fragment>
      <Dashboard></Dashboard>
      <div className="content-wrapper">
        <div className="container-fluid">
          <Ticker></Ticker>
          {buttonLink()}
        </div>
      </div>
    </Fragment>
  );
};

export default Brokers;
