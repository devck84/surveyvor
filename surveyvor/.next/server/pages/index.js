(function() {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./src/config/default.ts":
/*!*******************************!*\
  !*** ./src/config/default.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SOCKET_URL": function() { return /* binding */ SOCKET_URL; }
/* harmony export */ });
const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:4000";

/***/ }),

/***/ "./src/config/events.ts":
/*!******************************!*\
  !*** ./src/config/events.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM"
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE"
  }
};
/* harmony default export */ __webpack_exports__["default"] = (EVENTS);

/***/ }),

/***/ "./src/containers/Messages.tsx":
/*!*************************************!*\
  !*** ./src/containers/Messages.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/events */ "./src/config/events.ts");
/* harmony import */ var _context_socket_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/socket.context */ "./src/context/socket.context.tsx");
/* harmony import */ var _styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/Messages.module.css */ "./src/styles/Messages.module.css");
/* harmony import */ var _styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "C:\\Users\\Usuario\\Documents\\GitHub\\surveyvor\\surveyvor\\src\\containers\\Messages.tsx";





function MessagesContainer() {
  const {
    socket,
    messages,
    roomId,
    username,
    setMessages
  } = (0,_context_socket_context__WEBPACK_IMPORTED_MODULE_3__.useSockets)();
  const newMessageRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const messageEndRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  function handleSendMessage() {
    // @ts-ignore
    const message = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(_config_events__WEBPACK_IMPORTED_MODULE_2__.default.CLIENT.SEND_ROOM_MESSAGE, {
      roomId,
      message,
      username
    });
    const date = new Date();
    setMessages([// @ts-ignore
    ...messages, {
      username: "You",
      message,
      time: `${date.getHours()}:${date.getMinutes()}`
    }]); // @ts-ignore

    newMessageRef.current.value = "";
  }

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var _messageEndRef$curren;

    // @ts-ignore
    (_messageEndRef$curren = messageEndRef.current) === null || _messageEndRef$curren === void 0 ? void 0 : _messageEndRef$curren.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  if (!roomId) {
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 12
    }, this);
  }

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: (_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default().wrapper),
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default().messageList),
      children: [// @ts-ignore
      messages.map(({
        message,
        username,
        time
      }, index) => {
        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
          className: (_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default().message),
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: (_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default().messageInner),
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
              className: (_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default().messageSender),
              children: [username, " - ", time]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 53,
              columnNumber: 17
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
              className: (_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default().messageBody),
              children: message
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 56,
              columnNumber: 17
            }, this)]
          }, index, true, {
            fileName: _jsxFileName,
            lineNumber: 52,
            columnNumber: 15
          }, this)
        }, index, false, {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 13
        }, this);
      }), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: messageEndRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default().messageBox),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("textarea", {
        rows: 1,
        placeholder: "Tell us what you are thinking",
        ref: newMessageRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
        onClick: handleSendMessage,
        children: "SEND"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 46,
    columnNumber: 5
  }, this);
}

/* harmony default export */ __webpack_exports__["default"] = (MessagesContainer);

/***/ }),

/***/ "./src/containers/Rooms.tsx":
/*!**********************************!*\
  !*** ./src/containers/Rooms.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/events */ "./src/config/events.ts");
/* harmony import */ var _context_socket_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/socket.context */ "./src/context/socket.context.tsx");
/* harmony import */ var _styles_Room_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/Room.module.css */ "./src/styles/Room.module.css");
/* harmony import */ var _styles_Room_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Room_module_css__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "C:\\Users\\Usuario\\Documents\\GitHub\\surveyvor\\surveyvor\\src\\containers\\Rooms.tsx";





function RoomsContainer() {
  const {
    socket,
    roomId,
    rooms
  } = (0,_context_socket_context__WEBPACK_IMPORTED_MODULE_3__.useSockets)();
  const newRoomRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  function handleCreateRoom() {
    //get the room name
    // @ts-ignore
    const roomName = newRoomRef.current.value || "";
    if (!String(roomName).trim()) return; // emit room created event

    socket.emit(_config_events__WEBPACK_IMPORTED_MODULE_2__.default.CLIENT.CREATE_ROOM, {
      roomName
    }); // set room name input to empty string
    // @ts-ignore

    newRoomRef.current.value = "";
  } // @ts-ignore


  function handleJoinRoom(key) {
    if (key === roomId) return;
    socket.emit(_config_events__WEBPACK_IMPORTED_MODULE_2__.default.CLIENT.JOIN_ROOM, key);
  }

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("nav", {
    className: (_styles_Room_module_css__WEBPACK_IMPORTED_MODULE_4___default().wrapper),
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Room_module_css__WEBPACK_IMPORTED_MODULE_4___default().createRoomWrapper),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
        ref: newRoomRef,
        placeholder: "Room name"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
        className: "cta",
        onClick: handleCreateRoom,
        children: "CREATE ROOM"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
      className: (_styles_Room_module_css__WEBPACK_IMPORTED_MODULE_4___default().roomList),
      children: Object.keys(rooms).map(key => {
        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
            disabled: key === roomId // @ts-ignore
            ,
            title: `Join ${rooms[key].name}`,
            onClick: () => handleJoinRoom(key),
            children: // @ts-ignore
            rooms[key].name
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 44,
            columnNumber: 15
          }, this)
        }, key, false, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 13
        }, this);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 32,
    columnNumber: 5
  }, this);
}

/* harmony default export */ __webpack_exports__["default"] = (RoomsContainer);

/***/ }),

/***/ "./src/context/socket.context.tsx":
/*!****************************************!*\
  !*** ./src/context/socket.context.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useSockets": function() { return /* binding */ useSockets; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "socket.io-client");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_default__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/default */ "./src/config/default.ts");
/* harmony import */ var _config_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config/events */ "./src/config/events.ts");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);

var _jsxFileName = "C:\\Users\\Usuario\\Documents\\GitHub\\surveyvor\\surveyvor\\src\\context\\socket.context.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // @ts-ignore





const socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2___default()(_config_default__WEBPACK_IMPORTED_MODULE_3__.SOCKET_URL);
const SocketContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: []
});

function SocketsProvider(props) {
  const {
    0: username,
    1: setUsername
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const {
    0: roomId,
    1: setRoomId
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const {
    0: rooms,
    1: setRooms
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const {
    0: messages,
    1: setMessages
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    window.onfocus = function () {
      document.title = "Surveyvor Chat";
    };
  }, []); //return all rooms created
  // @ts-ignore

  socket.on(_config_events__WEBPACK_IMPORTED_MODULE_4__.default.SERVER.ROOMS, value => {
    const token = localStorage.getItem("token");
    let headers = {
      headers: {
        'Authorization': token
      }
    };
    let chats;
    axios__WEBPACK_IMPORTED_MODULE_5___default().get("https://surveyvor.shocklogic.com/api/chat/mine", headers).then(d => {
      chats = d.data.chat;
    }); // @ts-ignore

    chats.map(c => {
      if (value[c.chat_id]) {
        setRooms(value);
      }
    });
    console.log(value);
  }); // @ts-ignore

  socket.on(_config_events__WEBPACK_IMPORTED_MODULE_4__.default.SERVER.JOINED_ROOM, value => {
    setRoomId(value);
    setMessages([]);
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // @ts-ignore
    socket.on(_config_events__WEBPACK_IMPORTED_MODULE_4__.default.SERVER.ROOM_MESSAGE, ({
      message,
      username,
      time
    }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      } // @ts-ignore


      setMessages(messages => [...messages, {
        message,
        username,
        time
      }]);
    });
  }, [socket]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SocketContext.Provider, _objectSpread({
    value: {
      socket,
      username,
      setUsername,
      rooms,
      roomId,
      messages,
      setMessages
    }
  }, props), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 85,
    columnNumber: 5
  }, this);
}

const useSockets = () => (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SocketContext);
/* harmony default export */ __webpack_exports__["default"] = (SocketsProvider);

/***/ }),

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Home; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/Home.module.css */ "./src/styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_socket_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/socket.context */ "./src/context/socket.context.tsx");
/* harmony import */ var _containers_Rooms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/Rooms */ "./src/containers/Rooms.tsx");
/* harmony import */ var _containers_Messages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/Messages */ "./src/containers/Messages.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "C:\\Users\\Usuario\\Documents\\GitHub\\surveyvor\\surveyvor\\src\\pages\\index.tsx";





function Home() {
  const {
    socket,
    username,
    setUsername
  } = (0,_context_socket_context__WEBPACK_IMPORTED_MODULE_1__.useSockets)();
  const usernameRef = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);

  function handleSetUsername() {
    // @ts-ignore
    const value = usernameRef.current.value;

    if (!value) {
      return;
    }

    setUsername(value);
    localStorage.setItem("username", value);
  }

  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (usernameRef) {
      // @ts-ignore
      usernameRef.current.value = localStorage.getItem("username") || "";
    }
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    children: [!username && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().usernameWrapper),
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().usernameInner),
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
          placeholder: "Username",
          ref: usernameRef
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 37,
          columnNumber: 13
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
          className: "cta",
          onClick: handleSetUsername,
          children: "START"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 13
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 9
    }, this), username && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().container),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_containers_Rooms__WEBPACK_IMPORTED_MODULE_2__.default, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 11
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_containers_Messages__WEBPACK_IMPORTED_MODULE_3__.default, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 11
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 33,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./src/styles/Home.module.css":
/*!************************************!*\
  !*** ./src/styles/Home.module.css ***!
  \************************************/
/***/ (function(module) {

// Exports
module.exports = {
	"container": "Home_container__sDexO",
	"usernameWrapper": "Home_usernameWrapper__3CP43",
	"usernameInner": "Home_usernameInner__3sUKx"
};


/***/ }),

/***/ "./src/styles/Messages.module.css":
/*!****************************************!*\
  !*** ./src/styles/Messages.module.css ***!
  \****************************************/
/***/ (function(module) {

// Exports
module.exports = {
	"wrapper": "Messages_wrapper__2L0hO",
	"messageList": "Messages_messageList__1-ozr",
	"messageBox": "Messages_messageBox__E8cIz",
	"message": "Messages_message__16-jH",
	"messageInner": "Messages_messageInner__2tiiz",
	"messageSender": "Messages_messageSender__-9FJD",
	"messageBody": "Messages_messageBody__2Z98K"
};


/***/ }),

/***/ "./src/styles/Room.module.css":
/*!************************************!*\
  !*** ./src/styles/Room.module.css ***!
  \************************************/
/***/ (function(module) {

// Exports
module.exports = {
	"wrapper": "Room_wrapper__ETPXp",
	"createRoomWrapper": "Room_createRoomWrapper__2Cdrw",
	"roomList": "Room_roomList__1f34t"
};


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ }),

/***/ "socket.io-client":
/*!***********************************!*\
  !*** external "socket.io-client" ***!
  \***********************************/
/***/ (function(module) {

"use strict";
module.exports = require("socket.io-client");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./src/pages/index.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdXJ2ZXl2b3IvLi9zcmMvY29uZmlnL2RlZmF1bHQudHMiLCJ3ZWJwYWNrOi8vc3VydmV5dm9yLy4vc3JjL2NvbmZpZy9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vc3VydmV5dm9yLy4vc3JjL2NvbnRhaW5lcnMvTWVzc2FnZXMudHN4Iiwid2VicGFjazovL3N1cnZleXZvci8uL3NyYy9jb250YWluZXJzL1Jvb21zLnRzeCIsIndlYnBhY2s6Ly9zdXJ2ZXl2b3IvLi9zcmMvY29udGV4dC9zb2NrZXQuY29udGV4dC50c3giLCJ3ZWJwYWNrOi8vc3VydmV5dm9yLy4vc3JjL3BhZ2VzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9zdXJ2ZXl2b3IvLi9zcmMvc3R5bGVzL0hvbWUubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly9zdXJ2ZXl2b3IvLi9zcmMvc3R5bGVzL01lc3NhZ2VzLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vc3VydmV5dm9yLy4vc3JjL3N0eWxlcy9Sb29tLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vc3VydmV5dm9yL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly9zdXJ2ZXl2b3IvZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL3N1cnZleXZvci9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovL3N1cnZleXZvci9leHRlcm5hbCBcInNvY2tldC5pby1jbGllbnRcIiJdLCJuYW1lcyI6WyJTT0NLRVRfVVJMIiwicHJvY2VzcyIsImVudiIsIkVWRU5UUyIsImNvbm5lY3Rpb24iLCJDTElFTlQiLCJDUkVBVEVfUk9PTSIsIlNFTkRfUk9PTV9NRVNTQUdFIiwiSk9JTl9ST09NIiwiU0VSVkVSIiwiUk9PTVMiLCJKT0lORURfUk9PTSIsIlJPT01fTUVTU0FHRSIsIk1lc3NhZ2VzQ29udGFpbmVyIiwic29ja2V0IiwibWVzc2FnZXMiLCJyb29tSWQiLCJ1c2VybmFtZSIsInNldE1lc3NhZ2VzIiwidXNlU29ja2V0cyIsIm5ld01lc3NhZ2VSZWYiLCJ1c2VSZWYiLCJtZXNzYWdlRW5kUmVmIiwiaGFuZGxlU2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwiY3VycmVudCIsInZhbHVlIiwiU3RyaW5nIiwidHJpbSIsImVtaXQiLCJkYXRlIiwiRGF0ZSIsInRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJ1c2VFZmZlY3QiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwic3R5bGVzIiwibWFwIiwiaW5kZXgiLCJSb29tc0NvbnRhaW5lciIsInJvb21zIiwibmV3Um9vbVJlZiIsImhhbmRsZUNyZWF0ZVJvb20iLCJyb29tTmFtZSIsImhhbmRsZUpvaW5Sb29tIiwia2V5IiwiT2JqZWN0Iiwia2V5cyIsIm5hbWUiLCJpbyIsIlNvY2tldENvbnRleHQiLCJjcmVhdGVDb250ZXh0Iiwic2V0VXNlcm5hbWUiLCJTb2NrZXRzUHJvdmlkZXIiLCJwcm9wcyIsInVzZVN0YXRlIiwic2V0Um9vbUlkIiwic2V0Um9vbXMiLCJ3aW5kb3ciLCJvbmZvY3VzIiwiZG9jdW1lbnQiLCJ0aXRsZSIsIm9uIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiaGVhZGVycyIsImNoYXRzIiwiYXhpb3MiLCJ0aGVuIiwiZCIsImRhdGEiLCJjaGF0IiwiYyIsImNoYXRfaWQiLCJjb25zb2xlIiwibG9nIiwiaGFzRm9jdXMiLCJ1c2VDb250ZXh0IiwiSG9tZSIsInVzZXJuYW1lUmVmIiwiaGFuZGxlU2V0VXNlcm5hbWUiLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFPLE1BQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlGLFVBQVosSUFBMEIsdUJBQTdDLEM7Ozs7Ozs7Ozs7OztBQ0FQLE1BQU1HLE1BQU0sR0FBRztBQUNiQyxZQUFVLEVBQUUsWUFEQztBQUViQyxRQUFNLEVBQUU7QUFDTkMsZUFBVyxFQUFFLGFBRFA7QUFFTkMscUJBQWlCLEVBQUUsbUJBRmI7QUFH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OERBQUMsc0RBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQURGLGVBRUUsOERBQUMseURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUZGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVpKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBb0JELEM7Ozs7Ozs7Ozs7QUNuREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDTEEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsOEMiLCJmaWxlIjoicGFnZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgU09DS0VUX1VSTCA9IHByb2Nlc3MuZW52LlNPQ0tFVF9VUkwgfHwgXCJodHRwOi8vbG9jYWxob3N0OjQwMDBcIjtcbiIsImNvbnN0IEVWRU5UUyA9IHtcbiAgY29ubmVjdGlvbjogXCJjb25uZWN0aW9uXCIsXG4gIENMSUVOVDoge1xuICAgIENSRUFURV9ST09NOiBcIkNSRUFURV9ST09NXCIsXG4gICAgU0VORF9ST09NX01FU1NBR0U6IFwiU0VORF9ST09NX01FU1NBR0VcIixcbiAgICBKT0lOX1JPT006IFwiSk9JTl9ST09NXCIsXG4gIH0sXG4gIFNFUlZFUjoge1xuICAgIFJPT01TOiBcIlJPT01TXCIsXG4gICAgSk9JTkVEX1JPT006IFwiSk9JTkVEX1JPT01cIixcbiAgICBST09NX01FU1NBR0U6IFwiUk9PTV9NRVNTQUdFXCIsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFVkVOVFM7XG4iLCJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEVWRU5UUyBmcm9tIFwiLi4vY29uZmlnL2V2ZW50c1wiO1xuaW1wb3J0IHsgdXNlU29ja2V0cyB9IGZyb20gXCIuLi9jb250ZXh0L3NvY2tldC5jb250ZXh0XCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvTWVzc2FnZXMubW9kdWxlLmNzc1wiO1xuXG5mdW5jdGlvbiBNZXNzYWdlc0NvbnRhaW5lcigpIHtcbiAgY29uc3QgeyBzb2NrZXQsIG1lc3NhZ2VzLCByb29tSWQsIHVzZXJuYW1lLCBzZXRNZXNzYWdlcyB9ID0gdXNlU29ja2V0cygpO1xuICBjb25zdCBuZXdNZXNzYWdlUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBtZXNzYWdlRW5kUmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZVNlbmRNZXNzYWdlKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBtZXNzYWdlID0gbmV3TWVzc2FnZVJlZi5jdXJyZW50LnZhbHVlO1xuXG4gICAgaWYgKCFTdHJpbmcobWVzc2FnZSkudHJpbSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc29ja2V0LmVtaXQoRVZFTlRTLkNMSUVOVC5TRU5EX1JPT01fTUVTU0FHRSwgeyByb29tSWQsIG1lc3NhZ2UsIHVzZXJuYW1lIH0pO1xuXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICBzZXRNZXNzYWdlcyhbXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAuLi5tZXNzYWdlcyxcbiAgICAgIHtcbiAgICAgICAgdXNlcm5hbWU6IFwiWW91XCIsXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIHRpbWU6IGAke2RhdGUuZ2V0SG91cnMoKX06JHtkYXRlLmdldE1pbnV0ZXMoKX1gLFxuICAgICAgfSxcbiAgICBdKTtcbiAgLy8gQHRzLWlnbm9yZVxuICAgIG5ld01lc3NhZ2VSZWYuY3VycmVudC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBtZXNzYWdlRW5kUmVmLmN1cnJlbnQ/LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gIH0sIFttZXNzYWdlc10pO1xuXG4gIGlmICghcm9vbUlkKSB7XG4gICAgcmV0dXJuIDxkaXYgLz47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMud3JhcHBlcn0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1lc3NhZ2VMaXN0fT5cbiAgICAgICAgey8vIEB0cy1pZ25vcmVcbiAgICAgICAgbWVzc2FnZXMubWFwKCh7IG1lc3NhZ2UsIHVzZXJuYW1lLCB0aW1lIH0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPXtzdHlsZXMubWVzc2FnZX0+XG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPXtzdHlsZXMubWVzc2FnZUlubmVyfT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5tZXNzYWdlU2VuZGVyfT5cbiAgICAgICAgICAgICAgICAgIHt1c2VybmFtZX0gLSB7dGltZX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMubWVzc2FnZUJvZHl9PnttZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgICAgPGRpdiByZWY9e21lc3NhZ2VFbmRSZWZ9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWVzc2FnZUJveH0+XG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIHJvd3M9ezF9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJUZWxsIHVzIHdoYXQgeW91IGFyZSB0aGlua2luZ1wiXG4gICAgICAgICAgcmVmPXtuZXdNZXNzYWdlUmVmfVxuICAgICAgICAvPlxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVNlbmRNZXNzYWdlfT5TRU5EPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZXNDb250YWluZXI7XG4iLCJpbXBvcnQgeyB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBFVkVOVFMgZnJvbSBcIi4uL2NvbmZpZy9ldmVudHNcIjtcbmltcG9ydCB7IHVzZVNvY2tldHMgfSBmcm9tIFwiLi4vY29udGV4dC9zb2NrZXQuY29udGV4dFwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vc3R5bGVzL1Jvb20ubW9kdWxlLmNzc1wiO1xuXG5mdW5jdGlvbiBSb29tc0NvbnRhaW5lcigpIHtcbiAgY29uc3QgeyBzb2NrZXQsIHJvb21JZCwgcm9vbXMgfSA9IHVzZVNvY2tldHMoKTtcbiAgY29uc3QgbmV3Um9vbVJlZiA9IHVzZVJlZihudWxsKTtcblxuICBmdW5jdGlvbiBoYW5kbGVDcmVhdGVSb29tKCkge1xuICAgIC8vZ2V0IHRoZSByb29tIG5hbWVcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3Qgcm9vbU5hbWUgPSBuZXdSb29tUmVmLmN1cnJlbnQudmFsdWUgfHwgXCJcIjtcblxuICAgIGlmICghU3RyaW5nKHJvb21OYW1lKS50cmltKCkpIHJldHVybjtcblxuICAgIC8vIGVtaXQgcm9vbSBjcmVhdGVkIGV2ZW50XG4gICAgc29ja2V0LmVtaXQoRVZFTlRTLkNMSUVOVC5DUkVBVEVfUk9PTSwgeyByb29tTmFtZSB9KTtcblxuICAgIC8vIHNldCByb29tIG5hbWUgaW5wdXQgdG8gZW1wdHkgc3RyaW5nXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIG5ld1Jvb21SZWYuY3VycmVudC52YWx1ZSA9IFwiXCI7XG4gIH1cbi8vIEB0cy1pZ25vcmVcbiAgZnVuY3Rpb24gaGFuZGxlSm9pblJvb20oa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gcm9vbUlkKSByZXR1cm47XG5cbiAgICBzb2NrZXQuZW1pdChFVkVOVFMuQ0xJRU5ULkpPSU5fUk9PTSwga2V5KTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPG5hdiBjbGFzc05hbWU9e3N0eWxlcy53cmFwcGVyfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY3JlYXRlUm9vbVdyYXBwZXJ9PlxuICAgICAgICA8aW5wdXQgcmVmPXtuZXdSb29tUmVmfSBwbGFjZWhvbGRlcj1cIlJvb20gbmFtZVwiIC8+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiY3RhXCIgb25DbGljaz17aGFuZGxlQ3JlYXRlUm9vbX0+XG4gICAgICAgICAgQ1JFQVRFIFJPT01cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHVsIGNsYXNzTmFtZT17c3R5bGVzLnJvb21MaXN0fT5cbiAgICAgICAge09iamVjdC5rZXlzKHJvb21zKS5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17a2V5fT5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtrZXkgPT09IHJvb21JZH1cbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdGl0bGU9e2BKb2luICR7cm9vbXNba2V5XS5uYW1lfWB9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlSm9pblJvb20oa2V5KX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgcm9vbXNba2V5XS5uYW1lfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC91bD5cbiAgICA8L25hdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9vbXNDb250YWluZXI7XG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgaW8sIHsgU29ja2V0IH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmltcG9ydCB7IFNPQ0tFVF9VUkwgfSBmcm9tIFwiLi4vY29uZmlnL2RlZmF1bHRcIjtcbmltcG9ydCBFVkVOVFMgZnJvbSBcIi4uL2NvbmZpZy9ldmVudHNcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IENoYXQgfSBmcm9tIFwiLi4vTW9kZWwvQ2hhdFwiO1xuXG5pbnRlcmZhY2UgQ29udGV4dCB7XG4gIHNvY2tldDogU29ja2V0O1xuICB1c2VybmFtZT86IHN0cmluZztcbiAgc2V0VXNlcm5hbWU6IEZ1bmN0aW9uO1xuICBtZXNzYWdlcz86IHsgbWVzc2FnZTogc3RyaW5nOyB0aW1lOiBzdHJpbmc7IHVzZXJuYW1lOiBzdHJpbmcgfVtdO1xuICBzZXRNZXNzYWdlczogRnVuY3Rpb247XG4gIHJvb21JZD86IHN0cmluZztcbiAgcm9vbXM6IG9iamVjdDtcbn1cblxuY29uc3Qgc29ja2V0ID0gaW8oU09DS0VUX1VSTCk7XG5cbmNvbnN0IFNvY2tldENvbnRleHQgPSBjcmVhdGVDb250ZXh0PENvbnRleHQ+KHtcbiAgc29ja2V0LFxuICBzZXRVc2VybmFtZTogKCkgPT4gZmFsc2UsXG4gIHNldE1lc3NhZ2VzOiAoKSA9PiBmYWxzZSxcbiAgcm9vbXM6IHt9LFxuICBtZXNzYWdlczogW10sXG59KTtcblxuZnVuY3Rpb24gU29ja2V0c1Byb3ZpZGVyKHByb3BzOiBhbnkpIHtcbiAgY29uc3QgW3VzZXJuYW1lLCBzZXRVc2VybmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3Jvb21JZCwgc2V0Um9vbUlkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcm9vbXMsIHNldFJvb21zXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZShbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3cub25mb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gXCJTdXJ2ZXl2b3IgQ2hhdFwiO1xuICAgIH07XG4gIH0sIFtdKTtcblxuXG4gIC8vcmV0dXJuIGFsbCByb29tcyBjcmVhdGVkXG4gIC8vIEB0cy1pZ25vcmVcbiAgc29ja2V0Lm9uKEVWRU5UUy5TRVJWRVIuUk9PTVMsICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSBhcyBzdHJpbmc7XG5cbiAgICBsZXQgaGVhZGVycyA9IHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IHRva2VuXG4gICAgICB9XG4gIH1cbiAgICBsZXQgY2hhdHM6Q2hhdDtcbiAgICBheGlvcy5nZXQoXCJodHRwczovL3N1cnZleXZvci5zaG9ja2xvZ2ljLmNvbS9hcGkvY2hhdC9taW5lXCIsaGVhZGVycykudGhlbigoZCk9PntcbiAgICAgIGNoYXRzID0gZC5kYXRhLmNoYXQ7XG4gICAgfSk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNoYXRzLm1hcCgoYykgPT57XG4gICAgICBpZih2YWx1ZVtjLmNoYXRfaWRdKXtcbiAgICAgICAgc2V0Um9vbXModmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICBcbiAgICBcbiAgfSk7XG4vLyBAdHMtaWdub3JlXG4gIHNvY2tldC5vbihFVkVOVFMuU0VSVkVSLkpPSU5FRF9ST09NLCAodmFsdWUpID0+IHtcbiAgICBcbiAgICBzZXRSb29tSWQodmFsdWUpO1xuXG4gICAgc2V0TWVzc2FnZXMoW10pO1xuICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4gey8vIEB0cy1pZ25vcmVcbiAgICBzb2NrZXQub24oRVZFTlRTLlNFUlZFUi5ST09NX01FU1NBR0UsICh7IG1lc3NhZ2UsIHVzZXJuYW1lLCB0aW1lIH0pID0+IHtcbiAgICAgIGlmICghZG9jdW1lbnQuaGFzRm9jdXMoKSkge1xuICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiTmV3IG1lc3NhZ2UuLi5cIjtcbiAgICAgIH1cbi8vIEB0cy1pZ25vcmVcbiAgICAgIHNldE1lc3NhZ2VzKChtZXNzYWdlcykgPT4gWy4uLm1lc3NhZ2VzLCB7IG1lc3NhZ2UsIHVzZXJuYW1lLCB0aW1lIH1dKTtcbiAgICB9KTtcbiAgfSwgW3NvY2tldF0pO1xuXG4gIHJldHVybiAoXG4gICAgPFNvY2tldENvbnRleHQuUHJvdmlkZXJcbiAgICAgIHZhbHVlPXt7XG4gICAgICAgIHNvY2tldCxcbiAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgIHNldFVzZXJuYW1lLFxuICAgICAgICByb29tcyxcbiAgICAgICAgcm9vbUlkLFxuICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgc2V0TWVzc2FnZXMsXG4gICAgICB9fVxuICAgICAgey4uLnByb3BzfVxuICAgIC8+XG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCB1c2VTb2NrZXRzID0gKCkgPT4gdXNlQ29udGV4dChTb2NrZXRDb250ZXh0KTtcblxuZXhwb3J0IGRlZmF1bHQgU29ja2V0c1Byb3ZpZGVyO1xuIiwiaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzXCI7XG5pbXBvcnQgeyB1c2VTb2NrZXRzIH0gZnJvbSBcIi4uL2NvbnRleHQvc29ja2V0LmNvbnRleHRcIjtcblxuaW1wb3J0IFJvb21zQ29udGFpbmVyIGZyb20gXCIuLi9jb250YWluZXJzL1Jvb21zXCI7XG5pbXBvcnQgTWVzc2FnZXNDb250YWluZXIgZnJvbSBcIi4uL2NvbnRhaW5lcnMvTWVzc2FnZXNcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IHsgc29ja2V0LCB1c2VybmFtZSwgc2V0VXNlcm5hbWUgfSA9IHVzZVNvY2tldHMoKTtcbiAgY29uc3QgdXNlcm5hbWVSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgZnVuY3Rpb24gaGFuZGxlU2V0VXNlcm5hbWUoKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgdmFsdWUgPSB1c2VybmFtZVJlZi5jdXJyZW50LnZhbHVlO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRVc2VybmFtZSh2YWx1ZSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJuYW1lXCIsIHZhbHVlKTtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgXG4gICAgaWYgKHVzZXJuYW1lUmVmKXsgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHVzZXJuYW1lUmVmLmN1cnJlbnQudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJuYW1lXCIpIHx8IFwiXCI7fVxuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgeyF1c2VybmFtZSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudXNlcm5hbWVXcmFwcGVyfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnVzZXJuYW1lSW5uZXJ9PlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiByZWY9e3VzZXJuYW1lUmVmfSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjdGFcIiBvbkNsaWNrPXtoYW5kbGVTZXRVc2VybmFtZX0+XG4gICAgICAgICAgICAgIFNUQVJUXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge3VzZXJuYW1lICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICAgIDxSb29tc0NvbnRhaW5lciAvPlxuICAgICAgICAgIDxNZXNzYWdlc0NvbnRhaW5lciAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJjb250YWluZXJcIjogXCJIb21lX2NvbnRhaW5lcl9fc0RleE9cIixcblx0XCJ1c2VybmFtZVdyYXBwZXJcIjogXCJIb21lX3VzZXJuYW1lV3JhcHBlcl9fM0NQNDNcIixcblx0XCJ1c2VybmFtZUlubmVyXCI6IFwiSG9tZV91c2VybmFtZUlubmVyX18zc1VLeFwiXG59O1xuIiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwid3JhcHBlclwiOiBcIk1lc3NhZ2VzX3dyYXBwZXJfXzJMMGhPXCIsXG5cdFwibWVzc2FnZUxpc3RcIjogXCJNZXNzYWdlc19tZXNzYWdlTGlzdF9fMS1venJcIixcblx0XCJtZXNzYWdlQm94XCI6IFwiTWVzc2FnZXNfbWVzc2FnZUJveF9fRThjSXpcIixcblx0XCJtZXNzYWdlXCI6IFwiTWVzc2FnZXNfbWVzc2FnZV9fMTYtakhcIixcblx0XCJtZXNzYWdlSW5uZXJcIjogXCJNZXNzYWdlc19tZXNzYWdlSW5uZXJfXzJ0aWl6XCIsXG5cdFwibWVzc2FnZVNlbmRlclwiOiBcIk1lc3NhZ2VzX21lc3NhZ2VTZW5kZXJfXy05RkpEXCIsXG5cdFwibWVzc2FnZUJvZHlcIjogXCJNZXNzYWdlc19tZXNzYWdlQm9keV9fMlo5OEtcIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcIndyYXBwZXJcIjogXCJSb29tX3dyYXBwZXJfX0VUUFhwXCIsXG5cdFwiY3JlYXRlUm9vbVdyYXBwZXJcIjogXCJSb29tX2NyZWF0ZVJvb21XcmFwcGVyX18yQ2Ryd1wiLFxuXHRcInJvb21MaXN0XCI6IFwiUm9vbV9yb29tTGlzdF9fMWYzNHRcIlxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpOzsiXSwic291cmNlUm9vdCI6IiJ9