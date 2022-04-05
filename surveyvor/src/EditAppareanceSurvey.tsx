import React, { useState, useEffect } from "react";
import { Privacy } from './Model/Privacy';
import { Route } from "./Model/Route";
import axios from "axios";
import { Survey } from "./Model/Survey";

interface IProps{
    survey: Survey;
    colorDetails:Function;
}

interface IState{
  allPrivacy:Array<Privacy>;
}

const EditAppareanceSurvey = (props:IProps) => {
  const [privacyState, setPrivacy] = useState<IState>();

  const baseApiRoute: Route = new Route();
  const privacyRoute: string = baseApiRoute.getBaseRuta() + "privacy/all";


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
    
        let inputBgColor: HTMLInputElement = form.backgroundColor;
        let inputColor: HTMLInputElement = form.buttonColor;
    
        let color: string = inputBgColor.value;
        let bgColor: string = inputColor.value;
        
        props.colorDetails(color, bgColor);

    }
    
  return (
    <form onSubmit={saveDetails}>
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
                            <input type="color" name="backgroundColor" className="form-control form-control-color" style={{width: "100%"}} id="exampleColorInput1"  title="Choose your color"/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleColorInput" className="form-label">Buttons' Color</label>
                            <input type="color" name="buttonColor" className="form-control form-control-color" style={{width: "100%"}} id="exampleColorInput2" title="Choose your color"/>
                        </div>
                        <div className="col-md-1">
            <button
              type="submit"
              className="btn btn-block btn-outline-primary mb-4 mt-3 float-rigth"
              style={{ width: "100%" }}
            >
              Done
            </button>
          </div>
                  </div>

                  
                </div>
    </form>
  );
};

export default EditAppareanceSurvey;
