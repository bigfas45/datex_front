import React, { Fragment, useEffect, useState, Component } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const ExportToExcelPriceList = ({post}) => {



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
                                                        <td> {r.Security}</td>
                                                        <td> {r.RefPrice}</td>
                                                        <td> {r.ClosePrice}</td>
                                                        <td> {r.T52WeekHighPrice}</td>
                                                        <td> {r.T52WeekLowPrice}</td>
                                                     
                                                    </tr>
                                                )
                                                
                                            })}
                                            
                                           
                                          
                                        </tbody>
                               
    </table>
    </div>
  
  );
};

export default ExportToExcelPriceList;
