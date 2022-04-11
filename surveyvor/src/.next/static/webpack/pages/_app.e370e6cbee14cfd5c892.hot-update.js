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

  socket.on(_config_events__WEBPACK_IMPORTED_MODULE_6__.default.SERVER.ROOMS, function (value) {
    console.log(value);
    setRooms(value);
  });
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
    lineNumber: 61,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29udGV4dC9zb2NrZXQuY29udGV4dC50c3giXSwibmFtZXMiOlsic29ja2V0IiwiaW8iLCJTT0NLRVRfVVJMIiwiU29ja2V0Q29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJzZXRVc2VybmFtZSIsInNldE1lc3NhZ2VzIiwicm9vbXMiLCJtZXNzYWdlcyIsIlNvY2tldHNQcm92aWRlciIsInByb3BzIiwidXNlU3RhdGUiLCJ1c2VybmFtZSIsInJvb21JZCIsInNldFJvb21JZCIsInNldFJvb21zIiwidXNlRWZmZWN0Iiwid2luZG93Iiwib25mb2N1cyIsImRvY3VtZW50IiwidGl0bGUiLCJvbiIsIkVWRU5UUyIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJ0aW1lIiwiaGFzRm9jdXMiLCJ1c2VTb2NrZXRzIiwidXNlQ29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQVlBLElBQU1BLE1BQU0sR0FBR0MseURBQUUsQ0FBQ0MsdURBQUQsQ0FBakI7QUFFQSxJQUFNQyxhQUFhLGdCQUFHQyxvREFBYSxDQUFVO0FBQzNDSixRQUFNLEVBQU5BLE1BRDJDO0FBRTNDSyxhQUFXLEVBQUU7QUFBQSxXQUFNLEtBQU47QUFBQSxHQUY4QjtBQUczQ0MsYUFBVyxFQUFFO0FBQUEsV0FBTSxLQUFOO0FBQUEsR0FIOEI7QUFJM0NDLE9BQUssRUFBRSxFQUpvQztBQUszQ0MsVUFBUSxFQUFFO0FBTGlDLENBQVYsQ0FBbkM7O0FBUUEsU0FBU0MsZUFBVCxDQUF5QkMsS0FBekIsRUFBcUM7QUFBQTs7QUFBQSxrQkFDSEMsK0NBQVEsQ0FBQyxFQUFELENBREw7QUFBQSxNQUM1QkMsUUFENEI7QUFBQSxNQUNsQlAsV0FEa0I7O0FBQUEsbUJBRVBNLCtDQUFRLENBQUMsRUFBRCxDQUZEO0FBQUEsTUFFNUJFLE1BRjRCO0FBQUEsTUFFcEJDLFNBRm9COztBQUFBLG1CQUdUSCwrQ0FBUSxDQUFDLEVBQUQsQ0FIQztBQUFBLE1BRzVCSixLQUg0QjtBQUFBLE1BR3JCUSxRQUhxQjs7QUFBQSxtQkFJSEosK0NBQVEsQ0FBQyxFQUFELENBSkw7QUFBQSxNQUk1QkgsUUFKNEI7QUFBQSxNQUlsQkYsV0FKa0I7O0FBTW5DVSxrREFBUyxDQUFDLFlBQU07QUFDZEMsVUFBTSxDQUFDQyxPQUFQLEdBQWlCLFlBQVk7QUFDM0JDLGNBQVEsQ0FBQ0MsS0FBVCxHQUFpQixnQkFBakI7QUFDRCxLQUZEO0FBR0QsR0FKUSxFQUlOLEVBSk0sQ0FBVCxDQU5tQyxDQVluQzs7QUFDQXBCLFFBQU0sQ0FBQ3FCLEVBQVAsQ0FBVUMsZ0VBQVYsRUFBK0IsVUFBQ0MsS0FBRCxFQUFXO0FBQ3hDQyxXQUFPLENBQUNDLEdBQVIsQ0FBWUYsS0FBWjtBQUNBUixZQUFRLENBQUNRLEtBQUQsQ0FBUjtBQUNELEdBSEQ7QUFLQXZCLFFBQU0sQ0FBQ3FCLEVBQVAsQ0FBVUMsc0VBQVYsRUFBcUMsVUFBQ0MsS0FBRCxFQUFXO0FBQzlDVCxhQUFTLENBQUNTLEtBQUQsQ0FBVDtBQUVBakIsZUFBVyxDQUFDLEVBQUQsQ0FBWDtBQUNELEdBSkQ7QUFNQVUsa0RBQVMsQ0FBQyxZQUFNO0FBQ2RoQixVQUFNLENBQUNxQixFQUFQLENBQVVDLHVFQUFWLEVBQXNDLGdCQUFpQztBQUFBLFVBQTlCSSxPQUE4QixRQUE5QkEsT0FBOEI7QUFBQSxVQUFyQmQsUUFBcUIsUUFBckJBLFFBQXFCO0FBQUEsVUFBWGUsSUFBVyxRQUFYQSxJQUFXOztBQUNyRSxVQUFJLENBQUNSLFFBQVEsQ0FBQ1MsUUFBVCxFQUFMLEVBQTBCO0FBQ3hCVCxnQkFBUSxDQUFDQyxLQUFULEdBQWlCLGdCQUFqQjtBQUNEOztBQUVEZCxpQkFBVyxDQUFDLFVBQUNFLFFBQUQ7QUFBQSwyTUFBa0JBLFFBQWxCLElBQTRCO0FBQUVrQixpQkFBTyxFQUFQQSxPQUFGO0FBQVdkLGtCQUFRLEVBQVJBLFFBQVg7QUFBcUJlLGNBQUksRUFBSkE7QUFBckIsU0FBNUI7QUFBQSxPQUFELENBQVg7QUFDRCxLQU5EO0FBT0QsR0FSUSxFQVFOLENBQUMzQixNQUFELENBUk0sQ0FBVDtBQVVBLHNCQUNFLDhEQUFDLGFBQUQsQ0FBZSxRQUFmO0FBQ0UsU0FBSyxFQUFFO0FBQ0xBLFlBQU0sRUFBTkEsTUFESztBQUVMWSxjQUFRLEVBQVJBLFFBRks7QUFHTFAsaUJBQVcsRUFBWEEsV0FISztBQUlMRSxXQUFLLEVBQUxBLEtBSks7QUFLTE0sWUFBTSxFQUFOQSxNQUxLO0FBTUxMLGNBQVEsRUFBUkEsUUFOSztBQU9MRixpQkFBVyxFQUFYQTtBQVBLO0FBRFQsS0FVTUksS0FWTjtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFjRDs7R0FoRFFELGU7O0tBQUFBLGU7QUFrREYsSUFBTW9CLFVBQVUsR0FBRyxTQUFiQSxVQUFhO0FBQUE7O0FBQUEsU0FBTUMsaURBQVUsQ0FBQzNCLGFBQUQsQ0FBaEI7QUFBQSxDQUFuQjs7SUFBTTBCLFU7O0FBRWIsK0RBQWVwQixlQUFmIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL19hcHAuZTM3MGU2Y2JlZTE0Y2ZkNWM4OTIuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBpbywgeyBTb2NrZXQgfSBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgU09DS0VUX1VSTCB9IGZyb20gXCIuLi9jb25maWcvZGVmYXVsdFwiO1xuaW1wb3J0IEVWRU5UUyBmcm9tIFwiLi4vY29uZmlnL2V2ZW50c1wiO1xuXG5pbnRlcmZhY2UgQ29udGV4dCB7XG4gIHNvY2tldDogU29ja2V0O1xuICB1c2VybmFtZT86IHN0cmluZztcbiAgc2V0VXNlcm5hbWU6IEZ1bmN0aW9uO1xuICBtZXNzYWdlcz86IHsgbWVzc2FnZTogc3RyaW5nOyB0aW1lOiBzdHJpbmc7IHVzZXJuYW1lOiBzdHJpbmcgfVtdO1xuICBzZXRNZXNzYWdlczogRnVuY3Rpb247XG4gIHJvb21JZD86IHN0cmluZztcbiAgcm9vbXM6IG9iamVjdDtcbn1cblxuY29uc3Qgc29ja2V0ID0gaW8oU09DS0VUX1VSTCk7XG5cbmNvbnN0IFNvY2tldENvbnRleHQgPSBjcmVhdGVDb250ZXh0PENvbnRleHQ+KHtcbiAgc29ja2V0LFxuICBzZXRVc2VybmFtZTogKCkgPT4gZmFsc2UsXG4gIHNldE1lc3NhZ2VzOiAoKSA9PiBmYWxzZSxcbiAgcm9vbXM6IHt9LFxuICBtZXNzYWdlczogW10sXG59KTtcblxuZnVuY3Rpb24gU29ja2V0c1Byb3ZpZGVyKHByb3BzOiBhbnkpIHtcbiAgY29uc3QgW3VzZXJuYW1lLCBzZXRVc2VybmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3Jvb21JZCwgc2V0Um9vbUlkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcm9vbXMsIHNldFJvb21zXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZShbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3cub25mb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gXCJTdXJ2ZXl2b3IgQ2hhdFwiO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICAvL3JldHVybiBhbGwgcm9vbXMgY3JlYXRlZFxuICBzb2NrZXQub24oRVZFTlRTLlNFUlZFUi5ST09NUywgKHZhbHVlKSA9PiB7XG4gICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgIHNldFJvb21zKHZhbHVlKTtcbiAgfSk7XG5cbiAgc29ja2V0Lm9uKEVWRU5UUy5TRVJWRVIuSk9JTkVEX1JPT00sICh2YWx1ZSkgPT4ge1xuICAgIHNldFJvb21JZCh2YWx1ZSk7XG5cbiAgICBzZXRNZXNzYWdlcyhbXSk7XG4gIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc29ja2V0Lm9uKEVWRU5UUy5TRVJWRVIuUk9PTV9NRVNTQUdFLCAoeyBtZXNzYWdlLCB1c2VybmFtZSwgdGltZSB9KSA9PiB7XG4gICAgICBpZiAoIWRvY3VtZW50Lmhhc0ZvY3VzKCkpIHtcbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIk5ldyBtZXNzYWdlLi4uXCI7XG4gICAgICB9XG5cbiAgICAgIHNldE1lc3NhZ2VzKChtZXNzYWdlcykgPT4gWy4uLm1lc3NhZ2VzLCB7IG1lc3NhZ2UsIHVzZXJuYW1lLCB0aW1lIH1dKTtcbiAgICB9KTtcbiAgfSwgW3NvY2tldF0pO1xuXG4gIHJldHVybiAoXG4gICAgPFNvY2tldENvbnRleHQuUHJvdmlkZXJcbiAgICAgIHZhbHVlPXt7XG4gICAgICAgIHNvY2tldCxcbiAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgIHNldFVzZXJuYW1lLFxuICAgICAgICByb29tcyxcbiAgICAgICAgcm9vbUlkLFxuICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgc2V0TWVzc2FnZXMsXG4gICAgICB9fVxuICAgICAgey4uLnByb3BzfVxuICAgIC8+XG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCB1c2VTb2NrZXRzID0gKCkgPT4gdXNlQ29udGV4dChTb2NrZXRDb250ZXh0KTtcblxuZXhwb3J0IGRlZmF1bHQgU29ja2V0c1Byb3ZpZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==