import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import logo from '../img/nasdlogo.jpg';
import {signout} from '../auth';
import {isAuthenticated} from '../auth';
import Ticker from '../core/Ticker';



const AdminDashBoardLayout = ({history}) => {

    const {user: {_id, name, email, role}} = isAuthenticated()

    return(
<div>
 
 {/* <!--Start sidebar-wrapper--> */}
 <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true" className="border-right border-secondary-light shadow-none">
 <div className="brand-logo">
    <Link to="/">
        <img  src={logo} height="30" className="App-logo mt-3 ml-4" alt="logo" />
        <h5 className="logo-text"> </h5>
    </Link>
 </div>
 <ul className="sidebar-menu do-nicescrol">
    <li className="sidebar-header">MAIN NAVIGATION</li>
    <li>
        <Link to="#" className="waves-effect"> 
            <i className="icon-home"></i> <span>Dashboard</span> <i className="fa fa-angle-left pull-right"></i>
        </Link>
        <ul className="sidebar-submenu">
          <li><Link to="#"><i className="fa fa-circle-o"></i> Dashboard v1</Link></li>
        </ul>
    </li>
      <li><Link to="/admin/security" className="waves-effect"><i className="fa fa-circle-o text-aqua"></i> <span>Security</span></Link></li>
      <li><Link to="/admin/manage/annualreport" className="waves-effect"><i className="fa fa-circle-o text-aqua"></i> <span>Manage Annual Report</span></Link></li>
      <li><Link to="/admin/manage/clients" className="waves-effect"><i className="fa fa-circle-o text-aqua"></i> <span>Manage Clients</span></Link></li>
      <li><Link to="/admin/user/mail/manage" className="waves-effect"><i className="fa fa-circle-o text-aqua"></i> <span>Manage Mails</span></Link></li>

      <li><Link to="/admin/user/price/list" className="waves-effect"><i className="fa fa-circle-o text-aqua"></i> <span>Price</span></Link></li>
    <li className="sidebar-header">LABELS</li>
      
      <li><Link to="#" className="waves-effect"><i className="fa fa-circle-o text-aqua"></i> <span>Information</span></Link></li>
      
 </ul>
 </div>
 {/* <!--End sidebar-wrapper--> */}
 {/* <!--Start topbar header--> */}
 <header className="topbar-nav">
    <nav className="navbar navbar-expand fixed-top bg-dark border-bottom border-secondary-light shadow-none">
        <ul className="navbar-nav mr-auto align-items-center">
                <li className="nav-item">
                <Link className="nav-link toggle-menu" to="#">
                <i className="icon-menu menu-icon"></i>
                </Link>
                </li>
                <li className="nav-item">
                <form className="search-bar">
                    <input type="text" className="form-control" placeholder="Enter keywords" />
                    <Link to="#"><i className="icon-magnifier"></i></Link>
                </form>
                </li>
            </ul>
            <ul className="navbar-nav align-items-center right-nav-link">
                <li className="nav-item dropdown-lg">
                    <Link className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" to="#">
                        <i className="icon-envelope-open"></i><span className="badge badge-danger badge-up">1</span>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                            You have 24 new messages
                            <span className="badge badge-danger">24</span>
                            </li>
                                <li className="list-group-item">
                                    <Link to="#">
                                        <div className="media">
                                            <div className="avatar"><img className="align-self-start mr-3" src="assets/images/avatars/avatar-2.png" alt="user avatar" /></div>
                                            <div className="media-body">
                                                <h6 className="mt-0 msg-title">Sara Jen</h6>
                                                <p className="msg-info">Lorem ipsum dolor sit amet...</p>
                                                <small>Yesterday, 8:30 AM</small>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            <li className="list-group-item"><Link to="#">See All Messages</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item dropdown-lg">
                        <Link className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" to="#">
                            <i className="icon-bell"></i><span className="badge badge-primary badge-up">1</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    You have 10 Notifications
                                    <span className="badge badge-primary">10</span>
                                </li>
                                <li className="list-group-item">
                                    <Link to="#">
                                        <div className="media">
                                            <i className="icon-people fa-2x mr-3 text-info"></i>
                                            <div className="media-body">
                                                <h6 className="mt-0 msg-title">New Registered Users</h6>
                                                <p className="msg-info">Lorem ipsum dolor sit amet...</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="list-group-item"><Link to="#">See All Notifications</Link></li>
                            </ul>
                        </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown" to="#">
                        <span className="user-profile"><img src="https://catholic-foundation.org/wp-content/uploads/2017/07/unisex-avatar.png" className="img-circle" alt="user avatar" /></span>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <li className="dropdown-item user-details">
                                <Link to="#">
                                    <div className="media">
                                        <div className="avatar"><img className="align-self-start mr-3" src="https://catholic-foundation.org/wp-content/uploads/2017/07/unisex-avatar.png" alt="user avatar" /></div>
                                        <div className="media-body">
                                            <h6 className="mt-2 user-title">{name}</h6>
                                            <p className="user-subtitle">{email}</p>
                                        </div>
                                    </div>
                                </Link>
                        </li>
                            <li className="dropdown-divider"></li>
                            <li className="dropdown-item"><i className="icon-envelope mr-2"></i> Inbox</li>
                            <li className="dropdown-divider"></li>
                            <li className="dropdown-item"><i className="icon-wallet mr-2"></i> Account</li>
                            <li className="dropdown-divider"></li>
                            <li className="dropdown-item"><i className="icon-settings mr-2"></i> Setting</li>
                            <li className="dropdown-divider"></li>
                            <li className="dropdown-divider"></li>
                            <li className="dropdown-item">
                            <span className="nav-link" style={{cursor: 'pointer'}}  onClick={() => signout(() => { history.push('/');})}>
                                <i className="icon-power mr-2"></i>
                                    Logout
                             </span>
                            </li>
                          
                            
                           
                    </ul>
                </li>

        </ul>
    </nav>
 </header>
 {/* <!--End topbar header--> */}
 <div className="clearfix"></div>
	
  </div>
    )

}
  
 
  
   



export default AdminDashBoardLayout;
