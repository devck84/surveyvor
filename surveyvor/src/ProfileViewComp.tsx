import { Survey } from "./Model/Survey";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route } from "./Model/Route";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { User } from "./Model/User";
import { Country } from "./Model/Country";

interface IState{
    user: User;
    countries:Array<Country>;
}
const ProfileViewComp = () =>{
    const [state, setState] = useState<IState>();
    const baseApiRoute: Route = new Route();
  const meRoute: string = baseApiRoute.getBaseRuta() + "auth/me";
  const token = localStorage.getItem("token") as string;
  const navigate = useNavigate();
  useEffect(() => {
    let headers = {
      headers: {
        'Authorization': token,
      }
    };
    let fetchMyAPI = async () => { 
     const apiRoute: Route = new Route({
        base: "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json",
      });
      const countryRoute: string = apiRoute.getBaseRuta();
      let respuesta = await axios.get(countryRoute);
      await axios.get(meRoute, headers).then((s) => {
        let userd = s.data as User;
        setState({ user: userd, countries:respuesta.data });
        console.log(userd.country_code);
      }).catch(err => navigate("/login"));

     
    };
    fetchMyAPI();
  }, []);
  const editRegister = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const baseApiRoute: Route = new Route();
    const registerRoute: string = baseApiRoute.getBaseRuta() + "auth/update/"+state?.user.user_id;
    let formulario: HTMLFormElement = event.currentTarget;

    let inputFirstName: HTMLInputElement = formulario.firstName;
    let inputFamilyName: HTMLInputElement = formulario.familyName;
    let inputAvatar: HTMLInputElement = formulario.avatar;
    let inputTel: HTMLInputElement = formulario.telephone;
    let inputCountry: HTMLInputElement = formulario.countryCode;

    let firstName: string = inputFirstName.value;
    let familyName: string = inputFamilyName.value;
    let avatar: string = inputAvatar.value;
    
    let tel: number = parseInt(inputTel.value);
    let country: string = inputCountry.value;
    let newUser = {
        first_name: firstName,
        family_name: familyName,
        telephone: tel,
        avatar: avatar,
        country_code: country
    };
    console.log(newUser);
    let headers = {
        headers: {
          'Authorization': token
        }
    }
        axios.post(registerRoute, newUser,headers).then(res => {
        successMessage("Succesfuly saved","");
    })
    .catch(err => {
        if (err.response) {
            errorMessage("Whoops","Try again in a few minutes please");
        }else {
            console.log(err);
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

  
    return(<><form onSubmit={editRegister}>
        <div className="row m-0">
        
        <div className="col-12">
        <h2 className="mb-4 mt-4" style={{display: 'inline-block'}}>Your <span style={{color: "#d36b2ad5"}}>Profile</span></h2>
            
        </div>
        
        <div className="col-6">
        <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputFirstName"
                  placeholder="Name"
                  name="firstName"
                  defaultValue={state?.user.first_name}
                />
                <label htmlFor="floatingInputFirstName">First Name</label>
              </div>
        </div>
        <div className="col-6">
        <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputFamilyName"
                  placeholder="Name"
                  name="familyName"
                  defaultValue={state?.user.family_name}
                />
                <label htmlFor="floatingInputFamilyName">Family Name</label>
              </div>
        </div>
        <div className="col-6">
        <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  defaultValue={state?.user.email}
                  name="email"
                  disabled
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
        </div>
        <div className="col-6">
        <div className="form-floating">
                <select className="form-control" id="floatingCountry"  name="countryCode">
                {state?.countries.map((a, i) => {
                    if(a.code!=state.user.country_code){
                    return (
                      <option value={a.code}>
                        {a.dial_code} {a.name}
                      </option>
                    );}else{
                        return (
                            <option value={a.code} selected>
                              {a.dial_code} {a.name}
                            </option>);
                    }
                  })}
                </select>
                <label htmlFor="floatingCountry">Country</label>
              </div>
        </div>
        <div className="col-6">
        <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInputTelephone"
                  placeholder="1234567"
                  name="telephone"
                  defaultValue={ state?.user.telephone ? state?.user.telephone:""}
                />
                <label htmlFor="floatingInputTelephone">Telephone</label>
              </div>
        </div>
        <div className="col-6">
        <div className="form-floating">
                <input
                  type="url"
                  className="form-control"
                  id="floatingInputAvatar"
                  placeholder="https://img.com/img.png"
                  name="avatar"
                  defaultValue={ state?.user.avatar ? state?.user.avatar:""}
                />
                <label htmlFor="floatingInputAvatar">Avatar URL</label>
              </div>

        </div>
        <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="btn btn-block btn-outline-primary mb-4 mt-4"
                  style={{ width: "100%", height: "50px" }}
                >
                  Save Changes
                </button>
              </div>
        </div></form>
    </>);
}

export default ProfileViewComp;