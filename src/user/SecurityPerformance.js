import React,{Fragment,useState, useEffect} from 'react';
import Ticker from '../core/Ticker';
import Dashboard from './UserDashboardLayout';
import Pdf from "react-to-pdf";
import {performanceStart, performanceEnd} from '../core/Apicore';


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

    const {securitySymbols,end, start, resultsStartDate, resultsEndDate, searched, loading } = data;
    const ref = React.createRef();


    const searchData = () => {
        console.log(end, start)
      
          if (start) {
            performanceStart( start)
              .then(response => {
                  if (response.error) {
                      console.log(response.error)
                  }else{
                    setStartDate(response);
                  
                  }
              })
          }
          if (end) {
            performanceEnd(end)
              .then(response => {
                  if (response.error) {
                      console.log(response.error)
                  }else{
                    setEndDate(response);
                  
                  }
              })
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
            <Pdf targetRef={ref} filename="code-example.pdf"  x={.5} y={.5}>
            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf>
            <div  style={{width: "100%", height: "100%"}} ref={ref}>
                <div className="card" >
                    <div className="card-header">
                        <h5 className="text-center">SECURITY PERFORMANCE TABLE For Third Quarter 2019</h5>
                    </div>
                    <div className="card-block table-border-style" style={{marginLeft: 200}}>
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
                                    return(
                                        <Fragment>
                                             <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>NASD OTC index</td> 
						           <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}>{s.usi}</td>
                                   <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}></td>
                                  
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>Market Capitalisation (₦ billion)</td> 
						           <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}> {s.capitalisation} </td>
                                   <td style={{border: "1px solid black"}}>506.8 BN</td>
                                   <td style={{border: "1px solid black"}}></td>
                                  
                                </tr>
                                        </Fragment>
                                    )
                                })} 
						     
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}></td> 
						           <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}></td>
                                  
                                </tr>
                               
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>PERFORMANCE BY SECURITY</td> 
						          <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}></td>
                                   <td style={{border: "1px solid black"}}></td>
                                   
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>
                                <tr style={{border: "1px solid black"}}>
						          <td style={{border: "1px solid black"}}>ACORN PETROLEUM PLC</td> 
						           <td style={{border: "1px solid black"}}>14330</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.16</td>
                                   <td style={{border: "1px solid black"}}>0.00</td>
                                 
                                </tr>



                                
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
          {JSON.stringify(dataStartDate)}
          {JSON.stringify(dataEndDate)}
        
                {security_performance_view_table()} 
              
            
           </div>
        </div>
   </Fragment>
       
    );
};


export default Routes;