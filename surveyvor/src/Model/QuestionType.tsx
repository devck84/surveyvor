export interface IQuestionType {
  question_type_id: number;
  question_type_text: string;
  question_type_description: string;
}

export class QuestionType {
    question_type_id: number;
    question_type_text: string;
    question_type_description: string;
    constructor(props:IQuestionType){
        this.question_type_id = props.question_type_id;
        this.question_type_text = props.question_type_text;
        this.question_type_description = props.question_type_description;
    }
  }