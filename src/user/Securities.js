import React, { Fragment, useState, useEffect, Component } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./UserDashboardLayout";
import {
  getSymbols,
  list,
  securityMcap,
  securityTtrade,
  securityTvolume,
  getBids,
  getOffers
} from "../core/Apicore";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import highchart from "../highchart.css";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Spinner from "react-bootstrap/Spinner";
import Loader from "react-loader-spinner";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import ExportToExcel from "./ExportToExcel";
import { Link } from "react-router-dom";
import moment from "moment"

var strtotime = require("strtotime");

const Security = () => {
  const [data, setData] = useState({
    securitySymbols: [],
    symbols: "",
    search: "",
    results: [],
    loading: false,
    searched: false
  });

  const [dataC, setDataChart] = useState([]);
  const [mcapData, setMcapData] = useState([]);
  const [tTtade, setTtrade] = useState([]);
  const [tVolume, setTvolume] = useState([]);
  const [bids, setBids] = useState([]);
  const [offers, setOffers] = useState([]);
  let totalBidVolume = 0;
  let totalBidValue = 0;
  let bidAverage = 0;
  let bidPrice = 0;
  let bidVolume = 0;

  let totalOffersVolume = 0;
  let totalOffersValue = 0;
  let OffersAverage = 0;
  let offersPrice = 0;
  let offersVolume = 0;
  let count =0;
  let countOffers =0;
  let offerValue =0;
  let sum =0;
  let OfferVolumeSum =0;
  let cumulativeBid=0;


  const { securitySymbols, symbols, search, results, searched, loading } = data;

  const loadSymbols = () => {
    getSymbols().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, securitySymbols: data });
      }
    });
  };

  useEffect(() => {
    loadSymbols();
  }, []);

  const searchData = () => {
    setData({ ...data, error: false, loading: true });
    if (symbols) {
      list(symbols).then(response => {
        if (response.error) {
          console.log({ ...data, error: response.error, loading: false });
        } else {
          setData({ ...data, results: response, searched: true });
          setDataChart(response);

          // security mcap
          securityMcap(symbols).then(dataMcap => {
            if (dataMcap.error) {
              console.log(dataMcap.error);
            } else {
              setMcapData(dataMcap);
            }
          });

          // total security trade
          securityTtrade(symbols).then(dataTtrade => {
            if (dataTtrade.error) {
              console.log(dataTtrade.error);
            } else {
              setTtrade(dataTtrade);
            }
          });

          // total traded volume
          securityTvolume(symbols).then(dataTvolume => {
            if (dataTvolume.error) {
              console.log(dataTvolume.error);
            } else {
              setTvolume(dataTvolume);
            }
          });

          // security bids
          getBids(symbols).then(dataBids => {
            if (dataBids.error) {
              console.log(dataBids.error);
            } else {
              setBids(dataBids);
            }
          });

          // security offers
          getOffers(symbols).then(dataOffers => {
            if (dataOffers.error) {
              console.log(dataOffers.error);
            } else {
              setOffers(dataOffers);
            }
          });
        }
      });
    }
    if (search) {
      setData({ ...data, error: false, loading: true });
      list(search).then(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
          setDataChart(response);

          // security mcap
          securityMcap(search).then(dataMcap => {
            if (dataMcap.error) {
              console.log(dataMcap.error);
            } else {
              setMcapData(dataMcap);
            }
          });

          // total security trade
          securityTtrade(search).then(dataTtrade => {
            if (dataTtrade.error) {
              console.log(dataTtrade.error);
            } else {
              setTtrade(dataTtrade);
            }
          });

          // total traded volume
          securityTvolume(search).then(dataTvolume => {
            if (dataTvolume.error) {
              console.log(dataTvolume.error);
            } else {
              setTvolume(dataTvolume);
            }
          });
        }
      });
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group" style={{ height: "10%" }}>
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("symbols")}>
                <option value="All">Pick Security Symbol</option>
                {securitySymbols.map((s, i) => (
                  <option key={i} value={s.symbol}>
                    {s.securityName}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="Search by name"
            ></input>
          </div>
          <div className="input-group-prepend" style={{ border: "none" }}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    );
  };

  const table = () => {
    return (
      <Fragment>
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Data Tables</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Rocker</li>
              <li className="breadcrumb-item">Table</li>
              <li className="breadcrumb-item active" aria-current="page">
                Data Tables
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
                <a href="javaScript:void();" className="dropdown-item">
                  Action
                </a>
                <a href="javaScript:void();" className="dropdown-item">
                  Another action
                </a>
                <a href="javaScript:void();" className="dropdown-item">
                  Something else here
                </a>
                <div className="dropdown-divider"></div>
                <a href="javaScript:void();" className="dropdown-item">
                  Separated link
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const columns = [
    {
      Header: "DATE",
      accessor: "DATE" // String-based value accessors!
    },

    {
      Header: "SYMBOL",
      accessor: "SYMBOL" // String-based value accessors!
    },
    {
      Header: "CLOSE_PRICE",
      accessor: "CLOSE_PRICE" // String-based value accessors!
    },
    {
      Header: "DEALS",
      accessor: "DEALS" // String-based value accessors!
    },
    {
      Header: "VOLUME",
      accessor: "VOLUME" // String-based value accessors!
    },
    {
      Header: "VALUE",
      accessor: "VALUE" // String-based value accessors!
    }
  ];

  var dataChart = [];

  for (var j = 0; j < dataC.length; j++) {
    var presentdate = dataC[j].DATE;
    presentdate = strtotime(presentdate);
    presentdate *= 1000;
    var colseprice = dataC[j].CLOSE_PRICE;
    var volume = dataC[j].VOLUME;
    dataChart.push([presentdate, colseprice, volume]);
  }

  var price = [],
    volume = [],
    dataLength = dataChart.length,
    groupingUnits = [
      [
        "week", // unit name
        [1] // allowed multiples
      ],
      ["month", [1, 2, 3, 4, 6]]
    ],
    i = 0;

  for (i; i < dataLength; i += 1) {
    price.push([
      dataChart[i][0], // the date
      dataChart[i][1] // open
    ]);

    volume.push([
      dataChart[i][0], // the date
      dataChart[i][2] // the volume
    ]);
  }
  const options = {
    rangeSelector: {
      selected: 2
    },

    title: {
      text: "Securities Historical"
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3
        },
        title: {
          text: "PRICE"
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true
        }
      },
      {
        labels: {
          align: "right",
          x: -3
        },
        title: {
          text: "Volume"
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2
      }
    ],

    chart: {
      height: 37 + "%",
      styledMode: true
    },

    series: [
      {
        type: "",
        name: "CLOSE PRICE",
        data: price,
        dataGrouping: {
          units: groupingUnits
        }
      },
      {
        type: "column",
        name: "VOLUMES",
        data: volume,
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits
        }
      }
    ]
  };

  const showLoading = () =>
    loading && (
      <div className="text-center">
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={1000000} //3 secs
        />
      </div>
    );

  const bidsAndOferrWidget = () => {
    return (
      <Fragment>
        <div className="row">
        <div className="col-12 col-md-6 col-lg-6 col-xl-2">
            <div className="card text-center border-bottom-sm border-top-sm border-dark">
              <div className="card-body">
                {offers.map((o, i) => {
                  offersPrice = o.askprice;
                  offersVolume += o.volume;
                  totalOffersVolume += offersVolume;
                  totalOffersValue += o.volume * o.askprice;
                  OffersAverage = totalOffersValue / offersVolume;
                })}
                <Link to="#bidOfferTable">
                  <h6>Symbol</h6>
                  <h5 className="text-dark">
                   SDCSCSPLC
                  </h5>
                  <span id="widget-chart-6"></span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-2">
            <div className="card text-center border-bottom-sm border-top-sm border-primary">
              {mcapData.map((smcap, i) => {
                return (
                  <Fragment>
                    <div className="card-body">
                      <h6>MarketCap(₦)</h6>
                      <p className="text-primary">
                        {smcap.mcap.toLocaleString(navigator.language, {
                          minimumFractionDigits: 0
                        })}
                      </p>
                      <span id="widget-chart-1"></span>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-2">
            <div className="card text-center border-bottom-sm border-top-sm border-danger">
              <div className="card-body">
                <h6>Total Deals</h6>
                {tTtade.map((tV, i) => {
                  return (
                    <p className="text-danger">
                      {tV.sumOfVolume.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0
                      })}
                    </p>
                  );
                })}
                <span id="widget-chart-2"></span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-2">
            <div className="card text-center border-bottom-sm border-top-sm border-success">
              <div className="card-body">
                <h6> Volume Traded</h6>
                {tVolume.map((deals, i) => {
                  return (
                    <p className="text-success">
                      {deals.sumOfDeals.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0
                      })}
                    </p>
                  );
                })}
                <span id="widget-chart-3"></span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-2">
            <div className="card text-center border-bottom-sm border-top-sm border-warning">
              <div className="card-body">
                {bids.map((b, i) => {
                  bidPrice = b.bidprice;
                  bidVolume += b.volume;
                  totalBidVolume += bidVolume;
                  totalBidValue += b.volume * b.bidprice;
                  bidAverage = totalBidValue / bidVolume;
                })}

                <h6>Dematerialization (%) </h6>
                <p className="text-warning">
                 ...
                </p>

                <span id="widget-chart-4"></span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-2">
            <div className="card text-center border-bottom-sm border-top-sm border-info">
              <div className="card-body">
                <h6>...</h6>
                <h4 className="text-info">...</h4>
                <span id="widget-chart-5"></span>
              </div>
            </div>
          </div>
         
        </div>
      </Fragment>
    );
  };

  const offerBidTable = () => {
    return(
      <Fragment>
         <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title  text-primary">Unmatched Bids&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Average price(₦):&nbsp;&nbsp;{bidAverage.toFixed(2)}</h5>
			  <div className="table-responsive">
        <table className="table table-bordered  text-primary">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                     
                      <th scope="col">Bid Price</th>
                      <th scope="col">Volume</th>
                      <th scope="col">Cumulative Outstanding</th>
                      <th scope="col">Value(₦)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bids.map((bidT,i) => {
                     
                      cumulativeBid +=bidT.volume;
                      count++
                      return(
                        <tr key={i}>
                        <th scope="row">{count}</th>
                     
                        <td>{bidT.bidprice}</td>
                        <td>{bidT.volume}</td>
                        <td>{cumulativeBid}</td>
                        <td>{(bidT.volume * bidT.bidprice).toLocaleString(navigator.language, {
                      minimumFractionDigits: 0
                    })}</td>
                      </tr>
                      )
                     
                    })}
                     <tr>
                    <th  scope="row">Total</th>
                    <td></td>
                    <td>{bidVolume}</td>
                    <td></td>
                   <td>{totalBidValue.toLocaleString(navigator.language, {
                      minimumFractionDigits: 0
                    })}</td>
                  </tr>
                    
                    
                  </tbody>
                </table>
            </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-danger">Unmatched Offers &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Average price(₦):&nbsp;&nbsp;{OffersAverage.toFixed(2)}</h5>
			  <div id="bidOfferTable" className="table-responsive ">
              <table className="table table-bordered text-danger">
                <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Bid Price</th>
                  <th scope="col">Volume</th>
                  <th scope="col">Cumulative Outstanding</th>
                  <th scope="col">Value(₦)</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offerT,i) => {
                    let priceandvolume =0;
                    priceandvolume =offerT.volume * offerT.askprice

                 OfferVolumeSum += offerT.volume
                     offerValue += offerT.volume * offerT.askprice
                     sum =  offerValue /OfferVolumeSum

                    countOffers++;
                   
                    return(
                      <tr key={i}>
                     <th scope="row">{countOffers}</th>
                    
                      <td>{offerT.askprice}</td> 
                      <td>{offerT.volume}</td>
                      <td>{OfferVolumeSum}</td>
                      <td>{priceandvolume.toLocaleString(navigator.language, {
                      minimumFractionDigits: 0
                    })}</td>
                    </tr>
                    )
                  })}

                  <tr>
                    <th  scope="row">Total</th>
                    <td></td>
                    <td>{OfferVolumeSum}</td>
                    <td></td>
                   <td>{offerValue.toLocaleString(navigator.language, {
                      minimumFractionDigits: 0
                    })}</td>
                  </tr>
                 
                  
                 
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
      </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Dashboard></Dashboard>

      <div className="content-wrapper">
        <div className="container-fluid">
          <Ticker></Ticker>
          <div className="container-fluid mt-3 mb-3">{searchForm()}</div>
          {showLoading()}

          {searched ? bidsAndOferrWidget() : ""}
          {searched ? offerBidTable() : ''}

          {searched ? (
            <div style={{ borderTop: "5px soild #FFFFFF" }}>
              <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={options}
              />
            </div>
          ) : (
            ""
          )}
          {searched ? (
            <div className="container-fluid mt-3 mb-3">
              {table()}
              <ReactTable
                data={results}
                columns={columns}
                filterable
                sortable
                defaultPageSize={10}
                showPaginationTop
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
            </div>
          ) : (
            ""
          )}
        
        </div>
      </div>
    </Fragment>
  );
};

export default Security;
