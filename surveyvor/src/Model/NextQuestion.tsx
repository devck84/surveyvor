export interface INextQuestion {
    next_question_id: number;
    defined_answer_id: number|null;
    question_id: number|null;
  }
  
  export class NextQuestion{
    next_question_id: number;
    defined_answer_id: number|null;
    question_id: number|null;
      constructor(props:INextQuestion){
          this.next_question_id = props.next_question_id;
          this.defined_answer_id = props.defined_answer_id;
          this.question_id = props.question_id;
      }
  }