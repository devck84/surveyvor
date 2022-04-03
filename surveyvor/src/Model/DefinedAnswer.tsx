export interface IDefinedAnswer {
    defined_answer_id: number;
    question_id: number;
    defined_answer_text: string;
  }
  
  export class DefinedAnswer{
    defined_answer_id: number;
    question_id: number;
    defined_answer_text: string;
      constructor(props:IDefinedAnswer){
          this.defined_answer_id = props.defined_answer_id;
          this.question_id = props.question_id;
          this.defined_answer_text = props.defined_answer_text;
      }
  }