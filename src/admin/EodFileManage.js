import React, { Fragment, useState, useEffect } from "react";
import Ticker from "../core/Ticker";
import Dashboard from "./AdminDashboardLayout";
import { isAuthenticated } from "../auth";
import { getEodFileList, deleteEod,getEod, dailyEodUpload, getEodDelete} from "./ApiAdmin";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import ShowFile from "../admin/ShowFile";
import WordLimit from 'react-word-limit';



const ManageEodFile = () => {

    const [eod, setEod] = useState([]);
    const [geteod, setGetEod] = useState([])

    const {user, token} = isAuthenticated()
    let count =0;
    let totalReport =0;

    const loadEodList = () => {
        getEodFileList(user._id,token).then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setEod(data)
            }
        })
    }


    const loadGetEod = () => {
      getEod(user._id,token).then(data => {
          if (data.error) {
              console.log(data.error)
          }else{
            setGetEod(data)
          }
      })
  }




   
    useEffect(() => {
        loadEodList();
        loadGetEod();
    }, [])

    const destroy = reportId => {
      deleteEod(reportId, user._id, token ).then(data => {
          if (data.error) {
              console.log(data.error)
          }else{
            loadEodList();
            loadGetEod();
          }
      })
  }

  const destroyDailyEod = () => {
    getEodDelete( user._id, token ).then(data => {
        if (data.error) {
            console.log(data.error)
        }else{
          loadEodList();
          loadGetEod();
        }
    })
}

  const upload = reportId => {
    
    dailyEodUpload(reportId ).then(data => {
        if (data.error) {
            console.log(data.error)
        }else{
          loadEodList();
          loadGetEod();

        }
    })
}



    const breadcrumb = () => (
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Manage Eod File Layouts</h4>
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
              <Link to="/admin/user/eod/upload" class="dropdown-item">Upload EOD</Link>
              
              <div class="dropdown-divider"></div>
              <a href="javaScript:void();" class="dropdown-item">Separated link</a>
              </div>
            </div>
          </div>
        </div>
      );

      const table = () => {
          return(
            <div class="row">
            <div class="col-lg-12">
              <h6 class="text-uppercase text-white">
               Total  {eod.length} EOD 
              </h6>
              <hr />
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class="thead-primary">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">File Name</th>
                          <th scope="col">Created At</th>
                          <th scope="col">File</th>
                          <th scope="col">Action</th>

                          
                        </tr>
                      </thead>
                      <tbody>

                          {eod.map((r, i) => {
                              count++
                             
                              return(
                                <tr key={i}>
                                <th scope="row">{count}</th>
                                <td>{r.name}</td>
                                <td>{r.createdAt}</td>
                              
                              
                                <td>
                                <ShowFile item={r} url="price/file" />
                                </td>
                                <td>
                                  <Link to={`/admin/user/eod/upload/update/${r._id}`} >
                                      <span className="badge badge-warning badge-pill">
                                      Update
                                      </span>
                                  </Link>
                               
                                      <span onClick={() => destroy(r._id)} className="badge badge-danger badge-pill">
                                        Delete
                                      </span>
                                      <span onClick={() => upload(r._id)} className="badge badge-danger badge-pill">
                                        Upload
                                      </span>
                                 
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
          )
      }


      const table2 = () => {
        return(
          <div class="row">
          <div class="col-lg-12">
            <h6 class="text-uppercase text-white">
             Total  {geteod.length} EOD  <button onClick={() => destroyDailyEod()} type="button" class="btn btn-danger waves-effect waves-light m-1"> <i class="fa fa-trash-o"></i> </button>
            </h6>
            <hr />
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="thead-primary">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">EXTERNAL TICKET</th>
                        <th scope="col">TO MEMBER</th>
                        <th scope="col">TO ACCOUNT	</th>
                        <th scope="col">TO REFERENCE	</th>
                        <th scope="col">TO FREEZE ID		</th>
                        <th scope="col">FROM MEMBER	</th>
                        <th scope="col">FROM ACCOUNT	</th>
                        <th scope="col">FROM REFERENCE	</th>
                        <th scope="col">FROM FREEZE ID	</th>
                        <th scope="col">SYMBOL</th>
                        <th scope="col">VOLUME</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">TRADE DATE	</th>
                        
                        <th scope="col">TRADE TIME	</th>
                        <th scope="col">SETTLEMENT DATE	</th>
                        <th scope="col">TOTAL VALUE	</th>
                        <th scope="col">INTEREST VALUE	</th>
                        <th scope="col">TRADE STATUS	</th>
                        <th scope="col">NEW EXTERNAL TICKET	</th>
                        <th scope="col">AMEND TIME	</th>
                        <th scope="col">st	</th>

                        
                      </tr>
                    </thead>
                    <tbody>

                        {geteod.map((r, i) => {
                            totalReport++
                           
                            return(
                              <tr key={i}>
                              <th scope="row">{totalReport}</th>
                            <td>{r.externalTicker}</td>
                            <td>{r.toMember}</td>
                            <td>{r.toAccount}</td>
                            <td>{r.toReference}</td>
                            <td>{r.toFreezeId}</td>
                            <td>{r.fromMember}</td>
                            <td>{r.fromAccount}</td>
                            <td>{r.fromReference}</td>
                            <td>{r.fromFreezeId}</td>
                            <td>{r.SYMBOL}</td>
                            <td>{r.VOLUME}</td>
                            <td>{r.PRICE}</td>
                            <td>{r.tradeDate}</td>
                            <td>{r.tradeTime}</td>
                            <td>{r.settlementDate}</td>
                            <td>{r.totalValue}</td>
                            <td>{r.interestValue}</td>
                            <td>{r.tradeStatus}</td>
                            <td>{r.newExternalTicket}</td>
                            <td>{r.AmendTime}</td>
                            <td>{r.st}</td>

                            
                            
                              
                              
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
        )
    }



    return(
        <Fragment>
        <Dashboard></Dashboard>
        <div className="content-wrapper">
          <div className="container-fluid">
          <Ticker></Ticker>
          {breadcrumb()}
          {table()}
          {table2()}

         
         
           
          </div>
        </div>
      </Fragment>
    )


}


export default ManageEodFile