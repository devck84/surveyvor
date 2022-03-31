import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  return (
    <>
    <div className="row justify-content-center">
    <div className="card col-md-4 col-xs-12 mt-5 mb-5">
      <div style={{textAlign: 'center'}}>
    <img className="card-img-top" src="https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv2.png" alt="Card image cap" style={{width: '40%'}}/></div>
    <div className="card-body">
      <h5 className="card-title">Sign In</h5>
      <form>
      <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Email address</label>
</div>
<div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
  <label htmlFor="floatingPassword">Password</label>
</div>

      <div className="row mb-4">
       

        <div className="col mt-3">
          <a href="#!">Forgot password?</a>
        </div>
      </div>

      <div style={{textAlign: 'center'}}>
       <button type="button" className="btn btn-primary btn-block mb-4" style={{width: '70%'}}>Sign in</button>
      </div>

      <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
        <p>or sign up with:</p>
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fa fa-facebook-f"></i>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fa fa-google"></i>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fa fa-twitter"></i>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fa fa-github"></i>
        </button>
      </div>
    </form>
    </div>
  </div>
  </div>
  </>
  );
}

export default App;
