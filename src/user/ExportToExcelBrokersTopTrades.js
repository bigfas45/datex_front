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
                <th>CODE</th>
                <th>COUNT</th>
                <th>VALUE</th>
                <th>VOLUME</th>
               
            </tr>
        </thead>
        <tbody>
                                            {post.map((r, i) => {
                                                return(
                                                    <tr key={i}>
                                                        <td> {r.member_name} </td>
                                                        <td> {r.toMember}</td>
                                                        <td> {r.count}</td>
                                                        <td> {r.y}</td>
                                                        <td> {r.volume}</td>
                                                    </tr>
                                                )
                                                
                                            })}
                                            
                                           
                                          
                                        </tbody>
                               
    </table>
    </div>
  
  );
};

export default ExportToExcel;
