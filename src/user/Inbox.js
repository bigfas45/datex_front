import React, {Fragment, useState, useEffect} from 'react';
import Ticker from '../core/Ticker';
import Dashboard from './UserDashboardLayout';
import { Link } from 'react-router-dom';
import {InboxD} from '../core/Apicore';
import Moment from 'moment';



const Inbox = () => {

    const [inboxDate, setInboxDate] =  useState([]);
    const [error, setError] = useState(false);
    let cdate;


    const loadInboxDate = () => {
        InboxD().then(data => {
            if (data.error) {
                setError(data.error)
            }else{
                setInboxDate(data)
            }
        });
    };

    useEffect(() => {
        loadInboxDate()
    }, [])

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
                                    {/* <div className="col-lg-3 col-md-4"> */}
                                        {/* <div className="card mt-3">
                                            <div className="list-group">
                                                <Link to="" className="list-group-item active"><i className="fa fa-inbox mr-2"></i>Inbox</Link>
                                                 {/* <Link to="" className="list-group-item"><i className="fa fa-star-o mr-2"></i>Starred</Link>
                                                 <Link to="" className="list-group-item"><i className="fa fa-file-text-o mr-2"></i>Draft <b>(10)</b></Link>
                                                 <Link to="" className="list-group-item"><i className="fa fa-paper-plane-o mr-2"></i>Sent Mail</Link>
                                                 <Link to="" className="list-group-item"><i className="fa fa-trash-o mr-2"></i>Trash <b>(320)</b></Link>
                                                 <Link to="" className="list-group-item"><i className="fa fa-bookmark mr-2"></i>Important <b>(5)</b></Link>
                                                 <Link to="" className="list-group-item">Labels</Link>
                                                 <Link to="" className="list-group-item"><span className="fa fa-circle text-info float-right"></span>Work</Link>
                                                 <Link to="" className="list-group-item"><span className="fa fa-circle text-warning float-right"></span>Design</Link>
                                                 <Link to="" className="list-group-item"><span className="fa fa-circle text-primary float-right"></span>Family</Link>
                                                 <Link to="" className="list-group-item"><span className="fa fa-circle text-rose float-right"></span>Friends</Link>
                                                 <Link to="" className="list-group-item"><span className="fa fa-circle text-success float-right"></span>Office</Link> */}
                                            {/* </div> */}
                                        {/* </div> */} 
                                    {/* </div> */}
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
                                                    <div class="table-responsive">
                                                        <table class="table table-hover">
                                                            <tbody>
                                                                {inboxDate.map((inboxDateDate, i) => {

                                                                   




                                                                      cdate = Moment(inboxDateDate.Date).format('YYYY-MM-DD')

                                                                    
                                                                    
                                                                    return(
                                                                      
                                                                        <tr>
                                                                    <td>
                                                                        <div class="mail-checkbox">
                                                                            <input id="checkbox1" class="filled-in chk-col-primary" type="checkbox" checked="checked" />
                                                                            <label for="checkbox1">
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td class="mail-rateing">
                                                                        <i class="fa fa-star"></i>
                                                                    </td>
                                                                    <td>
                                                                    <Link to={`/user/inboxRead/${cdate}`}> 
                                                                   { cdate}
                                                                   </Link>
                                                                    </td>
                                                                    <Link to={`/user/inboxRead/${cdate}`}>
                                                                    <td>
                                                                    <Link to={`/user/inboxRead/${cdate}`}><i class="fa fa-circle text-info mr-1"></i>MARKET REPORT {cdate}</Link>
                                                                    </td>
                                                                    </Link>
                                                                    <td>
                                                                        <i class="fa fa-paperclip"></i>
                                                                    </td>
                                                                    <td class="text-right">
                                                                        08:23 AM
                                                                    </td>
                                                                 </tr>
                                                               
                                                                    )
                                                                })}
                                                                 
                                                                
                                                                
                                                            </tbody>
                                                        </table>
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

export default Inbox