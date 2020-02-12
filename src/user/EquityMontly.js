import React, { Fragment, useState, useEffect, Component } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./UserDashboardLayout";
import { yearTrade, MarketIndexT,summaryMonthly, TSumYearTrade } from "../core/Apicore";

import Spinner from "react-bootstrap/Spinner";
import Loader from "react-loader-spinner";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import ExportToExcel from "./ExportToExcelEquityMonthly";

var strtotime = require("strtotime");

const EquityMontly = () => {
  let Tdeals = 0
  let TvolumeTrade = 0;
  let TvalueTrade = 0;
  let uusi =0;
  

  const [data, setData] = useState({
    securitySymbols: [],
    end: "",
    start: "",
    results: [],
    loading: false,
    searched: false
  });

  const [usi, setUsi] = useState([]);

  const [mcapData, setMcapData] = useState([]);
  const [tTtade, setTtrade] = useState([]);

  const { securitySymbols, searched, loading , end,start, } = data;

  const loadSymbols = () => {
    yearTrade().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({
          ...data,
          securitySymbols: data
        });
      }
    });
  };

  const initIndexT = () => {
    MarketIndexT().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsi(data);
      }
    });
  };

  useEffect(() => {
    loadSymbols();
    initIndexT();
  }, []);

  const searchData = () => {
    setData({...data, error:false, loading:true})
     Tdeals = 0
     TvolumeTrade = 0;
     TvalueTrade = 0;
     uusi =0;
    
    if (start) {
      summaryMonthly(start, end).then(response => {
        if (response.error) {
          console.log({...data , error: response.error, loading: false})
        } else {
          setData({...data, results: response, searched: true});
          setMcapData(response);
        }
      });


      
      TSumYearTrade(start, end).then(response => {
        if (response.error) {
          console.log({...data , error: response.error, loading: false})
        } else {
          setData({...data,  searched: true});
          setTtrade(response);
        }
      });


  };
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({
      ...data,
      [name]: event.target.value,
      searched: false
    });
  };

  const datePickerForm = () => {
    return (
      <Fragment>
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={searchSubmit}>
                  <label>Daterange Picker</label>
                  <div id="dateragne-picker">
                    <div className="input-daterange input-group">
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange("start")}
                      />
                      <div className="input-group-prepend">
                        <span className="input-group-text">to</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange("end")}
                      />
                      <div
                        className="input-group-prepend"
                        style={{ border: "none" }}
                      >
                        <button className="input-group-text">Search</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const table = () => {
    return (
      <Fragment>
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Data Tables</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Equity</li>
              <li className="breadcrumb-item">Montly { start} to {end}</li>
              <li className="breadcrumb-item active" aria-current="page">
              Summary
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
              <li className="breadcrumb-item">Equity</li>
              <li className="breadcrumb-item">All Year</li>
              <li className="breadcrumb-item active" aria-current="page">
                Summary
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
      Header: "SECURITY",
      accessor: "SECURITY" // String-based value accessors!
    },
    {
      Header: "SYMBOL",
      accessor: "SYMBOL" // String-based value accessors!
    },
    {
      Header: "HIGEST CLOSE",
      accessor: "MAX_CLOSE_PRICE" // String-based value accessors!
    },
    {
      Header: "LOWEST CLOSE",
      accessor: "MIN_CLOSE_PRICE" // String-based value accessors!
    },
    {
      Header: "DEALS",
      accessor: "sumDeals" // String-based value accessors!
    },
    {
      Header: "VOLUME",
      accessor: "sumVolume" // String-based value accessors!
    },
    {
      Header: "VALUE",
      accessor: "sumValue" // String-based value accessors!
    }
  ];

  const columns2 = [
    {
      Header: "SECURITY",
      accessor: "SECURITY" // String-based value accessors!
    },
    {
      Header: "SYMBOL",
      accessor: "SYMBOL" // String-based value accessors!
    },
    {
      Header: "HIGEST CLOSE",
      accessor: "MAX_CLOSE_PRICE" // String-based value accessors!
    },
    {
      Header: "LOWEST CLOSE",
      accessor: "MIN_CLOSE_PRICE" // String-based value accessors!
    },
    {
      Header: "DEALS",
      accessor: "sumDeals" // String-based value accessors!
    },
    {
      Header: "VOLUME",
      accessor: "sumVolume" // String-based value accessors!
    },
    {
      Header: "VALUE",
      accessor: "sumValue" // String-based value accessors!
    }
  ];

 

  const showLoading = () =>
    loading && (
      <div className="text-center">
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={1000000}
          //3 secs
        />
      </div>
    );


    const cardLoading = () => {
      return(
        <div className="text-center">
        <Loader
          type="Rings"
          color="#00BFFF"
          height={50}
          width={50}
          timeout={1000000}
          //3 secs
        />
      </div>
      )
    }

  const inputCard = () => {
    let display
    return (
      <div className="card bg-transparent shadow-none mt-3 border border-secondary-light">
        <div className="card-content">
          <div className="row row-group m-0">
            <div className="col-12 col-lg-6 col-xl-3 border-secondary-light">
              <div className="card-body">
                <div className="media">
                  <div className="media-body text-left">
                    {securitySymbols.map((d, i) => {
                      Tdeals += d.sumDeals;
                      TvolumeTrade += d.sumVolume;
                      TvalueTrade += d.sumValue;
                      
                    })}
                    <h4 className="text-info">{Tdeals ? Tdeals : cardLoading() }</h4>
                    <span className="text-light">Total Number of Deals</span>
                  </div>
                  <div className="align-self-center w-circle-icon rounded bg-info shadow-info">
                    <i className="icon-basket-loaded text-white"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3 border-secondary-light">
              <div className="card-body">
                <div className="media">
                  <div className="media-body text-left">
                    <h4 className="text-danger">
                      {TvolumeTrade ? TvolumeTrade.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0
                      }) : cardLoading() }
                    
                    </h4>
                    <span className="text-light">Total Volume Traded</span>
                  </div>
                  <div className="align-self-center w-circle-icon rounded bg-danger shadow-danger">
                    <i className="icon-wallet text-white"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3 border-secondary-light">
              <div className="card-body">
                <div className="media">
                  <div className="media-body text-left">
                    <h4 className="text-success">
                      {TvalueTrade ?TvalueTrade.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0
                      }) : cardLoading()} 
                    </h4>
                    <span className="text-light">Total Value Traded</span>
                  </div>
                  <div className="align-self-center w-circle-icon rounded bg-success shadow-success">
                    <i className="icon-pie-chart text-white"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3 border-secondary-light">
              <div className="card-body">
                <div className="media">
                  {usi.map((u, i) => {
                    
                     uusi = u.usi;
                    return (
                      <Fragment key={i}>
                        <div className="media-body text-left">
                          <h4  className="text-warning">{uusi ? uusi : '0'}</h4>
                          <span className="text-light">USI</span>
                        </div>
                      </Fragment>
                    );
                  })}

                  <div className="align-self-center w-circle-icon rounded bg-warning shadow-warning">
                    <i className="icon-user text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



  const inputCardM = () => {
    return (
      <div className="card bg-transparent shadow-none mt-3 border border-secondary-light">
        <div className="card-content">
          <div className="row row-group m-0">
            <div className="col-12 col-lg-6 col-xl-3 border-secondary-light">
              <div className="card-body">
                <div className="media">
                  <div className="media-body text-left">
                    {tTtade.map((d, i) => {
                      Tdeals += d.sumDeals;
                      TvolumeTrade += d.sumVolume;
                      TvalueTrade += d.sumValue;
                    })}
                    <h4 className="text-info">{Tdeals ? Tdeals : cardLoading() }</h4>
                    <span className="text-light">Total Number of Deals</span>
                  </div>
                  <div className="align-self-center w-circle-icon rounded bg-info shadow-info">
                    <i className="icon-basket-loaded text-white"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3 border-secondary-light">
              <div className="card-body">
                <div className="media">
                  <div className="media-body text-left">
                  <h4 className="text-danger">
                      {TvolumeTrade ? TvolumeTrade.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0
                      }) : cardLoading() }
                    
                    </h4>
                    <span className="text-light">Total Volume Traded</span>
                  </div>
                  <div className="align-self-center w-circle-icon rounded bg-danger shadow-danger">
                    <i className="icon-wallet text-white"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3 border-secondary-light">
              <div className="card-body">
                <div className="media">
                  <div className="media-body text-left">
                  <h4 className="text-success">
                      {TvalueTrade ?TvalueTrade.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0
                      }) : cardLoading()} 
                    </h4>
                    <span className="text-light">Total Value Traded</span>
                  </div>
                  <div className="align-self-center w-circle-icon rounded bg-success shadow-success">
                    <i className="icon-pie-chart text-white"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3 border-secondary-light">
              <div className="card-body">
                <div className="media">
                  {usi.map((u, i) => {
                    let uusi =0;
                    uusi += u.usi;
                    return (
                      <Fragment key={i}>
                        <div className="media-body text-left">
                        <h4  className="text-warning">{uusi ? uusi : cardLoading()}</h4>
                          <span className="text-light">USI</span>
                        </div>
                      </Fragment>
                    );
                  })}

                  <div className="align-self-center w-circle-icon rounded bg-warning shadow-warning">
                    <i className="icon-user text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



  
  

  return (
    <Fragment>
      <Dashboard></Dashboard>
      <div className="content-wrapper">
        <div className="container-fluid">
          <Ticker></Ticker>
       
         

          {searched ? inputCardM() : inputCard() }
       
          <div className="container-fluid mt-3 mb-3">{datePickerForm()}</div>
          

          {showLoading()}
          {searched ? ( <div className="container-fluid mt-3 mb-3">
            {table()}
            <ReactTable
              data={mcapData}
              columns={columns}
              filterable
              sortable
              defaultPageSize={20}
              showPaginationTop
              noDataText="Please wait Loading...."
              showPaginationBottom={false}
            >
              {(state, filtredData, instance) => {
                const reactTable = state.pageRows.map(post => {
                  return post._original;
                });
                return (
                  <div>
                    {filtredData()}
                    <ExportToExcel post={reactTable} />
                  </div>
                );
              }}
            </ReactTable>
          </div>)   :  ( <div className="container-fluid mt-3 mb-3">
            {table2()}
            <ReactTable
              data={securitySymbols}
              columns={columns}
              filterable
              sortable
              defaultPageSize={20}
              showPaginationTop
                 noDataText="Please wait Loading...."
              showPaginationBottom={false}
            >
              {(state, filtredData, instance) => {
                const reactTable = state.pageRows.map(post => {
                  return post._original;
                });
                return (
                  <div>
                    {filtredData()}
                    <ExportToExcel post={reactTable} />
                  </div>
                );
              }}
            </ReactTable>
          </div>) }

         
        </div>
      </div>
    </Fragment>
  );
};

export default EquityMontly;
