(function() {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);

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
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useNavigate)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const token = localStorage.getItem("token");
    let headers = {
      headers: {
        'Authorization': token
      }
    };
    axios__WEBPACK_IMPORTED_MODULE_5___default().get("https://surveyvor.shocklogic.com/api/auth/me", headers).then(d => {
      console.log(d.data.first_name);
      setUsername(d.data.first_name);
    });
  }, []); //return all rooms created
  // @ts-ignore

  socket.on(_config_events__WEBPACK_IMPORTED_MODULE_4__.default.SERVER.ROOMS, async value => {
    let copyValue = [];
    const token = localStorage.getItem("token");
    let headers = {
      headers: {
        'Authorization': token
      }
    };
    let chats;
    await axios__WEBPACK_IMPORTED_MODULE_5___default().get("https://surveyvor.shocklogic.com/api/chat/mine", headers).then(d => {
      chats = d.data.chat;
      chats.map(c => {
        Object.values(value).map(el => {
          console.log(el.chat_id == c.chat_id);

          if (el.chat_id == c.chat_id) {
            copyValue[el.chat_id] = el;
          }
        });
      });
    }); // @ts-ignore

    setRooms(copyValue);
  }); // @ts-ignore

  socket.on(_config_events__WEBPACK_IMPORTED_MODULE_4__.default.SERVER.JOINED_ROOM, (value, messages) => {
    setRoomId(value);
    setMessages(messages);
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
    lineNumber: 104,
    columnNumber: 5
  }, this);
}

const useSockets = () => (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SocketContext);
/* harmony default export */ __webpack_exports__["default"] = (SocketsProvider);

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ "./src/styles/globals.css");
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_socket_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/socket.context */ "./src/context/socket.context.tsx");

var _jsxFileName = "C:\\Users\\Usuario\\Documents\\GitHub\\surveyvor\\surveyvor\\src\\pages\\_app.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // @ts-ignore

function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_socket_context__WEBPACK_IMPORTED_MODULE_2__.default, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

/* harmony default export */ __webpack_exports__["default"] = (MyApp);

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (function() {



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

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ (function(module) {

"use strict";
module.exports = require("react-router-dom");;

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
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdXJ2ZXl2b3IvLi9zcmMvY29uZmlnL2RlZmF1bHQudHMiLCJ3ZWJwYWNrOi8vc3VydmV5dm9yLy4vc3JjL2NvbmZpZy9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vc3VydmV5dm9yLy4vc3JjL2NvbnRleHQvc29ja2V0LmNvbnRleHQudHN4Iiwid2VicGFjazovL3N1cnZleXZvci8uL3NyYy9wYWdlcy9fYXBwLnRzeCIsIndlYnBhY2s6Ly9zdXJ2ZXl2b3IvZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovL3N1cnZleXZvci9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vc3VydmV5dm9yL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovL3N1cnZleXZvci9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovL3N1cnZleXZvci9leHRlcm5hbCBcInNvY2tldC5pby1jbGllbnRcIiJdLCJuYW1lcyI6WyJTT0NLRVRfVVJMIiwicHJvY2VzcyIsImVudiIsIkVWRU5UUyIsImNvbm5lY3Rpb24iLCJDTElFTlQiLCJDUkVBVEVfUk9PTSIsIlNFTkRfUk9PTV9NRVNTQUdFIiwiSk9JTl9ST09NIiwiU0VSVkVSIiwiUk9PTVMiLCJKT0lORURfUk9PTSIsIlJPT01fTUVTU0FHRSIsInNvY2tldCIsImlvIiwiU29ja2V0Q29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJzZXRVc2VybmFtZSIsInNldE1lc3NhZ2VzIiwicm9vbXMiLCJtZXNzYWdlcyIsIlNvY2tldHNQcm92aWRlciIsInByb3BzIiwidXNlcm5hbWUiLCJ1c2VTdGF0ZSIsInJvb21JZCIsInNldFJvb21JZCIsInNldFJvb21zIiwibmF2aWdhdGUiLCJ1c2VOYXZpZ2F0ZSIsInVzZUVmZmVjdCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImhlYWRlcnMiLCJheGlvcyIsInRoZW4iLCJkIiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJmaXJzdF9uYW1lIiwib24iLCJ2YWx1ZSIsImNvcHlWYWx1ZSIsImNoYXRzIiwiY2hhdCIsIm1hcCIsImMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJlbCIsImNoYXRfaWQiLCJtZXNzYWdlIiwidGltZSIsImRvY3VtZW50IiwiaGFzRm9jdXMiLCJ0aXRsZSIsInVzZVNvY2tldHMiLCJ1c2VDb250ZXh0IiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsVUFBWixJQUEwQix1QkFBN0MsQzs7Ozs7Ozs7Ozs7O0FDQVAsTUFBTUcsTUFBTSxHQUFHO0FBQ2JDLFlBQVUsRUFBRSxZQURDO0FBRWJDLFFBQU0sRUFBRTtBQUNOQyxlQUFXLEVBQUUsYUFEUDtBQUVOQyxxQkFBaUIsRUFBRSxtQkFGYjtBQUdOQyxhQUFTLEVBQUU7QUFITCxHQUZLO0FBT2JDLFFBQU0sRUFBRTtBQUNOQyxTQUFLLEVBQUUsT0FERDtBQUVOQyxlQUFXLEVBQUUsYUFGUDtBQUdOQyxnQkFBWSxFQUFFO0FBSFI7QUFQSyxDQUFmO0FBY0EsK0RBQWVULE1BQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NDYkE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQVlBLE1BQU1VLE1BQU0sR0FBR0MsdURBQUUsQ0FBQ2QsdURBQUQsQ0FBakI7QUFFQSxNQUFNZSxhQUFhLGdCQUFHQyxvREFBYSxDQUFVO0FBQzNDSCxRQUQyQztBQUUzQ0ksYUFBVyxFQUFFLE1BQU0sS0FGd0I7QUFHM0NDLGFBQVcsRUFBRSxNQUFNLEtBSHdCO0FBSTNDQyxPQUFLLEVBQUUsRUFKb0M7QUFLM0NDLFVBQVEsRUFBRTtBQUxpQyxDQUFWLENBQW5DOztBQVFBLFNBQVNDLGVBQVQsQ0FBeUJDLEtBQXpCLEVBQXFDO0FBQ25DLFFBQU07QUFBQSxPQUFDQyxRQUFEO0FBQUEsT0FB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QUFFaUMsZUFBRjtBQUFXOUIsZ0JBQVg7QUFBcUIrQjtBQUFyQixPQUFkLENBQWYsQ0FBWDtBQUNELEtBTkQ7QUFPRCxHQVJRLEVBUU4sQ0FBQ3pDLE1BQUQsQ0FSTSxDQUFUO0FBVUEsc0JBQ0UsOERBQUMsYUFBRCxDQUFlLFFBQWY7QUFDRSxTQUFLLEVBQUU7QUFDTEEsWUFESztBQUVMVSxjQUZLO0FBR0xOLGlCQUhLO0FBSUxFLFdBSks7QUFLTE0sWUFMSztBQU1MTCxjQU5LO0FBT0xGO0FBUEs7QUFEVCxLQVVNSSxLQVZOO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQWNEOztBQUVNLE1BQU1vQyxVQUFVLEdBQUcsTUFBTUMsaURBQVUsQ0FBQzVDLGFBQUQsQ0FBbkM7QUFFUCwrREFBZU0sZUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hIQTtDQUVFOztBQUNGLFNBQVN1QyxLQUFULENBQWU7QUFBRUMsV0FBRjtBQUFhQztBQUFiLENBQWYsRUFBeUM7QUFDdkMsc0JBQ0UsOERBQUMsNERBQUQ7QUFBQSwyQkFDRSw4REFBQyxTQUFELG9CQUFlQSxTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFLRDs7QUFFRCwrREFBZUYsS0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSw4QyIsImZpbGUiOiJwYWdlcy9fYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFNPQ0tFVF9VUkwgPSBwcm9jZXNzLmVudi5TT0NLRVRfVVJMIHx8IFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwXCI7XHJcbiIsImNvbnN0IEVWRU5UUyA9IHtcclxuICBjb25uZWN0aW9uOiBcImNvbm5lY3Rpb25cIixcclxuICBDTElFTlQ6IHtcclxuICAgIENSRUFURV9ST09NOiBcIkNSRUFURV9ST09NXCIsXHJcbiAgICBTRU5EX1JPT01fTUVTU0FHRTogXCJTRU5EX1JPT01fTUVTU0FHRVwiLFxyXG4gICAgSk9JTl9ST09NOiBcIkpPSU5fUk9PTVwiLFxyXG4gIH0sXHJcbiAgU0VSVkVSOiB7XHJcbiAgICBST09NUzogXCJST09NU1wiLFxyXG4gICAgSk9JTkVEX1JPT006IFwiSk9JTkVEX1JPT01cIixcclxuICAgIFJPT01fTUVTU0FHRTogXCJST09NX01FU1NBR0VcIixcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRVZFTlRTO1xyXG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbi8vIEB0cy1pZ25vcmVcclxuaW1wb3J0IGlvLCB7IFNvY2tldCB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XHJcbmltcG9ydCB7IFNPQ0tFVF9VUkwgfSBmcm9tIFwiLi4vY29uZmlnL2RlZmF1bHRcIjtcclxuaW1wb3J0IEVWRU5UUyBmcm9tIFwiLi4vY29uZmlnL2V2ZW50c1wiO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCB7IENoYXQgfSBmcm9tIFwiLi4vTW9kZWwvQ2hhdFwiO1xyXG5pbXBvcnQgeyBjb3VsZFN0YXJ0VHJpdmlhIH0gZnJvbSBcInR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5cclxuaW50ZXJmYWNlIENvbnRleHQge1xyXG4gIHNvY2tldDogU29ja2V0O1xyXG4gIHVzZXJuYW1lPzogc3RyaW5nO1xyXG4gIHNldFVzZXJuYW1lOiBGdW5jdGlvbjtcclxuICBtZXNzYWdlcz86IHsgbWVzc2FnZTogc3RyaW5nOyB0aW1lOiBzdHJpbmc7IHVzZXJuYW1lOiBzdHJpbmcgfVtdO1xyXG4gIHNldE1lc3NhZ2VzOiBGdW5jdGlvbjtcclxuICByb29tSWQ/OiBzdHJpbmc7XHJcbiAgcm9vbXM6IG9iamVjdDtcclxufVxyXG5cclxuY29uc3Qgc29ja2V0ID0gaW8oU09DS0VUX1VSTCk7XHJcblxyXG5jb25zdCBTb2NrZXRDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxDb250ZXh0Pih7XHJcbiAgc29ja2V0LFxyXG4gIHNldFVzZXJuYW1lOiAoKSA9PiBmYWxzZSxcclxuICBzZXRNZXNzYWdlczogKCkgPT4gZmFsc2UsXHJcbiAgcm9vbXM6IHt9LFxyXG4gIG1lc3NhZ2VzOiBbXSxcclxufSk7XHJcblxyXG5mdW5jdGlvbiBTb2NrZXRzUHJvdmlkZXIocHJvcHM6IGFueSkge1xyXG4gIGNvbnN0IFt1c2VybmFtZSwgc2V0VXNlcm5hbWVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3Jvb21JZCwgc2V0Um9vbUlkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtyb29tcywgc2V0Um9vbXNdID0gdXNlU3RhdGUoe30pO1xyXG4gIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSBhcyBzdHJpbmc7XHJcbiAgICBsZXQgaGVhZGVycyA9IHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiB0b2tlblxyXG4gICAgICB9XHJcbiAgfVxyXG4gICAgYXhpb3MuZ2V0KFwiaHR0cHM6Ly9zdXJ2ZXl2b3Iuc2hvY2tsb2dpYy5jb20vYXBpL2F1dGgvbWVcIixoZWFkZXJzKS50aGVuKChkKT0+e1xyXG4gICAgICBjb25zb2xlLmxvZyhkLmRhdGEuZmlyc3RfbmFtZSk7XHJcbiAgICAgIHNldFVzZXJuYW1lKGQuZGF0YS5maXJzdF9uYW1lKTtcclxuICAgIH0pO1xyXG5cclxuICB9LCBbXSk7XHJcblxyXG5cclxuICAvL3JldHVybiBhbGwgcm9vbXMgY3JlYXRlZFxyXG4gIC8vIEB0cy1pZ25vcmVcclxuICBzb2NrZXQub24oRVZFTlRTLlNFUlZFUi5ST09NUywgYXN5bmMgKHZhbHVlKSA9PiB7XHJcbiAgICBsZXQgY29weVZhbHVlOmFueSA9IFtdO1xyXG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpIGFzIHN0cmluZztcclxuXHJcbiAgICBsZXQgaGVhZGVycyA9IHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiB0b2tlblxyXG4gICAgICB9XHJcbiAgfVxyXG4gICAgbGV0IGNoYXRzOkFycmF5PENoYXQ+O1xyXG4gICAgYXdhaXQgYXhpb3MuZ2V0KFwiaHR0cHM6Ly9zdXJ2ZXl2b3Iuc2hvY2tsb2dpYy5jb20vYXBpL2NoYXQvbWluZVwiLGhlYWRlcnMpLnRoZW4oKGQpPT57XHJcbiAgICAgIGNoYXRzID0gZC5kYXRhLmNoYXQ7IFxyXG4gICAgICBcclxuICAgICAgY2hhdHMubWFwKChjKSA9PnsgXHJcblxyXG4gICAgICAgIE9iamVjdC52YWx1ZXModmFsdWUpLm1hcCgoZWw6YW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlbC5jaGF0X2lkPT1jLmNoYXRfaWQpO1xyXG4gICAgICAgICAgaWYoZWwuY2hhdF9pZD09Yy5jaGF0X2lkKXtcclxuICAgICAgICAgICAgY29weVZhbHVlW2VsLmNoYXRfaWRdID0gZWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgIHNldFJvb21zKGNvcHlWYWx1ZSk7XHJcbiAgIFxyXG4gICAgXHJcbiAgICBcclxuICB9KTtcclxuLy8gQHRzLWlnbm9yZVxyXG4gIHNvY2tldC5vbihFVkVOVFMuU0VSVkVSLkpPSU5FRF9ST09NLCAodmFsdWUsIG1lc3NhZ2VzKSA9PiB7XHJcbiAgICBcclxuICAgIHNldFJvb21JZCh2YWx1ZSk7XHJcblxyXG4gICAgc2V0TWVzc2FnZXMobWVzc2FnZXMpO1xyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4gey8vIEB0cy1pZ25vcmVcclxuICAgIHNvY2tldC5vbihFVkVOVFMuU0VSVkVSLlJPT01fTUVTU0FHRSwgKHsgbWVzc2FnZSwgdXNlcm5hbWUsIHRpbWUgfSkgPT4ge1xyXG4gICAgICBpZiAoIWRvY3VtZW50Lmhhc0ZvY3VzKCkpIHtcclxuICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiTmV3IG1lc3NhZ2UuLi5cIjtcclxuICAgICAgfVxyXG4vLyBAdHMtaWdub3JlXHJcbiAgICAgIHNldE1lc3NhZ2VzKChtZXNzYWdlcykgPT4gWy4uLm1lc3NhZ2VzLCB7IG1lc3NhZ2UsIHVzZXJuYW1lLCB0aW1lIH1dKTtcclxuICAgIH0pO1xyXG4gIH0sIFtzb2NrZXRdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxTb2NrZXRDb250ZXh0LlByb3ZpZGVyXHJcbiAgICAgIHZhbHVlPXt7XHJcbiAgICAgICAgc29ja2V0LFxyXG4gICAgICAgIHVzZXJuYW1lLFxyXG4gICAgICAgIHNldFVzZXJuYW1lLFxyXG4gICAgICAgIHJvb21zLFxyXG4gICAgICAgIHJvb21JZCxcclxuICAgICAgICBtZXNzYWdlcyxcclxuICAgICAgICBzZXRNZXNzYWdlcyxcclxuICAgICAgfX1cclxuICAgICAgey4uLnByb3BzfVxyXG4gICAgLz5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXNlU29ja2V0cyA9ICgpID0+IHVzZUNvbnRleHQoU29ja2V0Q29udGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTb2NrZXRzUHJvdmlkZXI7XHJcbiIsImltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xyXG5pbXBvcnQgU29ja2V0c1Byb3ZpZGVyIGZyb20gXCIuLi9jb250ZXh0L3NvY2tldC5jb250ZXh0XCI7XHJcbiAgLy8gQHRzLWlnbm9yZVxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPFNvY2tldHNQcm92aWRlcj5cclxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgPC9Tb2NrZXRzUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpOzsiXSwic291cmNlUm9vdCI6IiJ9