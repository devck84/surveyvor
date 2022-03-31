import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Country } from "./Model/Country";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import Swal from "sweetalert2";
import { Question } from "./Model/Question";

interface IQuestionMakerComp {
  question: Question;
  index: number;
}

/*question: {
    question_id: 0, survey_id: 0,  next_question_id: 0, question_text: "", question_type_id: 0, required: 0,   sequence_number: 0
},index:0}*/

const QuestionMakerComp = (props: IQuestionMakerComp) => {
  return (
    <div className="pr-5 pl-5 pt-5">
      <div className="card col-md-12 col-xs-12 p-5">
      <div className="row mb-3">
          <div className="col-11">
          <h5 className="" style={{ color: "gray"}}>Question Nº {props.question.sequence_number}</h5>
          </div>
          <div className="col-1"><button type="button" style={{ width: "100%"}}className="btn btn-outline-primary"><i className="fa fa-trash"></i></button></div>
            </div>
        <div className="form-floating mb-4 ">
          <input
            type="text"
            className="form-control"
            id="floatingQuestionText"
            placeholder="Survey name"
            name="name"
          />
          <label htmlFor="floatingQuestionText">Question Text</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            id="floatingDesc"
            placeholder="Description"
            name="description"
          ></textarea>
          <label htmlFor="floatingDesc">Description</label>
        </div>

        <div className="form-check form-switch mt-3">
          <input
            className="form-check-input"
            style={{ height: "20px" }}
            type="checkbox"
            role="switch"
            id="switchRequired"
          />
          <label
            className="form-check-label"
            style={{ color: "gray" }}
            htmlFor="switchRequired"
          >
            Required
          </label>
        </div>
      </div>
    </div>
  );
};

export default QuestionMakerComp;
