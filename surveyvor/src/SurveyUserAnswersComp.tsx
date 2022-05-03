import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Question } from "./Model/Question";
import { Route } from "./Model/Route";
import { Survey } from "./Model/Survey";
import { UserAnswer } from "./Model/UserAnswer";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import StatsPerQuestion from "./StatsPerQuestion";



interface IState{
    survey: Survey;
    userAnswers: Array<{answer_count: number;
        answer_text: string|null;}>;
    questions: Array<Question>;

}

const SurveyUserAnswersComp = () =>{
  ChartJS.register(ArcElement, Tooltip, Legend);
    const [state, setState] = useState<IState>();
    const {survey_id} = useParams();
    const tokenLogin = localStorage.getItem("token") as string;
    const navigate = useNavigate();
    const data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    useEffect(() => {
        if(!tokenLogin){
            navigate("/login");
        }

        let headers = {
          headers: {
            'Authorization': tokenLogin,
          }
        };
        
        const apiRoute: Route = new Route();
        const surveyRoute: string = apiRoute.getBaseRuta()+"survey/mine/"+survey_id;
        const questRoute: string = apiRoute.getBaseRuta()+"question/all/"+survey_id;
        let loadData = async () =>{
            await axios.get(surveyRoute, headers).then((d) => {
                axios.get(questRoute, headers).then((c) => {
                     setState({survey: d.data.survey, userAnswers: [], questions: c.data.questions});
               
            });
            
        }).catch((err) => {
            errorMessage("Whoops","Something went wrong");
          //  navigate("/");
        });
        }
        loadData();
        

    },[]);
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
    return(<>
    
    <div className="p-5 m-1 bg-success text-white rounded">
  <h4>Survey&apos;s Answers</h4> <br/> <h1><b>{state?.survey.survey_name}</b></h1>
  <h2>{state?.survey.survey_description}</h2>
</div>
<div className="row justify-content-center m-0 bodyColor">
    {
      state?.questions.map((q)=>{
        return(<><StatsPerQuestion question={q}/></>);
      })
    }</div>

{/*
    state?.userAnswers.map((m,i)=>{
        let index = state?.questions?.findIndex(x => x?.question_id==m.question_id);
        return(<>
        <div className="card m-4">
            <div className="card-body">
            <b style={{ color: "gray" }}> Question: </b> { state?.questions[index].question_text } <br/>
            <b style={{ color: "gray" }}> Answer: </b> {m.survey_answer_text}  <br/><span style={{ color: "gray" }}>{m.email==null?"Anonymous":m.email}</span>
            </div>
        </div>
               
            </>);
    })
  */}
  
    </>);
}

export default SurveyUserAnswersComp;