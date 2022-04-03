import "./App.css";
import SurveyListComp from "./SurveyListComp";
import { Survey } from "./Model/Survey";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route } from "./Model/Route";
import { useNavigate } from 'react-router-dom';
import ProfileViewComp from "./ProfileViewComp";

const DashboardComp = () => {
    const token = localStorage.getItem("token") as string;
    const navigate = useNavigate();

    let headers = {headers: {}};

    useEffect( () => {
        
        if(!token){
            navigate('/login');
        }else{
            headers = {
                headers: {
                    'Authorization': token
                }
            }
            const baseApiRoute: Route = new Route();
            const meRoute: string = baseApiRoute.getBaseRuta() + "auth/me";
            axios.get(meRoute, headers).
                catch(err => {
                    navigate("/login");
                });
        }
    },[]);
  return (
    <>
      <div className="row align-items-start m-0 ">
        <div className="col-1 p-0">
        <div
          className="nav flex-column nav-pills me-3"
         
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className="nav-link active dashButton"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          ><i className="fa fa-pie-chart dashIcon"></i> 
            Surveys
          </button>
          <button
            className="nav-link dashButton"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            <i className="fa fa-user dashIcon" ></i> Profile
          </button>
          <button
            className="nav-link dashButton"
            id="v-pills-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-messages"
            type="button"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
          ><i className="fa fa-pie-chart dashIcon"></i>
            Friends
          </button>
          <button
            className="nav-link dashButton"
            id="v-pills-settings-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-settings"
            type="button"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
          >
            <i className="fa fa-users dashIcon"></i> Teams
          </button>
        </div>
        </div>
        <div className="col-11 backFromDash">
        <div className="tab-content" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <SurveyListComp key='surveyList-1' />
            
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <ProfileViewComp/>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
          >
           
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
          >
            ...
          </div>
        </div></div>
      </div>
    </>
  );
};

export default DashboardComp;
