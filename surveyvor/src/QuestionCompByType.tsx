import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Country } from "./Model/Country";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import Swal from "sweetalert2";
import { Question } from "./Model/Question";
import { QuestionType } from "./Model/QuestionType";

interface IQuestionByTypeMakerComp {
  questionType: number;
  idTypeComp: number;
}
const QuestionByTypeMakerComp = (props: IQuestionByTypeMakerComp) => {
    switch(props.questionType){
        case 1:
            return (<>
                    <input
                    key={props.idTypeComp+'-inputType1'}
                    type="text"
                    className="form-control"
                    id={"floating"+props.idTypeComp+'-field'}
                    placeholder="text"
                    name={props.idTypeComp+'-field'}
                    disabled
                />
                <label htmlFor={"floating"+props.idTypeComp+'-field'}>Short Answer</label>
              </>
                );
        case 2:
            return (<>
            <textarea
            key={props.idTypeComp+'-inputType2'}
            className="form-control"
            id={"floating"+props.idTypeComp+'-field'}
            placeholder="Description"
            name={props.idTypeComp+'-field'}
            disabled
            ></textarea>
            <label htmlFor={"floating"+props.idTypeComp+'-field'}>Long Answer</label>
                </>
                );
        case 3:
            return (<>
                <select
                key={props.idTypeComp+'-inputType3'}
                        className="form-control"
                        id={"floating"+props.idTypeComp+'-field'}
                        placeholder="text"
                        name={props.idTypeComp+'-field'}
                        disabled
                    ></select>
                    <label htmlFor={"floating"+props.idTypeComp+'-field'}>Your defined answers will appear below as options.</label>
                </>
                );
        case 4:
            return (<>
                <input
                key={props.idTypeComp+'-inputType4'}
                        type="date"
                        className="form-control"
                        id={"floating"+props.idTypeComp+'-field'}
                        placeholder="text"
                        name={props.idTypeComp+'-field'}
                        disabled
                    />
                    <label htmlFor={"floating"+props.idTypeComp+'-field'}>Date Answer</label>
                </>
                );
        case 5:
            return (<>
                <input
                key={props.idTypeComp+'-inputType5'}
                        type="range"
                        className="form-range"
                        id={"floating"+props.idTypeComp+'-field'}
                        placeholder="text"
                        name={props.idTypeComp+'-field'}
                        disabled
                    />
                </>
                );
        case 6:
            return (<>
                <input
                key={props.idTypeComp+'-inputType6'}
                        type="email"
                        className="form-control"
                        id={"floating"+props.idTypeComp+'-field'}
                        placeholder="text"
                        name={props.idTypeComp+'-field'}
                        disabled
                    />
                    <label htmlFor={"floating"+props.idTypeComp+'-field'}>Email Answer</label>
                </>
                );
        case 7:
            return (<>
                <input
                key={props.idTypeComp+'-inputType7'}
                        type="url"
                        className="form-control"
                        id={"floating"+props.idTypeComp+'-field'}
                        placeholder="text"
                        name={props.idTypeComp+'-field'}
                        disabled
                    />
                    <label htmlFor={"floating"+props.idTypeComp+'-field'}>URL Answer</label>
                </>
                );
        case 8:
            return (<>
                <input
                key={props.idTypeComp+'-inputType8'}
                        type="tel"
                        className="form-control"
                        id={"floating"+props.idTypeComp+'-field'}
                        placeholder="text"
                        name={props.idTypeComp+'-field'}
                        disabled
                    />
                    <label htmlFor={"floating"+props.idTypeComp+'-field'}>Telephone Answer</label>
                </>
                );
        default:
            return (<>
                <input
                key={props.idTypeComp+'-inputType1'}
                type="text"
                className="form-control"
                id={"floating"+props.idTypeComp+'-field'}
                placeholder="text"
                name={props.idTypeComp+'-field'}
                disabled
            />
            <label htmlFor={"floating"+props.idTypeComp+'-field'}>Short Answer</label>
          </>
            );
    }
  
};

export default QuestionByTypeMakerComp;
