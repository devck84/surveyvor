export interface ITeamMember{
    user_id: number;
    email: string;
    first_name: string;
    family_name: string;
    avatar: string|null;
    telephone: number|null;
    password: string;
    country_code: string;
    team_id:number;
}

export class TeamMember{
    team_id:number;
    user_id: number;
    email: string;
    first_name: string;
    family_name: string;
    avatar: string|null;
    telephone: number|null;
    password: string;
    country_code: string;
    constructor(props:ITeamMember){
        this.team_id=props.team_id;
        this.user_id = props.user_id;
        this.email = props.email;
        this.first_name = props.first_name;
        this.family_name = props.family_name;
        this.avatar = props.avatar;
        this.password = props.password;
        this.telephone = props.telephone;
        this.country_code = props.country_code;
    }
}