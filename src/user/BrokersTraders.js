import React, {Fragment, useState, useEffect, Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Ticker from '../core/Ticker';
import Dashboard from './UserDashboardLayout';
import Loader from "react-loader-spinner";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {brokers, brokers2} from '../core/Apicore';
import ExportToExcel from "./ExportToExcelBrokersBuy";
import ExportToExcelSell from "./ExportToExcelBrokersSell";



const BrokersTrades = () => {

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [error, setError] = useState([]);

    const loadBrokers = () => {
        brokers().then(data => {
            if (data.error) {
                setError(data.error)
            }else{
                setData(data)
            }
        });
    };

    const loadBrokers2 = () => {
        brokers2().then(data => {
            if (data.error) {
                setError(data.error)
            }else{
                setData2(data)
            }
        });
    };
    
    
    useEffect(() => {
        loadBrokers2()
        loadBrokers();
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

      const table2 = () => {
        return (
          <Fragment>
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className="page-title">Data Tables</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Brokers</li>
                  <li className="breadcrumb-item"> Trades</li>
                  <li className="breadcrumb-item active" aria-current="page">
                  SELL
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

      const buttonLink = () => {
        return (
          <Fragment>
            <div className="clearfix"></div>
    
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className="page-title">Buttons</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                   <Link to="/">Home</Link>
                   
                  </li>
                  <li className="breadcrumb-item">
                  <Link to="/user/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Brokers
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
                  <div className="dropdown-menu"></div>
                </div>
              </div>
            </div>
    
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header text-uppercase">
                    Brokers Trades 2020
                  </div>
                  <div className="card-body">
                    <Link to="/user/brokers/trades" className="waves-effect">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-primary waves-effect waves-light m-1"
                      >
                        ALL BROKERS TRADES
                      </button>
                    </Link>
                    <Link to="/user/brokers/topTen" className="waves-effect">
                      {" "}
                    <button
                      type="button"
                      className="btn btn-danger waves-effect waves-light m-1"
                    >
                      TOP 10 BROKERS
                    </button>
                    </Link>
                    <Link to="/user/brokers/buy" className="waves-effect">
                    <button
                      type="button"
                      className="btn btn-success waves-effect waves-light m-1"
                    >
                      MY BUY TRADES
                    </button>
                    </Link>
                    <Link to="/user/brokers/sell" className="waves-effect">
                    <button
                      type="button"
                      className="btn btn-info waves-effect waves-light m-1"
                    >
                      MY SELL TRADES
                    </button>
                    </Link>
                    <Link to="/user/brokers/tradelog" className="waves-effect">
                    <button
                      type="button"
                      className="btn btn-warning waves-effect waves-light m-1"
                    >
                      TRADE LOG
                    </button>
                    </Link>
                    {/* <button type="button" className="btn btn-dark waves-effect waves-light m-1">DARK</button>
          <button type="button" className="btn btn-secondary waves-effect waves-light m-1">SECONDARY</button>
          <button type="button" className="btn btn-light waves-effect waves-light m-1">LIGHT</button>
          <button type="button" className="btn btn-link m-1">LINK</button> */}
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
          Header: "TO MEMBER",
          accessor: "member_code", // String-based value accessors!
          style :{
            textAlign: "right"
          }
        },
        {
          Header: "TRADES",
          accessor: "toCount", // String-based value accessors!
          style :{
            textAlign: "right"
          }
        },
        {
          Header: "VALUE",
          accessor: "toValue", // String-based value accessors!
          style :{
            textAlign: "right"
          }
        },
        {
            Header: "VOLUME",
            accessor: "toVolume", // String-based value accessors!
            style :{
                textAlign: "right"
              }
          }
       
      ];



      const columns2 = [
        {
          Header: "PI",
          accessor: "from_member_name" // String-based value accessors!
        },
       
        {
          Header: "FROM MEMBER",
          accessor: "member_code", // String-based value accessors!
          style :{
            textAlign: "right"
          }
        },
        {
          Header: "TRADES",
          accessor: "fromCount" ,// String-based value accessors!
          style :{
            textAlign: "right"
          }
        },
        {
          Header: "VALUE",
          accessor: "fromValue" ,// String-based value accessors!
          style :{
            textAlign: "right"
          }
        },
        {
            Header: "VOLUME",
            accessor: "fromVolume", // String-based value accessors!
            style :{
                textAlign: "right"
              }
          }
       
      ];


   

    return(
        <Fragment>
            <Dashboard></Dashboard>
            <div className="content-wrapper">
                <div className="container-fluid">
                     <Ticker></Ticker>
                     {buttonLink()}
                  
                     {table()}
                     <ReactTable
              data={data}
              columns={columns}
              filterable
              sortable
              defaultPageSize={20}
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


                    {table2()}
                     <ReactTable
              data={data2}
              columns={columns2}
              filterable
              sortable
              defaultPageSize={20}
              showPaginationTop
              noDataText="Please wait Loading...."
              showPaginationBottom={false}
            >

{(state2, filtredData2, instance2) => {
      const reactTable2 = state2.pageRows.map(post2 => {return post2._original});
      return(
        <div>
          {filtredData2()}
          <ExportToExcelSell post={reactTable2} />
         
        </div>
      )
    }}

            </ReactTable>
                  
                </div>
            </div>
        </Fragment>
    )

}

export default BrokersTrades