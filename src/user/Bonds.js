import React, { Fragment, useEffect, useState, Component } from "react";
import { Link } from "react-router-dom";
import Ticker from "../core/Ticker";
import Dashboard from "./UserDashboardLayout";
import {getBonds} from '../core/Apicore';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import ExportToExcel from "./ExportToExcelEquity";

const Corporate_action = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const symbol = "SDCSCSPLC"

  const loadBonds = () => {
    getBonds().then(data => {
        if (data.error) {
            setError(data.error)
        }else{
            setData(data)
          

        }
    });
};


useEffect(() => {

    loadBonds();

}, []);




const table = () => {
    return (
    <Fragment>
    
     <div className="row pt-2 pb-2">
        <div className="col-sm-9">
		    <h4 className="page-title">Data Tables</h4>
		    <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="user/dashboard">
                DASHBOARD
                </Link>
                
                </li>
            <li className="breadcrumb-item">Bonds</li>
          
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
   
      </Fragment>
   
  

   

    );
  };


  const columns = [{
    Header: 'Id',
    accessor: 'id' // String-based value accessors!
  }, {
    Header: 'Trade Date',
    accessor: 'trade_date' // String-based value accessors!
  },
  {
    Header: 'Security',
    accessor: 'security' // String-based value accessors!
  },

  {
    Header: 'Value Traded',
    accessor: 'value_traded' // String-based value accessors!
  },
  {
    Header: 'Buy Firm',
    accessor: 'buy_firm' // String-based value accessors!
  },
  {
    Header: 'Buy Fees',
    accessor: 'buy_fees' // String-based value accessors!
  },
  {
    Header: 'Sell Firm',
    accessor: 'sell_firm' // String-based value accessors!
  },
  {
    Header: 'Sell Fees',
    accessor: 'sell_fees' // String-based value accessors!
  },
  {
    Header: 'Total Fees',
    accessor: 'total_fees' // String-based value accessors!
  }]

  
  

  

  return (
    <Fragment>
      <Dashboard></Dashboard>
    

      <div className="content-wrapper">
        <div className="container-fluid">
        <Ticker></Ticker>
       
       {table()}
       
        <ReactTable
    data={data}
    columns={columns}
    filterable
    sortable
    defaultPageSize={10}
    showPaginationTop
    showPaginationBottom={false}
    
  >

    {(state, filtredData, instance) => {
      const reactTable = state.pageRows.map(post => {return post._original});
      return(
        <div>
          {filtredData()}
          <ExportToExcel post={reactTable} />
         
        </div>
      )
    }}

  </ReactTable>
      
  
                        
        </div>
    

       
        
      </div>
    </Fragment>
  );
};

export default Corporate_action;
