export interface IUserAnswer {
    user_answer_id: number;
    survey_id: number;
    question_id: number;
    defined_answer_id: number|null;
    user_id: number|null;
    survey_answer_text: string|null;
  }
  
  export class UserAnswer {
    user_answer_id: number;
    survey_id: number;
    question_id: number;
    defined_answer_id: number|null;
    user_id: number|null;
    survey_answer_text: string|null;
      constructor(props:IUserAnswer){
          this.user_answer_id = props.user_answer_id;
          this.survey_id = props.survey_id;
          this.question_id = props.question_id;
          this.user_id = props.user_id;
          this.defined_answer_id = props.defined_answer_id;
          this.survey_answer_text = props.survey_answer_text;
      }
    }