import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Country } from "./Model/Country";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import Swal from "sweetalert2";
import { Question } from "./Model/Question";
import { QuestionType } from "./Model/QuestionType";
import { DefinedAnswer } from "./Model/DefinedAnswer";
import { UserAnswer } from "./Model/UserAnswer";

interface IQuestionByTypeMakerComp {
  questionType: number;
  surveyId: number;
  userId: number|null;
  definedAnswers: Array<DefinedAnswer>;
  questionId:number;
  answer: UserAnswer;
  saveAnswerDetails: Function;
}

const AnswerTypeComp = (props: IQuestionByTypeMakerComp) => {

    const answerSaveObj = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        props.answer.defined_answer_id = Number(e.target.value);
        let index = props.definedAnswers.findIndex(obj => obj.defined_answer_id === Number(e.target.value));
        
        props.answer.survey_answer_text = props.definedAnswers[index].defined_answer_text;
        props.saveAnswerDetails(props.answer);
    }
    
    const answerSaveInputObj = (e: React.ChangeEvent<HTMLInputElement>) =>{
        props.answer.survey_answer_text = e.target.value;
        props.saveAnswerDetails(props.answer);
    }

    const answerSaveTAObj = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
        props.answer.survey_answer_text = e.target.value;
        props.saveAnswerDetails(props.answer);
    }

    switch(props.questionType){
        case 1:
            return (<>
                    <input
                    key={props.questionId+'-inputType1'}
                    type="text"
                    className="form-control"
                    id={"floating"+props.questionId+'-field'}
                    placeholder="text"
                    name={props.questionId+'-field'}
                    onChange={answerSaveInputObj}
                />
              </>
                );
        case 2:
            return (<>
            <textarea
            key={props.questionId+'-inputType2'}
            className="form-control"
            id={"floating"+props.questionId+'-field'}
            placeholder="Description"
            name={props.questionId+'-field'}
            onChange={answerSaveTAObj}
            ></textarea>
                </>
                );
        case 3:
            return (<>
                <select
                key={props.questionId+'-inputType3'}
                        className="form-control"
                        id={"floating"+props.questionId+'-field'}
                        placeholder="text"
                        name={props.questionId+'-field'}
                        onChange={answerSaveObj}
                    >
                        <option value="">Select from the list</option>
                        {
                            props.definedAnswers.map((d)=>{
                                if(d.question_id == props.questionId){
                                    return(<option value={d.defined_answer_id}>{d.defined_answer_text}</option>);
                                }
                            })
                        }
                    </select>
                </>
                );
        case 4:
            return (<>
                <input
                key={props.questionId+'-inputType4'}
                        type="date"
                        className="form-control"
                        id={"floating"+props.questionId+'-field'}
                        placeholder="text"
                        name={props.questionId+'-field'}
                        onChange={answerSaveInputObj}
                    />
                </>
                );
        case 5:
            return (<>
                <input
                key={props.questionId+'-inputType5'}
                        type="range"
                        className="form-range"
                        id={"floating"+props.questionId+'-field'}
                        placeholder="text"
                        name={props.questionId+'-field'}
                        onChange={answerSaveInputObj}
                    />
                </>
                );
        case 6:
            return (<>
                <input
                key={props.questionId+'-inputType6'}
                        type="email"
                        className="form-control"
                        id={"floating"+props.questionId+'-field'}
                        placeholder="text"
                        name={props.questionId+'-field'}
                        onChange={answerSaveInputObj}
                    />
                </>
                );
        case 7:
            return (<>
                <input
                key={props.questionId+'-inputType7'}
                        type="url"
                        className="form-control"
                        id={"floating"+props.questionId+'-field'}
                        placeholder="text"
                        name={props.questionId+'-field'}
                        onChange={answerSaveInputObj}
                    />
                </>
                );
        case 8:
            return (<>
                <input
                key={props.questionId+'-inputType8'}
                        type="tel"
                        className="form-control"
                        id={"floating"+props.questionId+'-field'}
                        placeholder="text"
                        name={props.questionId+'-field'}
                        onChange={answerSaveInputObj}
                    />
                </>
                );
        default:
            return (
                <></>
                );
    }
  
};

export default AnswerTypeComp;
