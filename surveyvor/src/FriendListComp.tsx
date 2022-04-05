import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Route } from "./Model/Route";
import { User } from "./Model/User";
import { IFriend } from "./Model/UserFriend";

interface IProps {
  friends: Array<User>;
  updateFriendDeleted: Function
}


const FriendListComp = (props: IProps) => {
    const navigate = useNavigate();
    const toProfile = (user_id:number) =>{
        navigate('/profile/'+user_id);
    };
  return (
    <>
      <div className="row m-0">
        <div className="col-12">
          <h2 className="mb-4 mt-4" style={{ display: "inline-block" }}>
            Your <span style={{ color: "#d36b2ad5" }}>Friends</span>
          </h2>
        </div>

        {props?.friends?.map((f,i) => {
          return (
            <div className="col-6">
              <div className="card mt-4">
                <div className="card-body">
                  <img
                    style={{ marginRight: "20px" }}
                    width="6%"
                    src={
                      f.avatar != null
                        ? f.avatar
                        : "https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv1.png"
                    }
                  />
                  <span style={{cursor: 'pointer'}} className="hoverBlack" onClick={()=>{toProfile(f.user_id)}}>{f.email}</span>
                  <span style={{ color: "gray", marginLeft: '10px' }}> ( {f.first_name} )</span>
                  <span style={{ float: "right" }}>
                    <button
                      className="btn btn-block btn-outline-secondary mt-1 me-1"
                      onClick={() => {props.updateFriendDeleted(i, f.user_id)}}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FriendListComp;
