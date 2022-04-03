export interface IQuestion {
  question_id: number;
  survey_id: number;
  next_question_id: number|null;
  question_text: string;
  question_type_id: number;
  required: number;
  sequence_number: number;
}

export class Question{
    question_id: number;
    survey_id: number;
    next_question_id: number|null;
    question_text: string;
    question_type_id: number;
    required: number;
    sequence_number: number;
    constructor(props:IQuestion){
        this.question_id = props.question_id;
        this.survey_id = props.survey_id;
        this.next_question_id = props.next_question_id;
        this.question_text = props.question_text;
        this.question_type_id = props.question_type_id;
        this.required = props.required;
        this.sequence_number = props.sequence_number;
    }
}