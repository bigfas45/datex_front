import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import { getReports, deleteReport } from "./ApiAdmin";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import ShowFile from "../user/ShowFile"



const ManageProduct = history => {

    const [report, setReports] = useState([])

    const {user, token} = isAuthenticated()
    let count =0;
    let totalReport =0;

    const loadReport = () => {
        getReports().then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setReports(data)
            }
        })
    }

    const destroy = reportId => {
        deleteReport(reportId, user._id, token ).then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                loadReport()
            }
        })
    }

    useEffect(() => {
        loadReport()
    }, [])



    const breadcrumb = () => (
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Manage Report Layouts</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                {" "}
                <Link to="/admin/dashboard" className="text-warning">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item">
                annualreport
              </li>
              <li className="breadcrumb-item active" aria-current="page">
              Manage Report Layouts
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
              <div className="dropdown-menu">
              <Link to="/admin/annualreport" class="dropdown-item">Create Report</Link>
              
              <div class="dropdown-divider"></div>
              <a href="javaScript:void();" class="dropdown-item">Separated link</a>
              </div>
            </div>
          </div>
        </div>
      );

      const table = () => {
          return(
            <div class="row">
            <div class="col-lg-12">
              <h6 class="text-uppercase text-white">
               Total  {report.length} Report
              </h6>
              <hr />
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class="thead-primary">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Comapny</th>
                          <th scope="col">year</th>
                          <th scope="col">File name</th>
                          <th scope="col">Security</th>
                          <th scope="col">File</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>

                          {report.map((r, i) => {
                              count++
                             
                              return(
                                <tr key={i}>
                                <th scope="row">{count}</th>
                                <td>{r.company}</td>
                                <td>{r.year}</td>
                                <td>{r.filename}</td>
                                <td>{r.security.symbol}</td>
                                <td>
                                <ShowFile item={r} url="nasd/annualreport" />
                                </td>
                                <td>
                                  <Link to={`/admin/annualreport/update/${r._id}`} >
                                      <span className="badge badge-warning badge-pill">
                                        Update
                                      </span>
                                  </Link>
                               
                                      <span onClick={() => destroy(r._id)} className="badge badge-danger badge-pill">
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


export default ManageProduct