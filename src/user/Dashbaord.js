import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import { Link } from "react-router-dom";
import Dashboard from "./UserDashboardLayout";
import swal from "sweetalert";
import { isAuthenticated } from "../auth";
import { Live, yearTrade, MarketIndexT } from "../core/Apicore";
import Loader from "react-loader-spinner";

const Home = history => {
  let Tdeals = 0;
  let TvolumeTrade = 0;
  let TvalueTrade = 0;
  let uusi = 0;

  const [live, setLive] = useState([]);
  const [nasdTrade, setNasdTrade] = useState([]);
  const [error, setError] = useState(false);
  const [usi, setUsi] = useState([]);
  let refprice,
    closeprice,
    pecup,
    pecdown,
    vwapC,
    price,
    change,
    percentage,
    valueTextChange,
    ddd;

  const loadNasdTrade = () => {
    yearTrade().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setNasdTrade(data);
      }
    });
  };
  const loadLiveTrades  = () => {
    Live().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setLive(data);
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
    loadLiveTrades();
    loadNasdTrade();
    initIndexT();
  }, []);

  const {
    user: { _id, name, email, role }
  } = isAuthenticated();
  const footer = () => {
    return (
      <Fragment>
        <Link to="#" className="back-to-top">
          <i className="fa fa-angle-double-up"></i>{" "}
        </Link>
        {/* // <!--Start footer--> */}
        <footer className="footer">
          <div className="container">
            <div className="text-center">
              Copyright © 2020 NASD DATAPORTAL DASHBOARD
            </div>
          </div>
        </footer>
      </Fragment>
    );
  };

  const alert = () => {
    swal({
      title: ` Welcome back! ${name}`,
      text: "",
      icon: "success"
    });
  };

  const liveTrade = () => {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="card bg-transparent shadow-none border border-secondary-light">
            <div className="card-header bg-transparent text-white border-0">
              LIVE TRADES
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush table-dark">
                <thead>
                  <tr>
                    <th>SYMBOL</th>
                    <th>OPEN</th>
                    <th>HIGH</th>
                    <th>HIGH QTY</th>
                    <th>LOW</th>
                    <th>LOW QTY</th>
                    <th>DEALS</th>
                    <th>TOTAL QTY</th>
                    <th>TOTAL VALUE</th>
                    <th>CLOSE</th>
                    <th>% CHANGE</th>
                  </tr>
                </thead>
                <tbody>
                  {live.map((trades, i) => {
                    refprice = trades.refprice;
                    closeprice = trades.closeprice;
                    pecup = refprice * 1.1;
                    pecdown = refprice * (1 - 0.1);
                    if (trades.totalQty >= 5000) {
                      vwapC = trades.value / trades.totalQty;
                      if (vwapC >= pecdown || vwapC >= pecup) {
                        price = vwapC.toFixed(2);
                      } else {
                        price = refprice;
                      }
                    } else if (trades.totalQty < 5000) {
                      price = refprice;
                    }
                    change = price - refprice;
                    percentage = (change / refprice) * 100;
                    percentage = percentage.toFixed(2);

                    if (percentage > 0) {
                      valueTextChange = (
                        <span style={{ color: "#07fe00" }}>
                          &#9650; {percentage} %{" "}
                        </span>
                      );
                    } else if (percentage < 0) {
                      valueTextChange = (
                        <span style={{ color: "#ff0000" }}>
                          &#9660; {percentage} %{" "}
                        </span>
                      );
                    } else {
                      valueTextChange = (
                        <span className="text-warning">
                          &#8212; {percentage} %{" "}
                        </span>
                      );
                    }

                    return (
                      <tr key={i}>
                        <td>{trades.Security}</td>

                        <td>{refprice}</td>
                        <td>{trades.highPrice}</td>
                        <td>{trades.highestQty}</td>
                        <td>{trades.lowPrice}</td>
                        <td>{trades.lowestQty} </td>
                        <td>{trades.count}</td>
                        <td>{trades.totalQty}</td>
                        <td>{trades.value}</td>
                        <td>{price}</td>
                        <td>{valueTextChange}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const cardLoading = () => {
    return (
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
    );
  };

  const inputCard = () => {
    let display;
    return (
      <div className="card bg-transparent shadow-none mt-3 border border-secondary-light">
        <div className="card-content">
          <div className="row row-group m-0">
            <div className="col-12 col-lg-6 col-xl-3 border-secondary-light">
              <div className="card-body">
                <div className="media">
                  <div className="media-body text-left">
                    {nasdTrade.map((d, i) => {
                      Tdeals += d.sumDeals;
                      TvolumeTrade += d.sumVolume;
                      TvalueTrade += d.sumValue;
                    })}
                    <h4 className="text-info">
                      {Tdeals ? Tdeals : cardLoading()}
                    </h4>
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
                      {TvolumeTrade
                        ? TvolumeTrade.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0
                          })
                        : cardLoading()}
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
                      {TvalueTrade
                        ? TvalueTrade.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0
                          })
                        : cardLoading()}
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
                          <h4 className="text-warning">{uusi ? uusi :  cardLoading()}</h4>
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
      {alert()}
      <Dashboard></Dashboard>
      <div className="content-wrapper">
        <div className="container-fluid">
          <Ticker></Ticker>
          {inputCard()}
          {liveTrade()}
        </div>
      </div>
      {footer()}
    </Fragment>
  );
};

export default Home;
