import { Privacy } from './Model/Privacy';

interface IProps{
    surveyDetails:Function,
    allPrivacy:Array<Privacy>
}

const SurveyDetailsComp = (props:IProps) => {
    const saveDetails = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let form: HTMLFormElement = event.currentTarget;
    
        let inputName: HTMLInputElement = form.survey_name;
        let inputDescription: HTMLInputElement = form.description;
        let inputPrivacy: HTMLInputElement = form.privacy;
    
        let name: string = inputName.value;
        let description: string = inputDescription.value;
        let privacy: string = inputPrivacy.value;
        
        props.surveyDetails(name, description, privacy);
    }
  return (
    <form onSubmit={saveDetails}>
        <div className="p-5">
        <div className="form-floating mb-4">
            <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Survey name"
            name="survey_name"
            />
            <label htmlFor="floatingInput">Survey Name (Required)</label>
        </div>
        <div className="form-floating mb-4">
            <textarea
            className="form-control"
            id="floatingDesc"
            placeholder="Description"
            name="description"
            ></textarea>
            <label htmlFor="floatingDesc">Description</label>
        </div>
        <div className="form-floating">
            <select  className="form-control" name="privacy" id="privacy">
            {props?.allPrivacy.map((a) => {
                    return (
                      <option value={a.privacy_id}>
                        {a.privacy_name}
                      </option>
                    );
                  })}
            </select>
            <label htmlFor="floatingDesc">Privacy</label>
        </div>
        </div>
    </form>
  );
};

export default SurveyDetailsComp;
