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
                <th>PI</th>
                <th>VALUE</th>
                <th>VOLUME</th>
                <th>PRICE</th>
                <th>DATE</th>
                <th>SYMBOL</th>
                <th>TO MEMBER</th>
                <th>FROM MEMBER</th>
            </tr>
        </thead>
        <tbody>
                                            {post.map((r, i) => {
                                                return(
                                                    <tr key={i}>
                                                        <td> {r.member_name} </td>
                                                        <td> {r.value}</td>
                                                        <td> {r.VOLUME}</td>
                                                        <td> {r.price}</td>
                                                        <td> {r.date}</td>
                                                        <td> {r.SYMBOL}</td>
                                                        <td> {r.tomember}</td>
                                                        <td> {r.frommember}</td>
                                                    </tr>
                                                )
                                                
                                            })}
                                            
                                           
                                          
                                        </tbody>
                               
    </table>
    </div>
  
  );
};

export default ExportToExcel;
