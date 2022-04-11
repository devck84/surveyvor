(function() {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
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

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ "./styles/globals.css");
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_socket_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/socket.context */ "./context/socket.context.tsx");

var _jsxFileName = "C:\\Users\\Usuario\\Desktop\\Realtime-Chat-Application-main\\client\\pages\\_app.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




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

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
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
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9jb25maWcvZGVmYXVsdC50cyIsIndlYnBhY2s6Ly9jbGllbnQvLi9jb25maWcvZXZlbnRzLnRzIiwid2VicGFjazovL2NsaWVudC8uL2NvbnRleHQvc29ja2V0LmNvbnRleHQudHN4Iiwid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovL2NsaWVudC9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vY2xpZW50L2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly9jbGllbnQvZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly9jbGllbnQvZXh0ZXJuYWwgXCJzb2NrZXQuaW8tY2xpZW50XCIiXSwibmFtZXMiOlsiU09DS0VUX1VSTCIsInByb2Nlc3MiLCJlbnYiLCJFVkVOVFMiLCJjb25uZWN0aW9uIiwiQ0xJRU5UIiwiQ1JFQVRFX1JPT00iLCJTRU5EX1JPT01fTUVTU0FHRSIsIkpPSU5fUk9PTSIsIlNFUlZFUiIsIlJPT01TIiwiSk9JTkVEX1JPT00iLCJST09NX01FU1NBR0UiLCJzb2NrZXQiLCJpbyIsIlNvY2tldENvbnRleHQiLCJjcmVhdGVDb250ZXh0Iiwic2V0VXNlcm5hbWUiLCJzZXRNZXNzYWdlcyIsInJvb21zIiwibWVzc2FnZXMiLCJTb2NrZXRzUHJvdmlkZXIiLCJwcm9wcyIsInVzZXJuYW1lIiwidXNlU3RhdGUiLCJyb29tSWQiLCJzZXRSb29tSWQiLCJzZXRSb29tcyIsInVzZUVmZmVjdCIsIndpbmRvdyIsIm9uZm9jdXMiLCJkb2N1bWVudCIsInRpdGxlIiwib24iLCJ2YWx1ZSIsImNoYXRzIiwiYXhpb3MiLCJ0aGVuIiwiZCIsImRhdGEiLCJjaGF0IiwibWFwIiwiYyIsImNoYXRfaWQiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsInRpbWUiLCJoYXNGb2N1cyIsInVzZVNvY2tldHMiLCJ1c2VDb250ZXh0IiwiTXlBcHAi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QWMsQ0FBQyxHQUFHQSxRQUFKLEVBQWM7QUFBRTBCLGVBQUY7QUFBV3ZCLGdCQUFYO0FBQXFCd0I7QUFBckIsT0FBZCxDQUFmLENBQVg7QUFDRCxLQU5EO0FBT0QsR0FSUSxFQVFOLENBQUNsQyxNQUFELENBUk0sQ0FBVDtBQVVBLHNCQUNFLDhEQUFDLGFBQUQsQ0FBZSxRQUFmO0FBQ0UsU0FBSyxFQUFFO0FBQ0xBLFlBREs7QUFFTFUsY0FGSztBQUdMTixpQkFISztBQUlMRSxXQUpLO0FBS0xNLFlBTEs7QUFNTEwsY0FOSztBQU9MRjtBQVBLO0FBRFQsS0FVTUksS0FWTjtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFjRDs7QUFFTSxNQUFNMkIsVUFBVSxHQUFHLE1BQU1DLGlEQUFVLENBQUNuQyxhQUFELENBQW5DO0FBRVAsK0RBQWVNLGVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRkE7QUFDQTs7QUFFQSxTQUFTOEIsS0FBVCxDQUFlO0FBQUVDLFdBQUY7QUFBYUM7QUFBYixDQUFmLEVBQXlDO0FBQ3ZDLHNCQUNFLDhEQUFDLDREQUFEO0FBQUEsMkJBQ0UsOERBQUMsU0FBRCxvQkFBZUEsU0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBS0Q7O0FBRUQsK0RBQWVGLEtBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWEEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsOEMiLCJmaWxlIjoicGFnZXMvX2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBTT0NLRVRfVVJMID0gcHJvY2Vzcy5lbnYuU09DS0VUX1VSTCB8fCBcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMFwiO1xuIiwiY29uc3QgRVZFTlRTID0ge1xuICBjb25uZWN0aW9uOiBcImNvbm5lY3Rpb25cIixcbiAgQ0xJRU5UOiB7XG4gICAgQ1JFQVRFX1JPT006IFwiQ1JFQVRFX1JPT01cIixcbiAgICBTRU5EX1JPT01fTUVTU0FHRTogXCJTRU5EX1JPT01fTUVTU0FHRVwiLFxuICAgIEpPSU5fUk9PTTogXCJKT0lOX1JPT01cIixcbiAgfSxcbiAgU0VSVkVSOiB7XG4gICAgUk9PTVM6IFwiUk9PTVNcIixcbiAgICBKT0lORURfUk9PTTogXCJKT0lORURfUk9PTVwiLFxuICAgIFJPT01fTUVTU0FHRTogXCJST09NX01FU1NBR0VcIixcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVWRU5UUztcbiIsImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBpbywgeyBTb2NrZXQgfSBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgU09DS0VUX1VSTCB9IGZyb20gXCIuLi9jb25maWcvZGVmYXVsdFwiO1xuaW1wb3J0IEVWRU5UUyBmcm9tIFwiLi4vY29uZmlnL2V2ZW50c1wiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5pbnRlcmZhY2UgQ29udGV4dCB7XG4gIHNvY2tldDogU29ja2V0O1xuICB1c2VybmFtZT86IHN0cmluZztcbiAgc2V0VXNlcm5hbWU6IEZ1bmN0aW9uO1xuICBtZXNzYWdlcz86IHsgbWVzc2FnZTogc3RyaW5nOyB0aW1lOiBzdHJpbmc7IHVzZXJuYW1lOiBzdHJpbmcgfVtdO1xuICBzZXRNZXNzYWdlczogRnVuY3Rpb247XG4gIHJvb21JZD86IHN0cmluZztcbiAgcm9vbXM6IG9iamVjdDtcbn1cblxuY29uc3Qgc29ja2V0ID0gaW8oU09DS0VUX1VSTCk7XG5cbmNvbnN0IFNvY2tldENvbnRleHQgPSBjcmVhdGVDb250ZXh0PENvbnRleHQ+KHtcbiAgc29ja2V0LFxuICBzZXRVc2VybmFtZTogKCkgPT4gZmFsc2UsXG4gIHNldE1lc3NhZ2VzOiAoKSA9PiBmYWxzZSxcbiAgcm9vbXM6IHt9LFxuICBtZXNzYWdlczogW10sXG59KTtcblxuZnVuY3Rpb24gU29ja2V0c1Byb3ZpZGVyKHByb3BzOiBhbnkpIHtcbiAgY29uc3QgW3VzZXJuYW1lLCBzZXRVc2VybmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3Jvb21JZCwgc2V0Um9vbUlkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcm9vbXMsIHNldFJvb21zXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZShbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3cub25mb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gXCJTdXJ2ZXl2b3IgQ2hhdFwiO1xuICAgIH07XG4gIH0sIFtdKTtcblxuXG4gIC8vcmV0dXJuIGFsbCByb29tcyBjcmVhdGVkXG4gIHNvY2tldC5vbihFVkVOVFMuU0VSVkVSLlJPT01TLCAodmFsdWUpID0+IHtcbiAgICBsZXQgY2hhdHM6YW55O1xuICAgIGF4aW9zLmdldChcImh0dHBzOi8vc3VydmV5dm9yLnNob2NrbG9naWMuY29tL2FwaS9jaGF0L21pbmVcIikudGhlbigoZCk9PntcbiAgICAgIGNoYXRzID0gZC5kYXRhLmNoYXQ7XG4gICAgfSk7XG4gICAgY2hhdHMubWFwKChjKSA9PntcbiAgICAgIGlmKHZhbHVlW2MuY2hhdF9pZF0pe1xuICAgICAgICBzZXRSb29tcyh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgIFxuICAgIFxuICB9KTtcblxuICBzb2NrZXQub24oRVZFTlRTLlNFUlZFUi5KT0lORURfUk9PTSwgKHZhbHVlKSA9PiB7XG4gICAgXG4gICAgc2V0Um9vbUlkKHZhbHVlKTtcblxuICAgIHNldE1lc3NhZ2VzKFtdKTtcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzb2NrZXQub24oRVZFTlRTLlNFUlZFUi5ST09NX01FU1NBR0UsICh7IG1lc3NhZ2UsIHVzZXJuYW1lLCB0aW1lIH0pID0+IHtcbiAgICAgIGlmICghZG9jdW1lbnQuaGFzRm9jdXMoKSkge1xuICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiTmV3IG1lc3NhZ2UuLi5cIjtcbiAgICAgIH1cblxuICAgICAgc2V0TWVzc2FnZXMoKG1lc3NhZ2VzKSA9PiBbLi4ubWVzc2FnZXMsIHsgbWVzc2FnZSwgdXNlcm5hbWUsIHRpbWUgfV0pO1xuICAgIH0pO1xuICB9LCBbc29ja2V0XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U29ja2V0Q29udGV4dC5Qcm92aWRlclxuICAgICAgdmFsdWU9e3tcbiAgICAgICAgc29ja2V0LFxuICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgc2V0VXNlcm5hbWUsXG4gICAgICAgIHJvb21zLFxuICAgICAgICByb29tSWQsXG4gICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICBzZXRNZXNzYWdlcyxcbiAgICAgIH19XG4gICAgICB7Li4ucHJvcHN9XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNvY2tldHMgPSAoKSA9PiB1c2VDb250ZXh0KFNvY2tldENvbnRleHQpO1xuXG5leHBvcnQgZGVmYXVsdCBTb2NrZXRzUHJvdmlkZXI7XG4iLCJpbXBvcnQgXCIuLi9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcbmltcG9ydCBTb2NrZXRzUHJvdmlkZXIgZnJvbSBcIi4uL2NvbnRleHQvc29ja2V0LmNvbnRleHRcIjtcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIHJldHVybiAoXG4gICAgPFNvY2tldHNQcm92aWRlcj5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L1NvY2tldHNQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvLWNsaWVudFwiKTs7Il0sInNvdXJjZVJvb3QiOiIifQ==