export interface ISurvey {
  survey_id: number;
  team_id: number|null;
  privacy_id: number;
  user_id: number;
  survey_name: string;
  survey_description: string|null;
  button_color: string|null;
  background_color: string|null;
  date_created: string;
  active: number;
}
export class Survey{
    survey_id: number;
    team_id: number|null;
    privacy_id: number;
    user_id: number;
    survey_name: string;
    survey_description: string|null;
    button_color: string|null;
    background_color: string|null;
    date_created: string;
    active: number;
    constructor(props:ISurvey){
        this.survey_id = props.survey_id;
        this.team_id = props.team_id;
        this.privacy_id = props.privacy_id;
        this.user_id = props.user_id;
        this.survey_name = props.survey_name;
        this.survey_description = props.survey_description;
        this.button_color = props.button_color;
        this.background_color = props.background_color;
        this.date_created = props.date_created;
        this.active = props.active;
    }
}