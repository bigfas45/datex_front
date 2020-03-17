import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import {  sendEmailToNasdParticipant} from "./ApiAdmin";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import ShowFile from "./ShowFile";
import WordLimit from 'react-word-limit';



const NasdNseParticipantEmail = ({match}) => {

  
    const [testmail, settestmail] = useState([])

    const {user, token} = isAuthenticated()
    let count =0;
    let totalReport =0;

  

    const sendTmail = () => {
      sendEmailToNasdParticipant(match.params.emailId, user._id, token).then(testMailData => {
          if (testMailData.error) {
              console.log(testMailData.error)
          }else{
            settestmail(testMailData)
          }
      })
  }



    useEffect(() => {
      
        sendTmail();
    }, [])



    const breadcrumb = () => (
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Manage Report Layouts</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                {" "}
                <Link to="/admin/dashboard" className="text-warning">
                  Dashboard
                </Link>
              </li>
              
            </ol>
          </div>
          <div className="col-sm-3">
            <div className="btn-group float-sm-right">
              <button
                type="button"
                className="btn btn-outline-primary waves-effect waves-light"
              >
                <i className="fa fa-cog mr-1"></i> Setting
              </button>
              <button
                type="button"
                className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split waves-effect waves-light"
                data-toggle="dropdown"
              >
                <span className="caret"></span>
              </button>
              <div className="dropdown-menu">
              <Link to="/admin/user/mail" class="dropdown-item">Create Mail</Link>
              
              <div class="dropdown-divider"></div>
              <a href="javaScript:void();" class="dropdown-item">Separated link</a>
              </div>
            </div>
          </div>
        </div>
      );

     

    return(
        <Fragment>
        <Dashboard></Dashboard>
        <div className="content-wrapper">
          <div className="container-fluid">
          <Ticker></Ticker>
          {breadcrumb()}
       
{JSON.stringify(testmail)}

         
         
           
          </div>
        </div>
      </Fragment>
    )


}


export default NasdNseParticipantEmail