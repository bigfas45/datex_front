import React,{Fragment,useState, useEffect} from 'react';
import Ticker from '../core/Ticker';
import Dashboard from './UserDashboardLayout';
import Pdf from "react-to-pdf";
import {performanceStart, performanceEnd, performanceStartSecurity, performanceEndSecurity} from '../core/Apicore';


const Routes = () => {
    const [data, setData] = useState({
        securitySymbols: [],
        end: '',
        start: '',
        resultsStartDate: [],
        resultsEndDate: [],
        loading: false,
        searched: false

    });
    const [dataStartDate, setStartDate] = useState([]);
    const [dataEndDate, setEndDate] = useState([]);
    const [dataStartDateSecurity, setStartDateSecurity] = useState([]);
    const [dataEndDateSecurity, setEndDateSecurity] = useState([]);


    
    let endUsiDate, endMapDate, startUsiDate, startMapDate, endPercentChnage, txtChange, startPercentageChange, txtChangeMCap, test
    

    const {securitySymbols,end, start, resultsStartDate, resultsEndDate, searched, loading } = data;
    const ref = React.createRef();


    const searchData = () => {
        console.log(end, start)
      
          if (start) {
               // usi
            performanceStart( start)
              .then(response => {
                  if (response.error) {
                      console.log(response.error)
                  }else{
                    setStartDate(response);
                  
                  }
              });

            //   security list and traded volume 
            performanceStartSecurity(start)
            .then(response => {
                if (response.error) {
                    console.log(response.error)
                }else{
                    setStartDateSecurity(response);
                }
            });

          }
          if (end) {
            //   usi end date 
            performanceEnd(end)
              .then(response => {
                  if (response.error) {
                      console.log(response.error)
                  }else{
                    setEndDate(response);
                  
                  }
              });

               //   security list and traded volume end date
            performanceEndSecurity(start, end)
            .then(response => {
                if (response.error) {
                    console.log(response.error)
                }else{
                    setEndDateSecurity(response);
                }
            });

          }
         
      }

    const searchSubmit = (e) => {
        e.preventDefault()
         searchData();
    };

    const handleChange = (name) => event => {
        setData({...data, [name]: event.target.value, searched: false});
    };

    const datePickerForm = () => {
        return(
            <Fragment>
                <div class="row">
                    <div class="col-lg-6">
                    <div class="card">
                 
                        <div class="card-body">
                        <form onSubmit={searchSubmit}>
                            <label>Daterange Picker</label>
                        <div id="dateragne-picker">
                            <div class="input-daterange input-group">
                                <input type="text" class="form-control" onChange={handleChange("start")} />
                                <div class="input-group-prepend">
                                <span class="input-group-text">to</span>
                                </div>
                                <input type="text" class="form-control" onChange={handleChange("end")}  />
                                <div className="input-group-prepend" style={{border: 'none'}}>
                                    <button className="input-group-text">Search</button>
                                </div>
                            </div>
                            
                        </div>
                        
                        </form>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </Fragment>
        );
    };

    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [4,2]
    };

    const security_performance_view_table = () => {
        return(
            <Fragment>
        <div className="App">
            <Pdf targetRef={ref} filename="code-example.pdf"  >
            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf>
            <div  style={{width: "100%", height: "100%"}} ref={ref}>
                <div className="card" >
                   
                        <h5 >SECURITY PERFORMANCE TABLE For Third Quarter 2019</h5>
                   
                    <div className="card-block table-border-style" style={{marginLeft: 30 }}>
                        <div className="table-responsive">
                            <table style={{border: "1px solid black"}}>
                                <thead style={{border: "1px solid black"}}>
                                    <tr style={{border: "1px solid black"}}>
                                        <th style={{border: "1px solid black"}}></th>
                                        <th style={{border: "1px solid black"}}>Volume traded</th>
                                        <th style={{border: "1px solid black"}}>Open Price</th>
                                        <th style={{border: "1px solid black"}}>Close Price</th>
                                        <th style={{border: "1px solid black"}}>Gain/loss </th>
                                    </tr>
                            </thead>   
                           
                            <thead>
                               
							  <tr style={{border: "1px solid black"}}>
								  <th style={{border: "1px solid black"}}>Date</th>
								  <th style={{border: "1px solid black"}}></th>
								  <th style={{border: "1px solid black"}}>{start}</th>
								  <th style={{border: "1px solid black"}}>{end}</th>
                                  <th style={{border: "1px solid black"}}></th>
								  
								  
							  </tr>
						  </thead>  
                         
                          <tbody style={{border: "1px solid black"}}>
                          {dataStartDate.map((s, i) => {
                               startUsiDate = s.usi
                               startMapDate = (s.capitalisation/ 1000000000).toLocaleString(navigator.language, { minimumFractionDigits: 0 })
                              {dataEndDate.map((e, ei) => {
                                  endUsiDate = e.usi
                                  endMapDate = (e.capitalisation/ 1000000000).toLocaleString(navigator.language, { minimumFractionDigits: 0 })
                                 
                                  endPercentChnage = ((( endUsiDate - startUsiDate)/startUsiDate ) * 100).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                                  if (endPercentChnage > 0) {
                                    txtChange = <span style={{color:"#07fe00"}}>&#9650;  {endPercentChnage} % </span>
                                  }else if (endPercentChnage < 0) {
                                    txtChange = <span style={{color:"red"}}>&#9660;  {endPercentChnage} % </span>

                                  } else {
                                    txtChange =    <span className="text-warning">&#8212;  {endPercentChnage} % </span>
                                  }


                                  startPercentageChange =((( endMapDate - startMapDate)/startMapDate ) * 100).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                                  if (startPercentageChange > 0) {
                                    txtChangeMCap = <span style={{color:"#07fe00"}}>&#9650;  {startPercentageChange} % </span>
                                  }else if (startPercentageChange < 0) {
                                    txtChangeMCap = <span style={{color:"red"}}>&#9660;  {startPercentageChange} % </span>

                                  } else {
                                    txtChangeMCap =    <span className="text-warning">&#8212;  {startPercentageChange} % </span>
                                  }

                              })}
                                    return(
                                        <Fragment>
                                             <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>NASD OTC index</td> 
						           <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}>{startUsiDate}</td>
                                   <td style={{border: "1px solid black"}}>{endUsiDate}</td>
                                   <td style={{border: "1px solid black"}}>{txtChange}</td>
                                  
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>Market Capitalisation (₦ billion)</td> 
						           <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}> {startMapDate} </td>
                                    <td style={{border: "1px solid black"}}>{endMapDate}</td>
                                   <td style={{border: "1px solid black"}}>{txtChangeMCap}</td>
                                  
                                </tr>
                                        </Fragment>
                                    )
                                })} 
						     
                               
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>PERFORMANCE BY SECURITY</td> 
						          <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}></td>
                                   
                                </tr>
                              
                                {dataEndDateSecurity.map((sec, i) => {
                                    let txtpricechange
                                    let volume = sec.volume.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                                    let closeprice2 = sec.closeprice2.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
                                    let  openprice = sec.openprice.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
                                  let     priceChange  = ((( closeprice2 - openprice)/openprice ) * 100).toLocaleString(navigator.language, { minimumFractionDigits: 2 });

                                  if (priceChange > 0) {
                                    txtpricechange = <span style={{color:"#07fe00"}}>&#9650;  {priceChange} % </span>
                                  }else if (priceChange < 0) {
                                    txtpricechange = <span style={{color:"red"}}>&#9660;  {priceChange} % </span>

                                  } else {
                                    txtpricechange =    <span className="text-warning">&#8212;  {priceChange} % </span>
                                  }

                                 return(
                                <Fragment>
                                        <tr key={i} style={{border: "1px solid black"}}>
                                            <td  style={{border: "1px solid black"}}>{sec.security_name}</td> 
                                            <td  style={{border: "1px solid black"}}>{volume}</td>
                                            <td  style={{border: "1px solid black"}}>{openprice}</td>
                                            <td  style={{border: "1px solid black"}}>{closeprice2}</td>
                                            <td  style={{border: "1px solid black"}}>{txtpricechange}</td>
                                        </tr>
                                    </Fragment>
                                 )
                                        
                            })}
                                
                               



                                
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
    </div>
            </Fragment>
        )
    }



    return (
    
        <Fragment>
        <Dashboard></Dashboard>
        <Dashboard></Dashboard>
       <div className="content-wrapper">
           <div className="container-fluid">
               <Ticker></Ticker>
        
          {datePickerForm()}
      
         
        
                {security_performance_view_table()} 
              
            
           </div>
        </div>
   </Fragment>
       
    );
};


export default Routes;