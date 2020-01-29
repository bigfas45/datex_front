import React, {useState} from 'react';
import Ticker from '../core/Ticker';
import Menu from '../core/Menu';
import {Link, } from 'react-router-dom';
import logo from '../img/NASD-LOGO-PLC (1).png';
import '../App.css';
import  {signup} from '../auth';
import Spinner from 'react-bootstrap/Spinner';



const Signup = () => {
  
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        success: false
    });

    const {name, email, password,  loading, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

   
   
    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error:false, loading:true})
        signup({name, email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false, loading: false})
            }else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true

                })
            }
        })
    }

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
    );

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
        
    

    const showSuccess = () => (


        <div class="alert alert-outline-success alert-dismissible" role="alert" style={{display: success ? '' : 'none'}}>
				    <button type="button" class="close" data-dismiss="alert">&times;</button>
					
				    <div class="alert-icon">
					 <i class="icon-check"></i>
				    </div>
				    <div class="alert-message">
				      <span><strong>Success!</strong> New account is created. Please  <Link to="/signin"> Signin </Link></span>
				    </div>
                  </div>



        
    );

  
      
      const signUpForm = () =>{

        return(
          
                <div id="wrapper">
                    <div className="card border-primary border-top-sm border-bottom-sm card-authentication1 mx-auto my-5 animated bounceInDown">
                        <div className="card-body">
                            <div className="card-content p-2">
                                <div className="text-center">
                                    <Link className="nav-link"  to="/"><img  src={logo}  className="App-logo mt5" alt="logo" /></Link>
                                </div>
                                <div className="card-title text-uppercase text-center py-3">Sign Up</div>
                                {showLoading()}
                                {showSuccess()}
                                {showError()}
                                    <form>
                                    <div className="form-group">
                                            <div className="position-relative has-icon-right">
                                                <label className="text-muted" >Full Name </label>
                                                <input onChange={handleChange('name')} type="text" id="exampleInputEmailId" className="form-control form-control-rounded" placeholder="Your full name" value={name}/>
                                            </div>
                                    </div>
                                    
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

                                            {/* <div className="form-group">
                                                <div className="position-relative has-icon-right">
                                                    <label  className="text-muted">Confirm Password</label>
                                                    <input type="password"  className="form-control form-control-rounded" placeholder="Confirm Password" />
\                                                </div>
                                            </div> */}
                                           

                                            <button onClick={clickSubmit} type="button" className="btn btn-primary shadow-primary btn-round btn-block waves-effect waves-light">Sign Up</button>
                                            <hr />
                                                <p className="text-muted">  <Link className="nav-link"  to="/signup"> Do not have an account? SIGNUP</Link></p>
                                    </form>
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
              
                {signUpForm()}
                
            </div>
      
       
        );
}

   



  

    

export default Signup;
