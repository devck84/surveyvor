import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Country } from "./Model/Country";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import Swal from "sweetalert2";
import { Question } from "./Model/Question";
import { QuestionType } from "./Model/QuestionType";
import QuestionByTypeMakerComp from "./QuestionCompByType";
import { DefinedAnswer } from "./Model/DefinedAnswer";



interface IQuestionMakerComp{
  definedAnswers: Array<DefinedAnswer>;
  question: Question;
  selectedType: number;
  addAnswerTypeComp: Function;
  removeAnswerTypeComp: Function;
  saveDetails: Function;
}

const DefinedAnswerMakerComp = (props: IQuestionMakerComp) => {

    const saveDetails = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const i = e.currentTarget.getAttribute('data-index');
        props.saveDetails(e, i);
    }
 
  if(props.selectedType==3){
      return (<>
      <hr />
        <p style={{color: "gray"}}>Define your answers</p>
        { props.definedAnswers.map((d,i)=>{
                    return(
                    <div className="row" key={d.defined_answer_id+"-answerField-"+i}>
        <div className="col-md-11" key={d.defined_answer_id+'-div'}>
        <div className="form-floating mb-3" key={d.defined_answer_id+'-form'}>
            
                        <input
                        key={d.defined_answer_id+'-input-'+i}
                        data-index={i}
                        type="text"
                        className="form-control"
                        id={"floating-"+d.defined_answer_id+'-field'}
                        placeholder="text"
                        name={d.defined_answer_id+'-field'}
                        onChange={saveDetails}
                    
                    />
                    <label htmlFor={"floating-"+d.defined_answer_id+'-field'}>Answer Nº {i+1}</label>
                    
                    
               
                </div>
                </div>
                <div className="col-md-1" key={d.defined_answer_id+'-input'}>
                <button
                onClick={()=>{props.removeAnswerTypeComp(i)}}
              type="button"
              key={d.defined_answer_id+'-button-'+i}
              className="btn btn-block btn-outline-success mb-4 mt-0 float-rigth"
              style={{ width: "100%", height: "58px"}}
            >
               <i className="fa fa-trash"></i>
            </button>
               </div></div> );
            })
                
                }
                
                <div className="col-md-2">
            <button onClick={()=>{props.addAnswerTypeComp()}}
              type="submit"
              className="btn btn-block btn-outline-success mb-4 mt-1 float-rigth"
              style={{ width: "100%" }}
            >
              Add Defined Answer
            </button>
          </div>
          <hr />
        </>
        );
    }else{
        return (<></>);
    }
};

export default DefinedAnswerMakerComp;
