import React, { Fragment, useEffect, useState, Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment';

const ExportToExcelEquity = ({ post }) => {
  return (
    <div style={{ marginRight: '25px' }}>
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
            <th>c_name</th>
            <th>c_symbol</th>
            <th>norminal_value</th>
            <th>issued_share_cap</th>
            <th>Close_Price</th>
            <th>HighPrice</th>
            <th>LowPrice</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {post.map((r, i) => {
            return (
              <tr key={i}>
                <td> {r.c_name} </td>
                <td> {r.c_symbol}</td>
                <td> {r.norminal_value}</td>
                <td> {r.issued_share_cap}</td>
                <td> {r.Close_Price}</td>
                <td> {r.HighPrice}</td>
                <td> {r.Volume}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExportToExcelEquity;
