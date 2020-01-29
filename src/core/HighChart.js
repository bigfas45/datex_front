import React, {useState, useEffect} from 'react';
import highchart from '../highchart.css';
import {Usi} from './Apicore';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
var strtotime = require('strtotime');


   
  const Chart = () => {
    const [ rates, setRates ] = useState([]);
    const init = () => {
      Usi().then(data => {
          if (data.error) {
              console.log(data.error)
          }else{
              setRates(data)
          }
      })
  }

  useEffect(() => {
    init();
  }, []);

  var data = []

  for (var j=0; j< rates.length; j++){
    var presentdate = rates[j].present_date;
    presentdate = strtotime(presentdate);
    presentdate *= 1000;
    var usi = rates[j].usi
    var  deals = rates[j].deals
    data.push([
  presentdate,
  usi,
  deals
]);
  }

  
  

var ohlc = [],
  volume = [],
  dataLength = data.length,
  groupingUnits = [
    [
      "week", // unit name
      [1] // allowed multiples
    ],
    ["month", [1, 2, 3, 4, 6]]
  ],
  i = 0;

for (i; i < dataLength; i += 1) {
  ohlc.push([
    data[i][0], // the date
    data[i][1], // open
   
   
  ]);

  volume.push([
    data[i][0], // the date
    data[i][2] // the volume
  ]);
}
const options = {
  rangeSelector: {
    selected: 2
  },

  title: {
    text: "MARKET HISTORY"
  },

  yAxis: [
    {
      labels: {
        align: "right",
        x: -3
      },
      title: {
        text: "USI"
      },
      height: "60%",
      lineWidth: 2,
      resize: {
        enabled: true
      }
    },
    {
      labels: {
        align: "right",
        x: -3
      },
      title: {
        text: "DEALS"
      },
      top: "65%",
      height: "35%",
      offset: 0,
      lineWidth: 2
    }
  ],

  
  chart: {
    height: (37) + '%',
    styledMode: true
},


  series: [
    {
      type: "",
      name: "USI",
      data:ohlc,
      dataGrouping: {
        units: groupingUnits
      }
    },
    {
      type: "column",
      name: "DEALS",
      data: volume,
      yAxis: 1,
      dataGrouping: {
        units: groupingUnits
      }
    }
  ]
};


   
  
    return (
      <div style={{borderTop: "5px soild #FFFFFF"}}>
     
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
          
          />
        </div>
        )
  
  
  
  

  };
  
  
   
   export default Chart 

