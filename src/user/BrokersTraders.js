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