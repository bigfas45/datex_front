import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import {  getUserList, deleteUser } from "./ApiAdmin";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

const ClientsAccount = () => {

    const [userList, setUserList] = useState([])
    const [error, setError]  = useState([])
      const { user, token } = isAuthenticated();
      let count =0;

    //   let mainUserId1 = user._id;
    //   let mainUserId2 = user._id;
      
    
      // load user list
    
      const init = () => {
        getUserList(user._id, token).then(data => {
          if (data.error) {
            setError(data.error)
          }else{
            setUserList(data)
          }
        })
      }
    
      useEffect(() => {
        init();
      }, []);

      const destroy = deleteUserId => {
        deleteUser(deleteUserId, user._id, token ).then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                init()
            }
        })
    }


      const table = () => {
        return(
          <div class="row">
          <div class="col-lg-12">
            <h6 class="text-uppercase text-white">
             Total  {userList.length} Report
            </h6>
            <hr />
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="thead-primary">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Comapny</th>
                        <th scope="col">Role</th>
                        <th scope="col">Group</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>

                        {userList.map((u, i) => {
                            count++
                           
                            return(
                              <tr key={i}>
                              <th scope="row">{count}</th>
                              <td>{u.name}</td>
                              <td>{u.email}</td>
                              <td>{u.company}</td>
                              <td>{u.role}</td>
                              <td>{u.group}</td>
                              <td>
                                <Link to={`/admin/user/update/${u._id}`} >
                                    <span className="badge badge-warning badge-pill">
                                      Update
                                    </span>
                                </Link>
                             
                                    <span onClick={() => destroy(u._id)} className="badge badge-danger badge-pill">
                                      Delete
                                    </span>
                               
                              </td>
                            </tr>
                            )
                        })}
                    
                     
                     
                    </tbody>
                  </table>
               </div>
              </div>
            </div>
          </div>
          </div>
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
    
    
    
     
    
    
    
  

    return(
        <Fragment>
      <Dashboard></Dashboard>
      <div className="content-wrapper">
        <div className="container-fluid">
          <Ticker></Ticker>
          {breadcrumb()}
          {table()}
        
        
        </div>
      </div>
    </Fragment>
    )

}

export default ClientsAccount