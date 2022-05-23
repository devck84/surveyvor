import axios from "axios";
import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

const rooms: Record<string, { name: string, chat_id:number }> = {};
let messages: Array<{
  message:string,
  username:string,
  time: string,
  chat_id:number,
}>=[];

function socket({ io }: { io: Server }) {
  axios.get("https://surveyvor.shocklogic.com/api/chat/all").then(res=>{
     
    res.data.chat.map((d:{chat_id:number, user_name_from: String, user_name_to: String, active: number})=>{
      const roomId = d.chat_id+"";
      rooms[roomId] = {
        name: "Chat "+d.user_name_from+" - "+d.user_name_to,
        chat_id: d.chat_id,
      };
    });
  });
  logger.info(`Sockets enabled`);


  io.on(EVENTS.connection, (socket: Socket) => { 
    
    
    logger.info("d:"+rooms);

    logger.info(`User connected ${socket.id}`);

    socket.emit(EVENTS.SERVER.ROOMS, rooms);

    /*
     * When a user creates a new room
     */
    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ chatId, roomName }) => {
      console.log({ roomName });
      // create a roomId
      const roomId = chatId;
      // add a new room to the rooms object
      rooms[roomId] = {
        name: roomName,
        chat_id: chatId,
      };

      socket.join(roomId);

      // broadcast an event saying there is a new room
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

      // emit back to the room creator with all the rooms
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      // emit event back the room creator saying they have joined a room
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId, messages);
    });

    /*
     * When a user sends a room message
     */

    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, username }) => {
        const date = new Date();

        messages = [...messages, {
          message,
          username,
          time: `${date.getHours()}:${date.getMinutes()}`,
          chat_id: roomId
        }];
        

        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          message,
          username,
          time: `${date.getHours()}:${date.getMinutes()}`,
        });
      }
    );

    /*
     * When a user joins a room
     */
    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
      socket.join(roomId);

      let mesgCopy:Array<{
        message:string,
        username:string,
        time: string,
        chat_id:number,
      }> = [];

      messages.map((m)=>{
        if(m.chat_id==roomId){
          mesgCopy = [...mesgCopy, m]; 
        }
      });

      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId, mesgCopy);
    });
  });
}

export default socket;
