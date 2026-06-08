/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ClampToEdgeWrapping: () => (/* reexport */ ClampToEdgeWrapping),
  LinearFilter: () => (/* reexport */ LinearFilter),
  LinearMipMapLinearFilter: () => (/* reexport */ LinearMipMapLinearFilter),
  LinearMipMapNearestFilter: () => (/* reexport */ LinearMipMapNearestFilter),
  MirroredRepeatWrapping: () => (/* reexport */ MirroredRepeatWrapping),
  NearestFilter: () => (/* reexport */ NearestFilter),
  NearestMipMapLinearFilter: () => (/* reexport */ NearestMipMapLinearFilter),
  NearestMipMapNearestFilter: () => (/* reexport */ NearestMipMapNearestFilter),
  RepeatWrapping: () => (/* reexport */ RepeatWrapping),
  ShadertoyReact: () => (/* binding */ ShadertoyReact),
  "default": () => (/* binding */ GlslCanvas)
});

;// external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// ./src/prefixLogs.js
var APP_NAME = "glsl-helpers-react";
var SRLOG = function SRLOG(text) {
  return "".concat(APP_NAME, ": ").concat(text);
};
;// ./src/KeyboardTexture.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var KEYBOARD_WIDTH = 256;
var KEYBOARD_HEIGHT = 3;
var KeyboardTexture = /*#__PURE__*/_createClass(function KeyboardTexture(_gl) {
  var _this = this;
  _classCallCheck(this, KeyboardTexture);
  _defineProperty(this, "load", function () {
    var gl = _this.gl;
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    _this.uploadData(texture);
    _this._webglTexture = texture;
    _this.isLoaded = true;
    _this.attachListeners();
    return Promise.resolve(_this);
  });
  _defineProperty(this, "uploadData", function (texture) {
    var gl = _this.gl;
    var target = texture || _this._webglTexture;
    if (!target) return;
    for (var i = 0; i < KEYBOARD_WIDTH; i++) {
      var base = i * 4;
      _this.data[base] = _this.keyState[i];
      _this.data[base + KEYBOARD_WIDTH * 4] = _this.keyPress[i];
      _this.data[base + KEYBOARD_WIDTH * 8] = _this.keyToggle[i];
    }
    gl.bindTexture(gl.TEXTURE_2D, target);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, KEYBOARD_WIDTH, KEYBOARD_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, _this.data);
  });
  _defineProperty(this, "attachListeners", function () {
    if (_this._boundHandlers) return;
    _this._boundHandlers = {
      keydown: _this.onKeyDown,
      keyup: _this.onKeyUp
    };
    window.addEventListener("keydown", _this._boundHandlers.keydown);
    window.addEventListener("keyup", _this._boundHandlers.keyup);
  });
  _defineProperty(this, "removeListeners", function () {
    if (!_this._boundHandlers) return;
    window.removeEventListener("keydown", _this._boundHandlers.keydown);
    window.removeEventListener("keyup", _this._boundHandlers.keyup);
    _this._boundHandlers = null;
  });
  _defineProperty(this, "onKeyDown", function (e) {
    var code = e.keyCode;
    if (code < 0 || code >= KEYBOARD_WIDTH) return;
    if (!_this.keyState[code]) {
      _this.keyPress[code] = 255;
    }
    _this.keyState[code] = 255;
    _this.keyToggle[code] = _this.keyToggle[code] ? 0 : 255;
    _this.uploadData();
  });
  _defineProperty(this, "onKeyUp", function (e) {
    var code = e.keyCode;
    if (code < 0 || code >= KEYBOARD_WIDTH) return;
    _this.keyState[code] = 0;
    _this.keyPress[code] = 0;
    _this.uploadData();
  });
  _defineProperty(this, "updateTexture", function () {
    for (var i = 0; i < KEYBOARD_WIDTH; i++) {
      _this.keyPress[i] = 0;
    }
    _this.uploadData();
  });
  _defineProperty(this, "dispose", function () {
    _this.removeListeners();
    var gl = _this.gl;
    if (gl && _this._webglTexture) {
      gl.deleteTexture(_this._webglTexture);
      _this._webglTexture = null;
    }
    _this.isLoaded = false;
  });
  this.gl = _gl;
  this.data = new Uint8Array(KEYBOARD_WIDTH * KEYBOARD_HEIGHT * 4);
  this.keyState = new Uint8Array(KEYBOARD_WIDTH);
  this.keyPress = new Uint8Array(KEYBOARD_WIDTH);
  this.keyToggle = new Uint8Array(KEYBOARD_WIDTH);
  this.isLoaded = false;
  this.width = KEYBOARD_WIDTH;
  this.height = KEYBOARD_HEIGHT;
  this.flipY = -1;
  this.isVideo = false;
  this._webglTexture = null;
  this._boundHandlers = null;
});

var resolveKeyboardUrl = function resolveKeyboardUrl(textureArgs) {
  return textureArgs.type === "keyboard" || textureArgs.url === "keyboard";
};
;// ./src/Texture.js
function Texture_typeof(o) { "@babel/helpers - typeof"; return Texture_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Texture_typeof(o); }
function Texture_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, Texture_toPropertyKey(o.key), o); } }
function Texture_createClass(e, r, t) { return r && Texture_defineProperties(e.prototype, r), t && Texture_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function Texture_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function Texture_defineProperty(e, r, t) { return (r = Texture_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function Texture_toPropertyKey(t) { var i = Texture_toPrimitive(t, "string"); return "symbol" == Texture_typeof(i) ? i : i + ""; }
function Texture_toPrimitive(t, r) { if ("object" != Texture_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != Texture_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var NearestFilter = 9728;
var LinearFilter = 9729;
var NearestMipMapNearestFilter = 9984;
var LinearMipMapNearestFilter = 9985;
var NearestMipMapLinearFilter = 9986;
var LinearMipMapLinearFilter = 9987;
var ClampToEdgeWrapping = 33071;
var MirroredRepeatWrapping = 33648;
var RepeatWrapping = 10497;
var isPowerOf2 = function isPowerOf2(value) {
  return (value & value - 1) === 0;
};
var floorPowerOfTwo = function floorPowerOfTwo(value) {
  return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
};
var textureNeedsGenerateMipmaps = function textureNeedsGenerateMipmaps(texture, isPow2) {
  return isPow2 && texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;
};
var textureNeedsPowerOfTwo = function textureNeedsPowerOfTwo(texture) {
  if (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) return true;
  if (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter) return true;
  return false;
};
var resolveTextureUrl = function resolveTextureUrl(textureArgs) {
  var devicePixelRatio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var url = textureArgs.url,
    srcSet = textureArgs.srcSet;
  if (!srcSet) return url || "";
  if (typeof srcSet === "string") {
    var entries = srcSet.split(",").map(function (part) {
      return part.trim();
    });
    var bestUrl = url || "";
    var bestDensity = 0;
    entries.forEach(function (entry) {
      var match = entry.match(/^(\S+)(?:\s+(\d+(?:\.\d+)?)x)?$/);
      if (!match) return;
      var entryUrl = match[1];
      var density = match[2] ? parseFloat(match[2]) : 1;
      if (density <= devicePixelRatio && density >= bestDensity) {
        bestDensity = density;
        bestUrl = entryUrl;
      }
    });
    return bestUrl || url || "";
  }
  var densities = Object.keys(srcSet).map(Number).sort(function (a, b) {
    return a - b;
  });
  var selected = densities[0];
  densities.forEach(function (d) {
    if (d <= devicePixelRatio) selected = d;
  });
  return srcSet[selected] || url || "";
};
var getTextureKind = function getTextureKind(textureArgs) {
  if (textureArgs.type) return textureArgs.type;
  if (resolveKeyboardUrl(textureArgs)) return "keyboard";
  if (textureArgs.urls && textureArgs.urls.length === 6) return "cube";
  if (textureArgs.data) return "data";
  var url = textureArgs.url || "";
  if (/(\.mp4|\.3gp|\.webm|\.ogv)$/i.test(url)) return "video";
  if (/(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i.test(url)) return "image";
  if (url === "camera") return "camera";
  return "image";
};
var Texture = /*#__PURE__*/Texture_createClass(function Texture(_gl) {
  var _this = this;
  Texture_classCallCheck(this, Texture);
  Texture_defineProperty(this, "isLoaded", false);
  Texture_defineProperty(this, "url", void 0);
  Texture_defineProperty(this, "wrapS", void 0);
  Texture_defineProperty(this, "wrapT", void 0);
  Texture_defineProperty(this, "minFilter", void 0);
  Texture_defineProperty(this, "magFilter", void 0);
  Texture_defineProperty(this, "source", void 0);
  Texture_defineProperty(this, "flipY", -1);
  Texture_defineProperty(this, "width", 0);
  Texture_defineProperty(this, "height", 0);
  Texture_defineProperty(this, "_webglTexture", null);
  Texture_defineProperty(this, "isVideo", false);
  Texture_defineProperty(this, "isCube", false);
  Texture_defineProperty(this, "isCamera", false);
  Texture_defineProperty(this, "isKeyboard", false);
  Texture_defineProperty(this, "kind", "image");
  Texture_defineProperty(this, "channelStartTime", 0);
  Texture_defineProperty(this, "keyboard", null);
  Texture_defineProperty(this, "mediaStream", null);
  Texture_defineProperty(this, "textureArgs", null);
  Texture_defineProperty(this, "channelId", 0);
  Texture_defineProperty(this, "updateTexture", function (texture, video, flipY) {
    var gl = _this.gl;
    var level = 0;
    var internalFormat = gl.RGBA;
    var srcFormat = gl.RGBA;
    var srcType = gl.UNSIGNED_BYTE;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, video);
  });
  Texture_defineProperty(this, "setupVideo", function (url) {
    var video = document.createElement("video");
    var playing = false;
    var timeupdate = false;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.crossOrigin = "anonymous";
    var checkReady = function checkReady() {
      if (playing && timeupdate) {
        _this.isLoaded = true;
      }
    };
    video.addEventListener("playing", function () {
      playing = true;
      _this.width = video.videoWidth || 0;
      _this.height = video.videoHeight || 0;
      checkReady();
    }, true);
    video.addEventListener("timeupdate", function () {
      timeupdate = true;
      checkReady();
    }, true);
    video.src = url;
    return video;
  });
  Texture_defineProperty(this, "setupCamera", function (textureArgs) {
    var video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    var constraints = {
      video: {
        facingMode: textureArgs.facingMode || "user",
        width: textureArgs.width || 640,
        height: textureArgs.height || 480
      },
      audio: false
    };
    return navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      _this.mediaStream = stream;
      video.srcObject = stream;
      return video.play().then(function () {
        _this.width = video.videoWidth || textureArgs.width || 640;
        _this.height = video.videoHeight || textureArgs.height || 480;
        _this.isLoaded = true;
        _this.source = video;
        return video;
      });
    })["catch"](function (err) {
      console.error(SRLOG("Camera access failed: ".concat(err.message)));
      throw err;
    });
  });
  Texture_defineProperty(this, "makePowerOfTwo", function (image) {
    if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap) {
      if (_this.pow2canvas === undefined) _this.pow2canvas = document.createElement("canvas");
      _this.pow2canvas.width = floorPowerOfTwo(image.width);
      _this.pow2canvas.height = floorPowerOfTwo(image.height);
      var context = _this.pow2canvas.getContext("2d");
      context.drawImage(image, 0, 0, _this.pow2canvas.width, _this.pow2canvas.height);
      console.warn(SRLOG("Image is not power of two ".concat(image.width, " x ").concat(image.height, ". Resized to ").concat(_this.pow2canvas.width, " x ").concat(_this.pow2canvas.height, ";")));
      return _this.pow2canvas;
    }
    return image;
  });
  Texture_defineProperty(this, "loadDataTexture", function (textureArgs) {
    var gl = _this.gl;
    var width = textureArgs.width,
      height = textureArgs.height,
      data = textureArgs.data,
      _textureArgs$format = textureArgs.format,
      format = _textureArgs$format === void 0 ? "rgba8" : _textureArgs$format,
      _textureArgs$flipY = textureArgs.flipY,
      flipY = _textureArgs$flipY === void 0 ? -1 : _textureArgs$flipY,
      wrapS = textureArgs.wrapS,
      wrapT = textureArgs.wrapT,
      minFilter = textureArgs.minFilter,
      magFilter = textureArgs.magFilter;
    if (!width || !height || !data) {
      return Promise.reject(new Error(SRLOG("Data texture requires width, height, and data")));
    }
    Object.assign(_this, {
      wrapS: wrapS,
      wrapT: wrapT,
      minFilter: minFilter,
      magFilter: magFilter,
      flipY: flipY
    });
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    if (format === "rgba32f") {
      var isWebGL2 = !!gl.createVertexArray;
      if (!isWebGL2 && !gl.getExtension("OES_texture_float")) {
        return Promise.reject(new Error(SRLOG("rgba32f data textures require WebGL2 or OES_texture_float extension")));
      }
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.FLOAT, data);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, _this.wrapS || ClampToEdgeWrapping);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, _this.wrapT || ClampToEdgeWrapping);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, _this.minFilter || LinearFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, _this.magFilter || LinearFilter);
    _this._webglTexture = texture;
    _this.width = width;
    _this.height = height;
    _this.isLoaded = true;
    _this.isVideo = false;
    _this.isCube = false;
    return Promise.resolve(_this);
  });
  Texture_defineProperty(this, "loadCubeTexture", function (textureArgs) {
    var gl = _this.gl;
    var urls = textureArgs.urls,
      minFilter = textureArgs.minFilter,
      magFilter = textureArgs.magFilter;
    if (!urls || urls.length !== 6) {
      return Promise.reject(new Error(SRLOG("Cube texture requires exactly 6 urls")));
    }
    Object.assign(_this, {
      minFilter: minFilter,
      magFilter: magFilter
    });
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    var targets = [gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];
    return Promise.all(urls.map(function (faceUrl) {
      return new Promise(function (resolve, reject) {
        var image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = function () {
          return resolve(image);
        };
        image.onerror = function () {
          return reject(new Error(SRLOG("failed loading cube face: ".concat(faceUrl))));
        };
        image.src = faceUrl;
      });
    })).then(function (images) {
      images.forEach(function (image, i) {
        gl.texImage2D(targets[i], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      });
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, _this.minFilter || LinearFilter);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, _this.magFilter || LinearFilter);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, ClampToEdgeWrapping);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, ClampToEdgeWrapping);
      _this._webglTexture = texture;
      _this.width = images[0].width;
      _this.height = images[0].height;
      _this.isLoaded = true;
      _this.isCube = true;
      _this.isVideo = false;
      return _this;
    });
  });
  Texture_defineProperty(this, "loadKeyboard", function () {
    _this.keyboard = new KeyboardTexture(_this.gl);
    _this.isKeyboard = true;
    return _this.keyboard.load().then(function (kb) {
      _this._webglTexture = kb._webglTexture;
      _this.width = kb.width;
      _this.height = kb.height;
      _this.isLoaded = true;
      return _this;
    });
  });
  Texture_defineProperty(this, "reloadImage", function (textureArgs, devicePixelRatio) {
    var resolvedUrl = resolveTextureUrl(textureArgs, devicePixelRatio);
    if (resolvedUrl === _this.url && _this.isLoaded) return Promise.resolve(_this);
    _this.url = resolvedUrl;
    return _this.loadImage(resolvedUrl, textureArgs);
  });
  Texture_defineProperty(this, "loadImage", function (url, textureArgs) {
    var gl = _this.gl;
    var wrapS = textureArgs.wrapS,
      wrapT = textureArgs.wrapT,
      minFilter = textureArgs.minFilter,
      magFilter = textureArgs.magFilter,
      _textureArgs$flipY2 = textureArgs.flipY,
      flipY = _textureArgs$flipY2 === void 0 ? -1 : _textureArgs$flipY2;
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = function () {
        return resolve(image);
      };
      image.onerror = function () {
        return reject(new Error(SRLOG("failed loading url: ".concat(url))));
      };
      image.src = url;
    }).then(function (image) {
      var isPowerOfTwoImage = isPowerOf2(image.width) && isPowerOf2(image.height);
      var processedImage = image;
      if (textureNeedsPowerOfTwo(textureArgs) && !isPowerOfTwoImage) {
        processedImage = _this.makePowerOfTwo(image);
        isPowerOfTwoImage = true;
      }
      var texture = _this._webglTexture;
      if (!texture) {
        texture = gl.createTexture();
        _this._webglTexture = texture;
      }
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, processedImage);
      if (textureNeedsGenerateMipmaps(textureArgs, isPowerOfTwoImage)) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS || RepeatWrapping);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT || RepeatWrapping);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter || LinearMipMapLinearFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter || LinearFilter);
      _this.source = processedImage;
      _this.isVideo = false;
      _this.isCube = false;
      _this.isCamera = false;
      _this.isLoaded = true;
      _this.width = processedImage.width || 0;
      _this.height = processedImage.height || 0;
      return _this;
    });
  });
  Texture_defineProperty(this, "load", function (textureArgs, channelId) {
    var devicePixelRatio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var gl = _this.gl;
    _this.textureArgs = textureArgs;
    _this.channelId = channelId;
    _this.channelStartTime = performance.now() / 1000;
    var wrapS = textureArgs.wrapS,
      wrapT = textureArgs.wrapT,
      minFilter = textureArgs.minFilter,
      magFilter = textureArgs.magFilter,
      _textureArgs$flipY3 = textureArgs.flipY,
      flipY = _textureArgs$flipY3 === void 0 ? -1 : _textureArgs$flipY3;
    var kind = getTextureKind(textureArgs);
    _this.kind = kind;
    Object.assign(_this, {
      wrapS: wrapS,
      wrapT: wrapT,
      minFilter: minFilter,
      magFilter: magFilter,
      flipY: flipY
    });
    if (kind === "keyboard") return _this.loadKeyboard();
    if (kind === "data") return _this.loadDataTexture(textureArgs);
    if (kind === "cube") return _this.loadCubeTexture(textureArgs);
    if (kind === "camera") {
      _this.isCamera = true;
      _this.isVideo = true;
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      _this._webglTexture = texture;
      return _this.setupCamera(textureArgs).then(function (video) {
        _this.source = video;
        return _this;
      });
    }
    var resolvedUrl = resolveTextureUrl(textureArgs, devicePixelRatio);
    if (!resolvedUrl) {
      return Promise.reject(new Error(SRLOG("Missing url, please pass { url: ... }")));
    }
    _this.url = resolvedUrl;
    if (kind === "video") {
      var _texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, _texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      _this._webglTexture = _texture;
      _this.isVideo = true;
      var video = _this.setupVideo(resolvedUrl);
      _this.source = video;
      return video.play().then(function () {
        return _this;
      });
    }
    return _this.loadImage(resolvedUrl, textureArgs);
  });
  Texture_defineProperty(this, "getChannelTime", function () {
    if (_this.isVideo && _this.source instanceof HTMLVideoElement) {
      return _this.source.currentTime || 0;
    }
    return performance.now() / 1000 - _this.channelStartTime;
  });
  Texture_defineProperty(this, "dispose", function () {
    var gl = _this.gl;
    if (_this.keyboard) {
      _this.keyboard.dispose();
      _this.keyboard = null;
    }
    if (_this.mediaStream) {
      _this.mediaStream.getTracks().forEach(function (track) {
        return track.stop();
      });
      _this.mediaStream = null;
    }
    if (gl && _this._webglTexture) {
      gl.deleteTexture(_this._webglTexture);
      _this._webglTexture = null;
    }
    _this.isLoaded = false;
  });
  this.gl = _gl;
});

;// ./src/FramebufferPool.js
function FramebufferPool_typeof(o) { "@babel/helpers - typeof"; return FramebufferPool_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, FramebufferPool_typeof(o); }
function FramebufferPool_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, FramebufferPool_toPropertyKey(o.key), o); } }
function FramebufferPool_createClass(e, r, t) { return r && FramebufferPool_defineProperties(e.prototype, r), t && FramebufferPool_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function FramebufferPool_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function FramebufferPool_defineProperty(e, r, t) { return (r = FramebufferPool_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function FramebufferPool_toPropertyKey(t) { var i = FramebufferPool_toPrimitive(t, "string"); return "symbol" == FramebufferPool_typeof(i) ? i : i + ""; }
function FramebufferPool_toPrimitive(t, r) { if ("object" != FramebufferPool_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != FramebufferPool_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FramebufferPool = /*#__PURE__*/FramebufferPool_createClass(function FramebufferPool(_gl) {
  var _this = this;
  FramebufferPool_classCallCheck(this, FramebufferPool);
  FramebufferPool_defineProperty(this, "getOrCreate", function (name, width, height) {
    var existing = _this.buffers[name];
    if (existing && existing.width === width && existing.height === height) {
      return existing;
    }
    if (existing) {
      _this.disposeBuffer(existing);
    }
    var gl = _this.gl;
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    var entry = {
      name: name,
      width: width,
      height: height,
      texture: texture,
      framebuffer: framebuffer
    };
    _this.buffers[name] = entry;
    return entry;
  });
  FramebufferPool_defineProperty(this, "disposeBuffer", function (entry) {
    var gl = _this.gl;
    if (entry.framebuffer) gl.deleteFramebuffer(entry.framebuffer);
    if (entry.texture) gl.deleteTexture(entry.texture);
  });
  FramebufferPool_defineProperty(this, "dispose", function () {
    Object.keys(_this.buffers).forEach(function (name) {
      _this.disposeBuffer(_this.buffers[name]);
    });
    _this.buffers = {};
  });
  this.gl = _gl;
  this.buffers = {};
});

;// ./src/uniformsType.js
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }

var INT = 'int';
var FLOAT = 'float';
var processUniform = function processUniform(gl, location, type, value) {
  switch (type) {
    case '1f':
      gl.uniform1f(location, value);
      break;
    case '2f':
      gl.uniform2f(location, value[0], value[1]);
      break;
    case '3f':
      gl.uniform3f(location, value[0], value[1], value[2]);
      break;
    case '4f':
      gl.uniform4f(location, value[0], value[1], value[2], value[3]);
      break;
    case '1i':
      gl.uniform1i(location, value);
      break;
    case '2i':
      gl.uniform2i(location, value[0], value[1]);
      break;
    case '3i':
      gl.uniform3i(location, value[0], value[1], value[2]);
      break;
    case '4i':
      gl.uniform4i(location, value[0], value[1], value[2], value[3]);
      break;
    case '1iv':
      gl.uniform1iv(location, value);
      break;
    case '2iv':
      gl.uniform2iv(location, value);
      break;
    case '3iv':
      gl.uniform3iv(location, value);
      break;
    case '4iv':
      gl.uniform4iv(location, value);
      break;
    case '1fv':
      gl.uniform1fv(location, value);
      break;
    case '2fv':
      gl.uniform2fv(location, value);
      break;
    case '3fv':
      gl.uniform3fv(location, value);
      break;
    case '4fv':
      gl.uniform4fv(location, value);
      break;
    case 'Matrix2fv':
      gl.uniformMatrix2fv(location, false, value);
      break;
    case 'Matrix3fv':
      gl.uniformMatrix3fv(location, false, value);
      break;
    case 'Matrix4fv':
      gl.uniformMatrix4fv(location, false, value);
      break;
    default:
      break;
  }
};
var uniformTypeToGLSLType = function uniformTypeToGLSLType(type) {
  switch (type) {
    case '1f':
      return FLOAT;
    case '2f':
      return 'vec2';
    case '3f':
      return 'vec3';
    case '4f':
      return 'vec4';
    case '1i':
      return INT;
    case '2i':
      return 'ivec2';
    case '3i':
      return 'ivec3';
    case '4i':
      return 'ivec4';
    case '1iv':
      return INT;
    case '2iv':
      return 'ivec2';
    case '3iv':
      return 'ivec3';
    case '4iv':
      return 'ivec4';
    case '1fv':
      return 'float';
    case '2fv':
      return 'vec2';
    case '3fv':
      return 'vec3';
    case '4fv':
      return 'vec4';
    case 'Matrix2fv':
      return 'mat2';
      // removed by dead control flow

    case 'Matrix3fv':
      return 'mat3';
    case 'Matrix4fv':
      return 'mat4';
    default:
      console.error(SRLOG(_templateObject || (_templateObject = _taggedTemplateLiteral(["The uniform type \"", "\" is not valid, please make sure your uniform type is valid"])), type));
  }
};
;// ./src/persistentTime.js
function persistentTime_typeof(o) { "@babel/helpers - typeof"; return persistentTime_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, persistentTime_typeof(o); }
var DEFAULT_KEY_PREFIX = "glsl-helpers-react:persistentTime";
var parseEpochMs = function parseEpochMs(epoch) {
  if (epoch == null) return null;
  if (typeof epoch === "number") return epoch;
  if (epoch instanceof Date) return epoch.getTime();
  var parsed = Date.parse(epoch);
  return Number.isFinite(parsed) ? parsed : null;
};
var resolvePersistentTimeConfig = function resolvePersistentTimeConfig(persistentTime, instanceId) {
  if (!persistentTime) {
    return {
      enabled: false,
      epochMs: null,
      storageKey: null
    };
  }
  var options = persistentTime_typeof(persistentTime) === "object" && persistentTime !== null ? persistentTime : {};
  var storageKey = options.storageKey || (options.shared ? "".concat(DEFAULT_KEY_PREFIX, ":shared") : "".concat(DEFAULT_KEY_PREFIX, ":").concat(instanceId));
  var explicitEpoch = parseEpochMs(options.epoch);
  return {
    enabled: true,
    epochMs: explicitEpoch,
    storageKey: storageKey
  };
};
var initPersistentEpoch = function initPersistentEpoch(config) {
  var _config$epochMs;
  if (!config.enabled) return null;
  var fallbackEpoch = (_config$epochMs = config.epochMs) !== null && _config$epochMs !== void 0 ? _config$epochMs : Date.now();
  if (typeof localStorage === "undefined" || !config.storageKey) {
    return fallbackEpoch;
  }
  try {
    var _config$epochMs2;
    var stored = localStorage.getItem(config.storageKey);
    if (stored) {
      var parsed = JSON.parse(stored);
      if (parsed && typeof parsed.epochMs === "number") {
        return parsed.epochMs;
      }
    }
    var epochMs = (_config$epochMs2 = config.epochMs) !== null && _config$epochMs2 !== void 0 ? _config$epochMs2 : Date.now();
    localStorage.setItem(config.storageKey, JSON.stringify({
      epochMs: epochMs
    }));
    return epochMs;
  } catch (_unused) {
    return fallbackEpoch;
  }
};
var getPersistentTimeSeconds = function getPersistentTimeSeconds(epochMs) {
  if (epochMs == null) return 0;
  return (Date.now() - epochMs) / 1000;
};
var persistentTimeEqual = function persistentTimeEqual(a, b) {
  return JSON.stringify(a !== null && a !== void 0 ? a : false) === JSON.stringify(b !== null && b !== void 0 ? b : false);
};
;// ./src/index.jsx
function src_typeof(o) { "@babel/helpers - typeof"; return src_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, src_typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { src_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function src_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function src_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, src_toPropertyKey(o.key), o); } }
function src_createClass(e, r, t) { return r && src_defineProperties(e.prototype, r), t && src_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == src_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function src_defineProperty(e, r, t) { return (r = src_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function src_toPropertyKey(t) { var i = src_toPrimitive(t, "string"); return "symbol" == src_typeof(i) ? i : i + ""; }
function src_toPrimitive(t, r) { if ("object" != src_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != src_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







var shadertoyDeprecationWarned = false;
var warnShadertoyDeprecated = function warnShadertoyDeprecated() {
  if (!shadertoyDeprecationWarned && "production" !== "production") // removed by dead control flow
{}
};
var PRECISIONS = ["lowp", "mediump", "highp"];
var FS_MAIN_SHADER_WEBGL1 = "\nvoid main(void){\n    vec4 color = vec4(0.0,0.0,0.0,1.0);\n    mainImage( color, gl_FragCoord.xy );\n    gl_FragColor = color;\n}";
var FS_MAIN_SHADER_WEBGL2 = "\nvoid main(void){\n    vec4 color = vec4(0.0,0.0,0.0,1.0);\n    mainImage( color, gl_FragCoord.xy );\n    fragColor = color;\n}";
var BASIC_FS = "void mainImage( out vec4 fragColor, in vec2 fragCoord ) {\n    vec2 uv = fragCoord/iResolution.xy;\n    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));\n    fragColor = vec4(col,1.0);\n}";
var BASIC_VS_WEBGL1 = "attribute vec3 aVertexPosition;\nvoid main(void) {\n    gl_Position = vec4(aVertexPosition, 1.0);\n}";
var BASIC_VS_WEBGL2 = "in vec3 aVertexPosition;\nvoid main(void) {\n    gl_Position = vec4(aVertexPosition, 1.0);\n}";
var UNIFORM_TIME = "iTime";
var UNIFORM_TIMEDELTA = "iTimeDelta";
var UNIFORM_DATE = "iDate";
var UNIFORM_FRAME = "iFrame";
var UNIFORM_MOUSE = "iMouse";
var UNIFORM_RESOLUTION = "iResolution";
var UNIFORM_CHANNEL = "iChannel";
var UNIFORM_CHANNELRESOLUTION = "iChannelResolution";
var UNIFORM_CHANNELTIME = "iChannelTime";
var UNIFORM_DEVICEORIENTATION = "iDeviceOrientation";
var UNIFORM_PERSISTENT_TIME = "iPersistentTime";
var BUILTIN_UNIFORMS = src_defineProperty(src_defineProperty(src_defineProperty(src_defineProperty(src_defineProperty(src_defineProperty(src_defineProperty(src_defineProperty({}, UNIFORM_TIME, {
  type: "float",
  isNeeded: false,
  value: 0
}), UNIFORM_TIMEDELTA, {
  type: "float",
  isNeeded: false,
  value: 0
}), UNIFORM_DATE, {
  type: "vec4",
  isNeeded: false,
  value: [0, 0, 0, 0]
}), UNIFORM_MOUSE, {
  type: "vec4",
  isNeeded: false,
  value: [0, 0, 0, 0]
}), UNIFORM_RESOLUTION, {
  type: "vec2",
  isNeeded: false,
  value: [0, 0]
}), UNIFORM_FRAME, {
  type: "int",
  isNeeded: false,
  value: 0
}), UNIFORM_DEVICEORIENTATION, {
  type: "vec4",
  isNeeded: false,
  value: [0, 0, 0, 0]
}), UNIFORM_PERSISTENT_TIME, {
  type: "float",
  isNeeded: false,
  value: 0
});
var lerpVal = function lerpVal(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
};
var insertStringAtIndex = function insertStringAtIndex(currentString, string, index) {
  return index > 0 ? currentString.substring(0, index) + string + currentString.substring(index, currentString.length) : string + currentString;
};
var hasGlsl300Version = function hasGlsl300Version(source) {
  return /^#version\s+300\s+es\b/m.test(source.trimStart());
};
var hasPrecisionFloat = function hasPrecisionFloat(source) {
  return /\bprecision\s+(?:lowp|mediump|highp)\s+float\s*;/i.test(source);
};
var hasFragColorOut = function hasFragColorOut(source) {
  return /\bout\s+vec4\s+fragColor\s*;/i.test(source);
};
var getShaderHeaderEndIndex = function getShaderHeaderEndIndex(source) {
  var index = 0;
  var versionMatch = source.match(/^\s*#version[^\n]*\n/);
  if (versionMatch) index = versionMatch[0].length;
  var rest = source.slice(index);
  var precisionMatch = rest.match(/^(?:\s*precision\s+(?:lowp|mediump|highp)\s+float\s*;\s*\n)+/);
  if (precisionMatch) index += precisionMatch[0].length;
  var afterPrecision = source.slice(index);
  var outMatch = afterPrecision.match(/^\s*out\s+vec4\s+\w+\s*;\s*\n/);
  if (outMatch) index += outMatch[0].length;
  return index;
};
var insertAfterShaderHeader = function insertAfterShaderHeader(source, insertion) {
  return insertStringAtIndex(source, insertion, getShaderHeaderEndIndex(source));
};
var isValidDefineName = function isValidDefineName(name) {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
};
var formatDefineValue = function formatDefineValue(value) {
  if (typeof value === "boolean") return value ? "1" : "0";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "0";
  return String(value);
};
var buildDefinesString = function buildDefinesString(defines) {
  if (!defines) return "";
  return Object.entries(defines).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      name = _ref2[0];
    if (!isValidDefineName(name)) {
      console.warn(SRLOG("Invalid #define name skipped: ".concat(name)));
      return false;
    }
    return true;
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      name = _ref4[0],
      value = _ref4[1];
    return "#define ".concat(name, " ").concat(formatDefineValue(value));
  }).join("\n").concat("\n");
};
var texturesEqual = function texturesEqual(a, b) {
  return JSON.stringify(a || []) === JSON.stringify(b || []);
};
var uniformsSchemaEqual = function uniformsSchemaEqual(a, b) {
  var keysA = Object.keys(a || {}).map(function (k) {
    return "".concat(k, ":").concat((a || {})[k].type);
  }).sort().join("|");
  var keysB = Object.keys(b || {}).map(function (k) {
    return "".concat(k, ":").concat((b || {})[k].type);
  }).sort().join("|");
  return keysA === keysB;
};
var definesEqual = function definesEqual(a, b) {
  return JSON.stringify(a || {}) === JSON.stringify(b || {});
};
var passesEqual = function passesEqual(a, b) {
  return JSON.stringify(a || []) === JSON.stringify(b || []);
};
var GlslCanvas = /*#__PURE__*/function (_Component) {
  function GlslCanvas(props) {
    var _this;
    src_classCallCheck(this, GlslCanvas);
    _this = _callSuper(this, GlslCanvas, [props]);
    src_defineProperty(_this, "initPersistentTime", function () {
      var config = resolvePersistentTimeConfig(_this.props.persistentTime, _this.instanceId);
      _this.persistentEpochMs = config.enabled ? initPersistentEpoch(config) : null;
    });
    src_defineProperty(_this, "resetUniforms", function () {
      _this.uniforms = JSON.parse(JSON.stringify(BUILTIN_UNIFORMS));
    });
    src_defineProperty(_this, "componentDidMount", function () {
      _this.initWebGL();
      if (!_this.gl) return;
      _this.initPersistentTime();
      _this.bootstrapScene();
    });
    src_defineProperty(_this, "bootstrapScene", function () {
      var _this$props$clearColo = _this.props.clearColor,
        clearColor = _this$props$clearColo === void 0 ? [0, 0, 0, 1] : _this$props$clearColo;
      var _this2 = _this,
        gl = _this2.gl;
      gl.clearColor.apply(gl, _toConsumableArray(clearColor));
      gl.clearDepth(1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      _this.canvas.height = _this.canvas.clientHeight;
      _this.canvas.width = _this.canvas.clientWidth;
      gl.viewport(0, 0, _this.canvas.width, _this.canvas.height);
      _this.framebufferPool = new FramebufferPool(gl);
      _this.resetUniforms();
      _this.processCustomUniforms();
      _this.processTextures();
      _this.compileShaders();
      _this.initBuffers();
      _this.addEventListeners();
      _this.onResize();
      _this.drawScene();
    });
    src_defineProperty(_this, "syncEventListeners", function (prevProps) {
      _this.removeEventListeners();
      _this.addEventListeners();
    });
    src_defineProperty(_this, "teardownGl", function () {
      _this.removeEventListeners();
      cancelAnimationFrame(_this.animFrameId);
      _this.disposeTextures();
      _this.disposePassPrograms();
      if (_this.framebufferPool) {
        _this.framebufferPool.dispose();
        _this.framebufferPool = null;
      }
      var _this3 = _this,
        gl = _this3.gl;
      if (gl) {
        var loseContext = gl.getExtension("WEBGL_lose_context");
        if (loseContext) loseContext.loseContext();
        if (_this.shaderProgram) gl.deleteProgram(_this.shaderProgram);
      }
      _this.shaderProgram = null;
    });
    src_defineProperty(_this, "disposeTextures", function () {
      _this.texturesArr.forEach(function (texture) {
        return texture.dispose && texture.dispose();
      });
      _this.texturesArr = [];
      Object.keys(_this.uniforms).forEach(function (key) {
        if (key.startsWith(UNIFORM_CHANNEL) || key === UNIFORM_CHANNELRESOLUTION || key === UNIFORM_CHANNELTIME) {
          delete _this.uniforms[key];
        }
      });
    });
    src_defineProperty(_this, "disposePassPrograms", function () {
      var _this4 = _this,
        gl = _this4.gl;
      if (!gl) return;
      _this.passPrograms.forEach(function (p) {
        return p && gl.deleteProgram(p);
      });
      _this.passPrograms = [];
    });
    src_defineProperty(_this, "reloadSrcSetTextures", function () {
      var _this$props$devicePix = _this.props.devicePixelRatio,
        devicePixelRatio = _this$props$devicePix === void 0 ? 1 : _this$props$devicePix;
      var promises = _this.texturesArr.map(function (texture, id) {
        if (!texture.textureArgs || !texture.textureArgs.srcSet) {
          return Promise.resolve(texture);
        }
        return texture.reloadImage(texture.textureArgs, devicePixelRatio).then(function (t) {
          _this.setupChannelRes(t, id);
          return t;
        });
      });
      Promise.all(promises)["catch"](function (e) {
        return console.error(e);
      });
    });
    src_defineProperty(_this, "setupChannelRes", function (_ref5, id) {
      var width = _ref5.width,
        height = _ref5.height;
      var _this$props$devicePix2 = _this.props.devicePixelRatio,
        devicePixelRatio = _this$props$devicePix2 === void 0 ? 1 : _this$props$devicePix2;
      if (!_this.uniforms.iChannelResolution) return;
      _this.uniforms.iChannelResolution.value[id * 3] = width * devicePixelRatio;
      _this.uniforms.iChannelResolution.value[id * 3 + 1] = height * devicePixelRatio;
      _this.uniforms.iChannelResolution.value[id * 3 + 2] = 0;
    });
    src_defineProperty(_this, "initWebGL", function () {
      var _this$props = _this.props,
        contextAttributes = _this$props.contextAttributes,
        _this$props$webgl = _this$props.webgl,
        webgl = _this$props$webgl === void 0 ? "auto" : _this$props$webgl;
      var gl = null;
      if (webgl === "2" || webgl === "auto") {
        gl = _this.canvas.getContext("webgl2", contextAttributes);
      }
      if (!gl && (webgl === "1" || webgl === "auto")) {
        gl = _this.canvas.getContext("webgl", contextAttributes) || _this.canvas.getContext("experimental-webgl", contextAttributes);
      }
      _this.isWebGL2 = !!(gl && gl.createVertexArray);
      _this.gl = gl;
      if (!gl) {
        var msg = webgl === "2" ? "Failed to create a WebGL2 context." : webgl === "1" ? "Failed to create a WebGL1 context." : "Failed to create a WebGL context.";
        console.error(SRLOG(msg));
      } else {
        gl.getExtension("OES_standard_derivatives");
        if (!_this.isWebGL2) gl.getExtension("EXT_shader_texture_lod");
      }
    });
    src_defineProperty(_this, "initBuffers", function () {
      var _this5 = _this,
        gl = _this5.gl;
      _this.squareVerticesBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, _this.squareVerticesBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0]), gl.STATIC_DRAW);
    });
    src_defineProperty(_this, "addEventListeners", function () {
      var options = {
        passive: true
      };
      if (_this.uniforms.iMouse && _this.uniforms.iMouse.isNeeded) {
        _this.canvas.addEventListener("mousemove", _this.mouseMove, options);
        _this.canvas.addEventListener("mouseout", _this.mouseUp, options);
        _this.canvas.addEventListener("mouseup", _this.mouseUp, options);
        _this.canvas.addEventListener("mousedown", _this.mouseDown, options);
        _this.canvas.addEventListener("touchmove", _this.mouseMove, options);
        _this.canvas.addEventListener("touchend", _this.mouseUp, options);
        _this.canvas.addEventListener("touchstart", _this.mouseDown, options);
      }
      if (_this.uniforms.iDeviceOrientation && _this.uniforms.iDeviceOrientation.isNeeded) {
        window.addEventListener("deviceorientation", _this.onDeviceOrientationChange, options);
      }
      window.addEventListener("resize", _this.onResize, options);
    });
    src_defineProperty(_this, "removeEventListeners", function () {
      var options = {
        passive: true
      };
      if (_this.uniforms.iMouse && _this.uniforms.iMouse.isNeeded) {
        _this.canvas.removeEventListener("mousemove", _this.mouseMove, options);
        _this.canvas.removeEventListener("mouseout", _this.mouseUp, options);
        _this.canvas.removeEventListener("mouseup", _this.mouseUp, options);
        _this.canvas.removeEventListener("mousedown", _this.mouseDown, options);
        _this.canvas.removeEventListener("touchmove", _this.mouseMove, options);
        _this.canvas.removeEventListener("touchend", _this.mouseUp, options);
        _this.canvas.removeEventListener("touchstart", _this.mouseDown, options);
      }
      if (_this.uniforms.iDeviceOrientation && _this.uniforms.iDeviceOrientation.isNeeded) {
        window.removeEventListener("deviceorientation", _this.onDeviceOrientationChange, options);
      }
      window.removeEventListener("resize", _this.onResize, options);
    });
    src_defineProperty(_this, "onDeviceOrientationChange", function (_ref6) {
      var alpha = _ref6.alpha,
        beta = _ref6.beta,
        gamma = _ref6.gamma;
      _this.uniforms.iDeviceOrientation.value = [alpha, beta, gamma, window.orientation || 0];
    });
    src_defineProperty(_this, "mouseDown", function (e) {
      _this.canvasPosition = _this.canvas.getBoundingClientRect();
      var clientX = e.clientX || e.changedTouches[0].clientX;
      var clientY = e.clientY || e.changedTouches[0].clientY;
      var mouseX = clientX - _this.canvasPosition.left;
      var mouseY = _this.canvasPosition.height - clientY - _this.canvasPosition.top;
      _this.uniforms.iMouse.value[2] = mouseX;
      _this.uniforms.iMouse.value[3] = mouseY;
      _this.lastMouseArr[0] = mouseX;
      _this.lastMouseArr[1] = mouseY;
    });
    src_defineProperty(_this, "mouseMove", function (e) {
      _this.canvasPosition = _this.canvas.getBoundingClientRect();
      var _this$props$lerp = _this.props.lerp,
        lerp = _this$props$lerp === void 0 ? 1 : _this$props$lerp;
      var clientX = e.clientX || e.changedTouches[0].clientX;
      var clientY = e.clientY || e.changedTouches[0].clientY;
      var mouseX = clientX - _this.canvasPosition.left;
      var mouseY = _this.canvasPosition.height - clientY - _this.canvasPosition.top;
      if (lerp !== 1) {
        _this.lastMouseArr[0] = mouseX;
        _this.lastMouseArr[1] = mouseY;
      } else {
        _this.uniforms.iMouse.value[0] = mouseX;
        _this.uniforms.iMouse.value[1] = mouseY;
      }
    });
    src_defineProperty(_this, "mouseUp", function () {
      _this.uniforms.iMouse.value[2] = 0;
      _this.uniforms.iMouse.value[3] = 0;
    });
    src_defineProperty(_this, "onResize", function () {
      var _this6 = _this,
        gl = _this6.gl;
      if (!gl || !_this.canvas) return;
      var _this$props$devicePix3 = _this.props.devicePixelRatio,
        devicePixelRatio = _this$props$devicePix3 === void 0 ? 1 : _this$props$devicePix3;
      _this.canvasPosition = _this.canvas.getBoundingClientRect();
      var displayWidth = Math.floor(_this.canvasPosition.width * devicePixelRatio);
      var displayHeight = Math.floor(_this.canvasPosition.height * devicePixelRatio);
      gl.canvas.width = displayWidth;
      gl.canvas.height = displayHeight;
      if (_this.uniforms.iResolution && _this.uniforms.iResolution.isNeeded && _this.shaderProgram) {
        var rUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_RESOLUTION);
        gl.uniform2fv(rUniform, [gl.canvas.width, gl.canvas.height]);
      }
      if (_this.texturesArr.some(function (t) {
        return t.textureArgs && t.textureArgs.srcSet;
      })) {
        _this.reloadSrcSetTextures();
      }
    });
    src_defineProperty(_this, "advanceFrameClock", function (timestamp) {
      var delta = _this.lastTime ? (timestamp - _this.lastTime) / 1000 : 0;
      _this.frameDelta = delta;
      _this.lastTime = timestamp;
      if (_this.uniforms.iTime && _this.uniforms.iTime.isNeeded) {
        _this.timer += delta;
      }
      if (_this.uniforms.iFrame && _this.uniforms.iFrame.isNeeded) {
        _this.uniforms.iFrame.value++;
      }
    });
    src_defineProperty(_this, "drawScene", function (timestamp) {
      var _this7 = _this,
        gl = _this7.gl;
      var _this$props2 = _this.props,
        _this$props2$lerp = _this$props2.lerp,
        lerp = _this$props2$lerp === void 0 ? 1 : _this$props2$lerp,
        passes = _this$props2.passes;
      _this.advanceFrameClock(timestamp);
      if (passes && passes.length > 0) {
        _this.drawMultiPass(timestamp);
      } else {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.bindBuffer(gl.ARRAY_BUFFER, _this.squareVerticesBuffer);
        gl.vertexAttribPointer(_this.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.useProgram(_this.shaderProgram);
        _this.setUniforms(timestamp, _this.shaderProgram);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (_this.uniforms.iMouse && _this.uniforms.iMouse.isNeeded && lerp !== 1) {
        _this.uniforms.iMouse.value[0] = lerpVal(_this.uniforms.iMouse.value[0], _this.lastMouseArr[0], lerp);
        _this.uniforms.iMouse.value[1] = lerpVal(_this.uniforms.iMouse.value[1], _this.lastMouseArr[1], lerp);
      }
      _this.animFrameId = requestAnimationFrame(_this.drawScene);
    });
    src_defineProperty(_this, "drawMultiPass", function (timestamp) {
      var passes = _this.props.passes;
      var _this8 = _this,
        gl = _this8.gl;
      if (!passes || !_this.framebufferPool || !gl) return;
      var width = gl.drawingBufferWidth;
      var height = gl.drawingBufferHeight;
      passes.forEach(function (pass, index) {
        var program = _this.passPrograms[index];
        if (!program) return;
        var isLast = index === passes.length - 1;
        var targetEntry = pass.target && !isLast ? _this.framebufferPool.getOrCreate(pass.target, width, height) : null;
        gl.bindFramebuffer(gl.FRAMEBUFFER, targetEntry ? targetEntry.framebuffer : null);
        gl.viewport(0, 0, width, height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, _this.squareVerticesBuffer);
        var attr = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(attr);
        gl.vertexAttribPointer(attr, 3, gl.FLOAT, false, 0, 0);
        (pass.inputs || []).forEach(function (inputName, inputIdx) {
          var buffer = _this.framebufferPool.buffers[inputName];
          if (!buffer) return;
          gl.activeTexture(gl.TEXTURE0 + inputIdx);
          gl.bindTexture(gl.TEXTURE_2D, buffer.texture);
          var loc = gl.getUniformLocation(program, "iChannel".concat(inputIdx));
          if (loc) gl.uniform1i(loc, inputIdx);
        });
        _this.texturesArr.forEach(function (texture, id) {
          if (!texture.isLoaded) return;
          var channelKey = "".concat(UNIFORM_CHANNEL).concat(id);
          if (!_this.uniforms[channelKey] || !_this.uniforms[channelKey].isNeeded) {
            return;
          }
          var unit = (pass.inputs || []).length + id;
          gl.activeTexture(gl.TEXTURE0 + unit);
          if (texture.isCube) {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture._webglTexture);
          } else {
            gl.bindTexture(gl.TEXTURE_2D, texture._webglTexture);
          }
          var loc = gl.getUniformLocation(program, channelKey);
          if (loc) gl.uniform1i(loc, unit);
          if (texture.isVideo && texture.source) {
            texture.updateTexture(texture._webglTexture, texture.source, texture.flipY);
          }
          if (texture.isKeyboard && texture.keyboard) {
            texture.keyboard.updateTexture();
          }
        });
        _this.setUniforms(timestamp, program, width, height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      });
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    });
    src_defineProperty(_this, "createShader", function (type, shaderCodeAsText) {
      var _this9 = _this,
        gl = _this9.gl;
      var shader = gl.createShader(type);
      gl.shaderSource(shader, shaderCodeAsText);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(SRLOG("Error compiling the shader:"), shaderCodeAsText);
        var log = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        console.error(SRLOG("Shader compiler log: ".concat(log)));
        return null;
      }
      return shader;
    });
    src_defineProperty(_this, "linkProgram", function (fs, vs) {
      var _this0 = _this,
        gl = _this0.gl;
      var fragmentShader = _this.createShader(gl.FRAGMENT_SHADER, fs);
      var vertexShader = _this.createShader(gl.VERTEX_SHADER, vs);
      if (!fragmentShader || !vertexShader) return null;
      var program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(SRLOG("Unable to initialize shader program: ".concat(gl.getProgramInfoLog(program))));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    });
    src_defineProperty(_this, "compileShaders", function () {
      var _this$props3 = _this.props,
        fs = _this$props3.fs,
        vs = _this$props3.vs,
        passes = _this$props3.passes;
      var defaultVs = _this.isWebGL2 ? BASIC_VS_WEBGL2 : BASIC_VS_WEBGL1;
      if (passes && passes.length > 0) {
        _this.disposePassPrograms();
        _this.passPrograms = passes.map(function (pass) {
          var shaders = _this.preProcessShaders(pass.fs, vs || defaultVs, pass.fs);
          return _this.linkProgram(shaders.fs, shaders.vs);
        });
        return;
      }
      var shaders = _this.preProcessShaders(fs || BASIC_FS, vs || defaultVs, fs || BASIC_FS);
      if (_this.shaderProgram) _this.gl.deleteProgram(_this.shaderProgram);
      _this.shaderProgram = _this.linkProgram(shaders.fs, shaders.vs);
      if (_this.shaderProgram) {
        _this.gl.useProgram(_this.shaderProgram);
        _this.vertexPositionAttribute = _this.gl.getAttribLocation(_this.shaderProgram, "aVertexPosition");
        _this.gl.enableVertexAttribArray(_this.vertexPositionAttribute);
      }
    });
    src_defineProperty(_this, "recompileShaders", function () {
      Object.keys(_this.uniforms).forEach(function (key) {
        if (_this.uniforms[key]) _this.uniforms[key].isNeeded = false;
      });
      _this.compileShaders();
      _this.syncEventListeners();
      if (_this.uniforms.iResolution && _this.uniforms.iResolution.isNeeded) {
        _this.onResize();
      }
    });
    src_defineProperty(_this, "initShaders", function () {
      _this.compileShaders();
    });
    src_defineProperty(_this, "processCustomUniforms", function () {
      var uniforms = _this.props.uniforms;
      if (!uniforms) return;
      Object.keys(uniforms).forEach(function (name) {
        var _uniforms$name = uniforms[name],
          value = _uniforms$name.value,
          type = _uniforms$name.type;
        var glslType = uniformTypeToGLSLType(type);
        if (!glslType) return;
        var tempObject = {};
        if (type.includes("Matrix")) {
          var val = type.charAt(type.length - 3);
          var numberOfMatrices = Math.floor(value.length / (val * val));
          if (value.length > val * val) {
            tempObject.arraySize = "[".concat(numberOfMatrices, "]");
          }
        } else if (type.includes("v") && value.length > type.charAt(0)) {
          tempObject.arraySize = "[".concat(Math.floor(value.length / type.charAt(0)), "]");
        }
        _this.uniforms[name] = _objectSpread({
          type: glslType,
          isNeeded: false,
          value: value
        }, tempObject);
      });
    });
    src_defineProperty(_this, "processTextures", function () {
      var isUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this1 = _this,
        gl = _this1.gl;
      var _this$props4 = _this.props,
        textures = _this$props4.textures,
        onDoneLoadingTextures = _this$props4.onDoneLoadingTextures,
        _this$props4$devicePi = _this$props4.devicePixelRatio,
        devicePixelRatio = _this$props4$devicePi === void 0 ? 1 : _this$props4$devicePi;
      var list = textures || [];
      if (list.length === 0) {
        if (onDoneLoadingTextures) onDoneLoadingTextures();
        return;
      }
      var channelCount = list.length;
      _this.uniforms[UNIFORM_CHANNELRESOLUTION] = {
        type: "vec3",
        isNeeded: false,
        arraySize: "[".concat(channelCount, "]"),
        value: new Array(channelCount * 3).fill(0)
      };
      _this.uniforms[UNIFORM_CHANNELTIME] = {
        type: "float",
        isNeeded: false,
        arraySize: "[".concat(channelCount, "]"),
        value: new Array(channelCount).fill(0)
      };
      var texturePromisesArr = list.map(function (textureArgs, id) {
        var isCube = textureArgs.type === "cube" || textureArgs.urls && textureArgs.urls.length === 6;
        _this.uniforms["".concat(UNIFORM_CHANNEL).concat(id)] = {
          type: isCube ? "samplerCube" : "sampler2D",
          isNeeded: false
        };
        _this.setupChannelRes(textureArgs, id);
        _this.texturesArr[id] = new Texture(gl);
        return _this.texturesArr[id].load(textureArgs, id, devicePixelRatio).then(function (texture) {
          _this.setupChannelRes(texture, id);
          return texture;
        });
      });
      Promise.all(texturePromisesArr).then(function () {
        if (!isUpdate) _this.recompileShaders();
        if (onDoneLoadingTextures) onDoneLoadingTextures();
      })["catch"](function (e) {
        console.error(e);
        if (onDoneLoadingTextures) onDoneLoadingTextures();
      });
    });
    src_defineProperty(_this, "preProcessShaders", function (fs, vs, uniformSource) {
      var _this$props5 = _this.props,
        precision = _this$props5.precision,
        _this$props5$devicePi = _this$props5.devicePixelRatio,
        devicePixelRatio = _this$props5$devicePi === void 0 ? 1 : _this$props5$devicePi,
        defines = _this$props5.defines;
      var dprString = "#define DPR ".concat(devicePixelRatio.toFixed(1), "\n");
      var definesString = buildDefinesString(defines);
      var isValidPrecision = PRECISIONS.includes(precision);
      var precisionString = "precision ".concat(isValidPrecision ? precision : PRECISIONS[1], " float;\n");
      if (!isValidPrecision) {
        console.warn(SRLOG("wrong precision type ".concat(precision, ", use lowp, mediump, or highp. Defaulting to mediump.")));
      }
      var fsString;
      if (_this.isWebGL2) {
        var fsAlreadyGlsl300 = hasGlsl300Version(fs);
        if (fsAlreadyGlsl300) {
          fsString = fs;
          if (!hasPrecisionFloat(fsString)) {
            fsString = insertAfterShaderHeader(fsString, precisionString);
          }
          if (!hasFragColorOut(fsString)) {
            fsString = insertAfterShaderHeader(fsString, "out vec4 fragColor;\n");
          }
        } else {
          fsString = "#version 300 es\n".concat(precisionString, "out vec4 fragColor;\n").concat(fs);
        }
        fsString = insertAfterShaderHeader(fsString, dprString + definesString);
        fsString = fsString.replace(/gl_FragColor/g, "fragColor").replace(/texture2D\(/g, "texture(").replace(/textureCube\(/g, "texture(");
      } else {
        fsString = precisionString.concat(dprString).concat(definesString).concat(fs).replace(/texture\(/g, "texture2D(").replace(/textureCube\(/g, "textureCube(");
      }
      var uniformInsertIndex = _this.isWebGL2 ? getShaderHeaderEndIndex(fsString) : fsString.indexOf(fs) >= 0 ? fsString.indexOf(fs) : fsString.length;
      Object.keys(_this.uniforms).forEach(function (uniform) {
        if (uniformSource.includes(uniform)) {
          fsString = insertStringAtIndex(fsString, "uniform ".concat(_this.uniforms[uniform].type, " ").concat(uniform).concat(_this.uniforms[uniform].arraySize || "", "; \n"), uniformInsertIndex);
          _this.uniforms[uniform].isNeeded = true;
        }
      });
      if (/mainImage/.test(fs)) {
        fsString = fsString.concat(_this.isWebGL2 ? FS_MAIN_SHADER_WEBGL2 : FS_MAIN_SHADER_WEBGL1);
      }
      var vsString = _this.isWebGL2 ? hasGlsl300Version(vs) ? vs.replace(/attribute /g, "in ") : "#version 300 es\n".concat(vs.replace(/attribute /g, "in ")) : vs;
      return {
        fs: fsString,
        vs: vsString
      };
    });
    src_defineProperty(_this, "setUniforms", function (timestamp) {
      var program = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.shaderProgram;
      var overrideWidth = arguments.length > 2 ? arguments[2] : undefined;
      var overrideHeight = arguments.length > 3 ? arguments[3] : undefined;
      var _this10 = _this,
        gl = _this10.gl;
      if (!program) return;
      if (_this.props.uniforms) {
        Object.keys(_this.props.uniforms).forEach(function (name) {
          var currentUniform = _this.props.uniforms[name];
          if (_this.uniforms[name] && _this.uniforms[name].isNeeded) {
            var loc = gl.getUniformLocation(program, name);
            processUniform(gl, loc, currentUniform.type, currentUniform.value);
          }
        });
      }
      if (_this.uniforms.iMouse && _this.uniforms.iMouse.isNeeded) {
        var loc = gl.getUniformLocation(program, UNIFORM_MOUSE);
        gl.uniform4fv(loc, _this.uniforms.iMouse.value);
      }
      if (_this.uniforms.iChannelResolution && _this.uniforms.iChannelResolution.isNeeded) {
        var _loc = gl.getUniformLocation(program, UNIFORM_CHANNELRESOLUTION);
        gl.uniform3fv(_loc, _this.uniforms.iChannelResolution.value);
      }
      if (_this.uniforms.iChannelTime && _this.uniforms.iChannelTime.isNeeded) {
        _this.texturesArr.forEach(function (texture, id) {
          if (_this.uniforms.iChannelTime.value) {
            _this.uniforms.iChannelTime.value[id] = texture.getChannelTime ? texture.getChannelTime() : 0;
          }
        });
        var _loc2 = gl.getUniformLocation(program, UNIFORM_CHANNELTIME);
        gl.uniform1fv(_loc2, _this.uniforms.iChannelTime.value);
      }
      if (_this.uniforms.iDeviceOrientation && _this.uniforms.iDeviceOrientation.isNeeded) {
        var _loc3 = gl.getUniformLocation(program, UNIFORM_DEVICEORIENTATION);
        gl.uniform4fv(_loc3, _this.uniforms.iDeviceOrientation.value);
      }
      if (_this.uniforms.iTime && _this.uniforms.iTime.isNeeded) {
        var _loc4 = gl.getUniformLocation(program, UNIFORM_TIME);
        gl.uniform1f(_loc4, _this.timer);
      }
      if (_this.uniforms.iPersistentTime && _this.uniforms.iPersistentTime.isNeeded && _this.persistentEpochMs != null) {
        var _loc5 = gl.getUniformLocation(program, UNIFORM_PERSISTENT_TIME);
        gl.uniform1f(_loc5, getPersistentTimeSeconds(_this.persistentEpochMs));
      }
      if (_this.uniforms.iTimeDelta && _this.uniforms.iTimeDelta.isNeeded) {
        var _loc6 = gl.getUniformLocation(program, UNIFORM_TIMEDELTA);
        gl.uniform1f(_loc6, _this.frameDelta);
      }
      if (_this.uniforms.iDate && _this.uniforms.iDate.isNeeded) {
        var d = new Date();
        var _loc7 = gl.getUniformLocation(program, UNIFORM_DATE);
        gl.uniform4fv(_loc7, [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() * 0.001]);
      }
      if (_this.uniforms.iFrame && _this.uniforms.iFrame.isNeeded) {
        var _loc8 = gl.getUniformLocation(program, UNIFORM_FRAME);
        gl.uniform1i(_loc8, _this.uniforms.iFrame.value);
      }
      if (_this.uniforms.iResolution && _this.uniforms.iResolution.isNeeded) {
        var _loc9 = gl.getUniformLocation(program, UNIFORM_RESOLUTION);
        gl.uniform2f(_loc9, overrideWidth || gl.drawingBufferWidth, overrideHeight || gl.drawingBufferHeight);
      }
      if (_this.texturesArr.length > 0 && (!_this.props.passes || _this.props.passes.length === 0)) {
        _this.texturesArr.forEach(function (texture, id) {
          if (!texture.isLoaded) return;
          var channelKey = "".concat(UNIFORM_CHANNEL).concat(id);
          if (!_this.uniforms[channelKey] || !_this.uniforms[channelKey].isNeeded) return;
          var loc = gl.getUniformLocation(program, channelKey);
          gl.activeTexture(gl.TEXTURE0 + id);
          if (texture.isCube) {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture._webglTexture);
          } else {
            gl.bindTexture(gl.TEXTURE_2D, texture._webglTexture);
          }
          gl.uniform1i(loc, id);
          if (texture.isVideo && texture.source) {
            texture.updateTexture(texture._webglTexture, texture.source, texture.flipY);
          }
          if (texture.isKeyboard && texture.keyboard) {
            texture.keyboard.updateTexture();
          }
        });
      }
    });
    src_defineProperty(_this, "registerCanvas", function (r) {
      _this.canvas = r;
    });
    src_defineProperty(_this, "gl", void 0);
    src_defineProperty(_this, "isWebGL2", false);
    src_defineProperty(_this, "squareVerticesBuffer", void 0);
    src_defineProperty(_this, "shaderProgram", void 0);
    src_defineProperty(_this, "vertexPositionAttribute", void 0);
    src_defineProperty(_this, "animFrameId", void 0);
    src_defineProperty(_this, "canvas", void 0);
    src_defineProperty(_this, "canvasPosition", void 0);
    src_defineProperty(_this, "instanceId", void 0);
    src_defineProperty(_this, "persistentEpochMs", null);
    src_defineProperty(_this, "timer", 0);
    src_defineProperty(_this, "frameDelta", 0);
    src_defineProperty(_this, "lastMouseArr", [0, 0]);
    src_defineProperty(_this, "texturesArr", []);
    src_defineProperty(_this, "lastTime", 0);
    src_defineProperty(_this, "passPrograms", []);
    src_defineProperty(_this, "framebufferPool", null);
    src_defineProperty(_this, "render", function () {
      var style = _this.props.style;
      return /*#__PURE__*/external_react_default().createElement("canvas", {
        style: _objectSpread({
          height: "100%",
          width: "100%"
        }, style),
        ref: _this.registerCanvas,
        tabIndex: 0
      });
    });
    _this.instanceId = Math.random().toString(36).slice(2);
    _this.persistentEpochMs = null;
    _this.resetUniforms();
    _this.passPrograms = [];
    _this.framebufferPool = null;
    return _this;
  }
  _inherits(GlslCanvas, _Component);
  return src_createClass(GlslCanvas, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.style !== this.props.style;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this11 = this;
      if (!this.gl) return;
      var webglChanged = prevProps.webgl !== this.props.webgl;
      var fsChanged = prevProps.fs !== this.props.fs;
      var vsChanged = prevProps.vs !== this.props.vs;
      var definesChanged = !definesEqual(prevProps.defines, this.props.defines);
      var passesChanged = !passesEqual(prevProps.passes, this.props.passes);
      var texturesChanged = !texturesEqual(prevProps.textures, this.props.textures);
      var uniformsSchemaChanged = !uniformsSchemaEqual(prevProps.uniforms, this.props.uniforms);
      var clearColorChanged = JSON.stringify(prevProps.clearColor || [0, 0, 0, 1]) !== JSON.stringify(this.props.clearColor || [0, 0, 0, 1]);
      var persistentTimeChanged = !persistentTimeEqual(prevProps.persistentTime, this.props.persistentTime);
      if (persistentTimeChanged) {
        this.initPersistentTime();
      }
      if (webglChanged) {
        this.teardownGl();
        this.initWebGL();
        if (this.gl) this.bootstrapScene();
        return;
      }
      if (clearColorChanged) {
        var _this$gl;
        (_this$gl = this.gl).clearColor.apply(_this$gl, _toConsumableArray(this.props.clearColor || [0, 0, 0, 1]));
      }
      if (texturesChanged) {
        this.disposeTextures();
        this.processTextures(true);
      } else if (prevProps.devicePixelRatio !== this.props.devicePixelRatio) {
        this.onResize();
        if (this.texturesArr.some(function (t) {
          return t.textureArgs && t.textureArgs.srcSet;
        })) {
          this.reloadSrcSetTextures();
        }
      }
      if (uniformsSchemaChanged) {
        Object.keys(this.uniforms).forEach(function (key) {
          if (!BUILTIN_UNIFORMS[key] && !key.startsWith(UNIFORM_CHANNEL)) {
            delete _this11.uniforms[key];
          }
        });
        this.processCustomUniforms();
      }
      if (fsChanged || vsChanged || definesChanged || passesChanged || uniformsSchemaChanged) {
        this.recompileShaders();
      }
      if (prevProps.lerp !== this.props.lerp || uniformsSchemaChanged || fsChanged || passesChanged) {
        this.syncEventListeners(prevProps);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.teardownGl();
    }
  }]);
}(external_react_namespaceObject.Component);
/** @deprecated Use GlslCanvas instead. */
src_defineProperty(GlslCanvas, "defaultProps", {
  textures: [],
  defines: {},
  contextAttributes: {},
  devicePixelRatio: 1,
  precision: "highp",
  webgl: "auto"
});

var ShadertoyReact = /*#__PURE__*/function (_GlslCanvas2) {
  function ShadertoyReact(props) {
    var _this12;
    src_classCallCheck(this, ShadertoyReact);
    _this12 = _callSuper(this, ShadertoyReact, [props]);
    warnShadertoyDeprecated();
    return _this12;
  }
  _inherits(ShadertoyReact, _GlslCanvas2);
  return src_createClass(ShadertoyReact);
}(GlslCanvas);
module.exports = __webpack_exports__;
/******/ })()
;