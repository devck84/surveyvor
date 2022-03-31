interface IRoute{
    base:string;
}

export class Route{
    base:string;
    constructor(props:IRoute={base:"https://surveyvor.shocklogic.com/api/"}){
        this.base = props.base;
    }
    getBaseRuta(){
        return this.base;
    }
}