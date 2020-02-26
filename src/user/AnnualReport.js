import React, {Fragment, useState, useEffect} from 'react';
import Ticker from '../core/Ticker';
import Dashboard from './UserDashboardLayout';
import { Link } from 'react-router-dom';
import {report} from '../core/Apicore';
import Moment from 'moment';
import ShowFile from './ShowFile';



const AnnualReportFrontEnd = () => {

    const [reportList, setReportList] = useState([]);
    const [error, setError] = useState(false);

    let count =0;

    const loadReport = () => {
        report().then(data =>{
            if (data.error) {
                setError(data.error)
            }else{
                setReportList(data)
            }
        })
    }

    useEffect(() => {
        loadReport()
    }, [])





    const table = () => {
        return(
            <div className="col-lg-12">
            <h6 className="text-uppercase text-white">Report Header</h6>
            <hr />
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="thead-info">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Year</th>
                        <th scope="col">Company</th>
                        <th scope="col">File Name</th>
                        <th scope="col">Security</th>
                        <th scope="col">File</th>
                      </tr>
                    </thead>
                    <tbody>
                        {reportList.map((reports, i) => {
                            count ++
                            return(
                        <tr key={i}>
                            <th scope="row">{count}</th>
                            <td>{reports.year}</td>
                            <td>{reports.company}</td>
                            <td>{reports.filename}</td>
                            <td>{reports.security.symbol}</td>
                            <td>
                                <ShowFile item={reports} url="nasd/annualreport" />
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
        )
    }

    const breadcrumb = () => (
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Form Layouts</h4>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"> <Link to="/user/dashboard" className="text-warning">Dashboard</Link></li>
                <li className="breadcrumb-item">Forms</li>
                <li className="breadcrumb-item active" aria-current="page">Security Form Layouts</li>
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
    


    return(
        <Fragment>
            <Dashboard></Dashboard>
            <div className="clearfix"></div>
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

export default AnnualReportFrontEnd