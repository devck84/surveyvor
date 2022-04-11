(function() {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./config/default.ts":
/*!***************************!*\
  !*** ./config/default.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SOCKET_URL": function() { return /* binding */ SOCKET_URL; }
/* harmony export */ });
const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:4000";

/***/ }),

/***/ "./config/events.ts":
/*!**************************!*\
  !*** ./config/events.ts ***!
  \**************************/
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

/***/ "./containers/Messages.tsx":
/*!*********************************!*\
  !*** ./containers/Messages.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/events */ "./config/events.ts");
/* harmony import */ var _context_socket_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/socket.context */ "./context/socket.context.tsx");
/* harmony import */ var _styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/Messages.module.css */ "./styles/Messages.module.css");
/* harmony import */ var _styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "C:\\Users\\Usuario\\Desktop\\Realtime-Chat-Application-main\\client\\containers\\Messages.tsx";





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
    setMessages([...messages, {
      username: "You",
      message,
      time: `${date.getHours()}:${date.getMinutes()}`
    }]);
    newMessageRef.current.value = "";
  }

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var _messageEndRef$curren;

    (_messageEndRef$curren = messageEndRef.current) === null || _messageEndRef$curren === void 0 ? void 0 : _messageEndRef$curren.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  if (!roomId) {
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 12
    }, this);
  }

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: (_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default().wrapper),
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default().messageList),
      children: [messages.map(({
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
              lineNumber: 49,
              columnNumber: 17
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
              className: (_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default().messageBody),
              children: message
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 52,
              columnNumber: 17
            }, this)]
          }, index, true, {
            fileName: _jsxFileName,
            lineNumber: 48,
            columnNumber: 15
          }, this)
        }, index, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 13
        }, this);
      }), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: messageEndRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Messages_module_css__WEBPACK_IMPORTED_MODULE_4___default().messageBox),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("textarea", {
        rows: 1,
        placeholder: "Tell us what you are thinking",
        ref: newMessageRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
        onClick: handleSendMessage,
        children: "SEND"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 43,
    columnNumber: 5
  }, this);
}

/* harmony default export */ __webpack_exports__["default"] = (MessagesContainer);

/***/ }),

/***/ "./containers/Rooms.tsx":
/*!******************************!*\
  !*** ./containers/Rooms.tsx ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/events */ "./config/events.ts");
/* harmony import */ var _context_socket_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/socket.context */ "./context/socket.context.tsx");
/* harmony import */ var _styles_Room_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/Room.module.css */ "./styles/Room.module.css");
/* harmony import */ var _styles_Room_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Room_module_css__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "C:\\Users\\Usuario\\Desktop\\Realtime-Chat-Application-main\\client\\containers\\Rooms.tsx";





function RoomsContainer() {
  const {
    socket,
    roomId,
    rooms
  } = (0,_context_socket_context__WEBPACK_IMPORTED_MODULE_3__.useSockets)();
  const newRoomRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  function handleCreateRoom() {
    //get the room name
    const roomName = newRoomRef.current.value || "";
    if (!String(roomName).trim()) return; // emit room created event

    socket.emit(_config_events__WEBPACK_IMPORTED_MODULE_2__.default.CLIENT.CREATE_ROOM, {
      roomName
    }); // set room name input to empty string

    newRoomRef.current.value = "";
  }

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
        lineNumber: 32,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
        className: "cta",
        onClick: handleCreateRoom,
        children: "CREATE ROOM"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
      className: (_styles_Room_module_css__WEBPACK_IMPORTED_MODULE_4___default().roomList),
      children: Object.keys(rooms).map(key => {
        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
            disabled: key === roomId,
            title: `Join ${rooms[key].name}`,
            onClick: () => handleJoinRoom(key),
            children: rooms[key].name
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 42,
            columnNumber: 15
          }, this)
        }, key, false, {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 13
        }, this);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 30,
    columnNumber: 5
  }, this);
}

/* harmony default export */ __webpack_exports__["default"] = (RoomsContainer);

/***/ }),

/***/ "./context/socket.context.tsx":
/*!************************************!*\
  !*** ./context/socket.context.tsx ***!
  \************************************/
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
/* harmony import */ var _config_default__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/default */ "./config/default.ts");
/* harmony import */ var _config_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config/events */ "./config/events.ts");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);

var _jsxFileName = "C:\\Users\\Usuario\\Desktop\\Realtime-Chat-Application-main\\client\\context\\socket.context.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






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

  socket.on(_config_events__WEBPACK_IMPORTED_MODULE_4__.default.SERVER.ROOMS, value => {
    let chats;
    axios__WEBPACK_IMPORTED_MODULE_5___default().get("https://surveyvor.shocklogic.com/api/chat/mine").then(d => {
      chats = d.data.chat;
    });
    chats.map(c => {
      if (value[c.chat_id]) {
        setRooms(value);
      }
    });
    console.log(value);
  });
  socket.on(_config_events__WEBPACK_IMPORTED_MODULE_4__.default.SERVER.JOINED_ROOM, value => {
    setRoomId(value);
    setMessages([]);
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    socket.on(_config_events__WEBPACK_IMPORTED_MODULE_4__.default.SERVER.ROOM_MESSAGE, ({
      message,
      username,
      time
    }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }

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
    lineNumber: 74,
    columnNumber: 5
  }, this);
}

const useSockets = () => (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SocketContext);
/* harmony default export */ __webpack_exports__["default"] = (SocketsProvider);

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Home; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_socket_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/socket.context */ "./context/socket.context.tsx");
/* harmony import */ var _containers_Rooms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/Rooms */ "./containers/Rooms.tsx");
/* harmony import */ var _containers_Messages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/Messages */ "./containers/Messages.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "C:\\Users\\Usuario\\Desktop\\Realtime-Chat-Application-main\\client\\pages\\index.tsx";





function Home() {
  const {
    socket,
    username,
    setUsername
  } = (0,_context_socket_context__WEBPACK_IMPORTED_MODULE_1__.useSockets)();
  const usernameRef = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);

  function handleSetUsername() {
    const value = usernameRef.current.value;

    if (!value) {
      return;
    }

    setUsername(value);
    localStorage.setItem("username", value);
  }

  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (usernameRef) usernameRef.current.value = localStorage.getItem("username") || "";
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
          lineNumber: 35,
          columnNumber: 13
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
          className: "cta",
          onClick: handleSetUsername,
          children: "START"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 36,
          columnNumber: 13
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 9
    }, this), username && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().container),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_containers_Rooms__WEBPACK_IMPORTED_MODULE_2__.default, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 11
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_containers_Messages__WEBPACK_IMPORTED_MODULE_3__.default, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 11
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 31,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./styles/Home.module.css":
/*!********************************!*\
  !*** ./styles/Home.module.css ***!
  \********************************/
/***/ (function(module) {

// Exports
module.exports = {
	"container": "Home_container__1EcsU",
	"usernameWrapper": "Home_usernameWrapper__3cLpt",
	"usernameInner": "Home_usernameInner__3F08m"
};


/***/ }),

/***/ "./styles/Messages.module.css":
/*!************************************!*\
  !*** ./styles/Messages.module.css ***!
  \************************************/
/***/ (function(module) {

// Exports
module.exports = {
	"wrapper": "Messages_wrapper__312_c",
	"messageList": "Messages_messageList__1ZE5R",
	"messageBox": "Messages_messageBox__3fTYE",
	"message": "Messages_message__3em4Z",
	"messageInner": "Messages_messageInner__2ymHE",
	"messageSender": "Messages_messageSender__1ui79",
	"messageBody": "Messages_messageBody__YoKWY"
};


/***/ }),

/***/ "./styles/Room.module.css":
/*!********************************!*\
  !*** ./styles/Room.module.css ***!
  \********************************/
/***/ (function(module) {

// Exports
module.exports = {
	"wrapper": "Room_wrapper__3d5VN",
	"createRoomWrapper": "Room_createRoomWrapper__2ex4H",
	"roomList": "Room_roomList__3Gdxf"
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
var __webpack_exports__ = (__webpack_exec__("./pages/index.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9jb25maWcvZGVmYXVsdC50cyIsIndlYnBhY2s6Ly9jbGllbnQvLi9jb25maWcvZXZlbnRzLnRzIiwid2VicGFjazovL2NsaWVudC8uL2NvbnRhaW5lcnMvTWVzc2FnZXMudHN4Iiwid2VicGFjazovL2NsaWVudC8uL2NvbnRhaW5lcnMvUm9vbXMudHN4Iiwid2VicGFjazovL2NsaWVudC8uL2NvbnRleHQvc29ja2V0LmNvbnRleHQudHN4Iiwid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9jbGllbnQvLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzIiwid2VicGFjazovL2NsaWVudC8uL3N0eWxlcy9NZXNzYWdlcy5tb2R1bGUuY3NzIiwid2VicGFjazovL2NsaWVudC8uL3N0eWxlcy9Sb29tLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vY2xpZW50L2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly9jbGllbnQvZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL2NsaWVudC9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovL2NsaWVudC9leHRlcm5hbCBcInNvY2tldC5pby1jbGllbnRcIiJdLCJuYW1lcyI6WyJTT0NLRVRfVVJMIiwicHJvY2VzcyIsImVudiIsIkVWRU5UUyIsImNvbm5lY3Rpb24iLCJDTElFTlQiLCJDUkVBVEVfUk9PTSIsIlNFTkRfUk9PTV9NRVNTQUdFIiwiSk9JTl9ST09NIiwiU0VSVkVSIiwiUk9PTVMiLCJKT0lORURfUk9PTSIsIlJPT01fTUVTU0FHRSIsIk1lc3NhZ2VzQ29udGFpbmVyIiwic29ja2V0IiwibWVzc2FnZXMiLCJyb29tSWQiLCJ1c2VybmFtZSIsInNldE1lc3NhZ2VzIiwidXNlU29ja2V0cyIsIm5ld01lc3NhZ2VSZWYiLCJ1c2VSZWYiLCJtZXNzYWdlRW5kUmVmIiwiaGFuZGxlU2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwiY3VycmVudCIsInZhbHVlIiwiU3RyaW5nIiwidHJpbSIsImVtaXQiLCJkYXRlIiwiRGF0ZSIsInRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJ1c2VFZmZlY3QiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwic3R5bGVzIiwibWFwIiwiaW5kZXgiLCJSb29tc0NvbnRhaW5lciIsInJvb21zIiwibmV3Um9vbVJlZiIsImhhbmRsZUNyZWF0ZVJvb20iLCJyb29tTmFtZSIsImhhbmRsZUpvaW5Sb29tIiwia2V5IiwiT2JqZWN0Iiwia2V5cyIsIm5hbWUiLCJpbyIsIlNvY2tldENvbnRleHQiLCJjcmVhdGVDb250ZXh0Iiwic2V0VXNlcm5hbWUiLCJTb2NrZXRzUHJvdmlkZXIiLCJwcm9wcyIsInVzZVN0YXRlIiwic2V0Um9vbUlkIiwic2V0Um9vbXMiLCJ3aW5kb3ciLCJvbmZvY3VzIiwiZG9jdW1lbnQiLCJ0aXRsZSIsIm9uIiwiY2hhdHMiLCJheGlvcyIsInRoZW4iLCJkIiwiZGF0YSIsImNoYXQiLCJjIiwiY2hhdF9pZCIsImNvbnNvbGUiLCJsb2ciLCJoYXNGb2N1cyIsInVzZUNvbnRleHQiLCJIb21lIiwidXNlcm5hbWVSZWYiLCJoYW5kbGVTZXRVc2VybmFtZSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFPLE1BQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlGLFVBQVosSUFBMEIsdUJBQTdDLEM7Ozs7Ozs7Ozs7OztBQ0FQLE1BQU1HLE1BQU0sR0FBRztBQUNiQyxZQUFVLEVBQUUsWUFEQztBQUViQyxRQUFNLEVBQUU7QUFDTkMsZUFBVyxFQUFFLGFBRFA7QUFFTkMscUJBQWlCLEVBQUUsbUJBRmI7QUFHTkMsYUFBUyxFQUFFO0FBSEwsR0FGSztBQU9iQyxRQUFNLEVBQUU7QUFDTkMsU0FBSyxFQUFFLE9BREQ7QUFFTkMsZUFBVyxFQUFFLGFBRlA7QUFHTkMsZ0JBQVks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cyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBTT0NLRVRfVVJMID0gcHJvY2Vzcy5lbnYuU09DS0VUX1VSTCB8fCBcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMFwiO1xuIiwiY29uc3QgRVZFTlRTID0ge1xuICBjb25uZWN0aW9uOiBcImNvbm5lY3Rpb25cIixcbiAgQ0xJRU5UOiB7XG4gICAgQ1JFQVRFX1JPT006IFwiQ1JFQVRFX1JPT01cIixcbiAgICBTRU5EX1JPT01fTUVTU0FHRTogXCJTRU5EX1JPT01fTUVTU0FHRVwiLFxuICAgIEpPSU5fUk9PTTogXCJKT0lOX1JPT01cIixcbiAgfSxcbiAgU0VSVkVSOiB7XG4gICAgUk9PTVM6IFwiUk9PTVNcIixcbiAgICBKT0lORURfUk9PTTogXCJKT0lORURfUk9PTVwiLFxuICAgIFJPT01fTUVTU0FHRTogXCJST09NX01FU1NBR0VcIixcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVWRU5UUztcbiIsImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRVZFTlRTIGZyb20gXCIuLi9jb25maWcvZXZlbnRzXCI7XG5pbXBvcnQgeyB1c2VTb2NrZXRzIH0gZnJvbSBcIi4uL2NvbnRleHQvc29ja2V0LmNvbnRleHRcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9NZXNzYWdlcy5tb2R1bGUuY3NzXCI7XG5cbmZ1bmN0aW9uIE1lc3NhZ2VzQ29udGFpbmVyKCkge1xuICBjb25zdCB7IHNvY2tldCwgbWVzc2FnZXMsIHJvb21JZCwgdXNlcm5hbWUsIHNldE1lc3NhZ2VzIH0gPSB1c2VTb2NrZXRzKCk7XG4gIGNvbnN0IG5ld01lc3NhZ2VSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IG1lc3NhZ2VFbmRSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgZnVuY3Rpb24gaGFuZGxlU2VuZE1lc3NhZ2UoKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IG5ld01lc3NhZ2VSZWYuY3VycmVudC52YWx1ZTtcblxuICAgIGlmICghU3RyaW5nKG1lc3NhZ2UpLnRyaW0oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNvY2tldC5lbWl0KEVWRU5UUy5DTElFTlQuU0VORF9ST09NX01FU1NBR0UsIHsgcm9vbUlkLCBtZXNzYWdlLCB1c2VybmFtZSB9KTtcblxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgc2V0TWVzc2FnZXMoW1xuICAgICAgLi4ubWVzc2FnZXMsXG4gICAgICB7XG4gICAgICAgIHVzZXJuYW1lOiBcIllvdVwiLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICB0aW1lOiBgJHtkYXRlLmdldEhvdXJzKCl9OiR7ZGF0ZS5nZXRNaW51dGVzKCl9YCxcbiAgICAgIH0sXG4gICAgXSk7XG5cbiAgICBuZXdNZXNzYWdlUmVmLmN1cnJlbnQudmFsdWUgPSBcIlwiO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBtZXNzYWdlRW5kUmVmLmN1cnJlbnQ/LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gIH0sIFttZXNzYWdlc10pO1xuXG4gIGlmICghcm9vbUlkKSB7XG4gICAgcmV0dXJuIDxkaXYgLz47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMud3JhcHBlcn0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1lc3NhZ2VMaXN0fT5cbiAgICAgICAge21lc3NhZ2VzLm1hcCgoeyBtZXNzYWdlLCB1c2VybmFtZSwgdGltZSB9LCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT17c3R5bGVzLm1lc3NhZ2V9PlxuICAgICAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT17c3R5bGVzLm1lc3NhZ2VJbm5lcn0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMubWVzc2FnZVNlbmRlcn0+XG4gICAgICAgICAgICAgICAgICB7dXNlcm5hbWV9IC0ge3RpbWV9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLm1lc3NhZ2VCb2R5fT57bWVzc2FnZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICAgIDxkaXYgcmVmPXttZXNzYWdlRW5kUmVmfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1lc3NhZ2VCb3h9PlxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICByb3dzPXsxfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVGVsbCB1cyB3aGF0IHlvdSBhcmUgdGhpbmtpbmdcIlxuICAgICAgICAgIHJlZj17bmV3TWVzc2FnZVJlZn1cbiAgICAgICAgLz5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVTZW5kTWVzc2FnZX0+U0VORDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VzQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRVZFTlRTIGZyb20gXCIuLi9jb25maWcvZXZlbnRzXCI7XG5pbXBvcnQgeyB1c2VTb2NrZXRzIH0gZnJvbSBcIi4uL2NvbnRleHQvc29ja2V0LmNvbnRleHRcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9Sb29tLm1vZHVsZS5jc3NcIjtcblxuZnVuY3Rpb24gUm9vbXNDb250YWluZXIoKSB7XG4gIGNvbnN0IHsgc29ja2V0LCByb29tSWQsIHJvb21zIH0gPSB1c2VTb2NrZXRzKCk7XG4gIGNvbnN0IG5ld1Jvb21SZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlUm9vbSgpIHtcbiAgICAvL2dldCB0aGUgcm9vbSBuYW1lXG4gICAgY29uc3Qgcm9vbU5hbWUgPSBuZXdSb29tUmVmLmN1cnJlbnQudmFsdWUgfHwgXCJcIjtcblxuICAgIGlmICghU3RyaW5nKHJvb21OYW1lKS50cmltKCkpIHJldHVybjtcblxuICAgIC8vIGVtaXQgcm9vbSBjcmVhdGVkIGV2ZW50XG4gICAgc29ja2V0LmVtaXQoRVZFTlRTLkNMSUVOVC5DUkVBVEVfUk9PTSwgeyByb29tTmFtZSB9KTtcblxuICAgIC8vIHNldCByb29tIG5hbWUgaW5wdXQgdG8gZW1wdHkgc3RyaW5nXG4gICAgbmV3Um9vbVJlZi5jdXJyZW50LnZhbHVlID0gXCJcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUpvaW5Sb29tKGtleSkge1xuICAgIGlmIChrZXkgPT09IHJvb21JZCkgcmV0dXJuO1xuXG4gICAgc29ja2V0LmVtaXQoRVZFTlRTLkNMSUVOVC5KT0lOX1JPT00sIGtleSk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxuYXYgY2xhc3NOYW1lPXtzdHlsZXMud3JhcHBlcn0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNyZWF0ZVJvb21XcmFwcGVyfT5cbiAgICAgICAgPGlucHV0IHJlZj17bmV3Um9vbVJlZn0gcGxhY2Vob2xkZXI9XCJSb29tIG5hbWVcIiAvPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImN0YVwiIG9uQ2xpY2s9e2hhbmRsZUNyZWF0ZVJvb219PlxuICAgICAgICAgIENSRUFURSBST09NXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDx1bCBjbGFzc05hbWU9e3N0eWxlcy5yb29tTGlzdH0+XG4gICAgICAgIHtPYmplY3Qua2V5cyhyb29tcykubWFwKChrZXkpID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9e2tleX0+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17a2V5ID09PSByb29tSWR9XG4gICAgICAgICAgICAgICAgdGl0bGU9e2BKb2luICR7cm9vbXNba2V5XS5uYW1lfWB9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlSm9pblJvb20oa2V5KX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtyb29tc1trZXldLm5hbWV9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L3VsPlxuICAgIDwvbmF2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBSb29tc0NvbnRhaW5lcjtcbiIsImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBpbywgeyBTb2NrZXQgfSBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgU09DS0VUX1VSTCB9IGZyb20gXCIuLi9jb25maWcvZGVmYXVsdFwiO1xuaW1wb3J0IEVWRU5UUyBmcm9tIFwiLi4vY29uZmlnL2V2ZW50c1wiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5pbnRlcmZhY2UgQ29udGV4dCB7XG4gIHNvY2tldDogU29ja2V0O1xuICB1c2VybmFtZT86IHN0cmluZztcbiAgc2V0VXNlcm5hbWU6IEZ1bmN0aW9uO1xuICBtZXNzYWdlcz86IHsgbWVzc2FnZTogc3RyaW5nOyB0aW1lOiBzdHJpbmc7IHVzZXJuYW1lOiBzdHJpbmcgfVtdO1xuICBzZXRNZXNzYWdlczogRnVuY3Rpb247XG4gIHJvb21JZD86IHN0cmluZztcbiAgcm9vbXM6IG9iamVjdDtcbn1cblxuY29uc3Qgc29ja2V0ID0gaW8oU09DS0VUX1VSTCk7XG5cbmNvbnN0IFNvY2tldENvbnRleHQgPSBjcmVhdGVDb250ZXh0PENvbnRleHQ+KHtcbiAgc29ja2V0LFxuICBzZXRVc2VybmFtZTogKCkgPT4gZmFsc2UsXG4gIHNldE1lc3NhZ2VzOiAoKSA9PiBmYWxzZSxcbiAgcm9vbXM6IHt9LFxuICBtZXNzYWdlczogW10sXG59KTtcblxuZnVuY3Rpb24gU29ja2V0c1Byb3ZpZGVyKHByb3BzOiBhbnkpIHtcbiAgY29uc3QgW3VzZXJuYW1lLCBzZXRVc2VybmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3Jvb21JZCwgc2V0Um9vbUlkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcm9vbXMsIHNldFJvb21zXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZShbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3cub25mb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gXCJTdXJ2ZXl2b3IgQ2hhdFwiO1xuICAgIH07XG4gIH0sIFtdKTtcblxuXG4gIC8vcmV0dXJuIGFsbCByb29tcyBjcmVhdGVkXG4gIHNvY2tldC5vbihFVkVOVFMuU0VSVkVSLlJPT01TLCAodmFsdWUpID0+IHtcbiAgICBsZXQgY2hhdHM6YW55O1xuICAgIGF4aW9zLmdldChcImh0dHBzOi8vc3VydmV5dm9yLnNob2NrbG9naWMuY29tL2FwaS9jaGF0L21pbmVcIikudGhlbigoZCk9PntcbiAgICAgIGNoYXRzID0gZC5kYXRhLmNoYXQ7XG4gICAgfSk7XG4gICAgY2hhdHMubWFwKChjKSA9PntcbiAgICAgIGlmKHZhbHVlW2MuY2hhdF9pZF0pe1xuICAgICAgICBzZXRSb29tcyh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgIFxuICAgIFxuICB9KTtcblxuICBzb2NrZXQub24oRVZFTlRTLlNFUlZFUi5KT0lORURfUk9PTSwgKHZhbHVlKSA9PiB7XG4gICAgXG4gICAgc2V0Um9vbUlkKHZhbHVlKTtcblxuICAgIHNldE1lc3NhZ2VzKFtdKTtcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzb2NrZXQub24oRVZFTlRTLlNFUlZFUi5ST09NX01FU1NBR0UsICh7IG1lc3NhZ2UsIHVzZXJuYW1lLCB0aW1lIH0pID0+IHtcbiAgICAgIGlmICghZG9jdW1lbnQuaGFzRm9jdXMoKSkge1xuICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiTmV3IG1lc3NhZ2UuLi5cIjtcbiAgICAgIH1cblxuICAgICAgc2V0TWVzc2FnZXMoKG1lc3NhZ2VzKSA9PiBbLi4ubWVzc2FnZXMsIHsgbWVzc2FnZSwgdXNlcm5hbWUsIHRpbWUgfV0pO1xuICAgIH0pO1xuICB9LCBbc29ja2V0XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U29ja2V0Q29udGV4dC5Qcm92aWRlclxuICAgICAgdmFsdWU9e3tcbiAgICAgICAgc29ja2V0LFxuICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgc2V0VXNlcm5hbWUsXG4gICAgICAgIHJvb21zLFxuICAgICAgICByb29tSWQsXG4gICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICBzZXRNZXNzYWdlcyxcbiAgICAgIH19XG4gICAgICB7Li4ucHJvcHN9XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNvY2tldHMgPSAoKSA9PiB1c2VDb250ZXh0KFNvY2tldENvbnRleHQpO1xuXG5leHBvcnQgZGVmYXVsdCBTb2NrZXRzUHJvdmlkZXI7XG4iLCJpbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9Ib21lLm1vZHVsZS5jc3NcIjtcbmltcG9ydCB7IHVzZVNvY2tldHMgfSBmcm9tIFwiLi4vY29udGV4dC9zb2NrZXQuY29udGV4dFwiO1xuXG5pbXBvcnQgUm9vbXNDb250YWluZXIgZnJvbSBcIi4uL2NvbnRhaW5lcnMvUm9vbXNcIjtcbmltcG9ydCBNZXNzYWdlc0NvbnRhaW5lciBmcm9tIFwiLi4vY29udGFpbmVycy9NZXNzYWdlc1wiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgeyBzb2NrZXQsIHVzZXJuYW1lLCBzZXRVc2VybmFtZSB9ID0gdXNlU29ja2V0cygpO1xuICBjb25zdCB1c2VybmFtZVJlZiA9IHVzZVJlZihudWxsKTtcblxuICBmdW5jdGlvbiBoYW5kbGVTZXRVc2VybmFtZSgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHVzZXJuYW1lUmVmLmN1cnJlbnQudmFsdWU7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFVzZXJuYW1lKHZhbHVlKTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlcm5hbWVcIiwgdmFsdWUpO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodXNlcm5hbWVSZWYpXG4gICAgICB1c2VybmFtZVJlZi5jdXJyZW50LnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VybmFtZVwiKSB8fCBcIlwiO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgeyF1c2VybmFtZSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudXNlcm5hbWVXcmFwcGVyfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnVzZXJuYW1lSW5uZXJ9PlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiByZWY9e3VzZXJuYW1lUmVmfSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjdGFcIiBvbkNsaWNrPXtoYW5kbGVTZXRVc2VybmFtZX0+XG4gICAgICAgICAgICAgIFNUQVJUXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge3VzZXJuYW1lICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICAgIDxSb29tc0NvbnRhaW5lciAvPlxuICAgICAgICAgIDxNZXNzYWdlc0NvbnRhaW5lciAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJjb250YWluZXJcIjogXCJIb21lX2NvbnRhaW5lcl9fMUVjc1VcIixcblx0XCJ1c2VybmFtZVdyYXBwZXJcIjogXCJIb21lX3VzZXJuYW1lV3JhcHBlcl9fM2NMcHRcIixcblx0XCJ1c2VybmFtZUlubmVyXCI6IFwiSG9tZV91c2VybmFtZUlubmVyX18zRjA4bVwiXG59O1xuIiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwid3JhcHBlclwiOiBcIk1lc3NhZ2VzX3dyYXBwZXJfXzMxMl9jXCIsXG5cdFwibWVzc2FnZUxpc3RcIjogXCJNZXNzYWdlc19tZXNzYWdlTGlzdF9fMVpFNVJcIixcblx0XCJtZXNzYWdlQm94XCI6IFwiTWVzc2FnZXNfbWVzc2FnZUJveF9fM2ZUWUVcIixcblx0XCJtZXNzYWdlXCI6IFwiTWVzc2FnZXNfbWVzc2FnZV9fM2VtNFpcIixcblx0XCJtZXNzYWdlSW5uZXJcIjogXCJNZXNzYWdlc19tZXNzYWdlSW5uZXJfXzJ5bUhFXCIsXG5cdFwibWVzc2FnZVNlbmRlclwiOiBcIk1lc3NhZ2VzX21lc3NhZ2VTZW5kZXJfXzF1aTc5XCIsXG5cdFwibWVzc2FnZUJvZHlcIjogXCJNZXNzYWdlc19tZXNzYWdlQm9keV9fWW9LV1lcIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcIndyYXBwZXJcIjogXCJSb29tX3dyYXBwZXJfXzNkNVZOXCIsXG5cdFwiY3JlYXRlUm9vbVdyYXBwZXJcIjogXCJSb29tX2NyZWF0ZVJvb21XcmFwcGVyX18yZXg0SFwiLFxuXHRcInJvb21MaXN0XCI6IFwiUm9vbV9yb29tTGlzdF9fM0dkeGZcIlxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpOzsiXSwic291cmNlUm9vdCI6IiJ9