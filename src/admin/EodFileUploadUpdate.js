import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import { updateEod, getEodUpdate } from "./ApiAdmin";
import Spinner from "react-bootstrap/Spinner";
import { Link, Redirect} from "react-router-dom";

const Mail = ({match}) => {

    const [values, setValues] = useState({
        name: "",
        file: "",
        loading: false,
        error: "",
        createdMail: "",
        redirectToProfile: false,
        formData: ""
      });
    
      const {
        name,
        loading,
        error,
        createdMail,
        redirectToProfile,
        formData
      } = values;

    const { user, token } = isAuthenticated();

  

    
    const init = (eodId) => {
        getEodUpdate(eodId).then(data => {
          if(data.error){
                setValues({...values, error: data.error})
          }else{
            // populate the state
            setValues({...values, name: data.name,   formData: new FormData()})
          
           
          }
      })
  }

  useEffect(() => {
    init(match.params.eodId);
   
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
    
        updateEod(match.params.eodId, user._id, token, formData).then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              name: "",
              file: "",
              loading: false,
              redirectToProfile: true,
              createdMail: data.subject
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
                    <label htmlFor="input-1">Name</label>
                    <input
                      onChange={handleChnage("name")}
                      type="text"
                      className="form-control"
                      id="input-1"
                      placeholder="Enter Mail Subject"
                      value={name}
                    />
                  </div>
    
                  
    
    
                
    
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary shadow-primary px-5"
                    >
                      <i className="icon-lock"></i> Update 
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
              <Link to="/admin/user/mail/manage" className="breadcrumb-item">Mail list</Link>
             
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
              <Link to={`/admin/user/mail/test/${match.params.emailId}`} class="dropdown-item">Market Operation</Link>
              <Link to={`/admin/user/mail/nasdparticipant/${match.params.emailId}`} class="dropdown-item">NASD Participant</Link>
             
            
              
              <div class="dropdown-divider"></div>
              <Link to={`/admin/user/mail/allparticipant/${match.params.emailId}`} class="dropdown-item">NSE/NASD Participant</Link>
              </div>            </div>
          </div>
        </div>
      );


      const showSuccess = () => (


        <div className="alert alert-outline-success alert-dismissible" role="alert" style={{display: createdMail ? '' : 'none'}}>
            <button type="button" className="close" data-dismiss="alert">&times;</button>
          
            <div className="alert-icon">
           <i className="icon-check"></i>
            </div>
            <div className="alert-message">
              <span><strong>Success!</strong> New Mail is created. </span>
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
              return <Redirect to="/admin/user/eod/manage" />
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
    
    

    return(
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
    )


}

export default Mail;