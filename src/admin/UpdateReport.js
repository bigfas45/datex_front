import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import { getReport, getSecurities, updateReport } from "./ApiAdmin";
import Spinner from "react-bootstrap/Spinner";
import { Link, Redirect } from "react-router-dom";

const UpdateAnnualReport = ({match}) => {
  const [values, setValues] = useState({
    company: "",
    year: "",
    filename: "",
    securities: [],
    security: "",
    file: "",
    loading: false,
    error: "",
    createdReport: "",
    redirectToProfile: false,
    formData: ""
  });

  const {
    company,
    year,
    filename,
    securities,
    security,
    loading,
    error,
    createdReport,
    redirectToProfile,
    formData
  } = values;

  const { user, token } = isAuthenticated();

  const init = (reportId) => {
      getReport(reportId).then(data => {
          if(data.error){
                setValues({...values, error: data.error})
          }else{
            // populate the state
            setValues({...values, company: data.company, year: data.year, filename: data.filename, security: data.security._id, formData: new FormData()})
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
    init(match.params.reportId);
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

    updateReport(match.params.reportId, user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          company: "",
          year: "",
          filename: "",
          file: "",
          loading: false,
          error: false,
          redirectToProfile: true,
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
            <div className="card-title">Annual Report Creation Form</div>
            <hr />
            <form onSubmit={clickSubmit}>
              <div className="form-group">
                <label htmlFor="input-1">File</label>
                <input
                  onChange={handleChnage("file")}
                  type="file"
                  name="file"
                  className="form-control"
                  id="input-1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-1">Company</label>
                <input
                  onChange={handleChnage("company")}
                  type="text"
                  className="form-control"
                  id="input-1"
                  placeholder="Enter Company Name"
                  value={company}
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-1">Year</label>
                <input
                  onChange={handleChnage("year")}
                  type="number"
                  className="form-control"
                  id="input-1"
                  placeholder="Enter Year"
                  value={year}
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-1">File Name</label>
                <input
                  onChange={handleChnage("filename")}
                  type="text"
                  className="form-control"
                  id="input-1"
                  placeholder="Enter File Name"
                  value={filename}
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-1">Security</label>
                <select
                  onChange={handleChnage("security")}
                  className="form-control"
                  id="input-1"
                >
                  <option value="">~~~~Please Select~~~</option>
                  {securities && securities.map((s, i) =>
                  (   <option key={i} value={s._id}>{s.symbol}</option>)
                  )}
                 
                </select>
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary shadow-primary px-5"
                >
                  <i className="icon-lock"></i> Update Report
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
            return <Redirect to="/admin/manage/annualreport" />
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

export default UpdateAnnualReport;
