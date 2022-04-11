self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./context/socket.context.tsx":
/*!************************************!*\
  !*** ./context/socket.context.tsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useSockets": function() { return /* binding */ useSockets; }
/* harmony export */ });
/* harmony import */ var C_Users_Usuario_Desktop_Realtime_Chat_Application_main_client_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var C_Users_Usuario_Desktop_Realtime_Chat_Application_main_client_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/wrapper.mjs");
/* harmony import */ var _config_default__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config/default */ "./config/default.ts");
/* harmony import */ var _config_events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config/events */ "./config/events.ts");
/* module decorator */ module = __webpack_require__.hmd(module);




var _jsxFileName = "C:\\Users\\Usuario\\Desktop\\Realtime-Chat-Application-main\\client\\context\\socket.context.tsx",
    _s = $RefreshSig$(),
    _s2 = $RefreshSig$();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,C_Users_Usuario_Desktop_Realtime_Chat_Application_main_client_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_4__.default)(_config_default__WEBPACK_IMPORTED_MODULE_5__.SOCKET_URL);
var SocketContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_3__.createContext)({
  socket: socket,
  setUsername: function setUsername() {
    return false;
  },
  setMessages: function setMessages() {
    return false;
  },
  rooms: {},
  messages: []
});

function SocketsProvider(props) {
  _s();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(""),
      username = _useState[0],
      setUsername = _useState[1];

  var _useState2 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(""),
      roomId = _useState2[0],
      setRoomId = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({}),
      rooms = _useState3[0],
      setRooms = _useState3[1];

  var _useState4 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]),
      messages = _useState4[0],
      setMessages = _useState4[1];

  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    window.onfocus = function () {
      document.title = "Surveyvor Chat";
    };
  }, []); //return all rooms created

  socket.on(_config_events__WEBPACK_IMPORTED_MODULE_6__.default.SERVER.ROOMS, function (value) {});
  socket.on(_config_events__WEBPACK_IMPORTED_MODULE_6__.default.SERVER.JOINED_ROOM, function (value) {
    setRoomId(value);
    setMessages([]);
  });
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    socket.on(_config_events__WEBPACK_IMPORTED_MODULE_6__.default.SERVER.ROOM_MESSAGE, function (_ref) {
      var message = _ref.message,
          username = _ref.username,
          time = _ref.time;

      if (!document.hasFocus()) {
        document.title = "New message...";
      }

      setMessages(function (messages) {
        return [].concat((0,C_Users_Usuario_Desktop_Realtime_Chat_Application_main_client_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__.default)(messages), [{
          message: message,
          username: username,
          time: time
        }]);
      });
    });
  }, [socket]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(SocketContext.Provider, _objectSpread({
    value: {
      socket: socket,
      username: username,
      setUsername: setUsername,
      rooms: rooms,
      roomId: roomId,
      messages: messages,
      setMessages: setMessages
    }
  }, props), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 60,
    columnNumber: 5
  }, this);
}

_s(SocketsProvider, "Orlrfb7sCyichiXwx4bc9pvTlzw=");

_c = SocketsProvider;
var useSockets = function useSockets() {
  _s2();

  return (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(SocketContext);
};

_s2(useSockets, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");

/* harmony default export */ __webpack_exports__["default"] = (SocketsProvider);

var _c;

$RefreshReg$(_c, "SocketsProvider");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29udGV4dC9zb2NrZXQuY29udGV4dC50c3giXSwibmFtZXMiOlsic29ja2V0IiwiaW8iLCJTT0NLRVRfVVJMIiwiU29ja2V0Q29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJzZXRVc2VybmFtZSIsInNldE1lc3NhZ2VzIiwicm9vbXMiLCJtZXNzYWdlcyIsIlNvY2tldHNQcm92aWRlciIsInByb3BzIiwidXNlU3RhdGUiLCJ1c2VybmFtZSIsInJvb21JZCIsInNldFJvb21JZCIsInNldFJvb21zIiwidXNlRWZmZWN0Iiwid2luZG93Iiwib25mb2N1cyIsImRvY3VtZW50IiwidGl0bGUiLCJvbiIsIkVWRU5UUyIsInZhbHVlIiwibWVzc2FnZSIsInRpbWUiLCJoYXNGb2N1cyIsInVzZVNvY2tldHMiLCJ1c2VDb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBWUEsSUFBTUEsTUFBTSxHQUFHQyx5REFBRSxDQUFDQyx1REFBRCxDQUFqQjtBQUVBLElBQU1DLGFBQWEsZ0JBQUdDLG9EQUFhLENBQVU7QUFDM0NKLFFBQU0sRUFBTkEsTUFEMkM7QUFFM0NLLGFBQVcsRUFBRTtBQUFBLFdBQU0sS0FBTjtBQUFBLEdBRjhCO0FBRzNDQyxhQUFXLEVBQUU7QUFBQSxXQUFNLEtBQU47QUFBQSxHQUg4QjtBQUkzQ0MsT0FBSyxFQUFFLEVBSm9DO0FBSzNDQyxVQUFRLEVBQUU7QUFMaUMsQ0FBVixDQUFuQzs7QUFRQSxTQUFTQyxlQUFULENBQXlCQyxLQUF6QixFQUFxQztBQUFBOztBQUFBLGtCQUNIQywrQ0FBUSxDQUFDLEVBQUQsQ0FETDtBQUFBLE1BQzVCQyxRQUQ0QjtBQUFBLE1BQ2xCUCxXQURrQjs7QUFBQSxtQkFFUE0sK0NBQVEsQ0FBQyxFQUFELENBRkQ7QUFBQSxNQUU1QkUsTUFGNEI7QUFBQSxNQUVwQkMsU0FGb0I7O0FBQUEsbUJBR1RILCtDQUFRLENBQUMsRUFBRCxDQUhDO0FBQUEsTUFHNUJKLEtBSDRCO0FBQUEsTUFHckJRLFFBSHFCOztBQUFBLG1CQUlISiwrQ0FBUSxDQUFDLEVBQUQsQ0FKTDtBQUFBLE1BSTVCSCxRQUo0QjtBQUFBLE1BSWxCRixXQUprQjs7QUFNbkNVLGtEQUFTLENBQUMsWUFBTTtBQUNkQyxVQUFNLENBQUNDLE9BQVAsR0FBaUIsWUFBWTtBQUMzQkMsY0FBUSxDQUFDQyxLQUFULEdBQWlCLGdCQUFqQjtBQUNELEtBRkQ7QUFHRCxHQUpRLEVBSU4sRUFKTSxDQUFULENBTm1DLENBWW5DOztBQUNBcEIsUUFBTSxDQUFDcUIsRUFBUCxDQUFVQyxnRUFBVixFQUErQixVQUFDQyxLQUFELEVBQVcsQ0FFekMsQ0FGRDtBQUlBdkIsUUFBTSxDQUFDcUIsRUFBUCxDQUFVQyxzRUFBVixFQUFxQyxVQUFDQyxLQUFELEVBQVc7QUFDOUNULGFBQVMsQ0FBQ1MsS0FBRCxDQUFUO0FBRUFqQixlQUFXLENBQUMsRUFBRCxDQUFYO0FBQ0QsR0FKRDtBQU1BVSxrREFBUyxDQUFDLFlBQU07QUFDZGhCLFVBQU0sQ0FBQ3FCLEVBQVAsQ0FBVUMsdUVBQVYsRUFBc0MsZ0JBQWlDO0FBQUEsVUFBOUJFLE9BQThCLFFBQTlCQSxPQUE4QjtBQUFBLFVBQXJCWixRQUFxQixRQUFyQkEsUUFBcUI7QUFBQSxVQUFYYSxJQUFXLFFBQVhBLElBQVc7O0FBQ3JFLFVBQUksQ0FBQ04sUUFBUSxDQUFDTyxRQUFULEVBQUwsRUFBMEI7QUFDeEJQLGdCQUFRLENBQUNDLEtBQVQsR0FBaUIsZ0JBQWpCO0FBQ0Q7O0FBRURkLGlCQUFXLENBQUMsVUFBQ0UsUUFBRDtBQUFBLDJNQUFrQkEsUUFBbEIsSUFBNEI7QUFBRWdCLGlCQUFPLEVBQVBBLE9BQUY7QUFBV1osa0JBQVEsRUFBUkEsUUFBWDtBQUFxQmEsY0FBSSxFQUFKQTtBQUFyQixTQUE1QjtBQUFBLE9BQUQsQ0FBWDtBQUNELEtBTkQ7QUFPRCxHQVJRLEVBUU4sQ0FBQ3pCLE1BQUQsQ0FSTSxDQUFUO0FBVUEsc0JBQ0UsOERBQUMsYUFBRCxDQUFlLFFBQWY7QUFDRSxTQUFLLEVBQUU7QUFDTEEsWUFBTSxFQUFOQSxNQURLO0FBRUxZLGNBQVEsRUFBUkEsUUFGSztBQUdMUCxpQkFBVyxFQUFYQSxXQUhLO0FBSUxFLFdBQUssRUFBTEEsS0FKSztBQUtMTSxZQUFNLEVBQU5BLE1BTEs7QUFNTEwsY0FBUSxFQUFSQSxRQU5LO0FBT0xGLGlCQUFXLEVBQVhBO0FBUEs7QUFEVCxLQVVNSSxLQVZOO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQWNEOztHQS9DUUQsZTs7S0FBQUEsZTtBQWlERixJQUFNa0IsVUFBVSxHQUFHLFNBQWJBLFVBQWE7QUFBQTs7QUFBQSxTQUFNQyxpREFBVSxDQUFDekIsYUFBRCxDQUFoQjtBQUFBLENBQW5COztJQUFNd0IsVTs7QUFFYiwrREFBZWxCLGVBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvX2FwcC4wYmRlMjRhODlmMWY1OGY1NjFkNS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGlvLCB7IFNvY2tldCB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5pbXBvcnQgeyBTT0NLRVRfVVJMIH0gZnJvbSBcIi4uL2NvbmZpZy9kZWZhdWx0XCI7XG5pbXBvcnQgRVZFTlRTIGZyb20gXCIuLi9jb25maWcvZXZlbnRzXCI7XG5cbmludGVyZmFjZSBDb250ZXh0IHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHVzZXJuYW1lPzogc3RyaW5nO1xuICBzZXRVc2VybmFtZTogRnVuY3Rpb247XG4gIG1lc3NhZ2VzPzogeyBtZXNzYWdlOiBzdHJpbmc7IHRpbWU6IHN0cmluZzsgdXNlcm5hbWU6IHN0cmluZyB9W107XG4gIHNldE1lc3NhZ2VzOiBGdW5jdGlvbjtcbiAgcm9vbUlkPzogc3RyaW5nO1xuICByb29tczogb2JqZWN0O1xufVxuXG5jb25zdCBzb2NrZXQgPSBpbyhTT0NLRVRfVVJMKTtcblxuY29uc3QgU29ja2V0Q29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8Q29udGV4dD4oe1xuICBzb2NrZXQsXG4gIHNldFVzZXJuYW1lOiAoKSA9PiBmYWxzZSxcbiAgc2V0TWVzc2FnZXM6ICgpID0+IGZhbHNlLFxuICByb29tczoge30sXG4gIG1lc3NhZ2VzOiBbXSxcbn0pO1xuXG5mdW5jdGlvbiBTb2NrZXRzUHJvdmlkZXIocHJvcHM6IGFueSkge1xuICBjb25zdCBbdXNlcm5hbWUsIHNldFVzZXJuYW1lXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcm9vbUlkLCBzZXRSb29tSWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtyb29tcywgc2V0Um9vbXNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWVzc2FnZXMsIHNldE1lc3NhZ2VzXSA9IHVzZVN0YXRlKFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5vbmZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIlN1cnZleXZvciBDaGF0XCI7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIC8vcmV0dXJuIGFsbCByb29tcyBjcmVhdGVkXG4gIHNvY2tldC5vbihFVkVOVFMuU0VSVkVSLlJPT01TLCAodmFsdWUpID0+IHtcbiAgIFxuICB9KTtcblxuICBzb2NrZXQub24oRVZFTlRTLlNFUlZFUi5KT0lORURfUk9PTSwgKHZhbHVlKSA9PiB7XG4gICAgc2V0Um9vbUlkKHZhbHVlKTtcblxuICAgIHNldE1lc3NhZ2VzKFtdKTtcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzb2NrZXQub24oRVZFTlRTLlNFUlZFUi5ST09NX01FU1NBR0UsICh7IG1lc3NhZ2UsIHVzZXJuYW1lLCB0aW1lIH0pID0+IHtcbiAgICAgIGlmICghZG9jdW1lbnQuaGFzRm9jdXMoKSkge1xuICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiTmV3IG1lc3NhZ2UuLi5cIjtcbiAgICAgIH1cblxuICAgICAgc2V0TWVzc2FnZXMoKG1lc3NhZ2VzKSA9PiBbLi4ubWVzc2FnZXMsIHsgbWVzc2FnZSwgdXNlcm5hbWUsIHRpbWUgfV0pO1xuICAgIH0pO1xuICB9LCBbc29ja2V0XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U29ja2V0Q29udGV4dC5Qcm92aWRlclxuICAgICAgdmFsdWU9e3tcbiAgICAgICAgc29ja2V0LFxuICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgc2V0VXNlcm5hbWUsXG4gICAgICAgIHJvb21zLFxuICAgICAgICByb29tSWQsXG4gICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICBzZXRNZXNzYWdlcyxcbiAgICAgIH19XG4gICAgICB7Li4ucHJvcHN9XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNvY2tldHMgPSAoKSA9PiB1c2VDb250ZXh0KFNvY2tldENvbnRleHQpO1xuXG5leHBvcnQgZGVmYXVsdCBTb2NrZXRzUHJvdmlkZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9