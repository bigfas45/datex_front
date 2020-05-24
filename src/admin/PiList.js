import React, {Fragment, useState, useEffect} from 'react';
import Ticker from '../core/Ticker';
import Dashboard from './AdminDashboardLayout';
import { Link } from 'react-router-dom';
import {getPiList} from '../admin/ApiAdmin';
import ReactTable from 'react-table-6';
import "react-table-6/react-table.css";
import ExportToExcel from "./ExportToExcelPriceList";



const PiList = () => {


    const [data, setData] = useState([]);
    const [error, setError] = useState(false);





    const loadPiList = () => {
        getPiList().then(data => {
            if (data.error) {
                setError(data.error)
            }else{
                setData(data)
            }
        });
    };
    
    
    useEffect(() => {
    
        loadPiList();
    
    }, []);




    const breadcrumb = () => (
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Form Layouts</h4>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"> <Link to="/user/dashboard" className="text-warning">Dashboard</Link></li>
                <li className="breadcrumb-item">PI</li>
                <li className="breadcrumb-item active" aria-current="page">List</li>
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

      const columns = [{
        Header: 'Member Name',
        accessor: 'member_name' // String-based value accessors!
      }, {
        Header: 'Member Code',
        accessor: 'member_code' // String-based value accessors!
      },
      {
        Header: 'REGISTRATION TYPE',
        accessor: 'REGISTRATION_TYPE' // String-based value accessors!
      },
      
      {
        Header: 'REGISTERED ADDRESS',
        accessor: 'REGISTERED_ADDRESS' // String-based value accessors!
      },
      {
        Header: 'RC NUMBER',
        accessor: 'RC_NUMBER' // String-based value accessors!
      },
      {
        Header: 'WEBSITE',
        accessor: 'WEBSITE' // String-based value accessors!
      },
      {
        Header: 'Date of Incorporation',
        accessor: 'Date_of_Incorporation' // String-based value accessors!
      },
      {
        Header: 'SEC registered',
        accessor: 'SEC_registered' // String-based value accessors!
      },
      {
        Header: 'Principal Contact Name',
        accessor: 'Principal_Contact_Name' // String-based value accessors!
      },
      {
        Header: 'Principal Contact Phone',
        accessor: 'Principal_Contact_Phone' // String-based value accessors!
      },
      {
        Header: 'Principal Contact Email',
        accessor: 'Principal_Contact_Email' // String-based value accessors!
      },
      {
        Header: 'Enquiries Contact Name',
        accessor: 'Enquiries_Contact_Name' // String-based value accessors!
      },
      {
        Header: 'Enquiries Contact Phone',
        accessor: 'Enquiries_Contact_Phone' // String-based value accessors!
      },
      {
        Header: 'Enquiries Contact Email',
        accessor: 'Enquiries_Contact_Email' // String-based value accessors!
      },
       {
        Header: 'Compliance Contact Name',
        accessor: 'Compliance_Contact_Name' // String-based value accessors!
      },
      {
        Header: 'Compliance Contact Phone',
        accessor: 'Compliance_Contact_Phone' // String-based value accessors!
      },
      {
        Header: 'Compliance Contact Email',
        accessor: 'Compliance_Contact_Email' // String-based value accessors!
      },
      
      
    ]
    


    return(
        <Fragment>
              <Dashboard></Dashboard>
            <div className="clearfix"></div>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <Ticker></Ticker>
                    {breadcrumb()}
                   
          <ReactTable
    data={data}
    columns={columns}
    filterable
    sortable
    defaultPageSize={20}
    showPaginationTop
    noDataText={"Loading Please Wait..."}
 
 showPaginationBottom={false}
    
  >
    
  </ReactTable>
                
                  
                   
                </div>
             </div>
        </Fragment>
    )

}

export default PiList