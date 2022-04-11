import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Route } from "./Model/Route";
import Swal from "sweetalert2";
import { Survey } from "./Model/Survey";
import { useNavigate, useParams } from 'react-router-dom';
import EditSurveyDetails from "./EditSurveyDetails";
import EditAppareanceSurvey from "./EditAppareanceSurvey";
import { Team } from "./Model/Team";

interface IState {
    survey: Survey;
    team: Array<Team>;
}
const EditSurveyComp = () => {
    const { survey_id } = useParams();
    const [state, setState] = useState<IState>();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") as string;

    useEffect( () => {
        if(!token){
            navigate('/login');
        }else{
            let headers = {
                headers: {
                    'Authorization': token
                }
            }
            const baseApiRoute: Route = new Route();
            const meRoute: string = baseApiRoute.getBaseRuta() + "survey/mine/"+survey_id;
            axios.get(meRoute, headers).
                then((d)=>{
                  const teamRoute: string = baseApiRoute.getBaseRuta() + "team/mine";
                  axios.get(teamRoute, headers).
                  then((c)=>{
                    setState({survey: d.data.survey, team: c.data.teams});
                  })
                }).catch((err)=>navigate('/login'))
        }
    },[]);

    function uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    const saveDetails = (survey_name:string, survey_description:string, privacy_id:number, active:number, team:number) =>{
        let surveyDetails:IState = state as IState;
        surveyDetails.survey.survey_name = survey_name;
        surveyDetails.survey.survey_description = survey_description;
        surveyDetails.survey.privacy_id = privacy_id;
        surveyDetails.survey.active = active;
        surveyDetails.survey.team_id = team;
        setState(surveyDetails);
        successMessage("Survey Details Updated","");
    }

    const saveColorDetails = (background_color:string, button_color:string) =>{
      let surveyDetails:IState = state as IState;
      surveyDetails.survey.background_color = background_color;
      surveyDetails.survey.button_color = button_color;
      setState(surveyDetails);
      successMessage("Survey Preferences Updated","");
  }

  const saveWholeSurvey = async () =>{
    let surveyDetails:IState = state as IState;
    const baseApiRoute: Route = new Route();
      const survRoute: string = baseApiRoute.getBaseRuta() + "survey/update/"+survey_id;

      let headers = {
        headers: {
            'Authorization': token
        }
      };
     if(surveyDetails.survey.survey_name.length<1){
        errorMessage("Whoops!", "Have you finish the survey details? Remember to press done whenever you finish it");
        return
      }

      await axios.post(survRoute, state?.survey,headers)
        .then(response => {
          surveyDetails.survey = response.data.survey as Survey;
          setState(surveyDetails);
        });
        

    successMessage("Saved","Your survey have been succesfuly updated!");
    
  }

  const successMessage = (title:string, message:string) => {
    Swal.fire({
        title: title,
        icon: "success",
        text: message,
      showDenyButton: false
    });
  };
  const errorMessage = (title:string, message:string) => {
    Swal.fire({
        title: title,
        icon: "error",
        text: message,
      showDenyButton: false
    });
  };

  return (
    <>
      
        <div className="row justify-content-center m-0 mt-5">
          <div className="col-md-9" style={{ color: "#363636" }}>
            <h2>
              Edit <span style={{ color: "#d36b2ad5" }}>Survey</span>
            </h2>
          </div>

          <div className="col-md-1">
            <button
              type="submit"
              className="btn btn-block btn-outline-primary mb-4 mt-4 float-rigth"
              style={{ width: "100%" }}
              onClick={saveWholeSurvey}
            >
              Update Survey
            </button>
          </div>
        </div>

        <div className="row justify-content-center m-0 mt-3">
          <div className="col-md-10">
            <nav>
              <div className="nav createSurveyComp nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Details
                </button>
                <button
                  className="nav-link"
                  id="nav-contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contact"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  Appareance
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <EditSurveyDetails survey={state?.survey as Survey} surveyDetails={saveDetails} teams={state?.team as Array<Team>}/>
              </div>
              <div
                className="tab-pane fade"
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                  <EditAppareanceSurvey survey={state?.survey as Survey} colorDetails={saveColorDetails}/>

                  </div>
              
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default EditSurveyComp;
