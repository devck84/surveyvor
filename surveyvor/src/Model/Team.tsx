export interface ITeam{
    team_id: number;
    team_name: string;
    team_description: string;
    team_url_invitation: string;
}

export class Team{
    team_id: number;
    team_name: string;
    team_description: string;
    team_url_invitation: string;
    constructor(props:ITeam){
        this.team_id = props.team_id;
        this.team_name = props.team_name;
        this.team_description = props.team_description;
        this.team_url_invitation = props.team_url_invitation;
    }
}

