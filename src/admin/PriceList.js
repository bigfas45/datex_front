import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import { getPriceList} from "./ApiAdmin";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import ShowFile from "../admin/ShowFile";
import WordLimit from 'react-word-limit';



const ManagePriceList = () => {

    const [price, setPrice] = useState([]);

    const {user, token} = isAuthenticated()
    let count =0;
    let totalReport =0;

    const loadMail = () => {
        getPriceList(user._id,token).then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setPrice(data)
            }
        })
    }



    // const destroy = reportId => {
    //     deleteReport(reportId, user._id, token ).then(data => {
    //         if (data.error) {
    //             console.log(data.error)
    //         }else{
    //             loadReport()
    //         }
    //     })
    // }

    useEffect(() => {
        loadMail();
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
              <Link to="/admin/user/price/create" class="dropdown-item">Create Price List</Link>
              
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
               Total  {price.length} Price Listed
              </h6>
              <hr />
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class="thead-primary">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Security</th>
                          <th scope="col">Open Price</th>
                          <th scope="col">Close Price</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>

                          {price.map((r, i) => {
                              count++
                             
                              return(
                                <tr key={i}>
                                <th scope="row">{count}</th>
                                <td>{r.security && r.security.symbol }</td>
                                <td>{r.Ref_Price}</td>
                                <td>{r.Open_Price}</td>
                              
                              
                               
                                <td>
                                  <Link to={`/admin/user/price/${r._id}`} >
                                      <span className="badge badge-warning badge-pill">
                                      Update
                                      </span>
                                  </Link>
                               
                                      {/* <span onClick={() => destroy(r._id)} className="badge badge-danger badge-pill">
                                        Delete
                                      </span> */}
                                 
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


export default ManagePriceList