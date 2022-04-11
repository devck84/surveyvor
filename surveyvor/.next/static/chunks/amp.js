(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["amp"],{

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/next/dist/client/dev/amp-dev.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/dev/amp-dev.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _eventSourcePolyfill = _interopRequireDefault(__webpack_require__(/*! ./event-source-polyfill */ "./node_modules/next/dist/client/dev/event-source-polyfill.js"));

var _eventsource = __webpack_require__(/*! ./error-overlay/eventsource */ "./node_modules/next/dist/client/dev/error-overlay/eventsource.js");

var _onDemandEntriesUtils = __webpack_require__(/*! ./on-demand-entries-utils */ "./node_modules/next/dist/client/dev/on-demand-entries-utils.js");

var _fouc = __webpack_require__(/*! ./fouc */ "./node_modules/next/dist/client/dev/fouc.js");
/* globals __webpack_hash__ */


if (!window.EventSource) {
  window.EventSource = _eventSourcePolyfill.default;
}

const data = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
let {
  assetPrefix,
  page
} = data;
assetPrefix = assetPrefix || '';
let mostRecentHash = null;
/* eslint-disable-next-line */

let curHash = __webpack_require__.h();
const hotUpdatePath = assetPrefix + (assetPrefix.endsWith('/') ? '' : '/') + '_next/static/webpack/'; // Is there a newer version of this code available?

function isUpdateAvailable() {
  // __webpack_hash__ is the hash of the current compilation.
  // It's a global variable injected by Webpack.

  /* eslint-disable-next-line */
  return mostRecentHash !== __webpack_require__.h();
} // Webpack disallows updates in other states.


function canApplyUpdates() {
  return module.hot.status() === 'idle';
} // This function reads code updates on the fly and hard
// reloads the page when it has changed.


async function tryApplyUpdates() {
  if (!isUpdateAvailable() || !canApplyUpdates()) {
    return;
  }

  try {
    const res = await fetch(typeof __webpack_require__.j !== 'undefined' ? // eslint-disable-next-line no-undef
    `${hotUpdatePath}${curHash}.${__webpack_require__.j}.hot-update.json` : `${hotUpdatePath}${curHash}.hot-update.json`);
    const jsonData = await res.json();
    const curPage = page === '/' ? 'index' : page; // webpack 5 uses an array instead

    const pageUpdated = (Array.isArray(jsonData.c) ? jsonData.c : Object.keys(jsonData.c)).some(mod => {
      return mod.indexOf(`pages${curPage.substr(0, 1) === '/' ? curPage : `/${curPage}`}`) !== -1 || mod.indexOf(`pages${curPage.substr(0, 1) === '/' ? curPage : `/${curPage}`}`.replace(/\//g, '\\')) !== -1;
    });

    if (pageUpdated) {
      document.location.reload(true);
    } else {
      curHash = mostRecentHash;
    }
  } catch (err) {
    console.error('Error occurred checking for update', err);
    document.location.reload(true);
  }
}

(0, _eventsource.addMessageListener)(event => {
  if (event.data === '\uD83D\uDC93') {
    return;
  }

  try {
    const message = JSON.parse(event.data);

    if (message.action === 'sync' || message.action === 'built') {
      if (!message.hash) {
        return;
      }

      mostRecentHash = message.hash;
      tryApplyUpdates();
    } else if (message.action === 'reloadPage') {
      document.location.reload(true);
    }
  } catch (ex) {
    console.warn('Invalid HMR message: ' + event.data + '\n' + ex);
  }
});
(0, _onDemandEntriesUtils.setupPing)(assetPrefix, () => page);
(0, _fouc.displayContent)();

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


/***/ }),

/***/ "./node_modules/next/dist/client/dev/error-overlay/eventsource.js":
/*!************************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/error-overlay/eventsource.js ***!
  \************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


exports.__esModule = true;
exports.addMessageListener = addMessageListener;
exports.getEventSourceWrapper = getEventSourceWrapper;
const eventCallbacks = [];

function EventSourceWrapper(options) {
  var source;
  var lastActivity = new Date();
  var listeners = [];

  if (!options.timeout) {
    options.timeout = 20 * 1000;
  }

  init();
  var timer = setInterval(function () {
    if (new Date() - lastActivity > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log('[HMR] connected');
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();

    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }

    eventCallbacks.forEach(cb => {
      if (!cb.unfiltered && event.data.indexOf('action') === -1) return;
      cb(event);
    });
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    close: () => {
      clearInterval(timer);
      source.close();
    },
    addMessageListener: function (fn) {
      listeners.push(fn);
    }
  };
}

_c = EventSourceWrapper;

function addMessageListener(cb) {
  eventCallbacks.push(cb);
}

function getEventSourceWrapper(options) {
  return EventSourceWrapper(options);
}

var _c;

$RefreshReg$(_c, "EventSourceWrapper");

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


/***/ }),

/***/ "./node_modules/next/dist/client/dev/event-source-polyfill.js":
/*!********************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/event-source-polyfill.js ***!
  \********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


exports.__esModule = true;
exports.default = void 0;
/* eslint-disable */
// Improved version of https://github.com/Yaffle/EventSource/
// Available under MIT License (MIT)
// Only tries to support IE11 and nothing below

var document = window.document;
var Response = window.Response;
var TextDecoder = window.TextDecoder;
var TextEncoder = window.TextEncoder;
var AbortController = window.AbortController;

if (AbortController == undefined) {
  AbortController = function () {
    this.signal = null;

    this.abort = function () {};
  };
}

function TextDecoderPolyfill() {
  this.bitsNeeded = 0;
  this.codePoint = 0;
}

_c = TextDecoderPolyfill;

TextDecoderPolyfill.prototype.decode = function (octets) {
  function valid(codePoint, shift, octetsCount) {
    if (octetsCount === 1) {
      return codePoint >= 0x0080 >> shift && codePoint << shift <= 0x07ff;
    }

    if (octetsCount === 2) {
      return codePoint >= 0x0800 >> shift && codePoint << shift <= 0xd7ff || codePoint >= 0xe000 >> shift && codePoint << shift <= 0xffff;
    }

    if (octetsCount === 3) {
      return codePoint >= 0x010000 >> shift && codePoint << shift <= 0x10ffff;
    }

    throw new Error();
  }

  function octetsCount(bitsNeeded, codePoint) {
    if (bitsNeeded === 6 * 1) {
      return codePoint >> 6 > 15 ? 3 : codePoint > 31 ? 2 : 1;
    }

    if (bitsNeeded === 6 * 2) {
      return codePoint > 15 ? 3 : 2;
    }

    if (bitsNeeded === 6 * 3) {
      return 3;
    }

    throw new Error();
  }

  var REPLACER = 0xfffd;
  var string = '';
  var bitsNeeded = this.bitsNeeded;
  var codePoint = this.codePoint;

  for (var i = 0; i < octets.length; i += 1) {
    var octet = octets[i];

    if (bitsNeeded !== 0) {
      if (octet < 128 || octet > 191 || !valid(codePoint << 6 | octet & 63, bitsNeeded - 6, octetsCount(bitsNeeded, codePoint))) {
        bitsNeeded = 0;
        codePoint = REPLACER;
        string += String.fromCharCode(codePoint);
      }
    }

    if (bitsNeeded === 0) {
      if (octet >= 0 && octet <= 127) {
        bitsNeeded = 0;
        codePoint = octet;
      } else if (octet >= 192 && octet <= 223) {
        bitsNeeded = 6 * 1;
        codePoint = octet & 31;
      } else if (octet >= 224 && octet <= 239) {
        bitsNeeded = 6 * 2;
        codePoint = octet & 15;
      } else if (octet >= 240 && octet <= 247) {
        bitsNeeded = 6 * 3;
        codePoint = octet & 7;
      } else {
        bitsNeeded = 0;
        codePoint = REPLACER;
      }

      if (bitsNeeded !== 0 && !valid(codePoint, bitsNeeded, octetsCount(bitsNeeded, codePoint))) {
        bitsNeeded = 0;
        codePoint = REPLACER;
      }
    } else {
      bitsNeeded -= 6;
      codePoint = codePoint << 6 | octet & 63;
    }

    if (bitsNeeded === 0) {
      if (codePoint <= 0xffff) {
        string += String.fromCharCode(codePoint);
      } else {
        string += String.fromCharCode(0xd800 + (codePoint - 0xffff - 1 >> 10));
        string += String.fromCharCode(0xdc00 + (codePoint - 0xffff - 1 & 0x3ff));
      }
    }
  }

  this.bitsNeeded = bitsNeeded;
  this.codePoint = codePoint;
  return string;
}; // Firefox < 38 throws an error with stream option


var supportsStreamOption = function supportsStreamOption() {
  try {
    return new TextDecoder().decode(new TextEncoder().encode('test'), {
      stream: true
    }) === 'test';
  } catch (error) {
    console.log(error);
  }

  return false;
}; // IE, Edge


if (TextDecoder == undefined || TextEncoder == undefined || !supportsStreamOption()) {
  TextDecoder = TextDecoderPolyfill;
}

var k = function k() {};

function XHRWrapper(xhr) {
  this.withCredentials = false;
  this.responseType = '';
  this.readyState = 0;
  this.status = 0;
  this.statusText = '';
  this.responseText = '';
  this.onprogress = k;
  this.onreadystatechange = k;
  this._contentType = '';
  this._xhr = xhr;
  this._sendTimeout = 0;
  this._abort = k;
}

_c2 = XHRWrapper;

XHRWrapper.prototype.open = function (method, url) {
  this._abort(true);

  var that = this;
  var xhr = this._xhr;
  var state = 1;
  var timeout = 0;

  this._abort = function (silent) {
    if (that._sendTimeout !== 0) {
      clearTimeout(that._sendTimeout);
      that._sendTimeout = 0;
    }

    if (state === 1 || state === 2 || state === 3) {
      state = 4;
      xhr.onload = k;
      xhr.onerror = k;
      xhr.onabort = k;
      xhr.onprogress = k;
      xhr.onreadystatechange = k; // IE 8 - 9: XDomainRequest#abort() does not fire any event
      // Opera < 10: XMLHttpRequest#abort() does not fire any event

      xhr.abort();

      if (timeout !== 0) {
        clearTimeout(timeout);
        timeout = 0;
      }

      if (!silent) {
        that.readyState = 4;
        that.onreadystatechange();
      }
    }

    state = 0;
  };

  var onStart = function onStart() {
    if (state === 1) {
      // state = 2;
      var status = 0;
      var statusText = '';
      var contentType = undefined;

      if (!('contentType' in xhr)) {
        try {
          status = xhr.status;
          statusText = xhr.statusText;
          contentType = xhr.getResponseHeader('Content-Type');
        } catch (error) {
          // IE < 10 throws exception for `xhr.status` when xhr.readyState === 2 || xhr.readyState === 3
          // Opera < 11 throws exception for `xhr.status` when xhr.readyState === 2
          // https://bugs.webkit.org/show_bug.cgi?id=29121
          status = 0;
          statusText = '';
          contentType = undefined; // Firefox < 14, Chrome ?, Safari ?
          // https://bugs.webkit.org/show_bug.cgi?id=29658
          // https://bugs.webkit.org/show_bug.cgi?id=77854
        }
      } else {
        status = 200;
        statusText = 'OK';
        contentType = xhr.contentType;
      }

      if (status !== 0) {
        state = 2;
        that.readyState = 2;
        that.status = status;
        that.statusText = statusText;
        that._contentType = contentType;
        that.onreadystatechange();
      }
    }
  };

  var onProgress = function onProgress() {
    onStart();

    if (state === 2 || state === 3) {
      state = 3;
      var responseText = '';

      try {
        responseText = xhr.responseText;
      } catch (error) {// IE 8 - 9 with XMLHttpRequest
      }

      that.readyState = 3;
      that.responseText = responseText;
      that.onprogress();
    }
  };

  var onFinish = function onFinish() {
    // Firefox 52 fires "readystatechange" (xhr.readyState === 4) without final "readystatechange" (xhr.readyState === 3)
    // IE 8 fires "onload" without "onprogress"
    onProgress();

    if (state === 1 || state === 2 || state === 3) {
      state = 4;

      if (timeout !== 0) {
        clearTimeout(timeout);
        timeout = 0;
      }

      that.readyState = 4;
      that.onreadystatechange();
    }
  };

  var onReadyStateChange = function onReadyStateChange() {
    if (xhr != undefined) {
      // Opera 12
      if (xhr.readyState === 4) {
        onFinish();
      } else if (xhr.readyState === 3) {
        onProgress();
      } else if (xhr.readyState === 2) {
        onStart();
      }
    }
  };

  var onTimeout = function onTimeout() {
    timeout = setTimeout(function () {
      onTimeout();
    }, 500);

    if (xhr.readyState === 3) {
      onProgress();
    }
  }; // XDomainRequest#abort removes onprogress, onerror, onload


  xhr.onload = onFinish;
  xhr.onerror = onFinish; // improper fix to match Firefox behavior, but it is better than just ignore abort
  // see https://bugzilla.mozilla.org/show_bug.cgi?id=768596
  // https://bugzilla.mozilla.org/show_bug.cgi?id=880200
  // https://code.google.com/p/chromium/issues/detail?id=153570
  // IE 8 fires "onload" without "onprogress

  xhr.onabort = onFinish; // https://bugzilla.mozilla.org/show_bug.cgi?id=736723

  if (!('sendAsBinary' in XMLHttpRequest.prototype) && !('mozAnon' in XMLHttpRequest.prototype)) {
    xhr.onprogress = onProgress;
  } // IE 8 - 9 (XMLHTTPRequest)
  // Opera < 12
  // Firefox < 3.5
  // Firefox 3.5 - 3.6 - ? < 9.0
  // onprogress is not fired sometimes or delayed
  // see also #64


  xhr.onreadystatechange = onReadyStateChange;

  if ('contentType' in xhr) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + 'padding=true';
  }

  xhr.open(method, url, true);

  if ('readyState' in xhr) {
    // workaround for Opera 12 issue with "progress" events
    // #91
    timeout = setTimeout(function () {
      onTimeout();
    }, 0);
  }
};

XHRWrapper.prototype.abort = function () {
  this._abort(false);
};

XHRWrapper.prototype.getResponseHeader = function (name) {
  return this._contentType;
};

XHRWrapper.prototype.setRequestHeader = function (name, value) {
  var xhr = this._xhr;

  if ('setRequestHeader' in xhr) {
    xhr.setRequestHeader(name, value);
  }
};

XHRWrapper.prototype.getAllResponseHeaders = function () {
  return this._xhr.getAllResponseHeaders != undefined ? this._xhr.getAllResponseHeaders() : '';
};

XHRWrapper.prototype.send = function () {
  // loading indicator in Safari < ? (6), Chrome < 14, Firefox
  if (!('ontimeout' in XMLHttpRequest.prototype) && document != undefined && document.readyState != undefined && document.readyState !== 'complete') {
    var that = this;
    that._sendTimeout = setTimeout(function () {
      that._sendTimeout = 0;
      that.send();
    }, 4);
    return;
  }

  var xhr = this._xhr; // withCredentials should be set after "open" for Safari and Chrome (< 19 ?)

  xhr.withCredentials = this.withCredentials;
  xhr.responseType = this.responseType;

  try {
    // xhr.send(); throws "Not enough arguments" in Firefox 3.0
    xhr.send(undefined);
  } catch (error1) {
    // Safari 5.1.7, Opera 12
    throw error1;
  }
};

function toLowerCase(name) {
  return name.replace(/[A-Z]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) + 0x20);
  });
}

function HeadersPolyfill(all) {
  // Get headers: implemented according to mozilla's example code: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders#Example
  var map = Object.create(null);
  var array = all.split('\r\n');

  for (var i = 0; i < array.length; i += 1) {
    var line = array[i];
    var parts = line.split(': ');
    var name = parts.shift();
    var value = parts.join(': ');
    map[toLowerCase(name)] = value;
  }

  this._map = map;
}

_c3 = HeadersPolyfill;

HeadersPolyfill.prototype.get = function (name) {
  return this._map[toLowerCase(name)];
};

function XHRTransport() {}

_c4 = XHRTransport;

XHRTransport.prototype.open = function (xhr, onStartCallback, onProgressCallback, onFinishCallback, url, withCredentials, headers) {
  xhr.open('GET', url);
  var offset = 0;

  xhr.onprogress = function () {
    var responseText = xhr.responseText;
    var chunk = responseText.slice(offset);
    offset += chunk.length;
    onProgressCallback(chunk);
  };

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 2) {
      var status = xhr.status;
      var statusText = xhr.statusText;
      var contentType = xhr.getResponseHeader('Content-Type');
      var headers = xhr.getAllResponseHeaders();
      onStartCallback(status, statusText, contentType, new HeadersPolyfill(headers), function () {
        xhr.abort();
      });
    } else if (xhr.readyState === 4) {
      onFinishCallback();
    }
  };

  xhr.withCredentials = withCredentials;
  xhr.responseType = 'text';

  for (var name in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, name)) {
      xhr.setRequestHeader(name, headers[name]);
    }
  }

  xhr.send();
};

function HeadersWrapper(headers) {
  this._headers = headers;
}

_c5 = HeadersWrapper;

HeadersWrapper.prototype.get = function (name) {
  return this._headers.get(name);
};

function FetchTransport() {}

_c6 = FetchTransport;

FetchTransport.prototype.open = function (xhr, onStartCallback, onProgressCallback, onFinishCallback, url, withCredentials, headers) {
  var controller = new AbortController();
  var signal = controller.signal; // see #120

  var textDecoder = new TextDecoder();
  fetch(url, {
    headers: headers,
    credentials: withCredentials ? 'include' : 'same-origin',
    signal: signal,
    cache: 'no-store'
  }).then(function (response) {
    var reader = response.body.getReader();
    onStartCallback(response.status, response.statusText, response.headers.get('Content-Type'), new HeadersWrapper(response.headers), function () {
      controller.abort();
      reader.cancel();
    });
    return new Promise(function (resolve, reject) {
      var readNextChunk = function readNextChunk() {
        reader.read().then(function (result) {
          if (result.done) {
            // Note: bytes in textDecoder are ignored
            resolve(undefined);
          } else {
            var chunk = textDecoder.decode(result.value, {
              stream: true
            });
            onProgressCallback(chunk);
            readNextChunk();
          }
        })['catch'](function (error) {
          reject(error);
        });
      };

      readNextChunk();
    });
  }).then(function (result) {
    onFinishCallback();
    return result;
  }, function (error) {
    onFinishCallback();
    return Promise.reject(error);
  });
};

function EventTarget() {
  this._listeners = Object.create(null);
}

_c7 = EventTarget;

function throwError(e) {
  setTimeout(function () {
    throw e;
  }, 0);
}

EventTarget.prototype.dispatchEvent = function (event) {
  event.target = this;
  var typeListeners = this._listeners[event.type];

  if (typeListeners != undefined) {
    var length = typeListeners.length;

    for (var i = 0; i < length; i += 1) {
      var listener = typeListeners[i];

      try {
        if (typeof listener.handleEvent === 'function') {
          listener.handleEvent(event);
        } else {
          listener.call(this, event);
        }
      } catch (e) {
        throwError(e);
      }
    }
  }
};

EventTarget.prototype.addEventListener = function (type, listener) {
  type = String(type);
  var listeners = this._listeners;
  var typeListeners = listeners[type];

  if (typeListeners == undefined) {
    typeListeners = [];
    listeners[type] = typeListeners;
  }

  var found = false;

  for (var i = 0; i < typeListeners.length; i += 1) {
    if (typeListeners[i] === listener) {
      found = true;
    }
  }

  if (!found) {
    typeListeners.push(listener);
  }
};

EventTarget.prototype.removeEventListener = function (type, listener) {
  type = String(type);
  var listeners = this._listeners;
  var typeListeners = listeners[type];

  if (typeListeners != undefined) {
    var filtered = [];

    for (var i = 0; i < typeListeners.length; i += 1) {
      if (typeListeners[i] !== listener) {
        filtered.push(typeListeners[i]);
      }
    }

    if (filtered.length === 0) {
      delete listeners[type];
    } else {
      listeners[type] = filtered;
    }
  }
};

function Event(type) {
  this.type = type;
  this.target = undefined;
}

_c8 = Event;

function MessageEvent(type, options) {
  Event.call(this, type);
  this.data = options.data;
  this.lastEventId = options.lastEventId;
}

_c9 = MessageEvent;
MessageEvent.prototype = Object.create(Event.prototype);

function ConnectionEvent(type, options) {
  Event.call(this, type);
  this.status = options.status;
  this.statusText = options.statusText;
  this.headers = options.headers;
}

_c10 = ConnectionEvent;
ConnectionEvent.prototype = Object.create(Event.prototype);
var WAITING = -1;
var CONNECTING = 0;
var OPEN = 1;
var CLOSED = 2;
var AFTER_CR = -1;
var FIELD_START = 0;
var FIELD = 1;
var VALUE_START = 2;
var VALUE = 3;
var contentTypeRegExp = /^text\/event\-stream;?(\s*charset\=utf\-8)?$/i;
var MINIMUM_DURATION = 1000;
var MAXIMUM_DURATION = 18000000;

var parseDuration = function parseDuration(value, def) {
  var n = parseInt(value, 10);

  if (n !== n) {
    n = def;
  }

  return clampDuration(n);
};

var clampDuration = function clampDuration(n) {
  return Math.min(Math.max(n, MINIMUM_DURATION), MAXIMUM_DURATION);
};

var fire = function fire(that, f, event) {
  try {
    if (typeof f === 'function') {
      f.call(that, event);
    }
  } catch (e) {
    throwError(e);
  }
};

function EventSourcePolyfill(url, options) {
  EventTarget.call(this);
  this.onopen = undefined;
  this.onmessage = undefined;
  this.onerror = undefined;
  this.url = undefined;
  this.readyState = undefined;
  this.withCredentials = undefined;
  this._close = undefined;
  start(this, url, options);
}

_c11 = EventSourcePolyfill;
var isFetchSupported = fetch != undefined && Response != undefined && 'body' in Response.prototype;

function start(es, url, options) {
  url = String(url);
  var withCredentials = options != undefined && Boolean(options.withCredentials);
  var initialRetry = clampDuration(1000);
  var heartbeatTimeout = options != undefined && options.heartbeatTimeout != undefined ? parseDuration(options.heartbeatTimeout, 45000) : clampDuration(45000);
  var lastEventId = '';
  var retry = initialRetry;
  var wasActivity = false;
  var headers = options != undefined && options.headers != undefined ? JSON.parse(JSON.stringify(options.headers)) : undefined;
  var CurrentTransport = options != undefined && options.Transport != undefined ? options.Transport : XMLHttpRequest;
  var xhr = isFetchSupported && !(options != undefined && options.Transport != undefined) ? undefined : new XHRWrapper(new CurrentTransport());
  var transport = xhr == undefined ? new FetchTransport() : new XHRTransport();
  var cancelFunction = undefined;
  var timeout = 0;
  var currentState = WAITING;
  var dataBuffer = '';
  var lastEventIdBuffer = '';
  var eventTypeBuffer = '';
  var textBuffer = '';
  var state = FIELD_START;
  var fieldStart = 0;
  var valueStart = 0;

  var onStart = function onStart(status, statusText, contentType, headers, cancel) {
    if (currentState === CONNECTING) {
      cancelFunction = cancel;

      if (status === 200 && contentType != undefined && contentTypeRegExp.test(contentType)) {
        currentState = OPEN;
        wasActivity = true;
        retry = initialRetry;
        es.readyState = OPEN;
        var event = new ConnectionEvent('open', {
          status: status,
          statusText: statusText,
          headers: headers
        });
        es.dispatchEvent(event);
        fire(es, es.onopen, event);
      } else {
        var message = '';

        if (status !== 200) {
          if (statusText) {
            statusText = statusText.replace(/\s+/g, ' ');
          }

          message = "EventSource's response has a status " + status + ' ' + statusText + ' that is not 200. Aborting the connection.';
        } else {
          message = "EventSource's response has a Content-Type specifying an unsupported type: " + (contentType == undefined ? '-' : contentType.replace(/\s+/g, ' ')) + '. Aborting the connection.';
        }

        throwError(new Error(message));
        close();
        var event = new ConnectionEvent('error', {
          status: status,
          statusText: statusText,
          headers: headers
        });
        es.dispatchEvent(event);
        fire(es, es.onerror, event);
      }
    }
  };

  var onProgress = function onProgress(textChunk) {
    if (currentState === OPEN) {
      var n = -1;

      for (var i = 0; i < textChunk.length; i += 1) {
        var c = textChunk.charCodeAt(i);

        if (c === '\n'.charCodeAt(0) || c === '\r'.charCodeAt(0)) {
          n = i;
        }
      }

      var chunk = (n !== -1 ? textBuffer : '') + textChunk.slice(0, n + 1);
      textBuffer = (n === -1 ? textBuffer : '') + textChunk.slice(n + 1);

      if (chunk !== '') {
        wasActivity = true;
      }

      for (var position = 0; position < chunk.length; position += 1) {
        var c = chunk.charCodeAt(position);

        if (state === AFTER_CR && c === '\n'.charCodeAt(0)) {
          state = FIELD_START;
        } else {
          if (state === AFTER_CR) {
            state = FIELD_START;
          }

          if (c === '\r'.charCodeAt(0) || c === '\n'.charCodeAt(0)) {
            if (state !== FIELD_START) {
              if (state === FIELD) {
                valueStart = position + 1;
              }

              var field = chunk.slice(fieldStart, valueStart - 1);
              var value = chunk.slice(valueStart + (valueStart < position && chunk.charCodeAt(valueStart) === ' '.charCodeAt(0) ? 1 : 0), position);

              if (field === 'data') {
                dataBuffer += '\n';
                dataBuffer += value;
              } else if (field === 'id') {
                lastEventIdBuffer = value;
              } else if (field === 'event') {
                eventTypeBuffer = value;
              } else if (field === 'retry') {
                initialRetry = parseDuration(value, initialRetry);
                retry = initialRetry;
              } else if (field === 'heartbeatTimeout') {
                heartbeatTimeout = parseDuration(value, heartbeatTimeout);

                if (timeout !== 0) {
                  clearTimeout(timeout);
                  timeout = setTimeout(function () {
                    onTimeout();
                  }, heartbeatTimeout);
                }
              }
            }

            if (state === FIELD_START) {
              if (dataBuffer !== '') {
                lastEventId = lastEventIdBuffer;

                if (eventTypeBuffer === '') {
                  eventTypeBuffer = 'message';
                }

                var event = new MessageEvent(eventTypeBuffer, {
                  data: dataBuffer.slice(1),
                  lastEventId: lastEventIdBuffer
                });
                es.dispatchEvent(event);

                if (eventTypeBuffer === 'message') {
                  fire(es, es.onmessage, event);
                }

                if (currentState === CLOSED) {
                  return;
                }
              }

              dataBuffer = '';
              eventTypeBuffer = '';
            }

            state = c === '\r'.charCodeAt(0) ? AFTER_CR : FIELD_START;
          } else {
            if (state === FIELD_START) {
              fieldStart = position;
              state = FIELD;
            }

            if (state === FIELD) {
              if (c === ':'.charCodeAt(0)) {
                valueStart = position + 1;
                state = VALUE_START;
              }
            } else if (state === VALUE_START) {
              state = VALUE;
            }
          }
        }
      }
    }
  };

  var onFinish = function onFinish() {
    if (currentState === OPEN || currentState === CONNECTING) {
      currentState = WAITING;

      if (timeout !== 0) {
        clearTimeout(timeout);
        timeout = 0;
      }

      timeout = setTimeout(function () {
        onTimeout();
      }, retry);
      retry = clampDuration(Math.min(initialRetry * 16, retry * 2));
      es.readyState = CONNECTING;
      var event = new Event('error');
      es.dispatchEvent(event);
      fire(es, es.onerror, event);
    }
  };

  var close = function close() {
    currentState = CLOSED;

    if (cancelFunction != undefined) {
      cancelFunction();
      cancelFunction = undefined;
    }

    if (timeout !== 0) {
      clearTimeout(timeout);
      timeout = 0;
    }

    es.readyState = CLOSED;
  };

  var onTimeout = function onTimeout() {
    timeout = 0;

    if (currentState !== WAITING) {
      if (!wasActivity && cancelFunction != undefined) {
        throwError(new Error('No activity within ' + heartbeatTimeout + ' milliseconds. Reconnecting.'));
        cancelFunction();
        cancelFunction = undefined;
      } else {
        wasActivity = false;
        timeout = setTimeout(function () {
          onTimeout();
        }, heartbeatTimeout);
      }

      return;
    }

    wasActivity = false;
    timeout = setTimeout(function () {
      onTimeout();
    }, heartbeatTimeout);
    currentState = CONNECTING;
    dataBuffer = '';
    eventTypeBuffer = '';
    lastEventIdBuffer = lastEventId;
    textBuffer = '';
    fieldStart = 0;
    valueStart = 0;
    state = FIELD_START; // https://bugzilla.mozilla.org/show_bug.cgi?id=428916
    // Request header field Last-Event-ID is not allowed by Access-Control-Allow-Headers.

    var requestURL = url;

    if (url.slice(0, 5) !== 'data:' && url.slice(0, 5) !== 'blob:') {
      if (lastEventId !== '') {
        requestURL += (url.indexOf('?') === -1 ? '?' : '&') + 'lastEventId=' + encodeURIComponent(lastEventId);
      }
    }

    var requestHeaders = {};
    requestHeaders['Accept'] = 'text/event-stream';

    if (headers != undefined) {
      for (var name in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, name)) {
          requestHeaders[name] = headers[name];
        }
      }
    }

    try {
      transport.open(xhr, onStart, onProgress, onFinish, requestURL, withCredentials, requestHeaders);
    } catch (error) {
      close();
      throw error;
    }
  };

  es.url = url;
  es.readyState = CONNECTING;
  es.withCredentials = withCredentials;
  es._close = close;
  onTimeout();
}

EventSourcePolyfill.prototype = Object.create(EventTarget.prototype);
EventSourcePolyfill.prototype.CONNECTING = CONNECTING;
EventSourcePolyfill.prototype.OPEN = OPEN;
EventSourcePolyfill.prototype.CLOSED = CLOSED;

EventSourcePolyfill.prototype.close = function () {
  this._close();
};

EventSourcePolyfill.CONNECTING = CONNECTING;
EventSourcePolyfill.OPEN = OPEN;
EventSourcePolyfill.CLOSED = CLOSED;
EventSourcePolyfill.prototype.withCredentials = undefined;
var _default = EventSourcePolyfill;
exports.default = _default;

var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;

$RefreshReg$(_c, "TextDecoderPolyfill");
$RefreshReg$(_c2, "XHRWrapper");
$RefreshReg$(_c3, "HeadersPolyfill");
$RefreshReg$(_c4, "XHRTransport");
$RefreshReg$(_c5, "HeadersWrapper");
$RefreshReg$(_c6, "FetchTransport");
$RefreshReg$(_c7, "EventTarget");
$RefreshReg$(_c8, "Event");
$RefreshReg$(_c9, "MessageEvent");
$RefreshReg$(_c10, "ConnectionEvent");
$RefreshReg$(_c11, "EventSourcePolyfill");

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


/***/ }),

/***/ "./node_modules/next/dist/client/dev/fouc.js":
/*!***************************************************!*\
  !*** ./node_modules/next/dist/client/dev/fouc.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


exports.__esModule = true;
exports.displayContent = displayContent; // This function is used to remove Next.js' no-FOUC styles workaround for using
// `style-loader` in development. It must be called before hydration, or else
// rendering won't have the correct computed values in effects.

function displayContent(callback) {
  ;
  (window.requestAnimationFrame || setTimeout)(function () {
    for (var x = document.querySelectorAll('[data-next-hide-fouc]'), i = x.length; i--;) {
      x[i].parentNode.removeChild(x[i]);
    }

    if (callback) {
      callback();
    }
  });
}

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


/***/ }),

/***/ "./node_modules/next/dist/client/dev/on-demand-entries-utils.js":
/*!**********************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/on-demand-entries-utils.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


exports.__esModule = true;
exports.closePing = closePing;
exports.setupPing = setupPing;
exports.currentPage = void 0;

var _eventsource = __webpack_require__(/*! ./error-overlay/eventsource */ "./node_modules/next/dist/client/dev/error-overlay/eventsource.js");
/* global location */


let evtSource;
let currentPage;
exports.currentPage = currentPage;

function closePing() {
  if (evtSource) evtSource.close();
  evtSource = null;
}

function setupPing(assetPrefix, pathnameFn, retry) {
  const pathname = pathnameFn(); // Make sure to only create new EventSource request if page has changed

  if (pathname === currentPage && !retry) return;
  exports.currentPage = currentPage = pathname; // close current EventSource connection

  closePing();
  evtSource = (0, _eventsource.getEventSourceWrapper)({
    path: `${assetPrefix}/_next/webpack-hmr?page=${currentPage}`,
    timeout: 5000
  });
  evtSource.addMessageListener(event => {
    if (event.data.indexOf('{') === -1) return;

    try {
      const payload = JSON.parse(event.data);

      if (payload.invalid) {
        // Payload can be invalid even if the page does not exist.
        // So, we need to make sure it exists before reloading.
        fetch(location.href, {
          credentials: 'same-origin'
        }).then(pageRes => {
          if (pageRes.status === 200) {
            location.reload();
          }
        });
      }
    } catch (err) {
      console.error('on-demand-entries failed to parse response', err);
    }
  });
}

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

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./node_modules/next/dist/client/dev/amp-dev.js"));
/******/ _N_E = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9kZXYvYW1wLWRldi5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvZGV2L2Vycm9yLW92ZXJsYXkvZXZlbnRzb3VyY2UuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L2Rldi9ldmVudC1zb3VyY2UtcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L2Rldi9mb3VjLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9kZXYvb24tZGVtYW5kLWVudHJpZXMtdXRpbHMuanMiXSwibmFtZXMiOlsiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfZXZlbnRTb3VyY2VQb2x5ZmlsbCIsIl9ldmVudHNvdXJjZSIsIl9vbkRlbWFuZEVudHJpZXNVdGlscyIsIl9mb3VjIiwid2luZG93IiwiRXZlbnRTb3VyY2UiLCJkZWZhdWx0IiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXh0Q29udGVudCIsImFzc2V0UHJlZml4IiwicGFnZSIsIm1vc3RSZWNlbnRIYXNoIiwiY3VySGFzaCIsIl9fd2VicGFja19oYXNoX18iLCJob3RVcGRhdGVQYXRoIiwiZW5kc1dpdGgiLCJpc1VwZGF0ZUF2YWlsYWJsZSIsImNhbkFwcGx5VXBkYXRlcyIsIm1vZHVsZSIsInN0YXR1cyIsInRyeUFwcGx5VXBkYXRlcyIsInJlcyIsImZldGNoIiwiX193ZWJwYWNrX3J1bnRpbWVfaWRfXyIsImpzb25EYXRhIiwianNvbiIsImN1clBhZ2UiLCJwYWdlVXBkYXRlZCIsIkFycmF5IiwiaXNBcnJheSIsImMiLCJPYmplY3QiLCJrZXlzIiwic29tZSIsIm1vZCIsImluZGV4T2YiLCJzdWJzdHIiLCJyZXBsYWNlIiwibG9jYXRpb24iLCJyZWxvYWQiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJhZGRNZXNzYWdlTGlzdGVuZXIiLCJldmVudCIsIm1lc3NhZ2UiLCJhY3Rpb24iLCJoYXNoIiwiZXgiLCJ3YXJuIiwic2V0dXBQaW5nIiwiZGlzcGxheUNvbnRlbnQiLCJleHBvcnRzIiwiZ2V0RXZlbnRTb3VyY2VXcmFwcGVyIiwiZXZlbnRDYWxsYmFja3MiLCJFdmVudFNvdXJjZVdyYXBwZXIiLCJvcHRpb25zIiwic291cmNlIiwibGFzdEFjdGl2aXR5IiwiRGF0ZSIsImxpc3RlbmVycyIsInRpbWVvdXQiLCJpbml0IiwidGltZXIiLCJzZXRJbnRlcnZhbCIsImhhbmRsZURpc2Nvbm5lY3QiLCJwYXRoIiwib25vcGVuIiwiaGFuZGxlT25saW5lIiwib25lcnJvciIsIm9ubWVzc2FnZSIsImhhbmRsZU1lc3NhZ2UiLCJsb2ciLCJpIiwibGVuZ3RoIiwiZm9yRWFjaCIsImNiIiwidW5maWx0ZXJlZCIsImNsZWFySW50ZXJ2YWwiLCJjbG9zZSIsInNldFRpbWVvdXQiLCJmbiIsInB1c2giLCJSZXNwb25zZSIsIlRleHREZWNvZGVyIiwiVGV4dEVuY29kZXIiLCJBYm9ydENvbnRyb2xsZXIiLCJ1bmRlZmluZWQiLCJzaWduYWwiLCJhYm9ydCIsIlRleHREZWNvZGVyUG9seWZpbGwiLCJiaXRzTmVlZGVkIiwiY29kZVBvaW50IiwicHJvdG90eXBlIiwiZGVjb2RlIiwib2N0ZXRzIiwidmFsaWQiLCJzaGlmdCIsIm9jdGV0c0NvdW50IiwiRXJyb3IiLCJSRVBMQUNFUiIsInN0cmluZyIsIm9jdGV0IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwic3VwcG9ydHNTdHJlYW1PcHRpb24iLCJlbmNvZGUiLCJzdHJlYW0iLCJrIiwiWEhSV3JhcHBlciIsInhociIsIndpdGhDcmVkZW50aWFscyIsInJlc3BvbnNlVHlwZSIsInJlYWR5U3RhdGUiLCJzdGF0dXNUZXh0IiwicmVzcG9uc2VUZXh0Iiwib25wcm9ncmVzcyIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsIl9jb250ZW50VHlwZSIsIl94aHIiLCJfc2VuZFRpbWVvdXQiLCJfYWJvcnQiLCJvcGVuIiwibWV0aG9kIiwidXJsIiwidGhhdCIsInN0YXRlIiwic2lsZW50IiwiY2xlYXJUaW1lb3V0Iiwib25sb2FkIiwib25hYm9ydCIsIm9uU3RhcnQiLCJjb250ZW50VHlwZSIsImdldFJlc3BvbnNlSGVhZGVyIiwib25Qcm9ncmVzcyIsIm9uRmluaXNoIiwib25SZWFkeVN0YXRlQ2hhbmdlIiwib25UaW1lb3V0IiwiWE1MSHR0cFJlcXVlc3QiLCJuYW1lIiwic2V0UmVxdWVzdEhlYWRlciIsInZhbHVlIiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwic2VuZCIsImVycm9yMSIsInRvTG93ZXJDYXNlIiwiY2hhckNvZGVBdCIsIkhlYWRlcnNQb2x5ZmlsbCIsImFsbCIsIm1hcCIsImNyZWF0ZSIsImFycmF5Iiwic3BsaXQiLCJsaW5lIiwicGFydHMiLCJqb2luIiwiX21hcCIsImdldCIsIlhIUlRyYW5zcG9ydCIsIm9uU3RhcnRDYWxsYmFjayIsIm9uUHJvZ3Jlc3NDYWxsYmFjayIsIm9uRmluaXNoQ2FsbGJhY2siLCJoZWFkZXJzIiwib2Zmc2V0IiwiY2h1bmsiLCJzbGljZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIkhlYWRlcnNXcmFwcGVyIiwiX2hlYWRlcnMiLCJGZXRjaFRyYW5zcG9ydCIsImNvbnRyb2xsZXIiLCJ0ZXh0RGVjb2RlciIsImNyZWRlbnRpYWxzIiwiY2FjaGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJyZWFkZXIiLCJib2R5IiwiZ2V0UmVhZGVyIiwiY2FuY2VsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWFkTmV4dENodW5rIiwicmVhZCIsInJlc3VsdCIsImRvbmUiLCJFdmVudFRhcmdldCIsIl9saXN0ZW5lcnMiLCJ0aHJvd0Vycm9yIiwiZSIsImRpc3BhdGNoRXZlbnQiLCJ0YXJnZXQiLCJ0eXBlTGlzdGVuZXJzIiwidHlwZSIsImxpc3RlbmVyIiwiaGFuZGxlRXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZm91bmQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZmlsdGVyZWQiLCJFdmVudCIsIk1lc3NhZ2VFdmVudCIsImxhc3RFdmVudElkIiwiQ29ubmVjdGlvbkV2ZW50IiwiV0FJVElORyIsIkNPTk5FQ1RJTkciLCJPUEVOIiwiQ0xPU0VEIiwiQUZURVJfQ1IiLCJGSUVMRF9TVEFSVCIsIkZJRUxEIiwiVkFMVUVfU1RBUlQiLCJWQUxVRSIsImNvbnRlbnRUeXBlUmVnRXhwIiwiTUlOSU1VTV9EVVJBVElPTiIsIk1BWElNVU1fRFVSQVRJT04iLCJwYXJzZUR1cmF0aW9uIiwiZGVmIiwibiIsInBhcnNlSW50IiwiY2xhbXBEdXJhdGlvbiIsIk1hdGgiLCJtaW4iLCJtYXgiLCJmaXJlIiwiZiIsIkV2ZW50U291cmNlUG9seWZpbGwiLCJfY2xvc2UiLCJzdGFydCIsImlzRmV0Y2hTdXBwb3J0ZWQiLCJlcyIsIkJvb2xlYW4iLCJpbml0aWFsUmV0cnkiLCJoZWFydGJlYXRUaW1lb3V0IiwicmV0cnkiLCJ3YXNBY3Rpdml0eSIsInN0cmluZ2lmeSIsIkN1cnJlbnRUcmFuc3BvcnQiLCJUcmFuc3BvcnQiLCJ0cmFuc3BvcnQiLCJjYW5jZWxGdW5jdGlvbiIsImN1cnJlbnRTdGF0ZSIsImRhdGFCdWZmZXIiLCJsYXN0RXZlbnRJZEJ1ZmZlciIsImV2ZW50VHlwZUJ1ZmZlciIsInRleHRCdWZmZXIiLCJmaWVsZFN0YXJ0IiwidmFsdWVTdGFydCIsInRlc3QiLCJ0ZXh0Q2h1bmsiLCJwb3NpdGlvbiIsImZpZWxkIiwicmVxdWVzdFVSTCIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlcXVlc3RIZWFkZXJzIiwiX2RlZmF1bHQiLCJjYWxsYmFjayIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIngiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiY2xvc2VQaW5nIiwiZXZ0U291cmNlIiwiY3VycmVudFBhZ2UiLCJwYXRobmFtZUZuIiwicGF0aG5hbWUiLCJwYXlsb2FkIiwiaW52YWxpZCIsImhyZWYiLCJwYWdlUmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0M7Ozs7Ozs7Ozs7OztBQ05hOztBQUFBLElBQUlBLHNCQUFzQixHQUFDQyxtQkFBTyxDQUFDLHNJQUFELENBQWxDOztBQUFtRixJQUFJQyxvQkFBb0IsR0FBQ0Ysc0JBQXNCLENBQUNDLG1CQUFPLENBQUMsNkZBQUQsQ0FBUixDQUEvQzs7QUFBb0YsSUFBSUUsWUFBWSxHQUFDRixtQkFBTyxDQUFDLHFHQUFELENBQXhCOztBQUF3RCxJQUFJRyxxQkFBcUIsR0FBQ0gsbUJBQU8sQ0FBQyxpR0FBRCxDQUFqQzs7QUFBK0QsSUFBSUksS0FBSyxHQUFDSixtQkFBTyxDQUFDLDJEQUFELENBQWpCO0FBQTRCOzs7QUFBOEIsSUFBRyxDQUFDSyxNQUFNLENBQUNDLFdBQVgsRUFBdUI7QUFBQ0QsUUFBTSxDQUFDQyxXQUFQLEdBQW1CTCxvQkFBb0IsQ0FBQ00sT0FBeEM7QUFBaUQ7O0FBQUEsTUFBTUMsSUFBSSxHQUFDQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLGVBQXhCLEVBQXlDQyxXQUFwRCxDQUFYO0FBQTRFLElBQUc7QUFBQ0MsYUFBRDtBQUFhQztBQUFiLElBQW1CUCxJQUF0QjtBQUEyQk0sV0FBVyxHQUFDQSxXQUFXLElBQUUsRUFBekI7QUFBNEIsSUFBSUUsY0FBYyxHQUFDLElBQW5CO0FBQXdCOztBQUE4QixJQUFJQyxPQUFPLEdBQUNDLHVCQUFaO0FBQTZCLE1BQU1DLGFBQWEsR0FBQ0wsV0FBVyxJQUFFQSxXQUFXLENBQUNNLFFBQVosQ0FB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WSxDQUFDd0QscUJBQWhCLEVBQXVDO0FBQUNhLFFBQUksRUFBRSxHQUFFekQsV0FBWSwyQkFBMEJpUSxXQUFZLEVBQTNEO0FBQTZEN00sV0FBTyxFQUFDO0FBQXJFLEdBQXZDLENBQVY7QUFBNkg0TSxXQUFTLENBQUM5TixrQkFBVixDQUE2QkMsS0FBSyxJQUFFO0FBQUMsUUFBR0EsS0FBSyxDQUFDekMsSUFBTixDQUFXZ0MsT0FBWCxDQUFtQixHQUFuQixNQUEwQixDQUFDLENBQTlCLEVBQWdDOztBQUFPLFFBQUc7QUFBQyxZQUFNME8sT0FBTyxHQUFDelEsSUFBSSxDQUFDQyxLQUFMLENBQVd1QyxLQUFLLENBQUN6QyxJQUFqQixDQUFkOztBQUFxQyxVQUFHMFEsT0FBTyxDQUFDQyxPQUFYLEVBQW1CO0FBQUM7QUFDbFI7QUFDQXhQLGFBQUssQ0FBQ2dCLFFBQVEsQ0FBQ3lPLElBQVYsRUFBZTtBQUFDbEcscUJBQVcsRUFBQztBQUFiLFNBQWYsQ0FBTCxDQUFpREUsSUFBakQsQ0FBc0RpRyxPQUFPLElBQUU7QUFBQyxjQUFHQSxPQUFPLENBQUM3UCxNQUFSLEtBQWlCLEdBQXBCLEVBQXdCO0FBQUNtQixvQkFBUSxDQUFDQyxNQUFUO0FBQW1CO0FBQUMsU0FBN0c7QUFBZ0g7QUFBQyxLQUZvRyxDQUVwRyxPQUFNQyxHQUFOLEVBQVU7QUFBQ0MsYUFBTyxDQUFDQyxLQUFSLENBQWMsNENBQWQsRUFBMkRGLEdBQTNEO0FBQWlFO0FBQUMsR0FGckQ7QUFFd0QiLCJmaWxlIjoic3RhdGljL2NodW5rcy9hbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO3ZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0PXJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTt2YXIgX2V2ZW50U291cmNlUG9seWZpbGw9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9ldmVudC1zb3VyY2UtcG9seWZpbGxcIikpO3ZhciBfZXZlbnRzb3VyY2U9cmVxdWlyZShcIi4vZXJyb3Itb3ZlcmxheS9ldmVudHNvdXJjZVwiKTt2YXIgX29uRGVtYW5kRW50cmllc1V0aWxzPXJlcXVpcmUoXCIuL29uLWRlbWFuZC1lbnRyaWVzLXV0aWxzXCIpO3ZhciBfZm91Yz1yZXF1aXJlKFwiLi9mb3VjXCIpOy8qIGdsb2JhbHMgX193ZWJwYWNrX2hhc2hfXyAqL2lmKCF3aW5kb3cuRXZlbnRTb3VyY2Upe3dpbmRvdy5FdmVudFNvdXJjZT1fZXZlbnRTb3VyY2VQb2x5ZmlsbC5kZWZhdWx0O31jb25zdCBkYXRhPUpTT04ucGFyc2UoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ19fTkVYVF9EQVRBX18nKS50ZXh0Q29udGVudCk7bGV0e2Fzc2V0UHJlZml4LHBhZ2V9PWRhdGE7YXNzZXRQcmVmaXg9YXNzZXRQcmVmaXh8fCcnO2xldCBtb3N0UmVjZW50SGFzaD1udWxsOy8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL2xldCBjdXJIYXNoPV9fd2VicGFja19oYXNoX187Y29uc3QgaG90VXBkYXRlUGF0aD1hc3NldFByZWZpeCsoYXNzZXRQcmVmaXguZW5kc1dpdGgoJy8nKT8nJzonLycpKydfbmV4dC9zdGF0aWMvd2VicGFjay8nOy8vIElzIHRoZXJlIGEgbmV3ZXIgdmVyc2lvbiBvZiB0aGlzIGNvZGUgYXZhaWxhYmxlP1xuZnVuY3Rpb24gaXNVcGRhdGVBdmFpbGFibGUoKXsvLyBfX3dlYnBhY2tfaGFzaF9fIGlzIHRoZSBoYXNoIG9mIHRoZSBjdXJyZW50IGNvbXBpbGF0aW9uLlxuLy8gSXQncyBhIGdsb2JhbCB2YXJpYWJsZSBpbmplY3RlZCBieSBXZWJwYWNrLlxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lICovcmV0dXJuIG1vc3RSZWNlbnRIYXNoIT09X193ZWJwYWNrX2hhc2hfXzt9Ly8gV2VicGFjayBkaXNhbGxvd3MgdXBkYXRlcyBpbiBvdGhlciBzdGF0ZXMuXG5mdW5jdGlvbiBjYW5BcHBseVVwZGF0ZXMoKXtyZXR1cm4gbW9kdWxlLmhvdC5zdGF0dXMoKT09PSdpZGxlJzt9Ly8gVGhpcyBmdW5jdGlvbiByZWFkcyBjb2RlIHVwZGF0ZXMgb24gdGhlIGZseSBhbmQgaGFyZFxuLy8gcmVsb2FkcyB0aGUgcGFnZSB3aGVuIGl0IGhhcyBjaGFuZ2VkLlxuYXN5bmMgZnVuY3Rpb24gdHJ5QXBwbHlVcGRhdGVzKCl7aWYoIWlzVXBkYXRlQXZhaWxhYmxlKCl8fCFjYW5BcHBseVVwZGF0ZXMoKSl7cmV0dXJuO310cnl7Y29uc3QgcmVzPWF3YWl0IGZldGNoKHR5cGVvZiBfX3dlYnBhY2tfcnVudGltZV9pZF9fIT09J3VuZGVmaW5lZCc/Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5gJHtob3RVcGRhdGVQYXRofSR7Y3VySGFzaH0uJHtfX3dlYnBhY2tfcnVudGltZV9pZF9ffS5ob3QtdXBkYXRlLmpzb25gOmAke2hvdFVwZGF0ZVBhdGh9JHtjdXJIYXNofS5ob3QtdXBkYXRlLmpzb25gKTtjb25zdCBqc29uRGF0YT1hd2FpdCByZXMuanNvbigpO2NvbnN0IGN1clBhZ2U9cGFnZT09PScvJz8naW5kZXgnOnBhZ2U7Ly8gd2VicGFjayA1IHVzZXMgYW4gYXJyYXkgaW5zdGVhZFxuY29uc3QgcGFnZVVwZGF0ZWQ9KEFycmF5LmlzQXJyYXkoanNvbkRhdGEuYyk/anNvbkRhdGEuYzpPYmplY3Qua2V5cyhqc29uRGF0YS5jKSkuc29tZShtb2Q9PntyZXR1cm4gbW9kLmluZGV4T2YoYHBhZ2VzJHtjdXJQYWdlLnN1YnN0cigwLDEpPT09Jy8nP2N1clBhZ2U6YC8ke2N1clBhZ2V9YH1gKSE9PS0xfHxtb2QuaW5kZXhPZihgcGFnZXMke2N1clBhZ2Uuc3Vic3RyKDAsMSk9PT0nLyc/Y3VyUGFnZTpgLyR7Y3VyUGFnZX1gfWAucmVwbGFjZSgvXFwvL2csJ1xcXFwnKSkhPT0tMTt9KTtpZihwYWdlVXBkYXRlZCl7ZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKHRydWUpO31lbHNle2N1ckhhc2g9bW9zdFJlY2VudEhhc2g7fX1jYXRjaChlcnIpe2NvbnNvbGUuZXJyb3IoJ0Vycm9yIG9jY3VycmVkIGNoZWNraW5nIGZvciB1cGRhdGUnLGVycik7ZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKHRydWUpO319KDAsX2V2ZW50c291cmNlLmFkZE1lc3NhZ2VMaXN0ZW5lcikoZXZlbnQ9PntpZihldmVudC5kYXRhPT09J1xcdUQ4M0RcXHVEQzkzJyl7cmV0dXJuO310cnl7Y29uc3QgbWVzc2FnZT1KU09OLnBhcnNlKGV2ZW50LmRhdGEpO2lmKG1lc3NhZ2UuYWN0aW9uPT09J3N5bmMnfHxtZXNzYWdlLmFjdGlvbj09PSdidWlsdCcpe2lmKCFtZXNzYWdlLmhhc2gpe3JldHVybjt9bW9zdFJlY2VudEhhc2g9bWVzc2FnZS5oYXNoO3RyeUFwcGx5VXBkYXRlcygpO31lbHNlIGlmKG1lc3NhZ2UuYWN0aW9uPT09J3JlbG9hZFBhZ2UnKXtkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7fX1jYXRjaChleCl7Y29uc29sZS53YXJuKCdJbnZhbGlkIEhNUiBtZXNzYWdlOiAnK2V2ZW50LmRhdGErJ1xcbicrZXgpO319KTsoMCxfb25EZW1hbmRFbnRyaWVzVXRpbHMuc2V0dXBQaW5nKShhc3NldFByZWZpeCwoKT0+cGFnZSk7KDAsX2ZvdWMuZGlzcGxheUNvbnRlbnQpKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbXAtZGV2LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuYWRkTWVzc2FnZUxpc3RlbmVyPWFkZE1lc3NhZ2VMaXN0ZW5lcjtleHBvcnRzLmdldEV2ZW50U291cmNlV3JhcHBlcj1nZXRFdmVudFNvdXJjZVdyYXBwZXI7Y29uc3QgZXZlbnRDYWxsYmFja3M9W107ZnVuY3Rpb24gRXZlbnRTb3VyY2VXcmFwcGVyKG9wdGlvbnMpe3ZhciBzb3VyY2U7dmFyIGxhc3RBY3Rpdml0eT1uZXcgRGF0ZSgpO3ZhciBsaXN0ZW5lcnM9W107aWYoIW9wdGlvbnMudGltZW91dCl7b3B0aW9ucy50aW1lb3V0PTIwKjEwMDA7fWluaXQoKTt2YXIgdGltZXI9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtpZihuZXcgRGF0ZSgpLWxhc3RBY3Rpdml0eT5vcHRpb25zLnRpbWVvdXQpe2hhbmRsZURpc2Nvbm5lY3QoKTt9fSxvcHRpb25zLnRpbWVvdXQvMik7ZnVuY3Rpb24gaW5pdCgpe3NvdXJjZT1uZXcgd2luZG93LkV2ZW50U291cmNlKG9wdGlvbnMucGF0aCk7c291cmNlLm9ub3Blbj1oYW5kbGVPbmxpbmU7c291cmNlLm9uZXJyb3I9aGFuZGxlRGlzY29ubmVjdDtzb3VyY2Uub25tZXNzYWdlPWhhbmRsZU1lc3NhZ2U7fWZ1bmN0aW9uIGhhbmRsZU9ubGluZSgpe2lmKG9wdGlvbnMubG9nKWNvbnNvbGUubG9nKCdbSE1SXSBjb25uZWN0ZWQnKTtsYXN0QWN0aXZpdHk9bmV3IERhdGUoKTt9ZnVuY3Rpb24gaGFuZGxlTWVzc2FnZShldmVudCl7bGFzdEFjdGl2aXR5PW5ldyBEYXRlKCk7Zm9yKHZhciBpPTA7aTxsaXN0ZW5lcnMubGVuZ3RoO2krKyl7bGlzdGVuZXJzW2ldKGV2ZW50KTt9ZXZlbnRDYWxsYmFja3MuZm9yRWFjaChjYj0+e2lmKCFjYi51bmZpbHRlcmVkJiZldmVudC5kYXRhLmluZGV4T2YoJ2FjdGlvbicpPT09LTEpcmV0dXJuO2NiKGV2ZW50KTt9KTt9ZnVuY3Rpb24gaGFuZGxlRGlzY29ubmVjdCgpe2NsZWFySW50ZXJ2YWwodGltZXIpO3NvdXJjZS5jbG9zZSgpO3NldFRpbWVvdXQoaW5pdCxvcHRpb25zLnRpbWVvdXQpO31yZXR1cm57Y2xvc2U6KCk9PntjbGVhckludGVydmFsKHRpbWVyKTtzb3VyY2UuY2xvc2UoKTt9LGFkZE1lc3NhZ2VMaXN0ZW5lcjpmdW5jdGlvbihmbil7bGlzdGVuZXJzLnB1c2goZm4pO319O31mdW5jdGlvbiBhZGRNZXNzYWdlTGlzdGVuZXIoY2Ipe2V2ZW50Q2FsbGJhY2tzLnB1c2goY2IpO31mdW5jdGlvbiBnZXRFdmVudFNvdXJjZVdyYXBwZXIob3B0aW9ucyl7cmV0dXJuIEV2ZW50U291cmNlV3JhcHBlcihvcHRpb25zKTt9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudHNvdXJjZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtleHBvcnRzLl9fZXNNb2R1bGU9dHJ1ZTtleHBvcnRzLmRlZmF1bHQ9dm9pZCAwOy8qIGVzbGludC1kaXNhYmxlICovIC8vIEltcHJvdmVkIHZlcnNpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL1lhZmZsZS9FdmVudFNvdXJjZS9cbi8vIEF2YWlsYWJsZSB1bmRlciBNSVQgTGljZW5zZSAoTUlUKVxuLy8gT25seSB0cmllcyB0byBzdXBwb3J0IElFMTEgYW5kIG5vdGhpbmcgYmVsb3dcbnZhciBkb2N1bWVudD13aW5kb3cuZG9jdW1lbnQ7dmFyIFJlc3BvbnNlPXdpbmRvdy5SZXNwb25zZTt2YXIgVGV4dERlY29kZXI9d2luZG93LlRleHREZWNvZGVyO3ZhciBUZXh0RW5jb2Rlcj13aW5kb3cuVGV4dEVuY29kZXI7dmFyIEFib3J0Q29udHJvbGxlcj13aW5kb3cuQWJvcnRDb250cm9sbGVyO2lmKEFib3J0Q29udHJvbGxlcj09dW5kZWZpbmVkKXtBYm9ydENvbnRyb2xsZXI9ZnVuY3Rpb24oKXt0aGlzLnNpZ25hbD1udWxsO3RoaXMuYWJvcnQ9ZnVuY3Rpb24oKXt9O307fWZ1bmN0aW9uIFRleHREZWNvZGVyUG9seWZpbGwoKXt0aGlzLmJpdHNOZWVkZWQ9MDt0aGlzLmNvZGVQb2ludD0wO31UZXh0RGVjb2RlclBvbHlmaWxsLnByb3RvdHlwZS5kZWNvZGU9ZnVuY3Rpb24ob2N0ZXRzKXtmdW5jdGlvbiB2YWxpZChjb2RlUG9pbnQsc2hpZnQsb2N0ZXRzQ291bnQpe2lmKG9jdGV0c0NvdW50PT09MSl7cmV0dXJuIGNvZGVQb2ludD49MHgwMDgwPj5zaGlmdCYmY29kZVBvaW50PDxzaGlmdDw9MHgwN2ZmO31pZihvY3RldHNDb3VudD09PTIpe3JldHVybiBjb2RlUG9pbnQ+PTB4MDgwMD4+c2hpZnQmJmNvZGVQb2ludDw8c2hpZnQ8PTB4ZDdmZnx8Y29kZVBvaW50Pj0weGUwMDA+PnNoaWZ0JiZjb2RlUG9pbnQ8PHNoaWZ0PD0weGZmZmY7fWlmKG9jdGV0c0NvdW50PT09Myl7cmV0dXJuIGNvZGVQb2ludD49MHgwMTAwMDA+PnNoaWZ0JiZjb2RlUG9pbnQ8PHNoaWZ0PD0weDEwZmZmZjt9dGhyb3cgbmV3IEVycm9yKCk7fWZ1bmN0aW9uIG9jdGV0c0NvdW50KGJpdHNOZWVkZWQsY29kZVBvaW50KXtpZihiaXRzTmVlZGVkPT09NioxKXtyZXR1cm4gY29kZVBvaW50Pj42PjE1PzM6Y29kZVBvaW50PjMxPzI6MTt9aWYoYml0c05lZWRlZD09PTYqMil7cmV0dXJuIGNvZGVQb2ludD4xNT8zOjI7fWlmKGJpdHNOZWVkZWQ9PT02KjMpe3JldHVybiAzO310aHJvdyBuZXcgRXJyb3IoKTt9dmFyIFJFUExBQ0VSPTB4ZmZmZDt2YXIgc3RyaW5nPScnO3ZhciBiaXRzTmVlZGVkPXRoaXMuYml0c05lZWRlZDt2YXIgY29kZVBvaW50PXRoaXMuY29kZVBvaW50O2Zvcih2YXIgaT0wO2k8b2N0ZXRzLmxlbmd0aDtpKz0xKXt2YXIgb2N0ZXQ9b2N0ZXRzW2ldO2lmKGJpdHNOZWVkZWQhPT0wKXtpZihvY3RldDwxMjh8fG9jdGV0PjE5MXx8IXZhbGlkKGNvZGVQb2ludDw8NnxvY3RldCY2MyxiaXRzTmVlZGVkLTYsb2N0ZXRzQ291bnQoYml0c05lZWRlZCxjb2RlUG9pbnQpKSl7Yml0c05lZWRlZD0wO2NvZGVQb2ludD1SRVBMQUNFUjtzdHJpbmcrPVN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50KTt9fWlmKGJpdHNOZWVkZWQ9PT0wKXtpZihvY3RldD49MCYmb2N0ZXQ8PTEyNyl7Yml0c05lZWRlZD0wO2NvZGVQb2ludD1vY3RldDt9ZWxzZSBpZihvY3RldD49MTkyJiZvY3RldDw9MjIzKXtiaXRzTmVlZGVkPTYqMTtjb2RlUG9pbnQ9b2N0ZXQmMzE7fWVsc2UgaWYob2N0ZXQ+PTIyNCYmb2N0ZXQ8PTIzOSl7Yml0c05lZWRlZD02KjI7Y29kZVBvaW50PW9jdGV0JjE1O31lbHNlIGlmKG9jdGV0Pj0yNDAmJm9jdGV0PD0yNDcpe2JpdHNOZWVkZWQ9NiozO2NvZGVQb2ludD1vY3RldCY3O31lbHNle2JpdHNOZWVkZWQ9MDtjb2RlUG9pbnQ9UkVQTEFDRVI7fWlmKGJpdHNOZWVkZWQhPT0wJiYhdmFsaWQoY29kZVBvaW50LGJpdHNOZWVkZWQsb2N0ZXRzQ291bnQoYml0c05lZWRlZCxjb2RlUG9pbnQpKSl7Yml0c05lZWRlZD0wO2NvZGVQb2ludD1SRVBMQUNFUjt9fWVsc2V7Yml0c05lZWRlZC09Njtjb2RlUG9pbnQ9Y29kZVBvaW50PDw2fG9jdGV0JjYzO31pZihiaXRzTmVlZGVkPT09MCl7aWYoY29kZVBvaW50PD0weGZmZmYpe3N0cmluZys9U3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQpO31lbHNle3N0cmluZys9U3RyaW5nLmZyb21DaGFyQ29kZSgweGQ4MDArKGNvZGVQb2ludC0weGZmZmYtMT4+MTApKTtzdHJpbmcrPVN0cmluZy5mcm9tQ2hhckNvZGUoMHhkYzAwKyhjb2RlUG9pbnQtMHhmZmZmLTEmMHgzZmYpKTt9fX10aGlzLmJpdHNOZWVkZWQ9Yml0c05lZWRlZDt0aGlzLmNvZGVQb2ludD1jb2RlUG9pbnQ7cmV0dXJuIHN0cmluZzt9Oy8vIEZpcmVmb3ggPCAzOCB0aHJvd3MgYW4gZXJyb3Igd2l0aCBzdHJlYW0gb3B0aW9uXG52YXIgc3VwcG9ydHNTdHJlYW1PcHRpb249ZnVuY3Rpb24gc3VwcG9ydHNTdHJlYW1PcHRpb24oKXt0cnl7cmV0dXJuIG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoJ3Rlc3QnKSx7c3RyZWFtOnRydWV9KT09PSd0ZXN0Jzt9Y2F0Y2goZXJyb3Ipe2NvbnNvbGUubG9nKGVycm9yKTt9cmV0dXJuIGZhbHNlO307Ly8gSUUsIEVkZ2VcbmlmKFRleHREZWNvZGVyPT11bmRlZmluZWR8fFRleHRFbmNvZGVyPT11bmRlZmluZWR8fCFzdXBwb3J0c1N0cmVhbU9wdGlvbigpKXtUZXh0RGVjb2Rlcj1UZXh0RGVjb2RlclBvbHlmaWxsO312YXIgaz1mdW5jdGlvbiBrKCl7fTtmdW5jdGlvbiBYSFJXcmFwcGVyKHhocil7dGhpcy53aXRoQ3JlZGVudGlhbHM9ZmFsc2U7dGhpcy5yZXNwb25zZVR5cGU9Jyc7dGhpcy5yZWFkeVN0YXRlPTA7dGhpcy5zdGF0dXM9MDt0aGlzLnN0YXR1c1RleHQ9Jyc7dGhpcy5yZXNwb25zZVRleHQ9Jyc7dGhpcy5vbnByb2dyZXNzPWs7dGhpcy5vbnJlYWR5c3RhdGVjaGFuZ2U9azt0aGlzLl9jb250ZW50VHlwZT0nJzt0aGlzLl94aHI9eGhyO3RoaXMuX3NlbmRUaW1lb3V0PTA7dGhpcy5fYWJvcnQ9azt9WEhSV3JhcHBlci5wcm90b3R5cGUub3Blbj1mdW5jdGlvbihtZXRob2QsdXJsKXt0aGlzLl9hYm9ydCh0cnVlKTt2YXIgdGhhdD10aGlzO3ZhciB4aHI9dGhpcy5feGhyO3ZhciBzdGF0ZT0xO3ZhciB0aW1lb3V0PTA7dGhpcy5fYWJvcnQ9ZnVuY3Rpb24oc2lsZW50KXtpZih0aGF0Ll9zZW5kVGltZW91dCE9PTApe2NsZWFyVGltZW91dCh0aGF0Ll9zZW5kVGltZW91dCk7dGhhdC5fc2VuZFRpbWVvdXQ9MDt9aWYoc3RhdGU9PT0xfHxzdGF0ZT09PTJ8fHN0YXRlPT09Myl7c3RhdGU9NDt4aHIub25sb2FkPWs7eGhyLm9uZXJyb3I9azt4aHIub25hYm9ydD1rO3hoci5vbnByb2dyZXNzPWs7eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZT1rOy8vIElFIDggLSA5OiBYRG9tYWluUmVxdWVzdCNhYm9ydCgpIGRvZXMgbm90IGZpcmUgYW55IGV2ZW50XG4vLyBPcGVyYSA8IDEwOiBYTUxIdHRwUmVxdWVzdCNhYm9ydCgpIGRvZXMgbm90IGZpcmUgYW55IGV2ZW50XG54aHIuYWJvcnQoKTtpZih0aW1lb3V0IT09MCl7Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO3RpbWVvdXQ9MDt9aWYoIXNpbGVudCl7dGhhdC5yZWFkeVN0YXRlPTQ7dGhhdC5vbnJlYWR5c3RhdGVjaGFuZ2UoKTt9fXN0YXRlPTA7fTt2YXIgb25TdGFydD1mdW5jdGlvbiBvblN0YXJ0KCl7aWYoc3RhdGU9PT0xKXsvLyBzdGF0ZSA9IDI7XG52YXIgc3RhdHVzPTA7dmFyIHN0YXR1c1RleHQ9Jyc7dmFyIGNvbnRlbnRUeXBlPXVuZGVmaW5lZDtpZighKCdjb250ZW50VHlwZSdpbiB4aHIpKXt0cnl7c3RhdHVzPXhoci5zdGF0dXM7c3RhdHVzVGV4dD14aHIuc3RhdHVzVGV4dDtjb250ZW50VHlwZT14aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO31jYXRjaChlcnJvcil7Ly8gSUUgPCAxMCB0aHJvd3MgZXhjZXB0aW9uIGZvciBgeGhyLnN0YXR1c2Agd2hlbiB4aHIucmVhZHlTdGF0ZSA9PT0gMiB8fCB4aHIucmVhZHlTdGF0ZSA9PT0gM1xuLy8gT3BlcmEgPCAxMSB0aHJvd3MgZXhjZXB0aW9uIGZvciBgeGhyLnN0YXR1c2Agd2hlbiB4aHIucmVhZHlTdGF0ZSA9PT0gMlxuLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTI5MTIxXG5zdGF0dXM9MDtzdGF0dXNUZXh0PScnO2NvbnRlbnRUeXBlPXVuZGVmaW5lZDsvLyBGaXJlZm94IDwgMTQsIENocm9tZSA/LCBTYWZhcmkgP1xuLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTI5NjU4XG4vLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Nzc4NTRcbn19ZWxzZXtzdGF0dXM9MjAwO3N0YXR1c1RleHQ9J09LJztjb250ZW50VHlwZT14aHIuY29udGVudFR5cGU7fWlmKHN0YXR1cyE9PTApe3N0YXRlPTI7dGhhdC5yZWFkeVN0YXRlPTI7dGhhdC5zdGF0dXM9c3RhdHVzO3RoYXQuc3RhdHVzVGV4dD1zdGF0dXNUZXh0O3RoYXQuX2NvbnRlbnRUeXBlPWNvbnRlbnRUeXBlO3RoYXQub25yZWFkeXN0YXRlY2hhbmdlKCk7fX19O3ZhciBvblByb2dyZXNzPWZ1bmN0aW9uIG9uUHJvZ3Jlc3MoKXtvblN0YXJ0KCk7aWYoc3RhdGU9PT0yfHxzdGF0ZT09PTMpe3N0YXRlPTM7dmFyIHJlc3BvbnNlVGV4dD0nJzt0cnl7cmVzcG9uc2VUZXh0PXhoci5yZXNwb25zZVRleHQ7fWNhdGNoKGVycm9yKXsvLyBJRSA4IC0gOSB3aXRoIFhNTEh0dHBSZXF1ZXN0XG59dGhhdC5yZWFkeVN0YXRlPTM7dGhhdC5yZXNwb25zZVRleHQ9cmVzcG9uc2VUZXh0O3RoYXQub25wcm9ncmVzcygpO319O3ZhciBvbkZpbmlzaD1mdW5jdGlvbiBvbkZpbmlzaCgpey8vIEZpcmVmb3ggNTIgZmlyZXMgXCJyZWFkeXN0YXRlY2hhbmdlXCIgKHhoci5yZWFkeVN0YXRlID09PSA0KSB3aXRob3V0IGZpbmFsIFwicmVhZHlzdGF0ZWNoYW5nZVwiICh4aHIucmVhZHlTdGF0ZSA9PT0gMylcbi8vIElFIDggZmlyZXMgXCJvbmxvYWRcIiB3aXRob3V0IFwib25wcm9ncmVzc1wiXG5vblByb2dyZXNzKCk7aWYoc3RhdGU9PT0xfHxzdGF0ZT09PTJ8fHN0YXRlPT09Myl7c3RhdGU9NDtpZih0aW1lb3V0IT09MCl7Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO3RpbWVvdXQ9MDt9dGhhdC5yZWFkeVN0YXRlPTQ7dGhhdC5vbnJlYWR5c3RhdGVjaGFuZ2UoKTt9fTt2YXIgb25SZWFkeVN0YXRlQ2hhbmdlPWZ1bmN0aW9uIG9uUmVhZHlTdGF0ZUNoYW5nZSgpe2lmKHhociE9dW5kZWZpbmVkKXsvLyBPcGVyYSAxMlxuaWYoeGhyLnJlYWR5U3RhdGU9PT00KXtvbkZpbmlzaCgpO31lbHNlIGlmKHhoci5yZWFkeVN0YXRlPT09Myl7b25Qcm9ncmVzcygpO31lbHNlIGlmKHhoci5yZWFkeVN0YXRlPT09Mil7b25TdGFydCgpO319fTt2YXIgb25UaW1lb3V0PWZ1bmN0aW9uIG9uVGltZW91dCgpe3RpbWVvdXQ9c2V0VGltZW91dChmdW5jdGlvbigpe29uVGltZW91dCgpO30sNTAwKTtpZih4aHIucmVhZHlTdGF0ZT09PTMpe29uUHJvZ3Jlc3MoKTt9fTsvLyBYRG9tYWluUmVxdWVzdCNhYm9ydCByZW1vdmVzIG9ucHJvZ3Jlc3MsIG9uZXJyb3IsIG9ubG9hZFxueGhyLm9ubG9hZD1vbkZpbmlzaDt4aHIub25lcnJvcj1vbkZpbmlzaDsvLyBpbXByb3BlciBmaXggdG8gbWF0Y2ggRmlyZWZveCBiZWhhdmlvciwgYnV0IGl0IGlzIGJldHRlciB0aGFuIGp1c3QgaWdub3JlIGFib3J0XG4vLyBzZWUgaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NzY4NTk2XG4vLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04ODAyMDBcbi8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xNTM1NzBcbi8vIElFIDggZmlyZXMgXCJvbmxvYWRcIiB3aXRob3V0IFwib25wcm9ncmVzc1xueGhyLm9uYWJvcnQ9b25GaW5pc2g7Ly8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NzM2NzIzXG5pZighKCdzZW5kQXNCaW5hcnknaW4gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlKSYmISgnbW96QW5vbidpbiBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUpKXt4aHIub25wcm9ncmVzcz1vblByb2dyZXNzO30vLyBJRSA4IC0gOSAoWE1MSFRUUFJlcXVlc3QpXG4vLyBPcGVyYSA8IDEyXG4vLyBGaXJlZm94IDwgMy41XG4vLyBGaXJlZm94IDMuNSAtIDMuNiAtID8gPCA5LjBcbi8vIG9ucHJvZ3Jlc3MgaXMgbm90IGZpcmVkIHNvbWV0aW1lcyBvciBkZWxheWVkXG4vLyBzZWUgYWxzbyAjNjRcbnhoci5vbnJlYWR5c3RhdGVjaGFuZ2U9b25SZWFkeVN0YXRlQ2hhbmdlO2lmKCdjb250ZW50VHlwZSdpbiB4aHIpe3VybCs9KHVybC5pbmRleE9mKCc/Jyk9PT0tMT8nPyc6JyYnKSsncGFkZGluZz10cnVlJzt9eGhyLm9wZW4obWV0aG9kLHVybCx0cnVlKTtpZigncmVhZHlTdGF0ZSdpbiB4aHIpey8vIHdvcmthcm91bmQgZm9yIE9wZXJhIDEyIGlzc3VlIHdpdGggXCJwcm9ncmVzc1wiIGV2ZW50c1xuLy8gIzkxXG50aW1lb3V0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtvblRpbWVvdXQoKTt9LDApO319O1hIUldyYXBwZXIucHJvdG90eXBlLmFib3J0PWZ1bmN0aW9uKCl7dGhpcy5fYWJvcnQoZmFsc2UpO307WEhSV3JhcHBlci5wcm90b3R5cGUuZ2V0UmVzcG9uc2VIZWFkZXI9ZnVuY3Rpb24obmFtZSl7cmV0dXJuIHRoaXMuX2NvbnRlbnRUeXBlO307WEhSV3JhcHBlci5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcj1mdW5jdGlvbihuYW1lLHZhbHVlKXt2YXIgeGhyPXRoaXMuX3hocjtpZignc2V0UmVxdWVzdEhlYWRlcidpbiB4aHIpe3hoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsdmFsdWUpO319O1hIUldyYXBwZXIucHJvdG90eXBlLmdldEFsbFJlc3BvbnNlSGVhZGVycz1mdW5jdGlvbigpe3JldHVybiB0aGlzLl94aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIT11bmRlZmluZWQ/dGhpcy5feGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpOicnO307WEhSV3JhcHBlci5wcm90b3R5cGUuc2VuZD1mdW5jdGlvbigpey8vIGxvYWRpbmcgaW5kaWNhdG9yIGluIFNhZmFyaSA8ID8gKDYpLCBDaHJvbWUgPCAxNCwgRmlyZWZveFxuaWYoISgnb250aW1lb3V0J2luIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSkmJmRvY3VtZW50IT11bmRlZmluZWQmJmRvY3VtZW50LnJlYWR5U3RhdGUhPXVuZGVmaW5lZCYmZG9jdW1lbnQucmVhZHlTdGF0ZSE9PSdjb21wbGV0ZScpe3ZhciB0aGF0PXRoaXM7dGhhdC5fc2VuZFRpbWVvdXQ9c2V0VGltZW91dChmdW5jdGlvbigpe3RoYXQuX3NlbmRUaW1lb3V0PTA7dGhhdC5zZW5kKCk7fSw0KTtyZXR1cm47fXZhciB4aHI9dGhpcy5feGhyOy8vIHdpdGhDcmVkZW50aWFscyBzaG91bGQgYmUgc2V0IGFmdGVyIFwib3BlblwiIGZvciBTYWZhcmkgYW5kIENocm9tZSAoPCAxOSA/KVxueGhyLndpdGhDcmVkZW50aWFscz10aGlzLndpdGhDcmVkZW50aWFsczt4aHIucmVzcG9uc2VUeXBlPXRoaXMucmVzcG9uc2VUeXBlO3RyeXsvLyB4aHIuc2VuZCgpOyB0aHJvd3MgXCJOb3QgZW5vdWdoIGFyZ3VtZW50c1wiIGluIEZpcmVmb3ggMy4wXG54aHIuc2VuZCh1bmRlZmluZWQpO31jYXRjaChlcnJvcjEpey8vIFNhZmFyaSA1LjEuNywgT3BlcmEgMTJcbnRocm93IGVycm9yMTt9fTtmdW5jdGlvbiB0b0xvd2VyQ2FzZShuYW1lKXtyZXR1cm4gbmFtZS5yZXBsYWNlKC9bQS1aXS9nLGZ1bmN0aW9uKGMpe3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGMuY2hhckNvZGVBdCgwKSsweDIwKTt9KTt9ZnVuY3Rpb24gSGVhZGVyc1BvbHlmaWxsKGFsbCl7Ly8gR2V0IGhlYWRlcnM6IGltcGxlbWVudGVkIGFjY29yZGluZyB0byBtb3ppbGxhJ3MgZXhhbXBsZSBjb2RlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvZ2V0QWxsUmVzcG9uc2VIZWFkZXJzI0V4YW1wbGVcbnZhciBtYXA9T2JqZWN0LmNyZWF0ZShudWxsKTt2YXIgYXJyYXk9YWxsLnNwbGl0KCdcXHJcXG4nKTtmb3IodmFyIGk9MDtpPGFycmF5Lmxlbmd0aDtpKz0xKXt2YXIgbGluZT1hcnJheVtpXTt2YXIgcGFydHM9bGluZS5zcGxpdCgnOiAnKTt2YXIgbmFtZT1wYXJ0cy5zaGlmdCgpO3ZhciB2YWx1ZT1wYXJ0cy5qb2luKCc6ICcpO21hcFt0b0xvd2VyQ2FzZShuYW1lKV09dmFsdWU7fXRoaXMuX21hcD1tYXA7fUhlYWRlcnNQb2x5ZmlsbC5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKG5hbWUpe3JldHVybiB0aGlzLl9tYXBbdG9Mb3dlckNhc2UobmFtZSldO307ZnVuY3Rpb24gWEhSVHJhbnNwb3J0KCl7fVhIUlRyYW5zcG9ydC5wcm90b3R5cGUub3Blbj1mdW5jdGlvbih4aHIsb25TdGFydENhbGxiYWNrLG9uUHJvZ3Jlc3NDYWxsYmFjayxvbkZpbmlzaENhbGxiYWNrLHVybCx3aXRoQ3JlZGVudGlhbHMsaGVhZGVycyl7eGhyLm9wZW4oJ0dFVCcsdXJsKTt2YXIgb2Zmc2V0PTA7eGhyLm9ucHJvZ3Jlc3M9ZnVuY3Rpb24oKXt2YXIgcmVzcG9uc2VUZXh0PXhoci5yZXNwb25zZVRleHQ7dmFyIGNodW5rPXJlc3BvbnNlVGV4dC5zbGljZShvZmZzZXQpO29mZnNldCs9Y2h1bmsubGVuZ3RoO29uUHJvZ3Jlc3NDYWxsYmFjayhjaHVuayk7fTt4aHIub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7aWYoeGhyLnJlYWR5U3RhdGU9PT0yKXt2YXIgc3RhdHVzPXhoci5zdGF0dXM7dmFyIHN0YXR1c1RleHQ9eGhyLnN0YXR1c1RleHQ7dmFyIGNvbnRlbnRUeXBlPXhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJyk7dmFyIGhlYWRlcnM9eGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpO29uU3RhcnRDYWxsYmFjayhzdGF0dXMsc3RhdHVzVGV4dCxjb250ZW50VHlwZSxuZXcgSGVhZGVyc1BvbHlmaWxsKGhlYWRlcnMpLGZ1bmN0aW9uKCl7eGhyLmFib3J0KCk7fSk7fWVsc2UgaWYoeGhyLnJlYWR5U3RhdGU9PT00KXtvbkZpbmlzaENhbGxiYWNrKCk7fX07eGhyLndpdGhDcmVkZW50aWFscz13aXRoQ3JlZGVudGlhbHM7eGhyLnJlc3BvbnNlVHlwZT0ndGV4dCc7Zm9yKHZhciBuYW1lIGluIGhlYWRlcnMpe2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoZWFkZXJzLG5hbWUpKXt4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLGhlYWRlcnNbbmFtZV0pO319eGhyLnNlbmQoKTt9O2Z1bmN0aW9uIEhlYWRlcnNXcmFwcGVyKGhlYWRlcnMpe3RoaXMuX2hlYWRlcnM9aGVhZGVyczt9SGVhZGVyc1dyYXBwZXIucHJvdG90eXBlLmdldD1mdW5jdGlvbihuYW1lKXtyZXR1cm4gdGhpcy5faGVhZGVycy5nZXQobmFtZSk7fTtmdW5jdGlvbiBGZXRjaFRyYW5zcG9ydCgpe31GZXRjaFRyYW5zcG9ydC5wcm90b3R5cGUub3Blbj1mdW5jdGlvbih4aHIsb25TdGFydENhbGxiYWNrLG9uUHJvZ3Jlc3NDYWxsYmFjayxvbkZpbmlzaENhbGxiYWNrLHVybCx3aXRoQ3JlZGVudGlhbHMsaGVhZGVycyl7dmFyIGNvbnRyb2xsZXI9bmV3IEFib3J0Q29udHJvbGxlcigpO3ZhciBzaWduYWw9Y29udHJvbGxlci5zaWduYWw7Ly8gc2VlICMxMjBcbnZhciB0ZXh0RGVjb2Rlcj1uZXcgVGV4dERlY29kZXIoKTtmZXRjaCh1cmwse2hlYWRlcnM6aGVhZGVycyxjcmVkZW50aWFsczp3aXRoQ3JlZGVudGlhbHM/J2luY2x1ZGUnOidzYW1lLW9yaWdpbicsc2lnbmFsOnNpZ25hbCxjYWNoZTonbm8tc3RvcmUnfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7dmFyIHJlYWRlcj1yZXNwb25zZS5ib2R5LmdldFJlYWRlcigpO29uU3RhcnRDYWxsYmFjayhyZXNwb25zZS5zdGF0dXMscmVzcG9uc2Uuc3RhdHVzVGV4dCxyZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyksbmV3IEhlYWRlcnNXcmFwcGVyKHJlc3BvbnNlLmhlYWRlcnMpLGZ1bmN0aW9uKCl7Y29udHJvbGxlci5hYm9ydCgpO3JlYWRlci5jYW5jZWwoKTt9KTtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe3ZhciByZWFkTmV4dENodW5rPWZ1bmN0aW9uIHJlYWROZXh0Q2h1bmsoKXtyZWFkZXIucmVhZCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtpZihyZXN1bHQuZG9uZSl7Ly8gTm90ZTogYnl0ZXMgaW4gdGV4dERlY29kZXIgYXJlIGlnbm9yZWRcbnJlc29sdmUodW5kZWZpbmVkKTt9ZWxzZXt2YXIgY2h1bms9dGV4dERlY29kZXIuZGVjb2RlKHJlc3VsdC52YWx1ZSx7c3RyZWFtOnRydWV9KTtvblByb2dyZXNzQ2FsbGJhY2soY2h1bmspO3JlYWROZXh0Q2h1bmsoKTt9fSlbJ2NhdGNoJ10oZnVuY3Rpb24oZXJyb3Ipe3JlamVjdChlcnJvcik7fSk7fTtyZWFkTmV4dENodW5rKCk7fSk7fSkudGhlbihmdW5jdGlvbihyZXN1bHQpe29uRmluaXNoQ2FsbGJhY2soKTtyZXR1cm4gcmVzdWx0O30sZnVuY3Rpb24oZXJyb3Ipe29uRmluaXNoQ2FsbGJhY2soKTtyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO30pO307ZnVuY3Rpb24gRXZlbnRUYXJnZXQoKXt0aGlzLl9saXN0ZW5lcnM9T2JqZWN0LmNyZWF0ZShudWxsKTt9ZnVuY3Rpb24gdGhyb3dFcnJvcihlKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhyb3cgZTt9LDApO31FdmVudFRhcmdldC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudD1mdW5jdGlvbihldmVudCl7ZXZlbnQudGFyZ2V0PXRoaXM7dmFyIHR5cGVMaXN0ZW5lcnM9dGhpcy5fbGlzdGVuZXJzW2V2ZW50LnR5cGVdO2lmKHR5cGVMaXN0ZW5lcnMhPXVuZGVmaW5lZCl7dmFyIGxlbmd0aD10eXBlTGlzdGVuZXJzLmxlbmd0aDtmb3IodmFyIGk9MDtpPGxlbmd0aDtpKz0xKXt2YXIgbGlzdGVuZXI9dHlwZUxpc3RlbmVyc1tpXTt0cnl7aWYodHlwZW9mIGxpc3RlbmVyLmhhbmRsZUV2ZW50PT09J2Z1bmN0aW9uJyl7bGlzdGVuZXIuaGFuZGxlRXZlbnQoZXZlbnQpO31lbHNle2xpc3RlbmVyLmNhbGwodGhpcyxldmVudCk7fX1jYXRjaChlKXt0aHJvd0Vycm9yKGUpO319fX07RXZlbnRUYXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lcil7dHlwZT1TdHJpbmcodHlwZSk7dmFyIGxpc3RlbmVycz10aGlzLl9saXN0ZW5lcnM7dmFyIHR5cGVMaXN0ZW5lcnM9bGlzdGVuZXJzW3R5cGVdO2lmKHR5cGVMaXN0ZW5lcnM9PXVuZGVmaW5lZCl7dHlwZUxpc3RlbmVycz1bXTtsaXN0ZW5lcnNbdHlwZV09dHlwZUxpc3RlbmVyczt9dmFyIGZvdW5kPWZhbHNlO2Zvcih2YXIgaT0wO2k8dHlwZUxpc3RlbmVycy5sZW5ndGg7aSs9MSl7aWYodHlwZUxpc3RlbmVyc1tpXT09PWxpc3RlbmVyKXtmb3VuZD10cnVlO319aWYoIWZvdW5kKXt0eXBlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO319O0V2ZW50VGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIpe3R5cGU9U3RyaW5nKHR5cGUpO3ZhciBsaXN0ZW5lcnM9dGhpcy5fbGlzdGVuZXJzO3ZhciB0eXBlTGlzdGVuZXJzPWxpc3RlbmVyc1t0eXBlXTtpZih0eXBlTGlzdGVuZXJzIT11bmRlZmluZWQpe3ZhciBmaWx0ZXJlZD1bXTtmb3IodmFyIGk9MDtpPHR5cGVMaXN0ZW5lcnMubGVuZ3RoO2krPTEpe2lmKHR5cGVMaXN0ZW5lcnNbaV0hPT1saXN0ZW5lcil7ZmlsdGVyZWQucHVzaCh0eXBlTGlzdGVuZXJzW2ldKTt9fWlmKGZpbHRlcmVkLmxlbmd0aD09PTApe2RlbGV0ZSBsaXN0ZW5lcnNbdHlwZV07fWVsc2V7bGlzdGVuZXJzW3R5cGVdPWZpbHRlcmVkO319fTtmdW5jdGlvbiBFdmVudCh0eXBlKXt0aGlzLnR5cGU9dHlwZTt0aGlzLnRhcmdldD11bmRlZmluZWQ7fWZ1bmN0aW9uIE1lc3NhZ2VFdmVudCh0eXBlLG9wdGlvbnMpe0V2ZW50LmNhbGwodGhpcyx0eXBlKTt0aGlzLmRhdGE9b3B0aW9ucy5kYXRhO3RoaXMubGFzdEV2ZW50SWQ9b3B0aW9ucy5sYXN0RXZlbnRJZDt9TWVzc2FnZUV2ZW50LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKEV2ZW50LnByb3RvdHlwZSk7ZnVuY3Rpb24gQ29ubmVjdGlvbkV2ZW50KHR5cGUsb3B0aW9ucyl7RXZlbnQuY2FsbCh0aGlzLHR5cGUpO3RoaXMuc3RhdHVzPW9wdGlvbnMuc3RhdHVzO3RoaXMuc3RhdHVzVGV4dD1vcHRpb25zLnN0YXR1c1RleHQ7dGhpcy5oZWFkZXJzPW9wdGlvbnMuaGVhZGVyczt9Q29ubmVjdGlvbkV2ZW50LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKEV2ZW50LnByb3RvdHlwZSk7dmFyIFdBSVRJTkc9LTE7dmFyIENPTk5FQ1RJTkc9MDt2YXIgT1BFTj0xO3ZhciBDTE9TRUQ9Mjt2YXIgQUZURVJfQ1I9LTE7dmFyIEZJRUxEX1NUQVJUPTA7dmFyIEZJRUxEPTE7dmFyIFZBTFVFX1NUQVJUPTI7dmFyIFZBTFVFPTM7dmFyIGNvbnRlbnRUeXBlUmVnRXhwPS9edGV4dFxcL2V2ZW50XFwtc3RyZWFtOz8oXFxzKmNoYXJzZXRcXD11dGZcXC04KT8kL2k7dmFyIE1JTklNVU1fRFVSQVRJT049MTAwMDt2YXIgTUFYSU1VTV9EVVJBVElPTj0xODAwMDAwMDt2YXIgcGFyc2VEdXJhdGlvbj1mdW5jdGlvbiBwYXJzZUR1cmF0aW9uKHZhbHVlLGRlZil7dmFyIG49cGFyc2VJbnQodmFsdWUsMTApO2lmKG4hPT1uKXtuPWRlZjt9cmV0dXJuIGNsYW1wRHVyYXRpb24obik7fTt2YXIgY2xhbXBEdXJhdGlvbj1mdW5jdGlvbiBjbGFtcER1cmF0aW9uKG4pe3JldHVybiBNYXRoLm1pbihNYXRoLm1heChuLE1JTklNVU1fRFVSQVRJT04pLE1BWElNVU1fRFVSQVRJT04pO307dmFyIGZpcmU9ZnVuY3Rpb24gZmlyZSh0aGF0LGYsZXZlbnQpe3RyeXtpZih0eXBlb2YgZj09PSdmdW5jdGlvbicpe2YuY2FsbCh0aGF0LGV2ZW50KTt9fWNhdGNoKGUpe3Rocm93RXJyb3IoZSk7fX07ZnVuY3Rpb24gRXZlbnRTb3VyY2VQb2x5ZmlsbCh1cmwsb3B0aW9ucyl7RXZlbnRUYXJnZXQuY2FsbCh0aGlzKTt0aGlzLm9ub3Blbj11bmRlZmluZWQ7dGhpcy5vbm1lc3NhZ2U9dW5kZWZpbmVkO3RoaXMub25lcnJvcj11bmRlZmluZWQ7dGhpcy51cmw9dW5kZWZpbmVkO3RoaXMucmVhZHlTdGF0ZT11bmRlZmluZWQ7dGhpcy53aXRoQ3JlZGVudGlhbHM9dW5kZWZpbmVkO3RoaXMuX2Nsb3NlPXVuZGVmaW5lZDtzdGFydCh0aGlzLHVybCxvcHRpb25zKTt9dmFyIGlzRmV0Y2hTdXBwb3J0ZWQ9ZmV0Y2ghPXVuZGVmaW5lZCYmUmVzcG9uc2UhPXVuZGVmaW5lZCYmJ2JvZHknaW4gUmVzcG9uc2UucHJvdG90eXBlO2Z1bmN0aW9uIHN0YXJ0KGVzLHVybCxvcHRpb25zKXt1cmw9U3RyaW5nKHVybCk7dmFyIHdpdGhDcmVkZW50aWFscz1vcHRpb25zIT11bmRlZmluZWQmJkJvb2xlYW4ob3B0aW9ucy53aXRoQ3JlZGVudGlhbHMpO3ZhciBpbml0aWFsUmV0cnk9Y2xhbXBEdXJhdGlvbigxMDAwKTt2YXIgaGVhcnRiZWF0VGltZW91dD1vcHRpb25zIT11bmRlZmluZWQmJm9wdGlvbnMuaGVhcnRiZWF0VGltZW91dCE9dW5kZWZpbmVkP3BhcnNlRHVyYXRpb24ob3B0aW9ucy5oZWFydGJlYXRUaW1lb3V0LDQ1MDAwKTpjbGFtcER1cmF0aW9uKDQ1MDAwKTt2YXIgbGFzdEV2ZW50SWQ9Jyc7dmFyIHJldHJ5PWluaXRpYWxSZXRyeTt2YXIgd2FzQWN0aXZpdHk9ZmFsc2U7dmFyIGhlYWRlcnM9b3B0aW9ucyE9dW5kZWZpbmVkJiZvcHRpb25zLmhlYWRlcnMhPXVuZGVmaW5lZD9KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuaGVhZGVycykpOnVuZGVmaW5lZDt2YXIgQ3VycmVudFRyYW5zcG9ydD1vcHRpb25zIT11bmRlZmluZWQmJm9wdGlvbnMuVHJhbnNwb3J0IT11bmRlZmluZWQ/b3B0aW9ucy5UcmFuc3BvcnQ6WE1MSHR0cFJlcXVlc3Q7dmFyIHhocj1pc0ZldGNoU3VwcG9ydGVkJiYhKG9wdGlvbnMhPXVuZGVmaW5lZCYmb3B0aW9ucy5UcmFuc3BvcnQhPXVuZGVmaW5lZCk/dW5kZWZpbmVkOm5ldyBYSFJXcmFwcGVyKG5ldyBDdXJyZW50VHJhbnNwb3J0KCkpO3ZhciB0cmFuc3BvcnQ9eGhyPT11bmRlZmluZWQ/bmV3IEZldGNoVHJhbnNwb3J0KCk6bmV3IFhIUlRyYW5zcG9ydCgpO3ZhciBjYW5jZWxGdW5jdGlvbj11bmRlZmluZWQ7dmFyIHRpbWVvdXQ9MDt2YXIgY3VycmVudFN0YXRlPVdBSVRJTkc7dmFyIGRhdGFCdWZmZXI9Jyc7dmFyIGxhc3RFdmVudElkQnVmZmVyPScnO3ZhciBldmVudFR5cGVCdWZmZXI9Jyc7dmFyIHRleHRCdWZmZXI9Jyc7dmFyIHN0YXRlPUZJRUxEX1NUQVJUO3ZhciBmaWVsZFN0YXJ0PTA7dmFyIHZhbHVlU3RhcnQ9MDt2YXIgb25TdGFydD1mdW5jdGlvbiBvblN0YXJ0KHN0YXR1cyxzdGF0dXNUZXh0LGNvbnRlbnRUeXBlLGhlYWRlcnMsY2FuY2VsKXtpZihjdXJyZW50U3RhdGU9PT1DT05ORUNUSU5HKXtjYW5jZWxGdW5jdGlvbj1jYW5jZWw7aWYoc3RhdHVzPT09MjAwJiZjb250ZW50VHlwZSE9dW5kZWZpbmVkJiZjb250ZW50VHlwZVJlZ0V4cC50ZXN0KGNvbnRlbnRUeXBlKSl7Y3VycmVudFN0YXRlPU9QRU47d2FzQWN0aXZpdHk9dHJ1ZTtyZXRyeT1pbml0aWFsUmV0cnk7ZXMucmVhZHlTdGF0ZT1PUEVOO3ZhciBldmVudD1uZXcgQ29ubmVjdGlvbkV2ZW50KCdvcGVuJyx7c3RhdHVzOnN0YXR1cyxzdGF0dXNUZXh0OnN0YXR1c1RleHQsaGVhZGVyczpoZWFkZXJzfSk7ZXMuZGlzcGF0Y2hFdmVudChldmVudCk7ZmlyZShlcyxlcy5vbm9wZW4sZXZlbnQpO31lbHNle3ZhciBtZXNzYWdlPScnO2lmKHN0YXR1cyE9PTIwMCl7aWYoc3RhdHVzVGV4dCl7c3RhdHVzVGV4dD1zdGF0dXNUZXh0LnJlcGxhY2UoL1xccysvZywnICcpO31tZXNzYWdlPVwiRXZlbnRTb3VyY2UncyByZXNwb25zZSBoYXMgYSBzdGF0dXMgXCIrc3RhdHVzKycgJytzdGF0dXNUZXh0KycgdGhhdCBpcyBub3QgMjAwLiBBYm9ydGluZyB0aGUgY29ubmVjdGlvbi4nO31lbHNle21lc3NhZ2U9XCJFdmVudFNvdXJjZSdzIHJlc3BvbnNlIGhhcyBhIENvbnRlbnQtVHlwZSBzcGVjaWZ5aW5nIGFuIHVuc3VwcG9ydGVkIHR5cGU6IFwiKyhjb250ZW50VHlwZT09dW5kZWZpbmVkPyctJzpjb250ZW50VHlwZS5yZXBsYWNlKC9cXHMrL2csJyAnKSkrJy4gQWJvcnRpbmcgdGhlIGNvbm5lY3Rpb24uJzt9dGhyb3dFcnJvcihuZXcgRXJyb3IobWVzc2FnZSkpO2Nsb3NlKCk7dmFyIGV2ZW50PW5ldyBDb25uZWN0aW9uRXZlbnQoJ2Vycm9yJyx7c3RhdHVzOnN0YXR1cyxzdGF0dXNUZXh0OnN0YXR1c1RleHQsaGVhZGVyczpoZWFkZXJzfSk7ZXMuZGlzcGF0Y2hFdmVudChldmVudCk7ZmlyZShlcyxlcy5vbmVycm9yLGV2ZW50KTt9fX07dmFyIG9uUHJvZ3Jlc3M9ZnVuY3Rpb24gb25Qcm9ncmVzcyh0ZXh0Q2h1bmspe2lmKGN1cnJlbnRTdGF0ZT09PU9QRU4pe3ZhciBuPS0xO2Zvcih2YXIgaT0wO2k8dGV4dENodW5rLmxlbmd0aDtpKz0xKXt2YXIgYz10ZXh0Q2h1bmsuY2hhckNvZGVBdChpKTtpZihjPT09J1xcbicuY2hhckNvZGVBdCgwKXx8Yz09PSdcXHInLmNoYXJDb2RlQXQoMCkpe249aTt9fXZhciBjaHVuaz0obiE9PS0xP3RleHRCdWZmZXI6JycpK3RleHRDaHVuay5zbGljZSgwLG4rMSk7dGV4dEJ1ZmZlcj0obj09PS0xP3RleHRCdWZmZXI6JycpK3RleHRDaHVuay5zbGljZShuKzEpO2lmKGNodW5rIT09Jycpe3dhc0FjdGl2aXR5PXRydWU7fWZvcih2YXIgcG9zaXRpb249MDtwb3NpdGlvbjxjaHVuay5sZW5ndGg7cG9zaXRpb24rPTEpe3ZhciBjPWNodW5rLmNoYXJDb2RlQXQocG9zaXRpb24pO2lmKHN0YXRlPT09QUZURVJfQ1ImJmM9PT0nXFxuJy5jaGFyQ29kZUF0KDApKXtzdGF0ZT1GSUVMRF9TVEFSVDt9ZWxzZXtpZihzdGF0ZT09PUFGVEVSX0NSKXtzdGF0ZT1GSUVMRF9TVEFSVDt9aWYoYz09PSdcXHInLmNoYXJDb2RlQXQoMCl8fGM9PT0nXFxuJy5jaGFyQ29kZUF0KDApKXtpZihzdGF0ZSE9PUZJRUxEX1NUQVJUKXtpZihzdGF0ZT09PUZJRUxEKXt2YWx1ZVN0YXJ0PXBvc2l0aW9uKzE7fXZhciBmaWVsZD1jaHVuay5zbGljZShmaWVsZFN0YXJ0LHZhbHVlU3RhcnQtMSk7dmFyIHZhbHVlPWNodW5rLnNsaWNlKHZhbHVlU3RhcnQrKHZhbHVlU3RhcnQ8cG9zaXRpb24mJmNodW5rLmNoYXJDb2RlQXQodmFsdWVTdGFydCk9PT0nICcuY2hhckNvZGVBdCgwKT8xOjApLHBvc2l0aW9uKTtpZihmaWVsZD09PSdkYXRhJyl7ZGF0YUJ1ZmZlcis9J1xcbic7ZGF0YUJ1ZmZlcis9dmFsdWU7fWVsc2UgaWYoZmllbGQ9PT0naWQnKXtsYXN0RXZlbnRJZEJ1ZmZlcj12YWx1ZTt9ZWxzZSBpZihmaWVsZD09PSdldmVudCcpe2V2ZW50VHlwZUJ1ZmZlcj12YWx1ZTt9ZWxzZSBpZihmaWVsZD09PSdyZXRyeScpe2luaXRpYWxSZXRyeT1wYXJzZUR1cmF0aW9uKHZhbHVlLGluaXRpYWxSZXRyeSk7cmV0cnk9aW5pdGlhbFJldHJ5O31lbHNlIGlmKGZpZWxkPT09J2hlYXJ0YmVhdFRpbWVvdXQnKXtoZWFydGJlYXRUaW1lb3V0PXBhcnNlRHVyYXRpb24odmFsdWUsaGVhcnRiZWF0VGltZW91dCk7aWYodGltZW91dCE9PTApe2NsZWFyVGltZW91dCh0aW1lb3V0KTt0aW1lb3V0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtvblRpbWVvdXQoKTt9LGhlYXJ0YmVhdFRpbWVvdXQpO319fWlmKHN0YXRlPT09RklFTERfU1RBUlQpe2lmKGRhdGFCdWZmZXIhPT0nJyl7bGFzdEV2ZW50SWQ9bGFzdEV2ZW50SWRCdWZmZXI7aWYoZXZlbnRUeXBlQnVmZmVyPT09Jycpe2V2ZW50VHlwZUJ1ZmZlcj0nbWVzc2FnZSc7fXZhciBldmVudD1uZXcgTWVzc2FnZUV2ZW50KGV2ZW50VHlwZUJ1ZmZlcix7ZGF0YTpkYXRhQnVmZmVyLnNsaWNlKDEpLGxhc3RFdmVudElkOmxhc3RFdmVudElkQnVmZmVyfSk7ZXMuZGlzcGF0Y2hFdmVudChldmVudCk7aWYoZXZlbnRUeXBlQnVmZmVyPT09J21lc3NhZ2UnKXtmaXJlKGVzLGVzLm9ubWVzc2FnZSxldmVudCk7fWlmKGN1cnJlbnRTdGF0ZT09PUNMT1NFRCl7cmV0dXJuO319ZGF0YUJ1ZmZlcj0nJztldmVudFR5cGVCdWZmZXI9Jyc7fXN0YXRlPWM9PT0nXFxyJy5jaGFyQ29kZUF0KDApP0FGVEVSX0NSOkZJRUxEX1NUQVJUO31lbHNle2lmKHN0YXRlPT09RklFTERfU1RBUlQpe2ZpZWxkU3RhcnQ9cG9zaXRpb247c3RhdGU9RklFTEQ7fWlmKHN0YXRlPT09RklFTEQpe2lmKGM9PT0nOicuY2hhckNvZGVBdCgwKSl7dmFsdWVTdGFydD1wb3NpdGlvbisxO3N0YXRlPVZBTFVFX1NUQVJUO319ZWxzZSBpZihzdGF0ZT09PVZBTFVFX1NUQVJUKXtzdGF0ZT1WQUxVRTt9fX19fX07dmFyIG9uRmluaXNoPWZ1bmN0aW9uIG9uRmluaXNoKCl7aWYoY3VycmVudFN0YXRlPT09T1BFTnx8Y3VycmVudFN0YXRlPT09Q09OTkVDVElORyl7Y3VycmVudFN0YXRlPVdBSVRJTkc7aWYodGltZW91dCE9PTApe2NsZWFyVGltZW91dCh0aW1lb3V0KTt0aW1lb3V0PTA7fXRpbWVvdXQ9c2V0VGltZW91dChmdW5jdGlvbigpe29uVGltZW91dCgpO30scmV0cnkpO3JldHJ5PWNsYW1wRHVyYXRpb24oTWF0aC5taW4oaW5pdGlhbFJldHJ5KjE2LHJldHJ5KjIpKTtlcy5yZWFkeVN0YXRlPUNPTk5FQ1RJTkc7dmFyIGV2ZW50PW5ldyBFdmVudCgnZXJyb3InKTtlcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtmaXJlKGVzLGVzLm9uZXJyb3IsZXZlbnQpO319O3ZhciBjbG9zZT1mdW5jdGlvbiBjbG9zZSgpe2N1cnJlbnRTdGF0ZT1DTE9TRUQ7aWYoY2FuY2VsRnVuY3Rpb24hPXVuZGVmaW5lZCl7Y2FuY2VsRnVuY3Rpb24oKTtjYW5jZWxGdW5jdGlvbj11bmRlZmluZWQ7fWlmKHRpbWVvdXQhPT0wKXtjbGVhclRpbWVvdXQodGltZW91dCk7dGltZW91dD0wO31lcy5yZWFkeVN0YXRlPUNMT1NFRDt9O3ZhciBvblRpbWVvdXQ9ZnVuY3Rpb24gb25UaW1lb3V0KCl7dGltZW91dD0wO2lmKGN1cnJlbnRTdGF0ZSE9PVdBSVRJTkcpe2lmKCF3YXNBY3Rpdml0eSYmY2FuY2VsRnVuY3Rpb24hPXVuZGVmaW5lZCl7dGhyb3dFcnJvcihuZXcgRXJyb3IoJ05vIGFjdGl2aXR5IHdpdGhpbiAnK2hlYXJ0YmVhdFRpbWVvdXQrJyBtaWxsaXNlY29uZHMuIFJlY29ubmVjdGluZy4nKSk7Y2FuY2VsRnVuY3Rpb24oKTtjYW5jZWxGdW5jdGlvbj11bmRlZmluZWQ7fWVsc2V7d2FzQWN0aXZpdHk9ZmFsc2U7dGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7b25UaW1lb3V0KCk7fSxoZWFydGJlYXRUaW1lb3V0KTt9cmV0dXJuO313YXNBY3Rpdml0eT1mYWxzZTt0aW1lb3V0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtvblRpbWVvdXQoKTt9LGhlYXJ0YmVhdFRpbWVvdXQpO2N1cnJlbnRTdGF0ZT1DT05ORUNUSU5HO2RhdGFCdWZmZXI9Jyc7ZXZlbnRUeXBlQnVmZmVyPScnO2xhc3RFdmVudElkQnVmZmVyPWxhc3RFdmVudElkO3RleHRCdWZmZXI9Jyc7ZmllbGRTdGFydD0wO3ZhbHVlU3RhcnQ9MDtzdGF0ZT1GSUVMRF9TVEFSVDsvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD00Mjg5MTZcbi8vIFJlcXVlc3QgaGVhZGVyIGZpZWxkIExhc3QtRXZlbnQtSUQgaXMgbm90IGFsbG93ZWQgYnkgQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycy5cbnZhciByZXF1ZXN0VVJMPXVybDtpZih1cmwuc2xpY2UoMCw1KSE9PSdkYXRhOicmJnVybC5zbGljZSgwLDUpIT09J2Jsb2I6Jyl7aWYobGFzdEV2ZW50SWQhPT0nJyl7cmVxdWVzdFVSTCs9KHVybC5pbmRleE9mKCc/Jyk9PT0tMT8nPyc6JyYnKSsnbGFzdEV2ZW50SWQ9JytlbmNvZGVVUklDb21wb25lbnQobGFzdEV2ZW50SWQpO319dmFyIHJlcXVlc3RIZWFkZXJzPXt9O3JlcXVlc3RIZWFkZXJzWydBY2NlcHQnXT0ndGV4dC9ldmVudC1zdHJlYW0nO2lmKGhlYWRlcnMhPXVuZGVmaW5lZCl7Zm9yKHZhciBuYW1lIGluIGhlYWRlcnMpe2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoZWFkZXJzLG5hbWUpKXtyZXF1ZXN0SGVhZGVyc1tuYW1lXT1oZWFkZXJzW25hbWVdO319fXRyeXt0cmFuc3BvcnQub3Blbih4aHIsb25TdGFydCxvblByb2dyZXNzLG9uRmluaXNoLHJlcXVlc3RVUkwsd2l0aENyZWRlbnRpYWxzLHJlcXVlc3RIZWFkZXJzKTt9Y2F0Y2goZXJyb3Ipe2Nsb3NlKCk7dGhyb3cgZXJyb3I7fX07ZXMudXJsPXVybDtlcy5yZWFkeVN0YXRlPUNPTk5FQ1RJTkc7ZXMud2l0aENyZWRlbnRpYWxzPXdpdGhDcmVkZW50aWFscztlcy5fY2xvc2U9Y2xvc2U7b25UaW1lb3V0KCk7fUV2ZW50U291cmNlUG9seWZpbGwucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoRXZlbnRUYXJnZXQucHJvdG90eXBlKTtFdmVudFNvdXJjZVBvbHlmaWxsLnByb3RvdHlwZS5DT05ORUNUSU5HPUNPTk5FQ1RJTkc7RXZlbnRTb3VyY2VQb2x5ZmlsbC5wcm90b3R5cGUuT1BFTj1PUEVOO0V2ZW50U291cmNlUG9seWZpbGwucHJvdG90eXBlLkNMT1NFRD1DTE9TRUQ7RXZlbnRTb3VyY2VQb2x5ZmlsbC5wcm90b3R5cGUuY2xvc2U9ZnVuY3Rpb24oKXt0aGlzLl9jbG9zZSgpO307RXZlbnRTb3VyY2VQb2x5ZmlsbC5DT05ORUNUSU5HPUNPTk5FQ1RJTkc7RXZlbnRTb3VyY2VQb2x5ZmlsbC5PUEVOPU9QRU47RXZlbnRTb3VyY2VQb2x5ZmlsbC5DTE9TRUQ9Q0xPU0VEO0V2ZW50U291cmNlUG9seWZpbGwucHJvdG90eXBlLndpdGhDcmVkZW50aWFscz11bmRlZmluZWQ7dmFyIF9kZWZhdWx0PUV2ZW50U291cmNlUG9seWZpbGw7ZXhwb3J0cy5kZWZhdWx0PV9kZWZhdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnQtc291cmNlLXBvbHlmaWxsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuZGlzcGxheUNvbnRlbnQ9ZGlzcGxheUNvbnRlbnQ7Ly8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlbW92ZSBOZXh0LmpzJyBuby1GT1VDIHN0eWxlcyB3b3JrYXJvdW5kIGZvciB1c2luZ1xuLy8gYHN0eWxlLWxvYWRlcmAgaW4gZGV2ZWxvcG1lbnQuIEl0IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBoeWRyYXRpb24sIG9yIGVsc2Vcbi8vIHJlbmRlcmluZyB3b24ndCBoYXZlIHRoZSBjb3JyZWN0IGNvbXB1dGVkIHZhbHVlcyBpbiBlZmZlY3RzLlxuZnVuY3Rpb24gZGlzcGxheUNvbnRlbnQoY2FsbGJhY2spezsod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8c2V0VGltZW91dCkoZnVuY3Rpb24oKXtmb3IodmFyIHg9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbmV4dC1oaWRlLWZvdWNdJyksaT14Lmxlbmd0aDtpLS07KXt4W2ldLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoeFtpXSk7fWlmKGNhbGxiYWNrKXtjYWxsYmFjaygpO319KTt9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3VjLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuY2xvc2VQaW5nPWNsb3NlUGluZztleHBvcnRzLnNldHVwUGluZz1zZXR1cFBpbmc7ZXhwb3J0cy5jdXJyZW50UGFnZT12b2lkIDA7dmFyIF9ldmVudHNvdXJjZT1yZXF1aXJlKFwiLi9lcnJvci1vdmVybGF5L2V2ZW50c291cmNlXCIpOy8qIGdsb2JhbCBsb2NhdGlvbiAqL2xldCBldnRTb3VyY2U7bGV0IGN1cnJlbnRQYWdlO2V4cG9ydHMuY3VycmVudFBhZ2U9Y3VycmVudFBhZ2U7ZnVuY3Rpb24gY2xvc2VQaW5nKCl7aWYoZXZ0U291cmNlKWV2dFNvdXJjZS5jbG9zZSgpO2V2dFNvdXJjZT1udWxsO31mdW5jdGlvbiBzZXR1cFBpbmcoYXNzZXRQcmVmaXgscGF0aG5hbWVGbixyZXRyeSl7Y29uc3QgcGF0aG5hbWU9cGF0aG5hbWVGbigpOy8vIE1ha2Ugc3VyZSB0byBvbmx5IGNyZWF0ZSBuZXcgRXZlbnRTb3VyY2UgcmVxdWVzdCBpZiBwYWdlIGhhcyBjaGFuZ2VkXG5pZihwYXRobmFtZT09PWN1cnJlbnRQYWdlJiYhcmV0cnkpcmV0dXJuO2V4cG9ydHMuY3VycmVudFBhZ2U9Y3VycmVudFBhZ2U9cGF0aG5hbWU7Ly8gY2xvc2UgY3VycmVudCBFdmVudFNvdXJjZSBjb25uZWN0aW9uXG5jbG9zZVBpbmcoKTtldnRTb3VyY2U9KDAsX2V2ZW50c291cmNlLmdldEV2ZW50U291cmNlV3JhcHBlcikoe3BhdGg6YCR7YXNzZXRQcmVmaXh9L19uZXh0L3dlYnBhY2staG1yP3BhZ2U9JHtjdXJyZW50UGFnZX1gLHRpbWVvdXQ6NTAwMH0pO2V2dFNvdXJjZS5hZGRNZXNzYWdlTGlzdGVuZXIoZXZlbnQ9PntpZihldmVudC5kYXRhLmluZGV4T2YoJ3snKT09PS0xKXJldHVybjt0cnl7Y29uc3QgcGF5bG9hZD1KU09OLnBhcnNlKGV2ZW50LmRhdGEpO2lmKHBheWxvYWQuaW52YWxpZCl7Ly8gUGF5bG9hZCBjYW4gYmUgaW52YWxpZCBldmVuIGlmIHRoZSBwYWdlIGRvZXMgbm90IGV4aXN0LlxuLy8gU28sIHdlIG5lZWQgdG8gbWFrZSBzdXJlIGl0IGV4aXN0cyBiZWZvcmUgcmVsb2FkaW5nLlxuZmV0Y2gobG9jYXRpb24uaHJlZix7Y3JlZGVudGlhbHM6J3NhbWUtb3JpZ2luJ30pLnRoZW4ocGFnZVJlcz0+e2lmKHBhZ2VSZXMuc3RhdHVzPT09MjAwKXtsb2NhdGlvbi5yZWxvYWQoKTt9fSk7fX1jYXRjaChlcnIpe2NvbnNvbGUuZXJyb3IoJ29uLWRlbWFuZC1lbnRyaWVzIGZhaWxlZCB0byBwYXJzZSByZXNwb25zZScsZXJyKTt9fSk7fVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b24tZGVtYW5kLWVudHJpZXMtdXRpbHMuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==