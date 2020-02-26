import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import {createSecurity} from './ApiAdmin';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";

const AddSecurity = () => {
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // destructure user nad info from localstorage
  const { user, token } = isAuthenticated();

  const breadcrumb = () => (
    <div className="row pt-2 pb-2">
      <div className="col-sm-9">
        <h4 className="page-title">Form Layouts</h4>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"> <Link to="/admin/dashboard" className="text-warning">Dashboard</Link></li>
            <li class="breadcrumb-item"><a href="javaScript:void();">Forms</a></li>
            <li class="breadcrumb-item active" aria-current="page">Security Form Layouts</li>
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
          <div className="dropdown-menu">
           
          </div>
        </div>
      </div>
    </div>
  );

  const handleChange = e => {
    setError("");
    setSymbol(e.target.value);

  };

  const clickSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    // make request to api to create security
    createSecurity(user._id, token, {symbol})
    .then(data => {
      if(data.err){
        setError(data.err);
        setLoading(false);
      }else{
        setError("");
        setSuccess(true);
        setLoading(false);
      }
    });
  };

  const newSecurityForm = () => (
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="card">
          <div className="card-body">
            <div className="card-title">Security Creation Form</div>
            <hr />
            <form onSubmit={clickSubmit}>

            <div className="form-group">
					  <label htmlFor="input-1">Name</label>
            <input type="text" className="form-control" id="input-1" 
            placeholder="Enter Security Symbol"
                  onChange={handleChange}
                  value={symbol}
                  autoFocus
                  />
					 </div>
             

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary shadow-primary px-5"
                >
                  <i className="icon-lock"></i> Create Security
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );


  const showSuccess = () => (


    <div className="alert alert-outline-success alert-dismissible" role="alert" style={{display: success ? '' : 'none'}}>
        <button type="button" className="close" data-dismiss="alert">&times;</button>
      
        <div className="alert-icon">
       <i className="icon-check"></i>
        </div>
        <div className="alert-message">
          <span><strong>Success!</strong> New Security is created. </span>
        </div>
              </div>



    
);

  const showError = () => (
    <div className="alert alert-danger alert-dismissible alert-round" role="alert" style={{display: error ? '' : 'none'}}>
       <button type="button" className="close" data-dismiss="alert">×</button>
        <div className="alert-icon">
       <i className="icon-close"></i>
        </div>
        <div className="alert-message">
          <span><strong>Error!</strong>   Security should ne unique</span>
        </div>
              </div>
);

const goBack = () => {
  return(
<div className="mt-5">
     <Link to="/admin/dashboard" className="text-warning">Dashboard</Link>
  </div>
  )
  
}
    


const showLoading = () => (

    loading && ( 
        <div>
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
        </div>
       
    )

    
);


  return (
    <Fragment>
      <Dashboard></Dashboard>
      <div className="content-wrapper">
        <div className="container-fluid">
          <Ticker></Ticker>
          <div className="clearfix"></div>
          {breadcrumb()}
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newSecurityForm()}
          {goBack()}
        </div>
      </div>
    </Fragment>
  );
};

export default AddSecurity;
