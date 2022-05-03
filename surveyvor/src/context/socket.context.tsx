import { createContext, useContext, useEffect, useState } from "react";
// @ts-ignore
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";
import axios from "axios";
import { Chat } from "../Model/Chat";
import { couldStartTrivia } from "typescript";
import { useNavigate } from "react-router-dom";

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: { message: string; time: string; username: string }[];
  setMessages: Function;
  roomId?: string;
  rooms: object;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    let headers = {
      headers: {
          'Authorization': token
      }
  }
    axios.get("https://surveyvor.shocklogic.com/api/auth/me",headers).then((d)=>{
      console.log(d.data.first_name);
      setUsername(d.data.first_name);
    });

  }, []);


  //return all rooms created
  // @ts-ignore
  socket.on(EVENTS.SERVER.ROOMS, async (value) => {
    let copyValue:any = [];
    const token = localStorage.getItem("token") as string;

    let headers = {
      headers: {
          'Authorization': token
      }
  }
    let chats:Array<Chat>;
    await axios.get("https://surveyvor.shocklogic.com/api/chat/mine",headers).then((d)=>{
      chats = d.data.chat; 
      
      chats.map((c) =>{ 

        Object.values(value).map((el:any) => {
          console.log(el.chat_id==c.chat_id);
          if(el.chat_id==c.chat_id){
            copyValue[el.chat_id] = el;
          }
        })
        
    });
    });
    // @ts-ignore
   setRooms(copyValue);
   
    
    
  });
// @ts-ignore
  socket.on(EVENTS.SERVER.JOINED_ROOM, (value, messages) => {
    
    setRoomId(value);

    setMessages(messages);
  });

  useEffect(() => {// @ts-ignore
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }
// @ts-ignore
      setMessages((messages) => [...messages, { message, username, time }]);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
