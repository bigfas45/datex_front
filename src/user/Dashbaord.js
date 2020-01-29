import React, {Fragment, useState, useEffect} from 'react';
import Ticker from '../core/Ticker';
import {Link} from 'react-router-dom';
import Dashboard from './UserDashboardLayout';
import swal from 'sweetalert';
import {isAuthenticated} from '../auth';
import {Live, getVwap} from '../core/Apicore'





const Home = (history) => {

    const [live, setLive] =  useState([]);
    const [vwap, setVwap] =  useState([]);
    const [error, setError] = useState(false);
    let refprice, closeprice, pecup, pecdown, vwapC, price, change, percentage, valueTextChange, ddd

    const loadLiveTrades = () => {
        Live().then(data => {
            if (data.error) {
                setError(data.error)
            }else{
                setLive(data)
            }
        })
    }

    

    useEffect(() => {
        loadLiveTrades()
    }, [])

    const {user: {_id, name, email, role}} = isAuthenticated()
    const footer = () => {
        return(
           <Fragment>
            <Link to="#" className="back-to-top"><i className="fa fa-angle-double-up"></i> </Link>
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
            title:` Welcome back! ${name}`,
            text: "",
            icon: "success",
        });
    }

   

    const liveTrade = () => {
        return(
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
                                   
                                   refprice  = trades.refprice 
                                   closeprice = trades.closeprice;
                                   pecup = refprice * 1.1;
                                   pecdown = refprice * (1-0.1);
                                   if (trades.totalQty >= 5000) {
                                       vwapC = (trades.value / trades.totalQty);
                                       if (vwapC >=pecdown || vwapC >= pecup) {
                                           price = vwapC.toFixed(2);
                                       }else{
                                        price = refprice
                                       }
                                   }else if(trades.totalQty < 5000){
                                    price = refprice
                                   }
                                   change = price - refprice;
                                   percentage = (change / refprice) * 100;
                                   percentage = percentage.toFixed(2);

                                   if (percentage > 0) {
                                    valueTextChange = <span style={{color:"#07fe00"}}>&#9650;  {percentage} % </span>
                               }else if(percentage < 0){
                                    valueTextChange = <span style={{color:"#ff0000"}}>&#9660;  {percentage} % </span>
                               }else{
                                   valueTextChange =    <span className="text-warning">&#8212;  {percentage} % </span>
                               }

                                    return(
                                        
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

    const inputCard = () => {
        return(
            <div className="card bg-transparent shadow-none mt-3 border border-secondary-light">
                <div className="card-content">
                    <div className="row row-group m-0">
                        <div className="col-12 col-lg-6 col-xl-3 border-secondary-light">
                            <div className="card-body">
                                    <div className="media">
                                        <div className="media-body text-left">
                                            <h4 className="text-info">4500</h4>
                                            <span className="text-light">Total Orders</span>
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
                                        <h4 className="text-danger">7850</h4>
                                        <span className="text-light">Total Expenses</span>
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
                                            <h4 className="text-success">87.5%</h4>
                                            <span className="text-light">Total Revenue</span>
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
                                    <div className="media-body text-left">
                                        <h4 className="text-warning">8400</h4>
                                        <span className="text-light">New Users</span>
                                    </div>
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

    return(

        <Fragment>
           {
               alert()
           }
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
       
        
        
          
    )
}
  
  

 
  
   



export default Home;
