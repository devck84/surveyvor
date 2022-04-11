export interface IChat {
    chat_id: number;
    user_id_from: number;
    user_id_to: number;
    active: string;
  }
  
  export class Chat {
    chat_id: number;
    user_id_from: number;
    user_id_to: number;
    active: string;
      constructor(props: IChat){
          this.chat_id = props.chat_id;
          this.user_id_from = props.user_id_from;
          this.user_id_to = props.user_id_to;
          this.active = props.active;
      }
  }