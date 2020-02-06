import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ticker from "../core/Ticker";
import Dashboard from "./UserDashboardLayout";
import {
    list
} from '../core/Apicore';

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const symbol = "SDCSCSPLC"

  const loadInboxDate = () => {
    list(symbol).then(data => {
        if (data.error) {
            setError(data.error)
        }else{
            setData(data)
        }
    });
};

  
  useEffect(() => {

    loadInboxDate()
  
const script = document.createElement("script");

script.src = `../js/content.js`;
script.async = true;
document.body.appendChild(script);
  }, []);

  const table = () => {
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
   



      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"><i className="fa fa-table"></i> Data Exporting</div>
            <div className="card-body">
              <div className="table-responsive">
              <table id="example" className="table table-bordered">
                <thead>
                    <tr>
                        <th>id </th>
                        <th>DATE</th>
                        <th>SECURITY</th>
                        <th>SYMBOL</th>
                        <th>CLOSE_PRICE</th>
                        <th>DEALS</th>
                        <th>VOLUME</th>
                        <th>VALUE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(()=> {
                            return(
                                <tr>
                                <td>Tiger Nixon</td>
                                <td>System Architect</td>
                                <td>Edinburgh</td>
                                <td>61</td>
                                <td>2011/04/25</td>
                                <td>$320,800</td>
                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>
                            )
                        })
                    }
                 
                 
                </tbody>
                <tfoot>
              
                </tfoot>
            </table>
            </div>
            </div>
          </div>
        </div>
      </div>

      </Fragment>
   
  

   

    );
  };

  return (
    <Fragment>
      <Dashboard></Dashboard>
      <Ticker></Ticker>

      <div className="content-wrapper">
        <div className="container-fluid">
    
        {table()}
        </div>
    

       
        
      </div>
    </Fragment>
  );
};

export default Home;
