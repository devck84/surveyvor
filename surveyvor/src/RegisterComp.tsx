import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import { Country } from "./Model/Country";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import Swal from "sweetalert2";

interface IState {
  country: Array<Country>;
}
const LoginComp = () => {
  const [country, setCountry] = useState<IState>();
  const apiRoute: Route = new Route({
    base: "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json",
  });
  const countryRoute: string = apiRoute.getBaseRuta();

  useEffect(() => {
    async function fetchMyAPI() {
      let respuesta = await axios.get(countryRoute);
      setCountry({ country: respuesta.data });
    }
    fetchMyAPI();
  }, []);

  const createRegister = (event: React.FormEvent<HTMLFormElement>) => {
      
    event.preventDefault();

    const baseApiRoute: Route = new Route();
    const registerRoute: string = baseApiRoute.getBaseRuta() + "auth/register";
    let formulario: HTMLFormElement = event.currentTarget;

    let inputFirstName: HTMLInputElement = formulario.firstName;
    let inputFamilyName: HTMLInputElement = formulario.familyName;
    let inputEmail: HTMLInputElement = formulario.email;
    let inputAvatar: HTMLInputElement = formulario.avatar;
    let inputTel: HTMLInputElement = formulario.telephone;
    let inputCountry: HTMLInputElement = formulario.countryCode;
    let inputPassword: HTMLInputElement = formulario.password;

    let firstName: string = inputFirstName.value;
    let familyName: string = inputFamilyName.value;
    let email: string = inputEmail.value;
    let avatar: string = inputAvatar.value;
    
    let tel: number = parseInt(inputTel.value);
    let country: string = inputCountry.value;
    let password: string = inputPassword.value;
    let newUser:User = {
        user_id: 0,
        email: email,
        first_name: firstName,
        family_name: familyName,
        telephone: tel,
        avatar: avatar,
        country_code: country,
        password: password
    };
        axios.post(registerRoute, newUser).then(res => {
        successMessage("Succesfuly save","");
    })
    .catch(err => {
        if (err.response) {
            errorMessage("Whoops","It looks like your email is already being used");
        }else {
            console.log(err);
        }
    });
  };
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
      <div className="row justify-content-center m-0 bodyColor">
        <div className="card col-md-4 col-xs-12 mt-3 mb-5">
          <div style={{ textAlign: "center" }}>
            <img
              className="card-img-top mt-4"
              src="https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv1.png"
              alt="Card image cap"
              style={{ width: "50%" }}
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">Sign Up</h4>
            <form onSubmit={createRegister}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputFirstName"
                  placeholder="Name"
                  name="firstName"
                />
                <label htmlFor="floatingInputFirstName">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputFamilyName"
                  placeholder="Name"
                  name="familyName"
                />
                <label htmlFor="floatingInputFamilyName">Family Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="form-floating">
                <select className="form-control mt-3" id="floatingCountry"  name="countryCode">
                  {country?.country.map((a, i) => {
                    return (
                      <option value={a.code}>
                        {a.dial_code} {a.name}{" "}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floatingCountry">Country</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInputTelephone"
                  placeholder="1234567"
                  name="telephone"
                />
                <label htmlFor="floatingInputTelephone">Telephone</label>
              </div>

              <div className="form-floating mt-3">
                <input
                  type="url"
                  className="form-control"
                  id="floatingInputAvatar"
                  placeholder="https://img.com/img.png"
                  name="avatar"
                />
                <label htmlFor="floatingInputAvatar">Avatar URL</label>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="btn btn-block btn-outline-primary mb-4 mt-4"
                  style={{ width: "100%", height: "50px" }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComp;
