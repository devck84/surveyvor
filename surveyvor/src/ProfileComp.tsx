import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import "./App.css";
import { Invitation } from "./Model/Invitation";
import Swal from "sweetalert2";

interface IState {
  user: User;
}

const ProfileComp = () => {
  const { user_id } = useParams();
  let navigate = useNavigate();
  const [state, setState] = useState<IState>();
  const baseApiRoute: Route = new Route();
  const usrRoute: string = baseApiRoute.getBaseRuta() + "auth/all/" + user_id;
  const token = localStorage.getItem("token") as string;

  useEffect(() => {
    let headers = {
      headers: {
        Authorization: token,
      },
    };
    let fetchMyAPI = async () => {
      await axios.get(usrRoute, headers).then((s) => {
        let user = s.data.user as User;
        setState({ user: user });
      }).catch((err) => {
          Swal.fire({
        title: "Whoops! Wrong link",
        showDenyButton: false,
        confirmButtonText: "Ok"
      }).then((res) => {
        if (res.isConfirmed) {
            navigate("/");
        }
      });});
    };
    fetchMyAPI();
  }, []);

  const addFriend = async () =>{
        const baseApiRoute: Route = new Route();
      const token = localStorage.getItem("token") as string;
      let headers = {
          headers: {
           'Authorization': token,
          }
        };
      await Swal.fire({
          title: "Do you want to send an Invitation?",
          showDenyButton: true,
          confirmButtonText: "Yes"
        }).then((res) => {
          if (res.isConfirmed) {
              const invSaveRoute: string = baseApiRoute.getBaseRuta() + "invitation/save";
              let inv:Invitation = new Invitation({invitation_id:0, sender_id:0, receiver_id: Number(user_id),date_sent:""});
              axios.post(invSaveRoute, inv,headers).then((c)=>{
                  successMessage("Sent","Invitation Succesfuly Sent");
              }).catch(err=>errorMessage("Whoops!","Something went wrong"));
          }
        });
      
  }

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

  return (
    <>
     
      <div className="row m-0 gradientBack" style={{ height: "30vh" }}>
        <div className="col-12 mt-4">
          <div className="row m-0">
            <div className="col-2">
              <img
                className="img-responsive profImg mt-3"
                style={{ marginLeft: "20%" }}
                src={
                  state?.user.avatar != null
                    ? state?.user.avatar
                    : "https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv1.png"
                }
                alt=""
              />
            </div><div className="col-8 mt-4" style={{color: "white", marginLeft: '40px' }}>
            <h3>
            <i>{state?.user.first_name} {state?.user.family_name}</i>
            </h3><br/>
            <h5 style={{color: "#d4d4d4"}}>
              <i><b>Email: </b></i>{state?.user.email} 
            </h5>
            <h5 style={{color: "#d4d4d4"}}>
            <i> <b>Country: </b></i>{state?.user.country_code} <i className="fa fa-map-marker" aria-hidden="true"></i>

            </h5>
            <button
                    className="btn btn-block btn-outline-light mt-3"
                    onClick={addFriend}
                  >
                   Add Friend
                  </button>
          </div>
          </div>

          
          
        </div>
        <div className="row m-0 mt-4  justify-content-center">
        <div className="card col-md-11 col-xs-12 mt-5 mb-5 bodyColor">
        <h3 className="m-4" style={{ display: "inline-block" }}>
            Public <span style={{ color: "#d36b2ad5" }}>Surveys</span>
          </h3>
          <div className="card-body">
        </div>
      </div>
      </div></div>
    </>
  );
};

export default ProfileComp;
