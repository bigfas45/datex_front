import React, {Fragment, useState, useEffect, Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Ticker from '../core/Ticker';
import Dashboard from './UserDashboardLayout';
import Loader from "react-loader-spinner";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {brokers, brokers2} from '../core/Apicore';
import ExportToExcel from "./ExportToExcelBrokersBuyTrades";
import {isAuthenticated} from '../auth';
import {brokersBuyTrades} from '../core/Apicore'




const BrokersBuyTrade= () => {


    const [trades, setTrades] = useState([]);
    const [error, setError] = useState([]);

    const {user: {_id, name, email, role, code}} = isAuthenticated();

    const loadBrokerBuyTrades = () => {
        brokersBuyTrades(code).then(data => {
            if (data.error) {
                setError(data.error)
            }else{
                setTrades(data)
            }
        });
    };
    
    
    useEffect(() => {
        loadBrokerBuyTrades()
      
    }, []);
    



    const table = () => {
        return (
          <Fragment>
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className="page-title">Data Tables</h4>
                <ol className="breadcrumb">
                
                    <li className="breadcrumb-item">
                    <Link to="/user/brokers" className="waves-effect">  Brokers</Link>
                      </li>
                   
                  <li className="breadcrumb-item"> Trades</li>
                  <li className="breadcrumb-item active" aria-current="page">
                  Buy
                  </li>
                </ol>
              </div>
              <div className="col-sm-3">
                <div className="btn-group float-sm-right">
                  <button
                    type="button"
                    className="btn btn-outline-primary waves-effect waves-light"
                  >
                    <i className="fa fa-cog mr-1"></i>
                    Setting
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
          </Fragment>
        );
      };


      const columns = [
        {
          Header: "PI",
          accessor: "member_name" // String-based value accessors!
        },
       
        {
          Header: "VALUE",
          accessor: "value", // String-based value accessors!
          style :{
            textAlign: "right"
          }
        },
        {
          Header: "VOLUME",
          accessor: "VOLUME", // String-based value accessors!
          style :{
            textAlign: "right"
          }
        },
        {
          Header: "PRICE",
          accessor: "price", // String-based value accessors!
          style :{
            textAlign: "right"
          }
        },
        {
            Header: "DATE",
            accessor: "date", // String-based value accessors!
            style :{
                textAlign: "right"
              }
          },
           {
            Header: "SYMBOL",
            accessor: "SYMBOL", // String-based value accessors!
            style :{
                textAlign: "right"
              }
          },
          {
            Header: "TO MEMBER",
            accessor: "tomember", // String-based value accessors!
            
          },
          {
            Header: "FROM MEMBER",
            accessor: "frommemebr", // String-based value accessors!
            
          }
       
      ];





return(
    <Fragment>
        <Dashboard></Dashboard>
            <div className="content-wrapper">
                <div className="container-fluid">
                     <Ticker></Ticker>
                     {table()}

                     <ReactTable
              data={trades}
              columns={columns}
              filterable
              sortable
              defaultPageSize={5}
              showPaginationTop
              noDataText="Please wait Loading...."
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
)



}


export default BrokersBuyTrade