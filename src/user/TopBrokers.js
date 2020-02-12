import React, { Fragment, useState, useEffect, Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Ticker from "../core/Ticker";
import Dashboard from "./UserDashboardLayout";
import { topbrokers } from "../core/Apicore";
import Loader from "react-loader-spinner";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import ExportToExcel from "./ExportToExcelBrokersTopTrades";

const TopBrokers = () => {
  const [data, setData] = useState({
    end: "",
    start: "",
    results: [],
    loading: false,
    searched: false
  });

  const { results, searched, loading, end, start } = data;

  const searchData = () => {
    setData({ ...data, error: false, loading: true });

    if (start) {
      topbrokers(start, end).then(response => {
        if (response.error) {
          console.log({ ...data, error: response.error, loading: false });
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
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
                        placeholder="20200101"
                      />
                      <div className="input-group-prepend">
                        <span className="input-group-text">TO</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange("end")}
                        placeholder="20200131"
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
              <li className="breadcrumb-item">
                <Link to="/user/brokers" className="waves-effect">
                  {" "}
                  Brokers
                </Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                TOP BROKERS
              </li>
              <li className="breadcrumb-item">
                MONTLY {start} TO {end}
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
              <div className="dropdown-menu"></div>
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
      Header: "PI CODE",
      accessor: "toMember", // String-based value accessors!
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "DEALS",
      accessor: "count", // String-based value accessors!
      style: {
        textAlign: "right"
      }
    },
    {
      Header: "VALUE",
      accessor: "y", // String-based value accessors!
      style: {
        textAlign: "right"
      }
    },
    {
      Header: "VOLUME",
      accessor: "volume", // String-based value accessors!
      style: {
        textAlign: "right"
      }
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

  return (
    <Fragment>
      <Dashboard></Dashboard>
      <div className="content-wrapper">
        <div className="container-fluid">
          <Ticker></Ticker>

          <div className="container-fluid mt-3 mb-3">{datePickerForm()}</div>
          {table()}

          {searched ? (
            <ReactTable
              data={results}
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
          ) : (
            showLoading()
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default TopBrokers;
