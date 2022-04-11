import React, { useState } from 'react';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import RegisterComponent from './RegisterComp';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css';
import CreateSurveyComp from './CreateSurvey';
import DashboardComp from './DashboardComp';
import LoginComp from './LoginComp';
import SurveyToAnswerComp from './SurveyToAnswerComp';
import ThankYouPage from './ThankYouPage';
import ProfileComp from './ProfileComp';
import EditSurveyComp from './EditSurveyComp';
import CreateTeamComp from './CreateTeamComp';
import TeamInvitation from './TeamInvitation';
import RoomsContainer from './containers/Rooms';
import MessagesContainer from './containers/Messages';
import Home from './pages';
import MyApp from './pages/_app';
import styles from "./styles/Home.module.css";
import SocketsProvider, { useSockets } from "./context/socket.context";

// @ts-ignore
export const RouterComponent = () => {
    return (
        
        <BrowserRouter>
            <Navbar /><SocketsProvider>
            <Routes>
                <Route path="/login" element={<LoginComp />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/survey/create" element={<CreateSurveyComp />} />
                <Route path="/" element={<DashboardComp />} />
                <Route path="/survey/:survey_id" element={<SurveyToAnswerComp />} />
                <Route path="/thankyou" element={<ThankYouPage />} />
                <Route path="/profile/:user_id" element={<ProfileComp />} />
                <Route path="/survey/:survey_id/edit" element={<EditSurveyComp />} />
                <Route path="/team/create" element={<CreateTeamComp />} />
                <Route path="/invite/:team_id/:token" element={<TeamInvitation />} />
                <Route path="/chat" element={<div className="messageComp"><div className={styles.container}>
          <RoomsContainer />
          <MessagesContainer />
        </div></div>} />
            </Routes></SocketsProvider>
        </BrowserRouter>
        
    );
}
const Navbar = () => {
    return (

<nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top navApp" style={{paddingLeft:'15px'}}>
    <img className=" navbar-brand" width="40px" src="https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv1.png" alt="" />
<Link className=" navbar-brand" to="/"><b>Surveyvor</b></Link>

<ul className="navbar-nav">

<li className="nav-item">
    <a className="nav-link" href="/survey/create"><i className="fa fa-plus"></i></a>
  </li>
  

</ul>
</nav>
            
    );
}