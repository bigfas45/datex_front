import React, { Fragment, useState, useEffect } from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import Dashboard from './UserDashboardLayout';
import {isAuthenticated} from '../auth';
import Ticker from '../core/Ticker';
import {updateClientUser, getUserRead, updateUser} from '../core/Apicore';





const Profile = ({match}) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        company: '',
        code: '',
        telephone: '',
        error: false,
        success: false
    });
    const {token} = isAuthenticated();
    const {name,email, password, company, code, telephone, error, success} = values

    const init = (userId) => {
        getUserRead(userId, token).then(data => {
            if(data.error){
                setValues({...values, error: true})
            }else{
                setValues({...values, name: data.name, email: data.email,  company: data.company, code: data.code, telephone: data.telephone })
            }
        })
    };

    useEffect(() => {
        init(match.params.userId)
    }, []);

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    }

    const clickSubmit = e => {
        e.preventDefault()
        updateClientUser(match.params.userId, token,{ name, email, telephone, code, password, company} ).then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                updateUser(data, () => {
                    setValues({...values, name: data.name, email: data.email, success: true  })
                })
            }
        });
    };

    const redirectUser = (success) => {
        if (success) {
            return <Redirect to="/user/dashboard" />
        }
    }

    const template = (name, email, password, company, telephone, code) => {
        return(
            <Fragment>
                <div className="clearfix"></div>
	
    
      
       <div className="row pt-2 pb-2">
          <div className="col-sm-9">
              <h4 className="page-title text-white">User Profile</h4>
              <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="javaScript:void();">Rocker</a></li>
              <li className="breadcrumb-item"><a href="javaScript:void();">Pages</a></li>
              <li className="breadcrumb-item active" aria-current="page">User Profile</li>
           </ol>
         </div>
       <div className="col-sm-3">
         <div className="btn-group float-sm-right">
          <button type="button" className="btn btn-outline-primary waves-effect waves-light"><i className="fa fa-cog mr-1"></i> Setting</button>
          <button type="button" className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split waves-effect waves-light" data-toggle="dropdown">
          <span className="caret"></span>
          </button>
          <div className="dropdown-menu">
            <a href="javaScript:void();" className="dropdown-item">Action</a>
            <a href="javaScript:void();" className="dropdown-item">Another action</a>
            <a href="javaScript:void();" className="dropdown-item">Something else here</a>
            <div className="dropdown-divider"></div>
            <a href="javaScript:void();" className="dropdown-item">Separated link</a>
          </div>
        </div>
       </div>
       </div>
        <div className="row">
          <div className="col-lg-4">
             <div className="profile-card-3">
              <div className="card">
               <div className="user-fullimage">
                 <img src="https://nasdng.com/wp-content/uploads/2020/03/avater.jpg" alt="user avatar" className="card-img-top" />
                  <div className="details">
                    <h5 className="mb-1 text-black ml-3">{name}</h5>
                    <h6 className="text-black ml-3">{company}</h6>
                   </div>
                </div>
              <div className="card-body text-center">
               <p></p>
                    
  
                    <hr />
                  </div>
               </div>
              </div>
          </div>
          <div className="col-lg-8">
             <div className="card">
              <div className="card-body">
              <ul className="nav nav-tabs nav-tabs-primary top-icon nav-justified">
                 
                  <li className="nav-item">
                      <a href="javascript:void();" data-target="#messages" data-toggle="pill" className="nav-link"><i className="icon-envelope-open"></i> <span className="hidden-xs">Messages</span></a>
                  </li>
                  <li className="nav-item">
                      <a href="javascript:void();" data-target="#edit" data-toggle="pill" className="nav-link"><i className="icon-note"></i> <span className="hidden-xs">Edit</span></a>
                  </li>
              </ul>
              <div className="tab-content p-3">
                  
                  <div className="tab-pane" id="messages">
                      <div className="alert alert-info alert-dismissible" role="alert">
                     <button type="button" className="close" data-dismiss="alert">&times;</button>
                      <div className="alert-icon">
                       <i className="icon-info"></i>
                      </div>
                      <div className="alert-message">
                        <span><strong>Info!</strong> Lorem Ipsum is simply dummy text.</span>
                      </div>
                    </div>
                      <table className="table table-hover table-striped">
                          <tbody>                                    
                              <tr>
                                  <td>
                                     <span className="float-right font-weight-bold">3 hrs ago</span> Here is your a link to the latest summary report from the..
                                  </td>
                              </tr>
                             
                          </tbody> 
                      </table>
                  </div>
                  <div className="tab-pane" id="edit">
                      <form>
                          <div className="form-group row">
                              <label className="col-lg-3 col-form-label form-control-label">Name</label>
                              <div className="col-lg-9">
                                  <input className="form-control" type="text" onChange={handleChange('name')} value={name} />
                              </div>
                          </div>
                         
                          <div className="form-group row">
                              <label className="col-lg-3 col-form-label form-control-label">Email</label>
                              <div className="col-lg-9">
                                  <input className="form-control" type="email" onChange={handleChange('email')} value={email} />
                              </div>
                          </div>
                          <div className="form-group row">
                              <label className="col-lg-3 col-form-label form-control-label">Company</label>
                              <div className="col-lg-9">
                                  <input className="form-control" type="text" onChange={handleChange('company')} value={company} />
                              </div>
                          </div>
                          <div className="form-group row">
                              <label className="col-lg-3 col-form-label form-control-label">Telephone</label>
                              <div className="col-lg-9">
                                  <input className="form-control" type="number" onChange={handleChange('telephone')} value={telephone} />
                              </div>
                          </div>
                          <div className="form-group row">
                              <label className="col-lg-3 col-form-label form-control-label">Brokers Code</label>
                              <div className="col-lg-9">
                                  <input className="form-control" type="text" onChange={handleChange('code')} value={code}  />
                              </div>
                          </div>
                        
                        
                          <div className="form-group row">
                              <label className="col-lg-3 col-form-label form-control-label">Password</label>
                              <div className="col-lg-9">
                                  <input className="form-control" type="password" onChange={handleChange('password')} value={password}/>
                              </div>
                          </div>
                        
                          <div className="form-group row">
                              <label className="col-lg-3 col-form-label form-control-label"></label>
                              <div className="col-lg-9">
                             
                                  <button onClick={clickSubmit} className="btn btn-primary" >Submit</button>

                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
        </div>
        </div>
          
      </div>
  
      
    
            </Fragment>
        )
    }



    return(
        <Fragment>
        <Dashboard></Dashboard>
    

        <div className="content-wrapper">
          <div className="container-fluid">
          <Ticker></Ticker>
          {template(name, email, password, company, telephone, code)}
         {redirectUser(success)}
     
          </div>
          </div>
        
          </Fragment>
    )

}


export default Profile;
