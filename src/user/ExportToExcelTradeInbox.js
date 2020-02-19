import React, { Fragment, useEffect, useState, Component } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const ExportToExcel = ({post}) => {



  return (
    <div style={{marginRight: '25px'}}>
    <ReactHTMLTableToExcel
    id="test-table-xls-button"
    className="export"
    table="table-to-xls2"
    filename="Nasd-Trade-Report"
    sheet="tablexls"
    buttonText="Trade Report"

    />
    <table hidden="true" id="table-to-xls2">
    <tr>
                                                    <img style={{marginTop: "-2"}} src="https://nasdng.com/wp-content/uploads/2018/09/logo-17.png" height="30" className="App-logo mt5" alt="logo" />
                                                    </tr>
        <thead>
       
            <tr>
                <th>SECURITY</th>
                <th>SYMBOL</th>
                <th>Open Price</th>
                <th>Close Price</th>
             
                <th>Change</th>
                <th></th>
                <th>Trades</th>
                <th>Volume</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
                                            {post.map((r, i) => {

                                                let change = r.CLOSE_PRICE - r.refprice
                                                let changeText
                                                if (change > 0) {
                                                    changeText = <span style={{fontSize:"15px", color:"green"}}>&uarr;   </span>
                                               }else if(change <  0){
                                                    changeText = <span style={{fontSize:"15px", color:"red"}}>&darr;  </span>
                                               }else{
                                                   changeText =    <span style={{fontSize:"15px", color:"yellow"}}>&harr;   </span>
                                               }
                                                return(
                                                    <tr key={i}>
                                                        <td> {r.SECURITY} </td>
                                                        <td> {r.SYMBOL}</td>
                                                        <td> {r.refprice}</td>
                                                        <td> {r.CLOSE_PRICE}</td>
                                                      
                                                        <td>{change}</td>
                                                        <td>{changeText}</td>
                                                        <td> {r.DEALS}</td>
                                                        <td> {r.VOLUME}</td>
                                                        <td> {r.VALUE}</td>
                                                       
                                                     
                                                    </tr>
                                                )
                                                
                                            })}
                                            
                                           
                                          
                                        </tbody>
                               
    </table>
    </div>
  
  );
};

export default ExportToExcel;
