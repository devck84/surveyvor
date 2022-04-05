import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AnswerPerQuestionComp from './AnswerPerQuestionComp';
import { DefinedAnswer } from './Model/DefinedAnswer';
import { NextQuestion } from './Model/NextQuestion';
import { Question } from './Model/Question';
import { Route } from './Model/Route';
import { Survey } from './Model/Survey';
import { UserAnswer } from './Model/UserAnswer';

interface IState{
    survey: Survey;
    startedSurvey: boolean;
    questions: Array<Question>;
    definedAnswers: Array<DefinedAnswer>;
    userId: number|null;
    nextQuestions: Array<NextQuestion>;
}
const SurveyToAnswerComp = () =>{
    const { survey_id } = useParams();
    const [state, setState] = useState<IState>();
  const baseApiRoute: Route = new Route();
  const surveyRoute: string = baseApiRoute.getBaseRuta() + "survey/all/"+survey_id;
  const token = localStorage.getItem("token") as string;
  const navigate = useNavigate();
  useEffect(() => {
    let headers = {
      headers: {
        'Authorization': token,
      }
    };

    let fetchMyAPI = async () => {
        
      axios.get(surveyRoute, headers).then((s) => {
        let surveyd = s.data.survey as Survey;
        const questRoute: string = baseApiRoute.getBaseRuta() + "question/all/"+survey_id;
        let quests: Array<Question> = new Array<Question>();
        let fetchQuestions = async () =>{
            axios.get(questRoute, headers).then((s) => {
                quests = s.data.questions;
                let definedAnswers: Array<DefinedAnswer> = new Array<DefinedAnswer>();
                let fetchDefAnsw = async () =>{
                    const apiRoute: Route = new Route();
                const definedRoute: string = apiRoute.getBaseRuta()+"definedAnswer/all/"+survey_id;
                     axios.get(definedRoute, headers).then((d) => {
                        definedAnswers = d.data.definedAnswer;
                        let fetchNextQuest = async () =>{
                            const apiRoute: Route = new Route();
                        const nextQuestRoute: string = apiRoute.getBaseRuta()+"nextQuestion/all/"+survey_id;
                            await axios.get(nextQuestRoute, headers).then((d) => {
                                let nextQuestions = d.data.nextQuestion;
                                setState({ survey: surveyd, startedSurvey: false,  questions: quests, definedAnswers:definedAnswers, userId: 0,nextQuestions: nextQuestions }); 
                            });
                            
                        }
                        fetchNextQuest();
                           
                    });
                    
                }
                fetchDefAnsw();
                
            });
        }
        fetchQuestions();
      }).catch(err => {
          if(err.response.status=='401'){
            navigate("/login");
          }else{
            Swal.fire({
                title: err.response.error,
                showDenyButton: false,
                confirmButtonText: "Exit"
              }).then((res) => {
                if (res.isConfirmed) {
                    navigate("/");
                }
              });
          }
         
        });
    };
    fetchMyAPI();
  }, []);

  const startSurvey = () =>{
      let stateCopy:IState = state as IState;
      stateCopy.startedSurvey = true;
      setState({survey: stateCopy.survey, startedSurvey: stateCopy.startedSurvey,  questions: stateCopy.questions,definedAnswers:stateCopy.definedAnswers, userId: stateCopy.userId, nextQuestions: stateCopy.nextQuestions});
  }

  if(!state?.startedSurvey){
      if(!state?.survey.survey_name){
          return(<>  <div style={{ textAlign: "center" }}><div className="spinner-border mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div></div></>)
      }else{
    return(<>
    <div className="row justify-content-center m-0" style={{transition: "all 2s", height:"93.2vh", backgroundColor: state?.survey.background_color  == null || state?.survey?.background_color?.length === 0 ? "rgb(235, 238, 249)" : state?.survey.background_color as string }}>
        <div className="card col-md-4 col-xs-12 mt-5" style={{flex: "inherit", marginBottom: "20%"}} >
          <div style={{ textAlign: "center" }}>
            <img
              className="card-img-top mt-4"
              src="https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv1.png"
              alt="Card image cap"
              style={{ width: "50%" }}
            />
          </div>
          <div className="card-body" style={{flex: "inherit"}} >
            <h4 className="card-title">{state?.survey.survey_name}</h4>
            <hr />
            <p>{state?.survey.survey_description}</p>

          </div>
          <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="btn btn-block btn-outline-primary mb-4 mt-4"
                  onClick={startSurvey}
                  style={{ width: "50%", height: "50px", backgroundColor: "#fff", color: state?.survey.button_color as string, borderColor: state?.survey.button_color as string}}
                >
                  Start Survey <i style={{ float: "right" }} className="fa fa-arrow-right mt-1 me-2"></i>
                </button>
              </div>
        </div>
      </div>
    </>);}
    }
    else{
        return(<>
        <AnswerPerQuestionComp nextQuestions={state.nextQuestions} userId={state.userId} definedAnswers={state.definedAnswers} survey={state.survey} questions={state?.questions}/>
        </>);
    }
}

export default SurveyToAnswerComp;

