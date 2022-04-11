import React, { useState, useEffect } from "react";
import { Privacy } from './Model/Privacy';
import { Route } from "./Model/Route";
import axios from "axios";
import { Survey } from "./Model/Survey";
import { Team } from "./Model/Team";

interface IProps{
    survey: Survey;
    surveyDetails:Function;
    teams: Array<Team>;
}

interface IState{
  allPrivacy:Array<Privacy>;
}

const EditSurveyDetails = (props:IProps) => {
  const [privacyState, setPrivacy] = useState<IState>();

  const baseApiRoute: Route = new Route();
  const privacyRoute: string = baseApiRoute.getBaseRuta() + "privacy/all";

  const setChecked = ()=>{
      let switchInput = document.querySelector("#switchRequired");
      if(switchInput){
        switchInput.setAttribute("checked", "");
      }
  }
  if(props?.survey?.active==1){
            setChecked();
  }

  useEffect(() => {
      let headers = {
          headers: {
              'Authorization': localStorage.getItem("token") as string
          }
      }

      async function fetchMyAPI() {
        let answer = await axios.get(privacyRoute, headers);
          let privacyArr =  answer.data.privacy;
          setPrivacy({allPrivacy: privacyArr});
          
      }
      fetchMyAPI();
      
      
    },[]);
    
    const saveDetails = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let form: HTMLFormElement = event.currentTarget;
    
        let inputName: HTMLInputElement = form.survey_name;
        let inputDescription: HTMLInputElement = form.description;
        let inputPrivacy: HTMLInputElement = form.privacy;
        let inputActive: HTMLInputElement = form.active;
        let inputTeam: HTMLInputElement = form.team;
    
        let name: string = inputName.value;
        let description: string = inputDescription.value;
        let privacy: string = inputPrivacy.value;
        let active:number = inputActive.value=="on"?1:0;
        let team:number = Number(inputTeam.value);
        
        props.surveyDetails(name, description, privacy, active, team);
    }
  return (
    <form onSubmit={saveDetails}>
        <div className="p-5">
        <div className="form-floating mb-4">
            <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Survey name"
            name="survey_name"
            defaultValue={props?.survey?.survey_name}
            />
            <label htmlFor="floatingInput">Survey Name (Required)</label>
        </div>
        <div className="form-floating mb-4">
            <textarea
            className="form-control"
            id="floatingDesc"
            placeholder="Description"
            name="description"
            defaultValue={props?.survey?.survey_description!=null?props?.survey?.survey_description:""}
            />
            <label htmlFor="floatingDesc">Description</label>
        </div>
        <div className="form-floating">
            <select  className="form-control" name="privacy" id="privacy" defaultValue={props?.survey?.privacy_id}>
            {privacyState?.allPrivacy.map((a,i) => {
               if(a.privacy_id==props?.survey?.privacy_id){
                return (
                      
                  <option key={i+'-opt1'} value={a.privacy_id} selected>
                      {a.privacy_name}
                  </option>
                  );
               }else{
                    return (
                      
                        <option key={i+'-opt1'} value={a.privacy_id} >
                            {a.privacy_name}
                        </option>
                        );
               }
                    
                  })}
            </select>
            <label htmlFor="floatingDesc">Privacy</label>
        </div>
        <div className="form-floating">
            <select  className="form-control mt-4" name="team" id="team">
            <option> Select your team (Optional) </option>
            {props?.teams?.map((a,i) => {
              if(a.team_id==props?.survey?.team_id){
                return (
                      
                  <option key={i+'-opt-'+a.team_id} value={a.team_id} selected>
                      {a.team_name}
                  </option>
                  );
               }else{
                    return (
                      
                      <option key={i+'-opt-'+a.team_id} value={a.team_id} >
                      {a.team_name}
                  </option>
                        );
               }
            })}
            </select>
            <label htmlFor="floatingDesc">Team</label>
        </div>
        <div className="form-check form-switch mt-3">
          <input
            className="form-check-input"
            style={{ height: "20px" }}
            type="checkbox"
            role="switch"
            id="switchRequired"
            name="active"
           />
          <label
            className="form-check-label"
            style={{ color: "gray" }}
            htmlFor="switchRequired"
          >
            Active
          </label>
        </div>
        <div className="col-md-1">
            <button
              type="submit"
              className="btn btn-block btn-outline-primary mb-4 mt-4 float-rigth"
              style={{ width: "100%" }}
            >
              Done
            </button>
          </div>
        </div>
    </form>
  );
};

export default EditSurveyDetails;
