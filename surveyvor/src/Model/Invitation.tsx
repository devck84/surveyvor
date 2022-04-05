export interface IInvitation{
    invitation_id:number;
    sender_id:number;
    receiver_id:number;
    date_sent:string;
}

export class Invitation{
    invitation_id:number;
    sender_id:number;
    receiver_id:number;
    date_sent:string;
    constructor(props:IInvitation){
        this.invitation_id = props.invitation_id;
        this.sender_id = props.sender_id;
        this.receiver_id = props.receiver_id;
        this.date_sent = props.date_sent;
        
    }
}