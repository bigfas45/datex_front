import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import { getVapSec, getTradeSum } from "./ApiAdmin";
import Spinner from "react-bootstrap/Spinner";
import { Link, Redirect} from "react-router-dom";
import Deals from "./Deals";
import CardVolume from "./CardVolume";
import CardValue from "./CardValue";
import CardCal from "./CardCal";
import CardVwap from "./CardVwap";
import CardPecUp from "./CardPecUp";
import CardPecDown from "./CardPecDown";
import $ from "jquery";
import { API } from "../config";


const Vwap = () => {

  const [data, setData] = useState([]);
  const [tadeSum, setTradeSum] = useState([]);

   const [error, setError] = useState(false);




  let count= 0;
  let countDeals= 0;

  const init = () => {
    getVapSec().then(data => {
      if (data.error) {
      setError(data.error)
      }else{
        setData(data)

      }
    })
  }


  const initGetTradeSum = () => {
    getTradeSum().then(data => {
      if (data.error) {
        setError(data.error)
      }else{
        setTradeSum(data)
      }
    })
  };


  
  useEffect(() => {
    init();
    initGetTradeSum();
  }, []);



$(document).ready(function(){
  $('#save').click(function(){
    var symbol = []; 
    var vwap = []; 

    $('.symbol').each(function(){
        symbol.push($(this).text());
     });
     $('.vwap').each(function(){
        vwap.push($(this).text());
     });

     var postData = JSON.stringify(symbol);
var formData = new FormData();
formData.append("postData",postData );
    
    
       $.ajax({
          url:`${API}/vwap/price/upload`,
          method:"POST",
        
          data: formData,
          success:function(data)
          {
            $("td[contenteditable='true']").text("");
          }
       });
    
  });
});



  const breadcrumb = () => {
    return(
    <Fragment>
      <div className="row pt-2 pb-2">
        <div className="col-sm-9">
		    <h4 className="page-title">Header Tables</h4>
		    <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="javaScript:void();">Rocker</Link></li>
            <li className="breadcrumb-item"><Link to="javaScript:void();">Tables</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Header Tables</li>
         </ol>
	   </div>
	   <div className="col-sm-3">
       <div className="btn-group float-sm-right">
        <button type="button" className="btn btn-outline-primary waves-effect waves-light"><i className="fa fa-cog mr-1"></i> Setting</button>
        <button type="button" className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split waves-effect waves-light" data-toggle="dropdown">
        <span className="caret"></span>
        </button>
        <div className="dropdown-menu">
          <Link to="#" className="dropdown-item">Action</Link>
          <Link to="#" className="dropdown-item">Another action</Link>
          <Link to="#" className="dropdown-item">Something else here</Link>
          <div className="dropdown-divider"></div>
          <Link to="#" className="dropdown-item">Separated link</Link>
        </div>
      </div>
     </div>
     </div>
    </Fragment>
    );
  }

  const table = () => {
    return(
      <Fragment>
        <div className="row">
        <div className="col-lg-12">
          <h6 className="text-uppercase">Primary Header</h6>
          <hr />
          <div className="card">
            <div className="card-body">
            <button  type="submit" id="save" className="btn btn-primary shadow-primary btn-square px-5"><i className="icon-lock"></i> Create USer</button>

			  <div className="table-responsive">
        <table className="table table-bordered">

                  <thead className="thead-primary">
                    <tr>
                      <th>#</th>
                      {/* <th>issuer name</th> */}
                      <th>symbols</th>
                      <th>Deals</th>
                      <th>Value</th>
                      <th>Volume</th>
                      <th>Cal</th>
                      <th>VWAP</th>
                      <th style={{backgroundColor:"green"}}>Upward</th>
                      <th style={{backgroundColor:"red"}}>Downwards</th>
                      <th>Open</th>
                      <th> Close</th>
                      <th></th>
                     
                    </tr>
                  </thead>
                  <tbody>

                   
                    {data.map((d, i) => {
                      count++
                      return(
                      <tr key={i}>
                        <th scope="row">{count}</th>
                        {/* <td> {d.secName}  </td> */}
                        <td className='symbol'>{d.secSym}</td>
                        <td> <Deals sec={d} /> </td>
                        <td> <CardValue sec={d} /> </td>
                        <td> <CardVolume sec={d} /> </td>
                        <td> <CardCal sec={d} /> </td> 
                        <td className='vwap' contenteditable="true"> <CardVwap sec={d} open={d.refprice}  /> </td>
                        <td> <CardPecUp open={d.refprice} /> </td>
                        <td> <CardPecDown open={d.refprice} /> </td>
                       <td>{d.refprice}</td>
                        <td>{d.closeprice}</td>
                      </tr>
                      )
                    })}
                  {tadeSum.map((sum, i) => {
                    return(
                      <Fragment>
                          <tr key={i}>
                        <th scope="row"></th>
                        <td></td>
                        <td> {sum.count} </td>
                        <td> {sum.value}  </td>
                        <td>{sum.volume} </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                       <td></td>
                        <td></td>
                      </tr>
                      </Fragment>
                    )
                  })}
                      
                   
                  
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



    return(
        <Fragment>
             <Dashboard></Dashboard>
      <div className="content-wrapper">
        <div className="container-fluid">
          <Ticker></Ticker>
          {breadcrumb()}
         {table()}
        
        
        </div>
      </div>
        </Fragment>
    )
}


export default Vwap;