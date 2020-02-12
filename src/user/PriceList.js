import React, {Fragment, useState, useEffect, Component} from 'react';
import Ticker from '../core/Ticker';
import Dashboard from './UserDashboardLayout';
import {priceList} from '../core/Apicore';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import ExportToExcel from "./ExportToExcelPriceList";


const PriceList = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);





    const loadPriceList = () => {
        priceList().then(data => {
            if (data.error) {
                setError(data.error)
            }else{
                setData(data)
              
    
            }
        });
    };
    
    
    useEffect(() => {
    
        loadPriceList();
    
    }, []);

    const table = () => {
        return (
        <Fragment>
        
         <div className="row pt-2 pb-2">
            <div className="col-sm-9">
                <h4 className="page-title">Equity Price List</h4>
                <ol className="breadcrumb">
                <li className="breadcrumb-item">Equity</li>
                <li className="breadcrumb-item">Price List</li>
                <li className="breadcrumb-item active" aria-current="page">Table</li>
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
        Header: 'Date',
        accessor: 'Date' // String-based value accessors!
      }, {
        Header: 'Security',
        accessor: 'Security' // String-based value accessors!
      },
      {
        Header: 'Ref Price',
        accessor: 'RefPrice' // String-based value accessors!
      },
      
      {
        Header: 'Close Price',
        accessor: 'ClosePrice' // String-based value accessors!
      },
      {
        Header: '52 Week High Price',
        accessor: 'T52WeekHighPrice' // String-based value accessors!
      },
      {
        Header: '52 Week Low Price',
        accessor: 'T52WeekLowPrice' // String-based value accessors!
      },
      
      
    ]
    
    



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
    defaultPageSize={20}
    showPaginationTop
    noDataText={"Loading Please Wait..."}
 
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

}


export default PriceList;

