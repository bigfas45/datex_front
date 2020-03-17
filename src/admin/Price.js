import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import { createPrice, getSecurities } from "./ApiAdmin";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

const CreatePrice = () => {
  const [values, setValues] = useState({
   
    securities: [],
    security: "",
    Ref_Price: "",
    Open_Price: "",
    loading: false,
    error: "",
    createdReport: "",
    redirectToProfile: false,
    formData: ""
  });

  const {
    
    securities,
    security,
    Ref_Price,
    Open_Price,
    loading,
    error,
    createdReport,
    redirectToProfile,
    formData
  } = values;

  const { user, token } = isAuthenticated();

  // load security and set FormData

  const init = () => {
    getSecurities().then(data => {
      if (data.error) {
        setValues({...values, error:data.error})
      }else{
        setValues({...values,securities: data, formData: new FormData() })
      }
    })
  }

  useEffect(() => {
    init();
  }, []);

  const handleChnage = name => event => {
    const value = name === "file" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    //
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createPrice(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          Ref_Price: "",
          Open_Price: "",
        
          loading: false,
          createdReport: data.company
        });
      }
    });
  };

  const newPostForm = () => (
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="card">
          <div className="card-body">
            <div className="card-title">Price creation</div>
            <hr />
            <form onSubmit={clickSubmit}>
            

              

            


              <div className="form-group">
                <label htmlFor="input-1">Security</label>
                <select
                  onChange={handleChnage("security")}
                  className="form-control"
                  id="input-1"
                >
                  <option value={security}>~~~~Please Select~~~</option>
                  {securities && securities.map((s, i) =>
                  (   <option key={i} value={s._id}>{s.symbol}</option>)
                  )}
               
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="input-1">Open Price</label>
                <input
                  onChange={handleChnage("Ref_Price")}
                  type="number"
                  className="form-control"
                  id="input-1"
                  placeholder="Enter Open Price"
                  value={Ref_Price}
                />
              </div>
              <div className="form-group">
                <label htmlFor="input-1">Close Price</label>
                <input
                  onChange={handleChnage("Open_Price")}
                  type="number"
                  className="form-control"
                  id="input-1"
                  placeholder="Enter Close Price"
                  value={Open_Price}
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary shadow-primary px-5"
                >
                  <i className="icon-lock"></i> Create Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const breadcrumb = () => (
    <div className="row pt-2 pb-2">
      <div className="col-sm-9">
        <h4 className="page-title">Form Layouts</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {" "}
            <Link to="/admin/dashboard" className="text-warning">
              Dashboard
            </Link>
          </li>
          <Link to="/admin/user/price/list" className="breadcrumb-item">Price list</Link>
         
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
  );


  const showSuccess = () => (


    <div className="alert alert-outline-success alert-dismissible" role="alert" style={{display: createdReport ? '' : 'none'}}>
        <button type="button" className="close" data-dismiss="alert">&times;</button>
      
        <div className="alert-icon">
       <i className="icon-check"></i>
        </div>
        <div className="alert-message">
          <span><strong>Success!</strong> New Report is created. </span>
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
          <span><strong>Error!</strong>   {error}</span>
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
          {breadcrumb()}
          {showLoading()}
          {showSuccess()}
          {showError()}
       
       
          {newPostForm()}
        </div>
      </div>
    </Fragment>
  );
};

export default CreatePrice;
