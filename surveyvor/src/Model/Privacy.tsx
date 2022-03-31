export interface IPrivacy {
  privacy_id: number;
  privacy_name: string;
  privacy_description: string;
}

export class Privacy{
    privacy_id: number;
    privacy_name: string;
    privacy_description: string;
    constructor(props:IPrivacy){
        this.privacy_id = props.privacy_id;
        this.privacy_name = props.privacy_name;
        this.privacy_description = props.privacy_description;
    }
}