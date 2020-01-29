import React from 'react';
import Layout from './Layout';
import Ticker from './Ticker';
import Highcharts from './HighChart';
import '../App.css';
import Menu from './Menu';



const Home = () => (
  <div>
      <Menu />
 <Ticker></Ticker>
<Layout></Layout>
 <Highcharts></Highcharts>
  </div>
 
  
   

);

export default Home;
