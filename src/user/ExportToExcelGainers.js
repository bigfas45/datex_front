import React, { Fragment, useEffect, useState, Component } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const ExportToExcelGainers = ({post}) => {

let count=0;

  return (
    <div style={{marginRight: '25px'}}>
    <ReactHTMLTableToExcel
    id="test-table-xls-button"
    className="export"
    table="table-to-xls3"
    filename="Nasd-Gainers-Report"
    sheet="tablexls"
    buttonText="Gainers/Losers"

    />
    <table hidden="true" id="table-to-xls3">
    <tr>
        <img style={{marginTop: "-2"}} src="https://nasdng.com/wp-content/uploads/2018/09/logo-17.png" height="30" className="App-logo mt5" alt="logo" />
     </tr>
        <thead>
       
            <tr>
                <th></th>
                <th>SECURITY</th>
                <th>SYMBOL</th>
                <th>Open Price</th>
                <th>Close Price</th>
                <th>Change</th>
                <th>%Change</th>
               
            </tr>
        </thead>
        <tbody>
                                            {post.map((r, i) => {
                                                count++;

                                                let change = r.CLOSE_PRICE - r.refprice
                                                let percentage = (change / r.CLOSE_PRICE) * 100
                                                
                                                let changeText


                                                if (change > 0) {

                                                    if (change > 0) {
                                                        changeText = <span style={{fontSize:"15px", color:"green"}}>&uarr;   </span>
                                                   }
                                                   
                                                return(
                                                    <Fragment>
                                                    <tr>
                                                       <td>Gainers</td> 
                                                    </tr>
                                                  
                                                    <tr key={i}>
                                                        <td>{count}</td>
                                                        <td> {r.SECURITY} </td>
                                                        <td> {r.SYMBOL}</td>
                                                        <td> {r.refprice}</td>
                                                        <td> {r.CLOSE_PRICE}</td>
                                                      
                                                        <td>{change}</td>
                                                        <td>{percentage.toFixed(2)}</td>
                                                       
                                                       
                                                     
                                                    </tr>
                                                    </Fragment>
                                                )
                                               }


                                               if (change < 0) {

                                                if (change < 0) {
                                                    changeText = <span style={{fontSize:"15px", color:"green"}}>&uarr;   </span>
                                               }
                                               
                                            return(
                                                <Fragment>
                                                <tr>
                                                   <td>Losers</td> 
                                                </tr>
                                              
                                                <tr key={i}>
                                                    <td>{count}</td>
                                                    <td> {r.SECURITY} </td>
                                                    <td> {r.SYMBOL}</td>
                                                    <td> {r.refprice}</td>
                                                    <td> {r.CLOSE_PRICE}</td>
                                                  
                                                    <td>{change}</td>
                                                    <td>{percentage.toFixed(2)}</td>
                                                   
                                                   
                                                 
                                                </tr>
                                                </Fragment>
                                            )
                                           }

                                               
                                               
                                                
                                            })}
                                            
                                           
                                          
                                        </tbody>
                               
    </table>
    </div>
  
  );
};

export default ExportToExcelGainers;
