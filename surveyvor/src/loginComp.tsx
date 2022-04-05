import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Country } from "./Model/Country";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const LoginComp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  })
  const loginProcess = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    

    const baseApiRoute: Route = new Route();
    const registerRoute: string = baseApiRoute.getBaseRuta() + "auth/login";
    let formulario: HTMLFormElement = event.currentTarget;

    let inputEmail: HTMLInputElement = formulario.email;
    let inputPassword: HTMLInputElement = formulario.password;

    let email: string = inputEmail.value;
    let password: string = inputPassword.value;

    let userLogged = {
      email: email,
      password: password,
    };

    try {
      const { data } = await axios.post(registerRoute, userLogged);
      localStorage.clear();
      localStorage.setItem("token", data.token_type+" "+data.access_token);
      successMessage("Succesfuly logged", "");
      navigate("/");
    } catch (error) {
      errorMessage("Whoops", "It looks like you have used wrong credentials");
    }
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
      <div className="row justify-content-center m-0 bodyColor">
        <div className="card col-md-4 col-xs-12 mt-5 mb-5">
          <div style={{ textAlign: "center" }}>
            <img
              className="card-img-top mt-4"
              src="https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv1.png"
              alt="Card image cap"
              style={{ width: "50%" }}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Sign In</h5>
            <form onSubmit={loginProcess}>
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

              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="btn btn-block btn-outline-primary mb-4 mt-4"
                  style={{ width: "100%", height: "50px" }}
                >
                  Sign In
                </button>
              </div>

              <div className="text-center">
                <p>
                  Not a member? <a href="./register">Register</a>
                </p>
                <p>or sign up with:</p>
                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fa fa-facebook-f"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fa fa-google"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fa fa-twitter"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fa fa-github"></i>
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
