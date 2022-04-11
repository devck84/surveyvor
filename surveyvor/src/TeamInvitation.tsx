import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Route } from "./Model/Route";
import { TeamMember } from "./Model/TeamMember";

const TeamInvitation = () =>{
    const {team_id, token} = useParams();
    const tokenLogin = localStorage.getItem("token") as string;
    const navigate = useNavigate();

    useEffect(() => {
        if(!tokenLogin){
            navigate("/login");
        }

        let headers = {
          headers: {
            'Authorization': tokenLogin,
          }
        };
        const apiRoute: Route = new Route();
        const nextQuestRoute: string = apiRoute.getBaseRuta()+"teamMember/saveByInvitation";
        let teamInvitationBody = {team_id: team_id, token: token};
        axios.post(nextQuestRoute, teamInvitationBody, headers).then((d) => {
            successMessage("Saved","You have succesfuly joined this team");
            navigate("/");
        }).catch((err) => {
            errorMessage("Whoops","Something went wrong");
            navigate("/");
        });

    },[]);

    const successMessage = (title:string, message:string) => {
        Swal.fire({
            title: title,
            icon: "success",
            text: message,
          showDenyButton: false
        });
      };
      const errorMessage = (title:string, message:string) => {
        Swal.fire({
            title: title,
            icon: "error",
            text: message,
          showDenyButton: false
        });
      };

    return(<></>);
}

export default TeamInvitation;