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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdXJ2ZXl2b3IvLi9zcmMvY29uZmlnL2RlZmF1bHQudHMiLCJ3ZWJwYWNrOi8vc3VydmV5dm9yLy4vc3JjL2NvbmZpZy9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vc3VydmV5dm9yLy4vc3JjL2NvbnRleHQvc29ja2V0LmNvbnRleHQudHN4Iiwid2VicGFjazovL3N1cnZleXZvci8uL3NyYy9wYWdlcy9fYXBwLnRzeCIsIndlYnBhY2s6Ly9zdXJ2ZXl2b3IvZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovL3N1cnZleXZvci9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vc3VydmV5dm9yL2V4dGVybmFsIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIiLCJ3ZWJwYWNrOi8vc3VydmV5dm9yL2V4dGVybmFsIFwic29ja2V0LmlvLWNsaWVudFwiIl0sIm5hbWVzIjpbIlNPQ0tFVF9VUkwiLCJwcm9jZXNzIiwiZW52IiwiRVZFTlRTIiwiY29ubmVjdGlvbiIsIkNMSUVOVCIsIkNSRUFURV9ST09NIiwiU0VORF9ST09NX01FU1NBR0UiLCJKT0lOX1JPT00iLCJTRVJWRVIiLCJST09NUyIsIkpPSU5FRF9ST09NIiwiUk9PTV9NRVNTQUdFIiwic29ja2V0IiwiaW8iLCJTb2NrZXRDb250ZXh0IiwiY3JlYXRlQ29udGV4dCIsInNldFVzZXJuYW1lIiwic2V0TWVzc2FnZXMiLCJyb29tcyIsIm1lc3NhZ2VzIiwiU29ja2V0c1Byb3ZpZGVyIiwicHJvcHMiLCJ1c2VybmFtZSIsInVzZVN0YXRlIiwicm9vbUlkIiwic2V0Um9vbUlkIiwic2V0Um9vbXMiLCJ1c2VFZmZlY3QiLCJ3aW5kb3ciLCJvbmZvY3VzIiwiZG9jdW1lbnQiLCJ0aXRsZSIsIm9uIiwidmFsdWUiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJoZWFkZXJzIiwiY2hhdHMiLCJheGlvcyIsInRoZW4iLCJkIiwiZGF0YSIsImNoYXQiLCJtYXAiLCJjIiwiY2hhdF9pZCIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIiwidGltZSIsImhhc0ZvY3VzIiwidXNlU29ja2V0cyIsInVzZUNvbnRleHQiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxNQUFNQSxVQUFVLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixVQUFaLElBQTBCLHVCQUE3QyxDOzs7Ozs7Ozs7Ozs7QUNBUCxNQUFNRyxNQUFNLEdBQUc7QUFDYkMsWUFBVSxFQUFFLFlBREM7QUFFYkMsUUFBTSxFQUFFO0FBQ05DLGVBQVcsRUFBRSxhQURQO0FBRU5DLHFCQUFpQixFQUFFLG1CQUZiO0FBR05DLGFBQVMsRUFBRTtBQUhMLEdBRks7QUFPYkMsUUFBTSxFQUFFO0FBQ05DLFNBQUssRUFBRSxPQUREO0FBRU5DLGVBQVcsRUFBRSxhQUZQO0FBR05DLGdCQUFZLEVBQUU7QUFIUjtBQVBLLENBQWY7QUFjQSwrREFBZVQsTUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NDYkE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFhQSxNQUFNVSxNQUFNLEdBQUdDLHVEQUFFLENBQUNkLHVEQUFELENBQWpCO0FBRUEsTUFBTWUsYUFBYSxnQkFBR0Msb0RBQWEsQ0FBVTtBQUMzQ0gsUUFEMkM7QUFFM0NJLGFBQVcsRUFBRSxNQUFNLEtBRndCO0FBRzNDQyxhQUFXLEVBQUUsTUFBTSxLQUh3QjtBQUkzQ0MsT0FBSyxFQUFFLEVBSm9DO0FBSzNDQyxVQUFRLEVBQUU7QUFMaUMsQ0FBVixDQUFuQzs7QUFRQSxTQUFTQyxlQUFULENBQXlCQyxLQUF6QixFQUFxQztBQUNuQyxRQUFNO0FBQUEsT0FBQ0MsUUFBRDtBQUFBLE9BQVdOO0FBQVgsTUFBMEJPLCtDQUFRLENBQUMsRUFBRCxDQUF4QztBQUNBLFFBQU07QUFBQSxPQUFDQyxNQUFEO0FBQUEsT0FBU0M7QUFBVCxNQUFzQkYsK0NBQVEsQ0FBQyxFQUFELENBQXBDO0FBQ0Es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Q0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLDhDIiwiZmlsZSI6InBhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgU09DS0VUX1VSTCA9IHByb2Nlc3MuZW52LlNPQ0tFVF9VUkwgfHwgXCJodHRwOi8vbG9jYWxob3N0OjQwMDBcIjtcbiIsImNvbnN0IEVWRU5UUyA9IHtcbiAgY29ubmVjdGlvbjogXCJjb25uZWN0aW9uXCIsXG4gIENMSUVOVDoge1xuICAgIENSRUFURV9ST09NOiBcIkNSRUFURV9ST09NXCIsXG4gICAgU0VORF9ST09NX01FU1NBR0U6IFwiU0VORF9ST09NX01FU1NBR0VcIixcbiAgICBKT0lOX1JPT006IFwiSk9JTl9ST09NXCIsXG4gIH0sXG4gIFNFUlZFUjoge1xuICAgIFJPT01TOiBcIlJPT01TXCIsXG4gICAgSk9JTkVEX1JPT006IFwiSk9JTkVEX1JPT01cIixcbiAgICBST09NX01FU1NBR0U6IFwiUk9PTV9NRVNTQUdFXCIsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFVkVOVFM7XG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgaW8sIHsgU29ja2V0IH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmltcG9ydCB7IFNPQ0tFVF9VUkwgfSBmcm9tIFwiLi4vY29uZmlnL2RlZmF1bHRcIjtcbmltcG9ydCBFVkVOVFMgZnJvbSBcIi4uL2NvbmZpZy9ldmVudHNcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IENoYXQgfSBmcm9tIFwiLi4vTW9kZWwvQ2hhdFwiO1xuXG5pbnRlcmZhY2UgQ29udGV4dCB7XG4gIHNvY2tldDogU29ja2V0O1xuICB1c2VybmFtZT86IHN0cmluZztcbiAgc2V0VXNlcm5hbWU6IEZ1bmN0aW9uO1xuICBtZXNzYWdlcz86IHsgbWVzc2FnZTogc3RyaW5nOyB0aW1lOiBzdHJpbmc7IHVzZXJuYW1lOiBzdHJpbmcgfVtdO1xuICBzZXRNZXNzYWdlczogRnVuY3Rpb247XG4gIHJvb21JZD86IHN0cmluZztcbiAgcm9vbXM6IG9iamVjdDtcbn1cblxuY29uc3Qgc29ja2V0ID0gaW8oU09DS0VUX1VSTCk7XG5cbmNvbnN0IFNvY2tldENvbnRleHQgPSBjcmVhdGVDb250ZXh0PENvbnRleHQ+KHtcbiAgc29ja2V0LFxuICBzZXRVc2VybmFtZTogKCkgPT4gZmFsc2UsXG4gIHNldE1lc3NhZ2VzOiAoKSA9PiBmYWxzZSxcbiAgcm9vbXM6IHt9LFxuICBtZXNzYWdlczogW10sXG59KTtcblxuZnVuY3Rpb24gU29ja2V0c1Byb3ZpZGVyKHByb3BzOiBhbnkpIHtcbiAgY29uc3QgW3VzZXJuYW1lLCBzZXRVc2VybmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3Jvb21JZCwgc2V0Um9vbUlkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcm9vbXMsIHNldFJvb21zXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZShbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3cub25mb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gXCJTdXJ2ZXl2b3IgQ2hhdFwiO1xuICAgIH07XG4gIH0sIFtdKTtcblxuXG4gIC8vcmV0dXJuIGFsbCByb29tcyBjcmVhdGVkXG4gIC8vIEB0cy1pZ25vcmVcbiAgc29ja2V0Lm9uKEVWRU5UUy5TRVJWRVIuUk9PTVMsICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSBhcyBzdHJpbmc7XG5cbiAgICBsZXQgaGVhZGVycyA9IHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IHRva2VuXG4gICAgICB9XG4gIH1cbiAgICBsZXQgY2hhdHM6Q2hhdDtcbiAgICBheGlvcy5nZXQoXCJodHRwczovL3N1cnZleXZvci5zaG9ja2xvZ2ljLmNvbS9hcGkvY2hhdC9taW5lXCIsaGVhZGVycykudGhlbigoZCk9PntcbiAgICAgIGNoYXRzID0gZC5kYXRhLmNoYXQ7XG4gICAgfSk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNoYXRzLm1hcCgoYykgPT57XG4gICAgICBpZih2YWx1ZVtjLmNoYXRfaWRdKXtcbiAgICAgICAgc2V0Um9vbXModmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICBcbiAgICBcbiAgfSk7XG4vLyBAdHMtaWdub3JlXG4gIHNvY2tldC5vbihFVkVOVFMuU0VSVkVSLkpPSU5FRF9ST09NLCAodmFsdWUpID0+IHtcbiAgICBcbiAgICBzZXRSb29tSWQodmFsdWUpO1xuXG4gICAgc2V0TWVzc2FnZXMoW10pO1xuICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4gey8vIEB0cy1pZ25vcmVcbiAgICBzb2NrZXQub24oRVZFTlRTLlNFUlZFUi5ST09NX01FU1NBR0UsICh7IG1lc3NhZ2UsIHVzZXJuYW1lLCB0aW1lIH0pID0+IHtcbiAgICAgIGlmICghZG9jdW1lbnQuaGFzRm9jdXMoKSkge1xuICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiTmV3IG1lc3NhZ2UuLi5cIjtcbiAgICAgIH1cbi8vIEB0cy1pZ25vcmVcbiAgICAgIHNldE1lc3NhZ2VzKChtZXNzYWdlcykgPT4gWy4uLm1lc3NhZ2VzLCB7IG1lc3NhZ2UsIHVzZXJuYW1lLCB0aW1lIH1dKTtcbiAgICB9KTtcbiAgfSwgW3NvY2tldF0pO1xuXG4gIHJldHVybiAoXG4gICAgPFNvY2tldENvbnRleHQuUHJvdmlkZXJcbiAgICAgIHZhbHVlPXt7XG4gICAgICAgIHNvY2tldCxcbiAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgIHNldFVzZXJuYW1lLFxuICAgICAgICByb29tcyxcbiAgICAgICAgcm9vbUlkLFxuICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgc2V0TWVzc2FnZXMsXG4gICAgICB9fVxuICAgICAgey4uLnByb3BzfVxuICAgIC8+XG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCB1c2VTb2NrZXRzID0gKCkgPT4gdXNlQ29udGV4dChTb2NrZXRDb250ZXh0KTtcblxuZXhwb3J0IGRlZmF1bHQgU29ja2V0c1Byb3ZpZGVyO1xuIiwiaW1wb3J0IFwiLi4vc3R5bGVzL2dsb2JhbHMuY3NzXCI7XG5pbXBvcnQgU29ja2V0c1Byb3ZpZGVyIGZyb20gXCIuLi9jb250ZXh0L3NvY2tldC5jb250ZXh0XCI7XG4gIC8vIEB0cy1pZ25vcmVcbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxTb2NrZXRzUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9Tb2NrZXRzUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pby1jbGllbnRcIik7OyJdLCJzb3VyY2VSb290IjoiIn0=