import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import { getPrice, getSecurities, updatePrice } from "./ApiAdmin";
import Spinner from "react-bootstrap/Spinner";
import { Link, Redirect } from "react-router-dom";

const UpdatePriceList = ({match}) => {
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

  const init = (priceId) => {
    getPrice(priceId,token).then(data => {
          if(data.error){
                setValues({...values, error: data.error})
          }else{
            // populate the state
            setValues({...values, security: data.security.symbol, Ref_Price: data.Ref_Price, Open_Price: data.Open_Price, formData: new FormData()})
            // load security
            initSecurity()
          }
      })
  }

  // load security and set FormData

  const initSecurity = () => {
    getSecurities().then(data => {
      if (data.error) {
        setValues({...values, error:data.error})
      }else{
        setValues({securities: data, formData: new FormData() })
      }
    })
  }

  useEffect(() => {
    init(match.params.priceId);
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

    updatePrice(match.params.priceId, user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          securities,
            security,
            Ref_Price,
            Open_Price,
          loading: false,
          error: false,
          redirectToProfile: true,
          createdReport: data.Open_Price
        });
      }
    });
  };

  const newPostForm = () => (
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="card">
          <div className="card-body">
            <div className="card-title">Price Update Form</div>
            <hr />
            <form onSubmit={clickSubmit}>
             

             
            <div className="form-group">
                <label htmlFor="input-1">Security</label>
                <select
                  onChange={handleChnage("security")}
                  className="form-control"
                  id="input-1"
                  
                >
                  <option value="">{security}</option>
                  {securities && securities.map((s, i) =>
                  (   <option key={i} value={s._id}>{s.symbol}</option>)
                  )}
                 
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="input-1">Ref Price</label>
                <input
                  onChange={handleChnage("Ref_Price")}
                  type="number"
                  className="form-control"
                  id="input-1"
                  placeholder="Enter Year"
                  value={Ref_Price}
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-1">Close Price</label>
                <input
                  onChange={handleChnage("Open_Price")}
                  type="text"
                  className="form-control"
                  id="input-1"
                  placeholder="Enter File Name"
                  value={Open_Price}
                />
              </div>

            

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary shadow-primary px-5"
                >
                  <i className="icon-lock"></i> Update Price
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
          <Link to="/admin/manage/annualreport" className="breadcrumb-item">Annual report list</Link>
         
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

const redirectUser = () => {

    if (redirectToProfile) {
        if (!error) {
            return <Redirect to="/admin/user/price/list" />
        }
    }
  
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
          {redirectUser()}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePriceList;
