import React, { Fragment, useEffect, useState, Component } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const ExportToExcelPriceList = ({post}) => {



  return (
    <div style={{marginRight: '25px'}}>
    <ReactHTMLTableToExcel
    id="test-table-xls-button"
    className="export"
    table="table-to-xls"
    filename="NASD-Daily-Price-List"
    sheet="tablexls"
    buttonText="Daily Price List"

    />
    <table hidden="true" id="table-to-xls">
        <tr>
            <img style={{marginTop: "-2"}} src="https://nasdng.com/wp-content/uploads/2018/09/logo-17.png" height="30" className="App-logo mt5" alt="logo" />
        </tr>
        <thead>
            <tr>
                <th>Date</th>
                <th>SYMBOL</th>
                <th>Open Price</th>
                <th>CLose Price</th>
                <th>52 Week High</th>
                <th>52 Week Low</th>

            </tr>
        </thead>
        <tbody>
                                            {post.map((r, i) => {
                                                return(
                                                    <tr key={i}>
                                                        <td> {r.Date} </td>
                                                        <td> {r.securityName}</td>
                                                        <td> {r.open}</td>
                                                        <td> {r.close}</td>
                                                        <td> {r.I52WH}</td>
                                                        <td> {r.I52WL}</td>
                                                     
                                                    </tr>
                                                )
                                                
                                            })}
                                            
                                           
                                          
                                        </tbody>
                               
    </table>
    </div>
  
  );
};

export default ExportToExcelPriceList;
