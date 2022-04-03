export interface INextQuestion {
    next_question_id: number;
    defined_answer_id: number;
    question_id: number;
  }
  
  export class NextQuestion{
    next_question_id: number;
    defined_answer_id: number;
    question_id: number;
      constructor(props:INextQuestion){
          this.next_question_id = props.next_question_id;
          this.defined_answer_id = props.defined_answer_id;
          this.question_id = props.question_id;
      }
  }