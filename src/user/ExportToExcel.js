import React, { Fragment, useEffect, useState, Component } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const ExportToExcel = ({post}) => {



  return (
    <div style={{marginRight: '25px'}}>
    <ReactHTMLTableToExcel
    id="test-table-xls-button"
    className="export"
    table="table-to-xls"
    filename="securityData"
    sheet="tablexls"
    buttonText="Export"

    />
    <table hidden="true" id="table-to-xls">
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
                                            {post.map((r, i) => {
                                                return(
                                                    <tr key={i}>
                                                        <td> {r.DATE} </td>
                                                        <td> {r.SYMBOL}</td>
                                                        <td> {r.DEALS}</td>
                                                        <td> {r.VOLUME}</td>
                                                        <td> {r.VALUE}</td>
                                                        <td> {r.CLOSE_PRICE}</td>
                                                    </tr>
                                                )
                                                
                                            })}
                                            
                                           
                                          
                                        </tbody>
                               
    </table>
    </div>
  
  );
};

export default ExportToExcel;
