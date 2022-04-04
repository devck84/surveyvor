import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Country } from "./Model/Country";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import Swal from "sweetalert2";
import QuestionMakerComp from "./QuestionMakerComp";
import SurveyDetailsComp from "./SurveyDetailsComp";
import { Survey } from "./Model/Survey";
import AppareanceSurveyComp from "./AppareanceSurvey";
import { Question } from "./Model/Question";
import { useNavigate } from 'react-router-dom';
import { NextQuestion } from "./Model/NextQuestion";
import { DefinedAnswer } from "./Model/DefinedAnswer";

interface IState {
    survey: Survey;
    questions: Array<Question>;
    nextQuestions: Array<NextQuestion>;
    definedAnswers: Array<DefinedAnswer>;
}
const CreateSurveyComp = () => {
    const [surveyObj, setSurvey] = useState<IState>();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") as string;

    function fetchMyAPI(headers:any) {
      const baseApiRoute: Route = new Route();
      const meRoute: string = baseApiRoute.getBaseRuta() + "auth/me";
          axios.get(meRoute, headers).
          catch(err => {
            navigate("/login");
          });
        }
    

    useEffect(() => {
      setSurvey({survey: new Survey(
        {survey_id: 0, team_id: null, privacy_id: 0, user_id: 0, survey_name: "", survey_description: null, button_color: null, background_color: null,
        date_created: "", active: 1}), questions:[{
          question_id: 0,
          survey_id: 0,
          next_question_id: null,
          question_text: "",
          question_type_id: 0,
          required: 0,
          sequence_number: 1,
        }],nextQuestions:[{next_question_id:0,defined_answer_id:0,question_id:0}],definedAnswers:[{defined_answer_id:0, defined_answer_text:"", question_id:0}]});
        if(token){
          let headers = {
            headers: {
                'Authorization': token
            }
        }
          fetchMyAPI(headers);
        }else{
          navigate("/login");
        }
    },[]);

    function uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    const addQuestionComp = () =>{
      let surveyDetails:IState = surveyObj as IState;
      const suuid = uuid();
      const bigIntValue:BigInt = BigInt(
          "0x" + suuid.replace(/-/g, "")
      );

      setSurvey({survey: surveyDetails.survey, questions: [...surveyDetails.questions,{
        question_id: Number(bigIntValue),
        survey_id: 0,
        next_question_id: null,
        question_text: "",
        question_type_id: 1,
        required: 0,
        sequence_number: surveyDetails.questions.length+1,
      }],nextQuestions:[...surveyDetails.nextQuestions,{next_question_id:0,defined_answer_id:null,question_id:null}],definedAnswers:[...surveyDetails.definedAnswers,{defined_answer_id:0, defined_answer_text:"", question_id:0}]});
    }

    const saveQuestionDetails = (index:number, question:Question) =>{
      let stateObj:IState = Object.assign([], surveyObj);
      index = index-1;
      stateObj.questions[index].question_text = question.question_text;
      stateObj.questions[index].question_type_id = question.question_type_id;
      stateObj.questions[index].required = question.required;
      stateObj.questions[index].next_question_id = question.next_question_id;
      stateObj.questions[index].sequence_number = question.sequence_number;
      console.log(stateObj.questions[index]);
      setSurvey(stateObj);
    }
    
    const removeQuestionComp = (index:number) =>{
      let surveyDetails:IState = Object.assign([], surveyObj);
      surveyDetails.questions.splice(index-1,1);
     
      setSurvey(surveyDetails); 
    }

    const saveDetails = (survey_name:string, survey_description:string, privacy_id:number, active:number) =>{
        let surveyDetails:IState = surveyObj as IState;
        surveyDetails.survey.survey_name = survey_name;
        surveyDetails.survey.survey_description = survey_description;
        surveyDetails.survey.privacy_id = privacy_id;
        surveyDetails.survey.active = active;
        setSurvey(surveyDetails);
        successMessage("Survey Details Saved","");
    }

    const saveColorDetails = (background_color:string, button_color:string) =>{
      let surveyDetails:IState = surveyObj as IState;
      surveyDetails.survey.background_color = background_color;
      surveyDetails.survey.button_color = button_color;
      setSurvey(surveyDetails);
      successMessage("Survey Preferences Saved","");
  }

  const saveNextQuestion = (i:number,nextQuestion:NextQuestion) =>{
     let surveyDetails:IState = surveyObj as IState;
     surveyDetails.nextQuestions[i].defined_answer_id = nextQuestion.defined_answer_id;
     surveyDetails.nextQuestions[i].next_question_id = nextQuestion.next_question_id;
     surveyDetails.nextQuestions[i].question_id = nextQuestion.question_id;
     setSurvey(surveyDetails);
  }

  const addAnswerTypeComp = (id:number) => {
    let surveyDetails:IState = surveyObj as IState;
    surveyDetails.definedAnswers = [
      ...surveyDetails?.definedAnswers,
      {
        defined_answer_id: id,
        question_id: 0,
        defined_answer_text: "",
      },
    ];
    setSurvey(surveyDetails);
  };

  const removeAnswerTypeComp = (index: number) => {
    let surveyDetails:IState = surveyObj as IState;
    surveyDetails.definedAnswers.splice(index, 1);

    setSurvey(surveyDetails);
  };

  const saveDefinedAnswer = (i:number,definedAnswer:DefinedAnswer) =>{
    let surveyDetails:IState = surveyObj as IState;
    surveyDetails.definedAnswers[i].defined_answer_id = definedAnswer.defined_answer_id;
    surveyDetails.definedAnswers[i].defined_answer_text = definedAnswer.defined_answer_text;
    surveyDetails.definedAnswers[i].question_id = definedAnswer.question_id;
    setSurvey(surveyDetails);
 }

  const saveWholeSurvey = async () =>{
    let surveyDetails:IState = surveyObj as IState;
    const baseApiRoute: Route = new Route();
      const survRoute: string = baseApiRoute.getBaseRuta() + "survey/save";
      const questRoute: string = baseApiRoute.getBaseRuta() + "question/save";
      const defRoute: string = baseApiRoute.getBaseRuta() + "definedAnswer/save";
      const nextQuestRoute: string = baseApiRoute.getBaseRuta() + "nextQuestion/save";

      let headers = {
        headers: {
            'Authorization': token
        }
      };
  let oldQuestions = surveyDetails.questions;
     if(surveyDetails.survey.survey_name.length<1){
        errorMessage("Whoops!", "Have you finish the survey details? Remember to press done whenever you finish it");
        return
      }

      await axios.post(survRoute, surveyObj?.survey,headers)
        .then(response => {
          surveyDetails.survey = response.data.survey as Survey;
          setSurvey(surveyDetails);
        });
        
      for (var i = 0; i < surveyDetails.questions.length; i++) {
        surveyDetails.questions[i].survey_id = surveyDetails.survey.survey_id;
        if(!surveyDetails.questions[i].question_text){
          errorMessage("Whoops","The question text is required");
          return;
        }
        await axios.post(questRoute,surveyDetails.questions[i],headers)
          .then(response => {
            surveyDetails.questions[i] = response.data.question as Question;
            setSurvey(surveyDetails);
          });
      }
     
      for (let i = 0; i < surveyDetails.definedAnswers.length; i++) {
        if(surveyDetails.definedAnswers[i].defined_answer_text.length>0){
          let pos = surveyDetails.definedAnswers[i].defined_answer_id;
          surveyDetails.definedAnswers[i].question_id = surveyDetails.questions[pos].question_id;
          await axios.post(defRoute,surveyDetails.definedAnswers[i],headers)
          .then(response => {
            surveyDetails.definedAnswers[i] = response.data.definedAnswer as DefinedAnswer;
            setSurvey(surveyDetails);
          });
        }
      }

      for (let i = 0; i < surveyDetails.nextQuestions.length; i++) {
        let pos = surveyDetails.nextQuestions[i].defined_answer_id;
        console.log(pos);
        if(pos){
          surveyDetails.nextQuestions[i].defined_answer_id = surveyDetails.definedAnswers[pos].defined_answer_id;
        
          let posq =surveyDetails.nextQuestions[i].question_id;
          console.log(posq+"-");
          if(posq!=null){
            surveyDetails.nextQuestions[i].question_id = surveyDetails.questions[posq].question_id;
            console.log(posq+"--");
            await axios.post(nextQuestRoute,surveyDetails.nextQuestions[i],headers)
            .then(response => {
              surveyDetails.nextQuestions[i] = response.data.nextQuestion as NextQuestion;
              setSurvey(surveyDetails);
            });
          }
        }

      }

      let questUpdRoute: string = baseApiRoute.getBaseRuta() + "question/update/";

      for (var i = 0; i < surveyDetails.questions.length; i++) {
        if(surveyDetails.nextQuestions[i].next_question_id){
        surveyDetails.questions[i].next_question_id = surveyDetails.nextQuestions[i].next_question_id;
        questUpdRoute = questUpdRoute+surveyDetails.questions[i].question_id;
        await axios.post(questUpdRoute,surveyDetails.questions[i],headers)
          .then(response => {
            surveyDetails.questions[i] = response.data.question as Question;
            setSurvey(surveyDetails);
          });}
      } 

    successMessage("Saved","Your survey have been succesfuly saved!");
    
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
    <>
      
        <div className="row justify-content-center m-0 mt-5">
          <div className="col-md-9" style={{ color: "#363636" }}>
            <h2>
              Create a <span style={{ color: "#d36b2ad5" }}>New Survey</span>
            </h2>
          </div>

          <div className="col-md-1">
            <button
              type="submit"
              className="btn btn-block btn-outline-primary mb-4 mt-4 float-rigth"
              style={{ width: "100%" }}
              onClick={saveWholeSurvey}
            >
              Save Survey
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
                <button
                  className="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Questions
                </button>
                <button
                  className="nav-link"
                  id="nav-contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contact"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  Appareance
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <SurveyDetailsComp survey={surveyObj?.survey as Survey} surveyDetails={saveDetails}/>
              </div>
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                {
                surveyObj?.questions.map((a,i) => {
                    return (
                      <QuestionMakerComp addAnswerTypeComp={addAnswerTypeComp} removeAnswerTypeComp={removeAnswerTypeComp} saveDefinedAnswer={saveDefinedAnswer} definedAnswer={surveyObj.definedAnswers[i]} nextQuestion={surveyObj.nextQuestions[i]} saveNextQuestion={saveNextQuestion} saveQuestionDetails={saveQuestionDetails} key={a.question_id} question={a} index={i+1} removeQuest={removeQuestionComp} questionArr={surveyObj?.questions}/>
                    );
                  })
                }
                <div className="col-md-1">
                  <button
                    type="submit"
                    className="btn btn-block btn-outline-secondary mb-4 mt-4 float-rigth"
                    style={{ width: "100%" }}
                    onClick={addQuestionComp}
                  >
                    Add Question
                  </button>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                  <AppareanceSurveyComp survey={surveyObj?.survey as Survey} colorDetails={saveColorDetails}/>

                  </div>
              
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default CreateSurveyComp;
