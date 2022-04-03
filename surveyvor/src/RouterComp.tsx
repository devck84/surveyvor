import React, { useState } from 'react';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import RegisterComponent from './RegisterComp';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css';
import CreateSurveyComp from './CreateSurvey';
import DashboardComp from './DashboardComp';
import LoginComp from './LoginComp';

export const RouterComponent = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginComp />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/survey/create" element={<CreateSurveyComp />} />
                <Route path="/" element={<DashboardComp />} />
            </Routes>
        </BrowserRouter>
    );
}
const Navbar = () => {
    return (

<nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top navApp" style={{paddingLeft:'15px'}}>
    <img className=" navbar-brand" width="40px" src="https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv1.png" alt="" />
<a className=" navbar-brand" href="/"><b>Surveyvor</b></a>

<ul className="navbar-nav">

  <li className="nav-item">
    <a className="nav-link" href="/login">Login</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/register">Register</a>
  </li>

<li className="nav-item">
    <a className="nav-link" href="/survey/create"><i className="fa fa-plus"></i></a>
  </li>
  

</ul>
</nav>
            
    );
}