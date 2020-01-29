import React, {Fragment, useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import Pdf from "react-to-pdf";
import Ticker from '../core/Ticker';
import Dashboard from './UserDashboardLayout';
import { Link } from 'react-router-dom';
import {getInbox, getTradeReports} from '../core/Apicore';
import Workbook from 'react-excel-workbook';
import {isAuthenticated} from '../auth';






const InboxRead = ({match}) => {

    const [values, setValues] = useState([]);
    const [trades, setTrades] = useState([]);
    const ref = React.createRef();

    const [error, setError] = useState(false);
    const {user: {_id, name, email, role}} = isAuthenticated()


    const init = (date) => {
        getInbox(date).then(data => {
            if (data.error) {
                setError(data.error)
            }else{
                // populate the state
                setValues(data)
                //loadcategories
             
            }
        })
    }
    const initTradeReport = (date) => {
        getTradeReports(date).then(data => {
            if (data.error) {
                setError(data.error)
            }else{
                // populate the state
                setTrades(data)
                //loadcategories
             
            }
        })
    }

    useEffect(() => {
        init(match.params.date);
        initTradeReport(match.params.date)
       
     }, []);

     

     const pdf = () => {
         return(
            <div className="App">
            <Pdf targetRef={ref} filename="code-example.pdf">
              {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf>
            <div ref={ref}>
       <h1 >Hello CodeSandbox</h1>
       <h2 style={{display:"none"}} >Start editing to see some magic happen!</h2>
     </div>
          </div>
         )
     }

     
    
      

    const mail = () => {
        return(
            <Fragment>
            <div className="row pt-2 pb-2">
                <div className="col-sm-9">
                    <h4 className="page-title">Mail Inbox</h4>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/user/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item"><Link to="">Mail</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Mail Inbox</li>
                        </ol>
                </div>
                <div className="col-sm-3">
                    <div className="btn-group float-sm-right">
                        <button type="button" className="btn btn-outline-primary waves-effect waves-light">
                            <i className="fa fa-cog mr-1"></i> Setting
                        </button>
                        <button type="button" className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split waves-effect waves-light" data-toggle="dropdown">
                            <span className="caret"></span>
                         </button>
                         <div className="dropdown-menu">
                            <Link to="" className="dropdown-item">Action</Link>
                            <Link to="" className="dropdown-item">Another action</Link>
                            <Link to="" className="dropdown-item">Something else here</Link>
                            <div className="dropdown-divider"></div>
                            <Link to="" className="dropdown-item">Separated link</Link>
                          </div>
                    </div>
                </div>
            </div>

            {/* //  <!-- End Breadcrumb--> */}
                 <div className="row">
                      <div className="col-lg-12">
                         <div className="card">
                             <div className="card-body">
                                <div className="row">
                                    {/* <div className="col-lg-3 col-md-4">
                                        <Link to="" className="btn btn-danger waves-effect waves-light btn-block">New Mail</Link>
                                        <div className="card mt-3">
                                            <div className="list-group">
                                                <Link to="" className="list-group-item active"><i className="fa fa-inbox mr-2"></i>Inbox <b>(12)</b></Link>
                                                 <Link to="" className="list-group-item"><i className="fa fa-star-o mr-2"></i>Starred</Link>
                                                 <Link to="" className="list-group-item"><i className="fa fa-file-text-o mr-2"></i>Draft <b>(10)</b></Link>
                                                 <Link to="" className="list-group-item"><i className="fa fa-paper-plane-o mr-2"></i>Sent Mail</Link>
                                                 <Link to="" className="list-group-item"><i className="fa fa-trash-o mr-2"></i>Trash <b>(320)</b></Link>
                                                 <Link to="" className="list-group-item"><i className="fa fa-bookmark mr-2"></i>Important <b>(5)</b></Link>
                                                 <Link to="" className="list-group-item">Labels</Link>
                                                 <Link to="" className="list-group-item"><span className="fa fa-circle text-info float-right"></span>Work</Link>
                                                 <Link to="" className="list-group-item"><span className="fa fa-circle text-warning float-right"></span>Design</Link>
                                                 <Link to="" className="list-group-item"><span className="fa fa-circle text-primary float-right"></span>Family</Link>
                                                 <Link to="" className="list-group-item"><span className="fa fa-circle text-rose float-right"></span>Friends</Link>
                                                 <Link to="" className="list-group-item"><span className="fa fa-circle text-success float-right"></span>Office</Link>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <!-- End Left sidebar -->
                    
                                     <!-- Right Sidebar --> */}
                                     <div className="col-lg-12 col-md-12">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <div className="btn-toolbar" role="toolbar">
                                                    <div className="btn-group mr-1">
                                                        <button type="button" className="btn btn-outline-primary waves-effect waves-light"><i className="fa fa-inbox"></i></button>
                                                        <button type="button" className="btn btn-outline-primary waves-effect waves-light"><i className="fa fa-refresh"></i></button>
                                                        <button type="button" className="btn btn-outline-primary waves-effect waves-light"><i className="fa fa-trash-o"></i></button>
                                                    </div>
                                                    <div className="btn-group mr-1">
                                                        <button type="button" className="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                            <i className="fa fa-folder"></i>
                                                            <b className="caret"></b>
                                                        </button>
                                                        
                                                    </div>

                                                    <div className="btn-group mr-1">
                                                        <button type="button" className="btn btn-outline-primary waves-effect waves-light dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                            <i className="fa fa-tag"></i>
                                                            <b className="caret"></b>
                                                        </button>
                                                       
                                                    </div>

                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-outline-primary waves-effect waves-light dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                        More
                                                        <span className="caret"></span>
                                                        </button>
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                 <div class="position-relative has-icon-right">
                                                     <input type="text" class="form-control" placeholder="search mail"/>
                                                     <div class="form-control-position">
                                                        <i class="fa fa-search text-info"></i>
                                                    </div>
                                                 </div>
                                            </div>
                                        </div>

                                        <div class="card mt-3">
                                             <div class="card-body">
                                                    <div class="media mb-3">
                                                        <img src="https://catholic-foundation.org/wp-content/uploads/2017/07/unisex-avatar.png" class="rounded-circle mr-3 mail-img shadow" alt="media image"/>
                                                        <div class="media-body">
                                                            <span class="media-meta float-right">08:22 AM</span>
                                                        <h4 class="text-primary m-0">{name}</h4>
                                                            <small class="text-muted">From : marketoperation@nasdng.com</small>
                                                        </div>
                                                    </div>
                                                    <p><b>Hi Sir...</b></p>
                                                    <p>Please download the attached file</p>
                                                    <hr/>
                                                    <h4> <i class="fa fa-paperclip mr-2"></i> Attachments <span>(1)</span> </h4>
                                                    <div class="row">
                                                        <div class="col-sm-4 col-md-3">
                                                        <Workbook filename="NASD_DAILY_REPORT.xlsx" element={<img src="https://icon2.cleanpng.com/20180421/qye/kisspng-microsoft-excel-computer-icons-spreadsheet-compute-5adb659f36c410.3584293015243278392243.jpg" alt="attachment" class="img-thumbnail"/>}>
                                                            <Workbook.Sheet data={values} name="OFFICIAL PRICE LIST">
                                                                <Workbook.Column label="Security Name" value="Security Name"/>
                                                                <Workbook.Column label="Security" value="Security"/>
                                                                <Workbook.Column label="Open Price" value="Open Price"/>
                                                                 <Workbook.Column label="Close Price" value="Close Price"/>
                                                                 <Workbook.Column label="52 Week High Price" value="52 Week High Price"/>
                                                                 <Workbook.Column label="52 Week Low Price" value="52 Week Low Price"/>
                                                            </Workbook.Sheet>
                                                            <Workbook.Sheet data={trades} name="TRADE REPORT">
                                                                <Workbook.Column label="SECURITY" value="SECURITY"/>
                                                                <Workbook.Column label="SYMBOL" value="SYMBOL"/>
                                                                <Workbook.Column label="OPEN PRICE" value="refprice"/>
                                                                <Workbook.Column label="CLOSE_PRICE" value="CLOSE_PRICE"/>
                                                                <Workbook.Column label="High" value=""/>
                                                                <Workbook.Column label="Low" value=""/>
                                                                <Workbook.Column label="Spread" value=""/>
                                                                <Workbook.Column label="CLOSE_PRICE" value="CLOSE_PRICE"/>
                                                                <Workbook.Column label="Change" value={row => row.CLOSE_PRICE - row.refprice}/>
                                                                <Workbook.Column label="" value={row => {if ((row.CLOSE_PRICE - row.refprice) === 0) {
                                                                
                                                                }
                                                                
                                                            }
                                                            
                                                                }/>
                                                                <Workbook.Column label="%Change" value=""/>
                                                                <Workbook.Column label="Trades" value="DEALS"/>
                                                                <Workbook.Column label="VOLUME" value="VOLUME"/>
                                                                <Workbook.Column label="VALUE" value="VALUE"/>
                                                            </Workbook.Sheet>
                                                            
                                                        </Workbook>       
                                                     </div>

                                                     {pdf()}
                                                        
                                                      
                                                     
                                                     </div>
                                             </div>
                                        </div>



                                     </div>
                                </div>
                             </div>

                         </div>
                      </div>
                 </div>
                 </Fragment>
        )
    }


    return(
        <Fragment>
             <Dashboard></Dashboard>
            <div class="clearfix"></div>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <Ticker></Ticker>
                    {mail()}
                   
                   
                   
                </div>
             </div>
        </Fragment>
    )
}


export default InboxRead