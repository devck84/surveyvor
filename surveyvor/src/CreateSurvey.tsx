import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Country } from "./Model/Country";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import Swal from "sweetalert2";
import QuestionMakerComp from "./QuestionMakerComp";
import SurveyDetailsComp from "./SurveyDetailsComp";
import { Survey } from "./Model/Survey";
import { Privacy } from './Model/Privacy';

interface IState {
    survey: Survey;
}
const CreateSurveyComp = () => {
    const [surveyObj, setSurvey] = useState<IState>();

    let allPrivacy:Array<Privacy> = new Array<Privacy>();

    const baseApiRoute: Route = new Route();
    const privacyRoute: string = baseApiRoute.getBaseRuta() + "privacy/all";

    useEffect(() => {
        setSurvey({survey: new Survey({survey_id: 0,
            team_id: null,
            privacy_id: 1,
            user_id: 0,
            survey_name: "",    
            survey_description: "",
            button_color: null,
            background_color: null,
            date_created: "",
            active: 1})});
        
        let headers = {
            headers: {
                'Authorization': localStorage.getItem("token") as string
            }
        }

        async function fetchMyAPI() {
          let respuesta = await axios.get(privacyRoute, headers);
          allPrivacy = respuesta.data;
          console.log(allPrivacy);
        }
        fetchMyAPI()
      },[]);

    function saveDetails (survey_name:string, survey_description:string, privacy_id:number){
        let surveyDetails:IState = surveyObj as IState;
        surveyDetails.survey.survey_name = survey_name;
        surveyDetails.survey.survey_description = survey_description;
        surveyDetails.survey.privacy_id = privacy_id;
        setSurvey({survey: surveyDetails.survey});
    }

  const creatingSurvey = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const successMessage = (title: string, message: string) => {
    Swal.fire({
      title: title,
      icon: "success",
      text: message,
      showDenyButton: false,
    });
  };
  const errorMessage = (title: string, message: string) => {
    Swal.fire({
      title: title,
      icon: "error",
      text: message,
      showDenyButton: false,
    });
  };
  return (
    <>
      <form onSubmit={CreateSurveyComp}>
        <div className="row justify-content-center m-0 mt-5">
          <div className="col-md-9" style={{ color: "#363636" }}>
            <h2>
              Create a <span style={{ color: "#d36b2ad5" }}>New Survey</span>
            </h2>
          </div>

          <div className="col-md-1">
            <button
              type="submit"
              className="btn btn-block btn-outline-primary mb-4 mt-4 float-rigth"
              style={{ width: "100%" }}
            >
              Save Survey
            </button>
          </div>
        </div>

        <div className="row justify-content-center m-0 mt-3">
          <div className="col-md-10">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
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
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Questions
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
                <SurveyDetailsComp surveyDetails={saveDetails} allPrivacy={allPrivacy}/>
              </div>
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                
                <QuestionMakerComp
                  key={2}
                  question={{
                    question_id: 0,
                    survey_id: 0,
                    next_question_id: 0,
                    question_text: "",
                    question_type_id: 0,
                    required: 0,
                    sequence_number: 2,
                  }}
                  index={2}
                />
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
                  <div
                  className="row justify-content-center m-0"
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    borderRight: "1px solid #dee2e6",
                  }}
                >
                  <div className="p-5">
                      <div className="mb-3">
                        <label htmlFor="exampleColorInput" className="form-label">Background Color's Survey</label>
                            <input type="color" className="form-control form-control-color" style={{width: "100%"}} id="exampleColorInput"  title="Choose your color"/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleColorInput" className="form-label">Buttons' Color</label>
                            <input type="color" className="form-control form-control-color" style={{width: "100%"}} id="exampleColorInput" title="Choose your color"/>
                        </div>
                  </div>
                </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateSurveyComp;
