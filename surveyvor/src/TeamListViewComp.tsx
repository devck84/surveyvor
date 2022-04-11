import { Team } from "./Model/Team";
import { User } from "./Model/User";
import { TeamMember } from "./Model/TeamMember";

interface IProps {
  teams: Array<Team>;
  teamMembers: Array<TeamMember>;
  leaveTeam: Function;
}

const TeamListViewComp = (props: IProps) => {
  return (
          <>
            <div className="row m-0">
              <div className="col-12">
                <h2 className="mb-4 mt-4" style={{ display: "inline-block" }}>
                  Your <span style={{ color: "#d36b2ad5" }}>Teams</span>
                </h2>
                <a
                  href="/team/create"
                  className="btn btn-outline-primary mb-4 mt-4"
                  style={{ float: "right", display: "inline-block" }}
                >
                  Add New Team
                </a>
              </div>{props?.teams?.map((team,i) => {
                  return (
              <div className="col-6" key={"teamlist-"+team.team_id+"-"+i}>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id={"headingOne"+team?.team_id}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapseOne-"+team?.team_id}
                        aria-expanded="true"
                        aria-controls={"collapseOne-"+team?.team_id}
                      >
                        <p>
                          <i>Name:</i>{" "}
                          <b style={{ color: "#d36b2ad5" }}>
                            {team?.team_name}
                          </b>
                          <br />
                          <i style={{ color: "gray" }}>
                            {team?.team_description}
                          </i>
                        </p>
                      </button>
                    </h2>
                    <div
                      id={"collapseOne-"+team?.team_id}
                      className="accordion-collapse collapse"
                      aria-labelledby={"headingOne"+team?.team_id}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <ol>
                        {
                            props?.teamMembers?.map((m) =>{
                              if(m.team_id==team?.team_id){
                                    return(<li style={{color:'gray'}}>{m.first_name} - <i>{m?.email}</i></li>);
                             }
                            })
                        }
                        </ol>

                        <button
                        onClick={() => {navigator.clipboard.writeText(team?.team_url_invitation)}}
                      className="btn btn-block btn-outline-secondary mt-1" style={{marginLeft: '10px'}}
                    >
                      <i className="fa fa-link"></i>
                    </button>
                    <span style={{float: 'right'}}>
                    <button
                      className="btn btn-block btn-outline-danger mt-1" style={{marginLeft: '10px'}}
                      onClick={() => {props.leaveTeam(team.team_id)}}
                    >
                      <i className="fa fa-close"></i> Leave team
                    </button>
                    </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
        );
      })}
            </div>
         
    </>
  );
};

export default TeamListViewComp;
