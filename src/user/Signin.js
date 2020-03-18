import React, {useState} from 'react';
import Ticker from '../core/Ticker';
import Spinner from 'react-bootstrap/Spinner';
import Menu from '../core/Menu';
import {Link, Redirect } from 'react-router-dom';
import logo from '../img/NASD-LOGO-PLC (1).png';
import '../App.css';
import  {signin, authenticate, isAuthenticated} from '../auth';

const Signin = () => {
  
    const [values, setValues] = useState({
       
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false, 
    });

    const { email, password, loading, error, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

   
   
    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error:false, loading: true });
        signin({ email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false})
            }else{
               authenticate(data,() => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                   });
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger alert-dismissible alert-round" role="alert" style={{display: error ? '' : 'none'}}>
				   <button type="button" className="close" data-dismiss="alert">×</button>
				    <div className="alert-icon">
					 <i className="icon-close"></i>
				    </div>
				    <div className="alert-message">
				      <span><strong>Error!</strong>   {error}</span>
				    </div>
                  </div>
    )
        
    

    const showLoading = () => (

        loading && ( 
            <div>
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </div>
           
        )
   
        
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
          if(user && user.role === 1){
            return <Redirect to="/admin/dashboard" />
          }else{
            return <Redirect to="/user/dashboard" />
          }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    };

  
      
      const signInForm = () =>{

        return(
          
                <div id="wrapper">
                    <div className="card border-primary border-top-sm border-bottom-sm card-authentication1 mx-auto my-5 animated bounceInDown">
                        <div className="card-body">
                            <div className="card-content p-2">
                                <div className="text-center">
                                    <Link className="nav-link"  to="/"><img  src={logo}  className="App-logo mt5" alt="logo" /></Link>
                                </div>
                                <div className="card-title text-uppercase text-center py-3">Sign In</div>
                                {showLoading()}
                                {showError()}
                                    <form>
                                  
                                    <div className="form-group">
                                        <div className="position-relative has-icon-right">
                                            <label htmlFor="exampleInputEmailId" className="text-muted">Email ID</label>
                                            <input onChange={handleChange('email')} type="text" id="exampleInputEmailId" className="form-control form-control-rounded" placeholder="Email ID" value={email} />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <div className="position-relative has-icon-right">
                                            <label  className="text-muted">Password</label>
                                            <input onChange={handleChange('password')} type="password"  className="form-control form-control-rounded" placeholder="Password" value={password} />
                                        </div>
                                    </div>

                                    <div className="form-row mr-0 ml-0">
                                                <div className="form-group col-6">
                                                    <div className="icheck-primary">
                                                        <input type="checkbox" id="user-checkbox" checked="" />
                                                        <label htmlFor="user-checkbox">Remember me</label>
                                                    </div>
                                                </div>
                                                <div className="form-group col-6 text-right">
                                                <Link className="nav-link"  to="/"> Reset Password</Link>
                                                </div>
                                            </div>

                                            <button onClick={clickSubmit} type="button" className="btn btn-primary shadow-primary btn-round btn-block waves-effect waves-light">Sign Up</button>
                                            <hr />
                                                <p className="text-muted">  <Link className="nav-link"  to="/signup"> Do not have an account? SIGNUP</Link></p></form>
                            </div>
                        </div>
                    </div>
                
                
                </div>
           
        )
    };

  


    return(
       
            <div style={{  
                backgroundImage: "url(" + "https://nasdng.com/wp-content/uploads/2020/01/PA-FX-Background.jpg" + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: "780px"
              
              }}>
                <Menu></Menu>
                <Ticker></Ticker>
              
                {signInForm()}
                {redirectUser()}
                
            </div>
      
       
        );
}

   



  

    

export default Signin;
