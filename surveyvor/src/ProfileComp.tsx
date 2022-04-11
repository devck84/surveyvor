import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import "./App.css";
import { Invitation } from "./Model/Invitation";
import Swal from "sweetalert2";
import { IFriend } from "./Model/UserFriend";
import { Survey } from "./Model/Survey";
import { useSockets } from "./context/socket.context";
import EVENTS from "./config/events";
import { Chat } from "./Model/Chat";

interface IState {
  user: User;
  isFriend: boolean;
  surveys: Array<Survey>;
}

const ProfileComp = () => {
  const { user_id } = useParams();
  let navigate = useNavigate();
  const [state, setState] = useState<IState>();
  const baseApiRoute: Route = new Route();
  const usrRoute: string = baseApiRoute.getBaseRuta() + "auth/all/" + user_id;
  const token = localStorage.getItem("token") as string;
  const { socket, roomId, rooms } = useSockets();

  function handleCreateRoom(chatId:number,roomame:string) {
    //get the room name
    // @ts-ignore
    const roomName = roomame;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { chatId, roomName });

  }

  useEffect(() => {
    let headers = {
      headers: {
        Authorization: token,
      },
    };
    let fetchMyAPI = async () => {
      await axios.get(usrRoute, headers).then((s) => {
        let user = s.data.user as User;
        const isMyFriendRoute: string = baseApiRoute.getBaseRuta() + "userFriend/mine";
        axios.get(isMyFriendRoute, headers).then((d) => {
          let data:Array<User> = d.data.friend;
          
          let isFrend:boolean = false;
          data.map((f)=>{console.log(f.user_id+" - "+Number(user_id) );
            if(f.user_id==Number(user_id)){
              isFrend=true;
            }
          });
          const surveyRoute: string = baseApiRoute.getBaseRuta() + "survey/user/"+user_id;
          axios.get(surveyRoute, headers).then((s) => {
            setState({ user: user, isFriend: isFrend, surveys: s.data.survey });
          });
          
        })
        
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
  const goToChat = async () =>{
    let headers = {
      headers: {
       'Authorization': token,
      }
    };
    const chatRoute: string = baseApiRoute.getBaseRuta() + "chat/user/"+user_id;
    await axios.get(chatRoute,headers).then((d) =>{
      if(d.data.chat!=null){
        navigate("/chat");
      }else{
        saveChat();
      }
    });
  }
  const saveChat = async () =>{

    let headers = {
      headers: {
       'Authorization': token,
      }
    };
    const chatSaveRoute: string = baseApiRoute.getBaseRuta() + "chat/save";
    const body:{user_id_from:number} = {user_id_from: Number(user_id)};
    await axios.post(chatSaveRoute,body,headers).then((d) =>{
      handleCreateRoom((d.data.chat as Chat).chat_id, "New Chat "+(d.data.chat as Chat).chat_id);
      successMessage("Start chating!","");
      navigate("/chat");
    })

  } 

  if(state?.isFriend==false){
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
          {
            state?.surveys.map((s,i)=>{
              return(<a key={"keyPublic-"+s.survey_id+"-"+i} className="btn btn-outline-primary" href={"/survey/"+s.survey_id}>{s.survey_name}</a>);
            })
          }
        </div>
      </div>
      </div></div>
    </>
  );}else{
      return(<>  <div className="row m-0 gradientBack" style={{ height: "30vh" }}>
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
        onClick={goToChat}
      >
       Chat
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
        {
            state?.surveys.map((s,i)=>{
              return(<a key={"keyPublic-"+s.survey_id+"-"+i} target="_blank" rel="noreferrer" className="btn btn-outline-success me-4 mb-4" href={"/survey/"+s.survey_id}>{s.survey_name}</a>);
            })
          }
      </div>
    </div>
    </div></div></>);
  }
};

export default ProfileComp;
