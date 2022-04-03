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
import DefinedAnswerMakerComp from "./DefinedAnswersComp";
import { DefinedAnswer } from "./Model/DefinedAnswer";
import { NextQuestion } from "./Model/NextQuestion";

interface IQuestionMakerComp {
  question: Question;
  index: number;
  removeQuest: Function;
  questionArr: Array<Question>;
  nextQuestion: NextQuestion;
  saveQuestionDetails: Function;
  saveNextQuestion: Function;
  definedAnswer:DefinedAnswer;
  saveDefinedAnswer: Function;
  removeAnswerTypeComp: Function;
  addAnswerTypeComp: Function;
}

interface IState {
  allQuestionType: Array<QuestionType>;
  selectedType: number;
  definedAnswers: Array<DefinedAnswer>;
}

const QuestionMakerComp = (props: IQuestionMakerComp) => {
  const [questionTypes, setQuestionType] = useState<IState>();

  const baseApiRoute: Route = new Route();
  const questionTypeRoute: string =
    baseApiRoute.getBaseRuta() + "questionType/all";

  useEffect(() => {
    let headers = {
      headers: {
        Authorization: localStorage.getItem("token") as string,
      },
    };

    async function fetchMyAPI() {
      let answer = await axios.get(questionTypeRoute, headers);
      let quesType = answer.data.questionType;
      let idqt = questionTypes?.selectedType;
      if (!idqt) {
        idqt = 1;
      }
      const suuid = uuid();
      const bigIntValue: BigInt = BigInt("0x" + suuid.replace(/-/g, ""));
      setQuestionType({
        allQuestionType: quesType,
        selectedType: idqt,
        definedAnswers: [
          {
            defined_answer_id: Number(bigIntValue),
            question_id: 0,
            defined_answer_text: "",
          },
        ],
      });
    }
    fetchMyAPI();
  }, []);

  const changeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let stateObj: IState = Object.assign([], questionTypes);
    const i = e.currentTarget.getAttribute('data-index');
    setQuestionType({
      allQuestionType: stateObj?.allQuestionType,
      selectedType: Number(e.target.value),
      definedAnswers: stateObj.definedAnswers,
    });
    props.question.question_type_id = Number(e.target.value);
    props.saveQuestionDetails(i,props.question);
  };

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

 const addAnswerTypeComp = () => {
    const suuid = uuid();
    const bigIntValue: BigInt = BigInt("0x" + suuid.replace(/-/g, ""));
    let stateObj: IState = Object.assign([], questionTypes);
    setQuestionType({
      allQuestionType: stateObj.allQuestionType,
      selectedType: stateObj.selectedType,
      definedAnswers: [
        ...stateObj?.definedAnswers,
        {
          defined_answer_id: Number(bigIntValue),
          question_id: 0,
          defined_answer_text: "",
        },
      ],
    });

    props.addAnswerTypeComp(Number(bigIntValue));
  };

  const removeAnswerTypeComp = (index: number) => {
    let stateObj: IState = Object.assign([], questionTypes);

    let defAnswers = [...(stateObj?.definedAnswers as Array<DefinedAnswer>)];
    defAnswers.splice(index, 1);

    setQuestionType({
      allQuestionType: stateObj.allQuestionType,
      selectedType: stateObj.selectedType,
      definedAnswers: defAnswers,
    });
    props.addAnswerTypeComp(index);
  };

  const saveDefinedDetails = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let stateObj: IState = Object.assign([], questionTypes);
    let text = e.target.value;
    let objDA = stateObj.definedAnswers;
    objDA[index].defined_answer_text = text;
    objDA[index].defined_answer_id = props.index-1;
    console.log(props.index);
    setQuestionType({
      allQuestionType: stateObj.allQuestionType,
      selectedType: stateObj.selectedType,
      definedAnswers: objDA,
    });
    props.saveDefinedAnswer(index,objDA[index]);
    props.nextQuestion.defined_answer_id = index;
    props.saveNextQuestion(props.index-1,props.nextQuestion);
  };


  const saveQuestionPerInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const i = e.currentTarget.getAttribute('data-index');
    const field = e.currentTarget.getAttribute('data-field');
    switch(field){
      case 'question_text':
        props.question.question_text = e.target.value;
      break;
      case 'sequence_number':
        props.question.sequence_number = Number(e.target.value);
      break;
      case 'required':
        props.question.required = e.target.value=="on"?1:0;
      break;
    }
    
    props.saveQuestionDetails(i,props.question);
  }

  const saveNextQuest = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    const i = e.currentTarget.getAttribute('data-index');
    props.nextQuestion.question_id = Number(e.target.value);
    props.saveNextQuestion(i,props.nextQuestion);
  }


  return (
    <div className="pr-5 pl-5 pt-5">
      <div className="card col-md-12 col-xs-12 p-5">
        <div className="row mb-3">
          <div className="col-11">
            <h5 className="" style={{ color: "gray" }}>
              Question Nº {props.index}
            </h5>
          </div>
          <div className="col-1">
            <button
              type="button"
              style={{ width: "100%" }}
              className="btn btn-outline-primary"
              onClick={() => props.removeQuest(props.index)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
        <div className="form-floating mb-4 ">
          <input
            type="text"
            className="form-control"
            id="floatingQuestionText"
            placeholder="Survey name"
            name="name"
            data-index={props.index}
            data-field="question_text"
            onChange={saveQuestionPerInput}
            defaultValue={props.question.question_text}
          />
          <label htmlFor="floatingQuestionText">Question Text</label>
        </div>
        <div className="form-floating mb-3">
          <select
            onChange={changeType}
            className="form-control"
            name="questionType"
            id="questionType"
            data-index={props.index}
            data-field="question_type"
          >
            {questionTypes?.allQuestionType.map((a, i) => {
              return (
                <option
                  key={a.question_type_id + "-opt"}
                  value={a.question_type_id}
                >
                  {a.question_type_text}
                </option>
              );
            })}
          </select>
          <label htmlFor="questionType">Type Of Question</label>
        </div>
        <div>
          <p style={{ color: "gray" }}>
            <i>Preview:</i>
          </p>
          <div className="form-floating mb-4">
            <QuestionByTypeMakerComp
              key={props.question.question_id + "-questType"}
              idTypeComp={props.question.question_id}
              questionType={questionTypes?.selectedType as number}
            />
          </div>
        </div>
        <div>
          <DefinedAnswerMakerComp
            saveDetails={saveDefinedDetails}
            key={props.question.question_id + "definedAns"}
            definedAnswers={
              questionTypes?.definedAnswers as Array<DefinedAnswer>
            }
            question={props.question}
            removeAnswerTypeComp={removeAnswerTypeComp}
            addAnswerTypeComp={addAnswerTypeComp}
            selectedType={questionTypes?.selectedType as number}
          />
        </div>
        <div className="form-floating mb-3">
          <select
            className="form-control"
            name="nextQuestion"
            id="nextQuestion"
            data-index={props.index}
            data-field="next_question"
            onChange={saveNextQuest}
          >
            {props?.questionArr.map((a, i) => {
              if (
                a.question_id != props.question.question_id &&
                a.sequence_number > props.question.sequence_number
              ) {
                return (
                  <option key={a.question_id + "-opt-"+i} value={a.question_id}>
                    Question Nº {i + 1} - Seq. Nº {a.sequence_number}
                  </option>
                );
              }
            })}
          </select>
          <label htmlFor="nextQuestion">Next Question (Optional)</label>
        </div>

        <div className="form-floating mb-3">
          <select
            className="form-control"
            name="nextQuestion"
            id="nextQuestion"
          >
            {questionTypes?.definedAnswers?.map((a, i) => {
              return (
                <option
                  key={a.defined_answer_id + "-opt"+i}
                  value={a.defined_answer_id}
                >
                  {i} - {a.defined_answer_text}
                </option>
              );
            })}
          </select>
          <label htmlFor="nextQuestion">
            Next Question Trigger (Defined Answers){" "}
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            className="form-control"
            id="floatingSeq"
            placeholder="Description"
            name="description"
            data-index={props.index}
            data-field="sequence_number"
            defaultValue={props.question.sequence_number}
            onChange={saveQuestionPerInput}
          />
          <label htmlFor="floatingSeq">Sequence Number</label>
        </div>

        <div className="form-check form-switch mt-3">
          <input
            className="form-check-input"
            style={{ height: "20px" }}
            type="checkbox"
            role="switch"
            id="switchRequired"
            data-index={props.index}
            data-field="required"
            onChange={saveQuestionPerInput}
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
