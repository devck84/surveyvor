import { User } from "./Model/User";

interface IProps{
    inviters: Array<User>;
    acceptInvitation: Function;
    removeInvitation: Function;
}
const PendingInvitationsComp = (props:IProps) =>{
    return(<><div className="row m-0">
    <div className="col-12">
      <h2 className="mb-4 mt-4" style={{ display: "inline-block" }}>
        Your <span style={{ color: "#d36b2ad5" }}>Pending Invitations</span>
      </h2>
      
    </div>{props?.inviters?.map((f,i)=>{return(
           <div className="col-6" key={"key-"+f.user_id+"-"+i}>
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
               <span style={{cursor: 'pointer'}} className="hoverBlack" onClick={()=>{}}>{f.email}</span>
               <span style={{ color: "gray", marginLeft: '10px' }}> ( {f.first_name} )</span>
               <span style={{ float: "right" }}>
               <button
                   className="btn btn-block btn-outline-success mt-1 me-2"
                   onClick={() => {props.acceptInvitation(i, f.user_id)}}
                 >
                   <i className="fa fa-check"></i>
                 </button>
                 <button
                   className="btn btn-block btn-outline-danger mt-1 me-2"
                   onClick={() => {props.removeInvitation(i, f.user_id)}}
                 >
                   <i className="fa fa-close"></i>
                 </button>
               </span>
             </div>
           </div>
         </div>);
        })}</div>
        
    </>);
}

export default PendingInvitationsComp;