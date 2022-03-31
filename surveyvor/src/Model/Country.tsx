export interface ICountry {
  name: string;
  dial_code: string;
  code: string;
}

export class Country {
    name: string;
    dial_code: string;
    code: string;
    constructor(props: ICountry){
        this.name = props.name;
        this.dial_code = props.dial_code;
        this.code = props.code;
    }
}