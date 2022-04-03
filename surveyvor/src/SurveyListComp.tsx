import { Survey } from "./Model/Survey";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route } from "./Model/Route";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface IState {
  surveys: Array<Survey>;
}

const SurveyListComp = () => {
  const [state, setState] = useState<IState>();
  const baseApiRoute: Route = new Route();
  const surveyRoute: string = baseApiRoute.getBaseRuta() + "survey/mine";
  const token = localStorage.getItem("token") as string;
  const navigate = useNavigate();
  useEffect(() => {
    let headers = {
      headers: {
        'Authorization': token,
      }
    };
    let fetchMyAPI = async () => {
      await axios.get(surveyRoute, headers).then((s) => {
        let surveys = s.data.survey as Array<Survey>;
        setState({ surveys: surveys });
      }).catch(err => navigate("/login"));
    };
    fetchMyAPI();
  }, []);
  const hola=()=>{
      console.log("hola");
  }

  const deleteSurvey = async (index:number, survey_id:number) =>{
    let headers = {
        headers: {
         'Authorization': token,
        }
      };
    await Swal.fire({
        title: "Are you sure?",
        showDenyButton: true,
        confirmButtonText: "Yes"
      }).then((res) => {
        if (res.isConfirmed) {
            const surveyDeleteRoute: string = baseApiRoute.getBaseRuta() + "survey/delete/"+survey_id;
            axios.post(surveyDeleteRoute, null,headers).then((c)=>{{
                let updateObj:IState = state as IState;
                updateObj.surveys.splice(index,1);
                setState({surveys: updateObj.surveys});
                successMessage("Deleted","Succesfuly deleted");
            }}).catch(err=>errorMessage("Whoops!","Something went wrong"));
        }
      });
    
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
    <div className="row m-0">
        <div className="col-12">
      <h2 className="mb-4 mt-4" style={{display: 'inline-block'}}>Your <span style={{color: "#d36b2ad5"}}>Surveys</span></h2>
        <a
          href="/survey/create"
          className="btn btn-outline-primary mb-4 mt-4"
          style={{ float: "right",display: 'inline-block' }}
        >
          Add New Survey 
        </a></div>
      {state?.surveys?.map((s,i) => {
        if (state?.surveys.length > 1) {
          return (
            <div key={s.survey_id+"-surComp-"+i} className="col-6 surveyFromDash">
              <div className="card mt-3" style={{borderLeft: '2px solid #d48e63d5', }}>
                <div className="card-body">
                Name:<b> <span onClick={hola} style={{ cursor: 'pointer' }} className="hoverBlack" >{s.survey_name}</span> </b>  <span  style={{ float: "right" }}><b><span style={{color: "#d36b2ad5"}}>{s.active==1?"A":"Ina"}ctive</span></b> </span>
                    <hr />
                  Created: {s.date_created}
                  <span style={{ float: "right" }}>
                
                 
                  <button
                    className="btn btn-block btn-outline-secondary"
                    onClick={()=>{deleteSurvey(i,s.survey_id)}}
                  >
                    <i className="fa fa-trash"></i>
                  </button></span>
                </div>
              </div>
            </div>
          );
        }else{
            <div className="col-12 surveyFromDash">
            <div className="card mt-3" style={{borderLeft: '2px solid #d48e63d5', cursor: 'pointer'}} >
              <div className="card-body">
              Name:<b> {s.survey_name} </b>  <span style={{ float: "right" }}><b><span style={{color: "#d36b2ad5"}}>{s.active==1?"A":"Ina"}ctive</span></b> </span>
                  <hr />
                Created: {s.date_created}
                <span style={{ float: "right" }}>
              
               
                <button
                  className="btn btn-block btn-outline-secondary"
                 
                >
                  <i className="fa fa-trash"></i>
                </button></span>
              </div>
            </div>
          </div>
        }
      })}
      
    </div>
  );
};

export default SurveyListComp;
