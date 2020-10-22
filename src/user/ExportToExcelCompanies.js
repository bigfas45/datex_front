import React, { Fragment, useEffect, useState, Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CardVolume from './CardVolume';
import CardDeals from './CardDeals';
import CardValues from './CardValues';

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
            <th> Name</th>
            <th>Symbol</th>
            <th>Norminal Value</th>
            <th>Issued Share Cap</th>
            <th>Close Price</th>
            <th>High Price</th>
            <th>Low Price</th>
            <th>Volume</th>
            <th>Deals</th>
            <th>Values</th>
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
                <td> {r.LowPrice}</td>
                <td>
                  <CardVolume symbol={r.c_symbol} />
                </td>
                <td>
                  <CardDeals symbol={r.c_symbol} />
                </td>
                <td>
                  <CardValues symbol={r.c_symbol} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExportToExcelEquity;
