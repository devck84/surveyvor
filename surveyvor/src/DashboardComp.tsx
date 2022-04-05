import "./App.css";
import SurveyListComp from "./SurveyListComp";
import { IFriend } from "./Model/UserFriend";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route } from "./Model/Route";
import { useNavigate } from 'react-router-dom';
import ProfileViewComp from "./ProfileViewComp";
import FriendListComp from './FriendListComp';
import { User } from "./Model/User";
import Swal from "sweetalert2";
import PendingInvitationsComp from "./PendingInvitationsComp";

interface IState{
  me: User;
  friends: Array<User>;
  inviters: Array<User>;
}

const DashboardComp = () => {
    const [state, setState] = useState<IState>();
    
    const token = localStorage.getItem("token") as string;
    const navigate = useNavigate();

    let headers = {
      headers: {
          'Authorization': token
      }
  }

    useEffect( () => {
        
        if(!token){
            navigate('/login');
        }else{
            headers = {
                headers: {
                    'Authorization': token
                }
            }
            const baseApiRoute: Route = new Route();
            const meRoute: string = baseApiRoute.getBaseRuta() + "auth/me";
            axios.get(meRoute, headers).
              then((d)=>{
                const friendsRoute: string = baseApiRoute.getBaseRuta() + "userFriend/mine";
                let fetchMyAPI = async () => {
                  axios.get(friendsRoute, headers).
                  then((t)=>{
                    let fetchMyInv = async () => {
                      const invRoute: string = baseApiRoute.getBaseRuta() + "invitation/mine";
                      await axios.get(invRoute, headers).
                      then((c)=>{
                          setState({me: d.data, friends:t.data.friend, inviters: c.data.invitation})
                      })}
                      fetchMyInv();
                  })}
                  fetchMyAPI();
               
              }).
                catch(err => {
                    navigate("/login");
                });
              
        }
    },[]);

    const acceptInvitation = async (index:number, sender_id:number) =>{
      const baseApiRoute: Route = new Route();
      const token = localStorage.getItem("token") as string;
      const friSaveRoute: string = baseApiRoute.getBaseRuta() + "userFriend/save";
      let userFr: IFriend = {user_friend_id: 0,
        user_id_from: sender_id,
        user_id_to: 0,
        date_related: ""};
        
      await axios.post(friSaveRoute, userFr,headers).then((c)=>{{
        successMessage("Invitation Accepted","");
    }}).catch(err=>{errorMessage("Whoops!","Something went wrong");});

  const invDeleteRoute: string = baseApiRoute.getBaseRuta() + "invitation/delete/"+sender_id;
    axios.post(invDeleteRoute, null,headers).then((c)=>{
      let updateObj:IState = state as IState;
      updateObj.inviters.splice(index,1);
      setState({me: updateObj.me, friends: updateObj.friends, inviters: updateObj.inviters});
    })
  }

    const removeInvitation = async (index:number, sender_id:number) =>{
      const baseApiRoute: Route = new Route();
      const token = localStorage.getItem("token") as string;
      let headers = {
          headers: {
           'Authorization': token,
          }
        };

        await Swal.fire({
          title: "Are you totally sure?",
          showDenyButton: true,
          confirmButtonText: "Yes"
        }).then((res) => {
          if (res.isConfirmed) {
            const invDeleteRoute: string = baseApiRoute.getBaseRuta() + "invitation/delete/"+sender_id;
                  axios.post(invDeleteRoute, null,headers).then((c)=>{
                    let updateObj:IState = state as IState;
                    updateObj.inviters.splice(index,1);
                    setState({me: updateObj.me, friends: updateObj.friends, inviters: updateObj.inviters});
                    successMessage("Invitation Denied","");
                }).catch(err=>errorMessage("Whoops!","Something went wrong"));
          }
        })
       
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
  

    const updateFriendDeleted = async (index:number, friend_id:number) =>{
      const baseApiRoute: Route = new Route();
    const token = localStorage.getItem("token") as string;
    let headers = {
        headers: {
         'Authorization': token,
        }
      };
    await Swal.fire({
        title: "Are you totally sure?",
        showDenyButton: true,
        confirmButtonText: "Yes"
      }).then((res) => {
        if (res.isConfirmed) {
            const surveyDeleteRoute: string = baseApiRoute.getBaseRuta() + "userFriend/delete/"+friend_id;
            axios.post(surveyDeleteRoute, null,headers).then((c)=>{{
                let updateObj:IState = state as IState;
                updateObj.friends.splice(index,1);
                setState({me: updateObj.me, friends: updateObj.friends, inviters: updateObj.inviters});
                successMessage("Deleted","Succesfuly deleted");
            }}).catch(err=>errorMessage("Whoops!","Something went wrong"));
        }
      });
    }
    const logOut = () =>{
      successMessage("See you soon!","");
        navigate("/login");
    }

  return (
    <>
      <div className="row align-items-start m-0 ">
        <div className="col-1 p-0">
        <div
          className="nav flex-column nav-pills me-2"
         
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className="nav-link active dashButton"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          ><i className="fa fa-pie-chart dashIcon"></i> 
            Surveys
          </button>
          <button
            className="nav-link dashButton"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            <i className="fa fa-user dashIcon" ></i> Profile
          </button>
          <button
            className="nav-link dashButton"
            id="v-pills-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-messages"
            type="button"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
          ><i className="fa fa-address-book dashIcon"></i>
            Friends
          </button>
          <button
            className="nav-link dashButton"
            id="v-pills-settings-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-settings"
            type="button"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
          >
            <i className="fa fa-users dashIcon"></i> Teams
          </button>
          <button
            className="nav-link dashButton"
            id="v-pills-invitations-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-invitations"
            type="button"
            role="tab"
            aria-controls="v-pills-invitations"
            aria-selected="false"
          >
            <i className="fa fa-bell dashIcon"></i>Pending
          </button>

          <button
            className="nav-link dashButton"
            id="v-pills-invitations-tab"
            type="button"
            role="tab"
            aria-selected="false"
            onClick={logOut}
          >
            <i className="fa fa-share dashIcon"></i>Log Out
          </button>
        </div>
        </div>
        <div className="col-11 backFromDash">
        <div className="tab-content" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <SurveyListComp key='surveyList-1' />
            
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <ProfileViewComp/>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
          >
           <FriendListComp updateFriendDeleted={updateFriendDeleted} friends={state?.friends as Array<User>}/>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-invitations"
            role="tabpanel"
            aria-labelledby="v-pills-invitations-tab"
          >
            <PendingInvitationsComp acceptInvitation={acceptInvitation} removeInvitation={removeInvitation} inviters={state?.inviters as Array<User>} />
          </div>
        </div></div>
      </div>
    </>
  );
};

export default DashboardComp;
