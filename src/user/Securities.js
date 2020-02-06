import React, {Fragment, useState, useEffect, Component} from 'react';
import Ticker from '../core/Ticker';
import Dashboard from './UserDashboardLayout';
import {
    getSymbols,
    list,
    securityMcap,
    securityTtrade,
    securityTvolume
} from '../core/Apicore';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import highchart from '../highchart.css';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Spinner from 'react-bootstrap/Spinner';
import Loader from 'react-loader-spinner';

var strtotime = require('strtotime');


const Security = () => {


    const [data, setData] = useState({
        securitySymbols: [],
        symbols: '',
        search: '',
        results: [],
        loading: false,
        searched: false

    });

    const [dataC, setDataChart] = useState([])
    const [mcapData, setMcapData] = useState([]);
    const [tTtade, setTtrade] = useState([]);
    const [tVolume, setTvolume] = useState([]);


    const {
        securitySymbols,
        symbols,
        search,
        results,
        searched,
        loading
    } = data;

    const loadSymbols = () => {
        getSymbols().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setData({
                    ...data,
                    securitySymbols: data
                });

            }
        });
    };

    const tableJquery = () => {
        const script = document.createElement("script");
        script.src = `../js/content.js`;
        document.body.appendChild(script);
        window.clearInterval(script);
    }




    useEffect(() =>  {
     
        
        tableJquery()
    
        loadSymbols();

      
      
    }, []);

    

    const searchData = () => {
        setData({
            ...data,
            error: false,
            loading: true
        })
        if (symbols) {
            list(symbols).then(response => {
                if (response.error) {
                    console.log({
                        ...data,
                        error: response.error,
                        loading: false
                    })
                } else {
                    setData({
                        ...data,
                        results: response,
                        searched: true
                    });
                    setDataChart(response);

                    // security mcap
                    securityMcap(symbols).then(dataMcap => {
                        if (dataMcap.error) {
                            console.log(dataMcap.error)
                        } else {
                            setMcapData(dataMcap);

                        }
                    });

                    // total security trade
                    securityTtrade(symbols).then(dataTtrade => {
                        if (dataTtrade.error) {
                            console.log(dataTtrade.error)
                        } else {
                            setTtrade(dataTtrade);

                        }
                    });

                    // total traded volume
                    securityTvolume(symbols).then(dataTvolume => {
                        if (dataTvolume.error) {
                            console.log(dataTvolume.error)
                        } else {
                            setTvolume(dataTvolume);

                        }
                    });

                }
            })
        }
        if (search) {
            setData({
                ...data,
                error: false,
                loading: true
            })
            list(search).then(response => {
                if (response.error) {
                    console.log(response.error)
                } else {
                    setData({
                        ...data,
                        results: response,
                        searched: true
                    });
                    setDataChart(response);

                    // security mcap
                    securityMcap(search).then(dataMcap => {
                        if (dataMcap.error) {
                            console.log(dataMcap.error)
                        } else {
                            setMcapData(dataMcap);

                        }
                    });

                    // total security trade
                    securityTtrade(search).then(dataTtrade => {
                        if (dataTtrade.error) {
                            console.log(dataTtrade.error)
                        } else {
                            setTtrade(dataTtrade);

                        }
                    });

                    // total traded volume
                    securityTvolume(search).then(dataTvolume => {
                        if (dataTvolume.error) {
                            console.log(dataTvolume.error)
                        } else {
                            setTvolume(dataTvolume);

                        }
                    });

                }
            })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData();
    };

    const handleChange = (name) => event => {
        setData({
            ...data,
            [name]: event.target.value,
            searched: false
        });
    };

    const searchForm = () => {
        return (
            <form onSubmit={searchSubmit}>
                <span className="input-group-text">
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <select className="btn mr-2"
                                onChange={
                                    handleChange("symbols")
                            }>
                                <option value="All">Pick Security Symbol</option>
                                {
                                securitySymbols.map((s, i) => (
                                    <option key={i}
                                        value={
                                            s.symbol
                                    }>
                                        {
                                        s.securityName
                                    }</option>
                                ))
                            } </select>
                        </div>
                        <input type="search" className="form-control"
                            onChange={
                                handleChange("search")
                            }
                            placeholder="Search by name"></input>
                    </div>
                    <div className="input-group-prepend"
                        style={
                            {border: 'none'}
                    }>
                        <button className="input-group-text">Search</button>
                    </div>

                </span>
            </form>
        );
    };

    const table = (results = []) => {
        return (
            <Fragment>

                <div className="row pt-2 pb-2">
                    <div className="col-sm-9">
                        <h4 className="page-title">Data Tables</h4>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Rocker</li>
                            <li className="breadcrumb-item">Table</li>
                            <li className="breadcrumb-item active" aria-current="page">Data Tables</li>
                        </ol>
                    </div>
                    <div className="col-sm-3">
                        <div className="btn-group float-sm-right">
                            <button type="button" className="btn btn-outline-primary waves-effect waves-light">
                                <i className="fa fa-cog mr-1"></i>
                                Setting</button>
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


                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-table"></i>
                                Data Exporting</div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="example" className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Symbol</th>
                                                <th>Deals</th>
                                                <th>Volume</th>
                                                <th>Value</th>
                                                <th>Close Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                                results.map((r, i) => (
                                                
                                                        <tr key={i}>
                                                            <td> { r.DATE} </td>
                                                            <td> {  r.SYMBOL  }</td>
                                                            <td> {   r.DEALS}</td>
                                                            <td> {  r.VOLUME  }</td>
                                                            <td> {   r.VALUE }</td>
                                                            <td> {   r.CLOSE_PRICE }</td>
                                                        </tr>
                                                       

                                                ))
                                                
                                            } 
              
                                        </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>


        );
    };


    const securityTable = (results = []) => {
            return (
                <Fragment>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-table"></i>
                                    Data Exporting</div>
                                <div className="card-body">
                                    <div className="table-responsive">

                                        <table id="example" className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Symbol</th>
                                                    <th>Deals</th>
                                                    <th>Volume</th>
                                                    <th>Value</th>
                                                    <th>Close Price</th>
                                                </tr>
                                            </thead>
                                            <tbody> {
                                                results.map((r, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td> {
                                                                r.DATE
                                                            } </td>
                                                            <td> {
                                                                r.SYMBOL
                                                            }</td>
                                                            <td> {
                                                                r.DEALS
                                                            }</td>
                                                            <td> {
                                                                r.VOLUME
                                                            }</td>
                                                            <td> {
                                                                r.VALUE
                                                            }</td>
                                                            <td> {
                                                                r.CLOSE_PRICE
                                                            }</td>
                                                        </tr>
                                                    )

                                                })
                                            } </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }


        var dataChart = []

            for (var j = 0; j < dataC.length; j++) {
                var presentdate = dataC[j].DATE;
                presentdate = strtotime(presentdate);
                presentdate *= 1000;
                var colseprice = dataC[j].CLOSE_PRICE
                var volume = dataC[j].VOLUME
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
                    [
                        "month",
                        [
                            1,
                            2,
                            3,
                            4,
                            6
                        ]
                    ]
                ],
                i = 0;

            for (i; i < dataLength; i += 1) {
                price.push([dataChart[i][0], // the date
                    dataChart[i][1], // open


                ]);

                volume.push([dataChart[i][0], // the date
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
                    }, {
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
                    height: (37) + '%',
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
                    }, {
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

            const securityWidget = () => {
                return (
                    <Fragment>
                        <div className="row">
                            <div className="col-12 col-lg-4 col-xl-4">
                                <div className="card bg-pattern-dark">
                                    <div className="card-body">
                                        <div className="media">
                                            <div className="media-body text-left">
                                                {
                                                mcapData.map((smcap, i) => {
                                                    return (
                                                        <Fragment key={i}>
                                                            <span className="text-white">MarketCap
                                                                                  (₦)</span>
                                                            <h4 key={i}
                                                                className="text-white">
                                                                {
                                                                smcap.mcap.toLocaleString(navigator.language, {minimumFractionDigits: 0})
                                                            }</h4>
                                                        </Fragment>

                                                    )
                                                })
                                            } </div>
                                            <div className="align-self-center w-circle-icon rounded gradient-violet">
                                                <i className="icon-like text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 col-xl-4">
                                <div className="card bg-pattern-dark">
                                    <div className="card-body">
                                        <div className="media">
                                            <div className="media-body text-left">
                                                <span className="text-white">Total Trades</span>
                                                {
                                                tTtade.map((tV, i) => {
                                                    return (
                                                        <h4 key={i}
                                                            className="text-white">
                                                            {
                                                            tV.sumOfVolume.toLocaleString(navigator.language, {minimumFractionDigits: 0})
                                                        }</h4>
                                                    )

                                                })
                                            } </div>
                                            <div className="align-self-center w-circle-icon rounded gradient-ibiza">
                                                <i className="icon-speech text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 col-xl-4">
                                <div className="card bg-pattern-dark">
                                    <div className="card-body">
                                        <div className="media">
                                            <div className="media-body text-left">
                                                <span className="text-white">Total Volume Traded</span>
                                                {
                                                tVolume.map((deals, i) => {
                                                    return (
                                                        <h4 key={i}
                                                            className="text-white">
                                                            {
                                                            deals.sumOfDeals.toLocaleString(navigator.language, {minimumFractionDigits: 0})
                                                        }</h4>
                                                    )
                                                })
                                            } </div>
                                            <div className="align-self-center w-circle-icon rounded gradient-quepal">
                                                <i className="icon-share text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }

            const showLoading = () => (loading && (
                <div className="text-center">
                    <Loader type="ThreeDots" color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={1000000}
                        //3 secs
                    />
                </div>


            ));


            return (
                <Fragment>
                    <Dashboard></Dashboard>
                    <Dashboard></Dashboard>
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <Ticker></Ticker>
                            <div className="container-fluid mt-3 mb-3">
                                {
                                searchForm()
                            } </div>
                            {
                            showLoading()
                        }
                            {
                                table(results)
                        }
                            {
                            searched ? securityWidget() : ''
                        }
                            {
                            searched ? (
                                <div style={
                                    {borderTop: "5px soild #FFFFFF"}
                                }>
                                    <HighchartsReact highcharts={Highcharts}
                                        constructorType={'stockChart'}
                                        options={options}/>
                                </div>
                            ) : ''
                        }
                            {
                            searched ? (
                                <div className="container-fluid mt-3 mb-3">
                                    {
                              
                                } </div>
                            ) : ''
                        } </div>
                    </div>
                </Fragment>
            )

        }

        export default Security