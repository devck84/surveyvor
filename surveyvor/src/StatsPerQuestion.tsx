import axios from "axios";
import React, { useState, useEffect, Dispatch, SetStateAction, FunctionComponent, useRef } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
  } from 'chart.js';
import { Chart, Pie } from 'react-chartjs-2';
import { Question } from "./Model/Question";
import { Route } from "./Model/Route";
import { Survey } from "./Model/Survey";
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
  );
interface IProps {
    question: Question;
 }
 interface IState{
    userAnswers: {
        labels: string[];
        datasets: {label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;}[];
      }

}

const StatsPerQuestion: FunctionComponent<IProps> = (props:IProps)=> {
    const [state, setState] = useState<IState>();
    const tokenLogin = localStorage.getItem("token") as string;

    const apiRoute: Route = new Route();
    useEffect(() => {
        const questRoute: string = apiRoute.getBaseRuta()+"stats/answerPerQuestion/"+props?.question.question_id; 
        let headers = {
            headers: {
              'Authorization': tokenLogin,
            }
          };
             axios.get(questRoute, headers).then((d) => {
                let randomData = {
                    labels: ['algo', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
                  }
                randomData.datasets[0].backgroundColor = [];
                randomData.datasets[0].borderColor = [];
                randomData.labels = [];
                randomData.datasets[0].data = [];
                 for(let i=0; i<d.data.length; i++) {
                     let color = "#"+Math.floor(Math.random()*16777215).toString(16);
                     randomData.datasets[0].backgroundColor = [...randomData.datasets[0].backgroundColor, color];
                     randomData.datasets[0].borderColor = [...randomData.datasets[0].borderColor, color];

                     randomData.labels = [...randomData.labels, d.data[i].answer_text];

                     randomData.datasets[0].data = [...randomData.datasets[0].data, Number(d.data[i].answer_count)];
                }
                
                setState({userAnswers: randomData});
                
                
            });
        

    },[]);
    return(<>
    
        <div style={{paddingBottom:"50px"}} className="card col-md-3 col-xs-12 m-5">
    <h2 className="mt-2 ml-2 text-center">{props.question.question_text}</h2>
    <hr />
    {
        state?.userAnswers!=undefined?
        <div key={"answer-"+props.question.question_id} style={{width:"350px", height:"350px", marginLeft: '40px' }}>
            <Pie data={state.userAnswers} redraw={true} />
        </div>:""
    }</div>
    </>);

}

export default StatsPerQuestion;