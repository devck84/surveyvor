import axios from "axios";
import React, { useState, useEffect } from "react";
import { Team } from "./Model/Team";
import Swal from "sweetalert2";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import { useNavigate } from "react-router-dom";



const CreateTeamComp = () =>{
    const token = localStorage.getItem("token") as string;
    const navigate = useNavigate();
    
    const createNewTeam = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();

    let form: HTMLFormElement = event.currentTarget;

    let inputName: HTMLInputElement = form.team_name;
    let inputDescription: HTMLInputElement = form.team_description;

    let name: string = inputName.value;
    let description: string = inputDescription.value;

    const baseApiRoute: Route = new Route();
      const token = localStorage.getItem("token") as string;
      const teamSaveRoute: string = baseApiRoute.getBaseRuta() + "team/save";
      const teamMemberSaveRoute: string = baseApiRoute.getBaseRuta() + "teamMember/save";

    let newTeam:Team = {team_id:0, team_name: name, team_description: description, team_url_invitation: ""};
    let headers = {
        headers: {
            'Authorization': token
        }
    }
    axios.post(teamSaveRoute, newTeam,headers).then((c)=>{
        axios.post(teamMemberSaveRoute, {team_id: (c.data.team as Team).team_id},headers).then((c)=>{
            successMessage("Team Created","");
                    navigate("/");
        })
        
    }).catch(err=>{errorMessage("Whoops!","Something went wrong");});
    
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
    return(<><form onSubmit={createNewTeam} key="teamCreation">
        <div className="row justify-content-center m-0 mt-5">
          <div className="col-md-9" style={{ color: "#363636" }}>
            <h2>
              Create a <span style={{ color: "#d36b2ad5" }}>New Team</span>
            </h2>
          </div>
          <div className="col-md-1">
            <button
              type="submit"
              className="btn btn-block btn-outline-primary mb-4 mt-4 float-rigth"
              style={{ width: "100%" }}
              onClick={()=>{}}
            >
              Save Team
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
                
              </div>
              <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
        <div className="p-5">
        <div className="form-floating mb-4">
            <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Team name"
            name="team_name"
            required
            />
            <label htmlFor="floatingInput">Team Name</label>
        </div>
        <div className="form-floating mb-4">
            <textarea
            className="form-control"
            id="floatingDesc"
            placeholder="Description"
            name="team_description"
            required
            ></textarea>
            <label htmlFor="floatingDesc">Team Description</label>
        </div>
        </div>
              </div>
              </div>
            </nav>
            </div>
            </div></form>
    </>);
}

export default CreateTeamComp;