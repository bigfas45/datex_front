import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import {Link,Redirect } from 'react-router-dom';
import logo from '../img/NASD-LOGO-PLC (1).png';
import '../App.css';
import  {signup} from '../auth';
import Spinner from 'react-bootstrap/Spinner';



const Signup = () => {
  
    const [values, setValues] = useState({
        name: '',
        email: '',
        company: '',
        telephone: '',
        group: '',
        code: '',
        role: '',
        password: '',
        error: '',
        redirectToProfile: false,
        loading: false,
        success: false
    });

    const {name, email , company, telephone, role, group, code, password, redirectToProfile,  loading, success, error} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

   
   
    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error:false, loading:true})
        signup({name, email, company, telephone, group, code, role, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false, loading: false})
            }else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    company: '',
                    telephone: '',
                    role: '',
                    group :'',
                    code: '',
                    password: '',
                    error: '',
                    redirectToProfile: true,
                    success: true

                })
            }
        })
    }

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
        
    

    const showSuccess = () => (


        <div class="alert alert-outline-success alert-dismissible" role="alert" style={{display: success ? '' : 'none'}}>
				    <button type="button" class="close" data-dismiss="alert">&times;</button>
					
				    <div class="alert-icon">
					 <i class="icon-check"></i>
				    </div>
				    <div class="alert-message">
				      <span><strong>Success!</strong> New account is created.</span>
				    </div>
                  </div>



        
    );

  
      
//      


    const createUserForm = () => {
        return(
            <Fragment>
            <h6 class="text-uppercase">Form With Square Inputs</h6>
            <hr />
            <div class="card">
              <div class="card-body">
                <div class="card-title">Vertical Form with square input</div>
                <hr />
                  {showLoading()}       
                  {showSuccess()}
                  {showError()}
                 <form>
                  <div class="form-group">
                   <label for="input-13">Name</label>
                   <input onChange={handleChange('name')} type="text" id="exampleInputEmailId" className="form-control" placeholder="Your full name" value={name}/>

                  </div>
                  <div class="form-group">
                   <label for="input-14">Email</label>
                   <input onChange={handleChange('email')} type="text" id="exampleInputEmailId" className="form-control" placeholder="Email ID" value={email} />

                  </div>

                  <div class="form-group">
                   <label for="input-14">Company</label>
                   <input onChange={handleChange('company')} type="text" id="exampleInputEmailId" className="form-control" placeholder="Company" value={company} />

                  </div>
                  <div class="form-group">
                   <label for="input-14">Telephone</label>
                   <input onChange={handleChange('telephone')} type="number" id="exampleInputEmailId" className="form-control" placeholder="Telephone" value={telephone} />
                  </div>

                  <div class="form-group">
                   <label for="input-14">Code</label>
                   <input onChange={handleChange('code')} type="text" id="exampleInputEmailId" className="form-control" placeholder="Code" value={code} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-1">Role</label>
                    <select
                    onChange={handleChange("role")}
                    className="form-control"
                    id="input-1"
                    >
                    <option value="">~~~~Please Select~~~</option>
                    <option value="0">Brokers</option>
                    <option value="1">Admin</option>
                    </select>
                 </div>


                 <div className="form-group">
                    <label htmlFor="input-1">Group</label>
                    <select
                    onChange={handleChange("group")}
                    className="form-control"
                    id="input-1"
                    >
                    <option value="">~~~~Please Select~~~</option>
                    <option value="1">Group A</option>
                    <option value="2">Group B</option>
                    </select>
                 </div>

                  <div class="form-group">
                   <label for="input-15">Password</label>
                   <input onChange={handleChange('password')} type="password"  className="form-control form-control-rounded" placeholder="Password" value={password} />

                  </div>
                
                  <div class="form-group">
                   <button onClick={clickSubmit} type="submit" class="btn btn-primary shadow-primary btn-square px-5"><i class="icon-lock"></i> Create USer</button>
                 </div>
                 </form>
              </div>
            </div>
            </Fragment>
        )
    }

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
              <Link to="/admin/manage/clients" className="breadcrumb-item">User list</Link>
             
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
              <Link to="/admin/user/create" class="dropdown-item">Create User</Link>
              </div>
            </div>
          </div>
        </div>
      );
    

      const redirectUser = () => {

        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/manage/clients" />
            }
        }
      
    }


    return(
       
        <Fragment>
        <Dashboard></Dashboard>
        <div className="content-wrapper">
          <div className="container-fluid">
            <Ticker></Ticker>
              
               {breadcrumb()}
              
                {createUserForm()}
                
                </div>
      </div>
    </Fragment>
      
       
        );
}

   



  

    

export default Signup;
