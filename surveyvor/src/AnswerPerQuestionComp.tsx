import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AnswerTypeComp from "./AnswerTypeComp";
import { DefinedAnswer } from "./Model/DefinedAnswer";
import { NextQuestion } from "./Model/NextQuestion";
import { Question } from "./Model/Question";
import { Route } from "./Model/Route";
import { Survey } from "./Model/Survey";
import { UserAnswer } from "./Model/UserAnswer";

interface IProps{
    questions: Array<Question>;
    survey: Survey;
    definedAnswers: Array<DefinedAnswer>;
    userId: number|null;
    nextQuestions: Array<NextQuestion>;
}

interface IState{
    answers: UserAnswer;
    currentQuestion: number;
    definedAnswers: Array<DefinedAnswer>;
}

const AnswerPerQuestionComp = (props:IProps)=>{
    const navigate = useNavigate();
    const [state, setState] = useState<IState>();
    const token = localStorage.getItem("token") as string;
    useEffect(() => {
        setState({answers:
            {user_answer_id:0,
                survey_id:props.survey.survey_id,
                question_id: props.questions[0].question_id, user_id: props.userId,
                defined_answer_id:null, survey_answer_text:""
            },currentQuestion:1, definedAnswers: props.definedAnswers});
    },[]);

    const saveAnswerDetails = (answer:UserAnswer) =>{
        let stateObj:IState = state as IState;
       
        stateObj.answers.survey_answer_text = answer.survey_answer_text;
        stateObj.answers.defined_answer_id = answer.defined_answer_id; 
        setState(stateObj);
    }

    const saveAnswerPerQuestion = async () =>{
        if(state?.answers.survey_answer_text){
            const baseApiRoute: Route = new Route();
            const answerRoute: string = baseApiRoute.getBaseRuta() + "userAnswer/save";
            let headers = {
                headers: {
                'Authorization': token,
                }
            };
            await axios.post(answerRoute, state?.answers, headers).then((d)=>{
                successMessage("Saved","");
            });
        }else if(props.questions[Number(state?.currentQuestion)-1].required==0){

        }else{
            errorMessage("Whoops!","This question is required, please finish it to continue");
            return;
        }

        if((Number(state?.currentQuestion)) >= props.questions.length){
            navigate("/thankyou");
            return;
        }
        let stateObj:IState = state as IState;
        stateObj.currentQuestion = stateObj.currentQuestion+1;
        let nqid = props.questions[stateObj.currentQuestion-2].next_question_id;
        if(nqid){
            let index = props.nextQuestions.findIndex(obj => obj.next_question_id == nqid);
            if(props.nextQuestions[index].defined_answer_id==state?.answers.defined_answer_id){
                let qindex = props.questions.findIndex(obj => obj.question_id == props.nextQuestions[index].question_id);
                stateObj.currentQuestion = qindex+1;
            } 
        }

        
        stateObj.answers = {user_answer_id:0,
            survey_id:props.survey.survey_id,
            question_id: props.questions[stateObj.currentQuestion-1].question_id, user_id: props.userId,
            defined_answer_id:null, survey_answer_text:""
        };
        setState({answers:stateObj.answers,currentQuestion:stateObj.currentQuestion, definedAnswers: stateObj.definedAnswers});
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

    if(state?.currentQuestion){
    return(<>
        <div className="row justify-content-center m-0" style={{transition: "all 2s", height:"93.2vh",backgroundColor: props.survey.background_color == null ||  props.survey.background_color.length === 0 ? "rgb(235, 238, 249)" :  props.survey.background_color as string }}>
        <div className="card col-md-4 col-xs-12 mt-5" style={{flex: "inherit", marginBottom: "25%", opacity: .9}} >
      
        <div className="card-body" style={{flex: "inherit"}} >
            <h4 style={{color: "gray"}}>{props?.survey.survey_name}</h4>
            <hr />
            <h3>{props.questions[state?.currentQuestion-1 as number].question_text}</h3>
            <div className="form-floating mb-4 mt-4">
               <AnswerTypeComp saveAnswerDetails={saveAnswerDetails} answer={state.answers} definedAnswers={state?.definedAnswers} questionId={props.questions[state?.currentQuestion-1].question_id} key={props.questions[state?.currentQuestion-1].question_id + "-questType"} questionType={Number(props.questions[state?.currentQuestion-1].question_type_id)} surveyId={props.survey.survey_id} userId={props.userId} />
         
          </div>
           
        </div>
        <div style={{ textAlign: "center" }}>
                <button
                type="submit"
                className="btn btn-block btn-outline-primary mt-5 mb-4"
                style={{ width: "50%", height: "50px", backgroundColor: "#fff", color: props.survey.button_color as string, borderColor: props.survey.button_color as string}}
                onClick={saveAnswerPerQuestion}
                >
                Next Question <i style={{ float: "right" }} className="fa fa-arrow-right mt-1 me-2"></i>
                </button>
            </div>
        </div>
    </div></>);
    }else{
        return(<>loading</>);
    }
    
}

export default AnswerPerQuestionComp;