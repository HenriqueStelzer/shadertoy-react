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
  "default": () => (/* binding */ ShadertoyReact)
});

;// external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// ./src/prefixLogs.js
// $flow
var SRLOG = function SRLOG(text) {
  return "shadertoy-react: ".concat(text);
};
;// ./src/Texture.js
var _templateObject, _templateObject2;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var NearestFilter = 9728;
var LinearFilter = 9729;
var NearestMipMapNearestFilter = 9984;
var LinearMipMapNearestFilter = 9985;
var NearestMipMapLinearFilter = 9986;
var LinearMipMapLinearFilter = 9987;
var ClampToEdgeWrapping = 33071;
var MirroredRepeatWrapping = 33648;
var RepeatWrapping = 10497;

// eslint-disable-next-line
var isPowerOf2 = function isPowerOf2(value) {
  return (value & value - 1) == 0;
};
var floorPowerOfTwo = function floorPowerOfTwo(value) {
  return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
};
var textureNeedsGenerateMipmaps = function textureNeedsGenerateMipmaps(texture, isPowerOfTwo) {
  return isPowerOfTwo && texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;
};
var textureNeedsPowerOfTwo = function textureNeedsPowerOfTwo(texture) {
  if (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) return true;
  if (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter) return true;
  return false;
};
var Texture = /*#__PURE__*/_createClass(function Texture(_gl) {
  var _this = this;
  _classCallCheck(this, Texture);
  _defineProperty(this, "isLoaded", false);
  _defineProperty(this, "url", void 0);
  _defineProperty(this, "wrapS", void 0);
  _defineProperty(this, "wrapT", void 0);
  _defineProperty(this, "minFilter", void 0);
  _defineProperty(this, "magFilter", void 0);
  _defineProperty(this, "source", void 0);
  _defineProperty(this, "flipY", -1);
  _defineProperty(this, "width", 0);
  _defineProperty(this, "height", 0);
  _defineProperty(this, "_webglTexture", null);
  _defineProperty(this, "updateTexture", function (texture, video, flipY) {
    var gl = _this.gl;
    var level = 0;
    var internalFormat = gl.RGBA;
    var srcFormat = gl.RGBA;
    var srcType = gl.UNSIGNED_BYTE;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, video);
  });
  _defineProperty(this, "setupVideo", function (url) {
    var video = document.createElement('video');
    var playing = false;
    var timeupdate = false;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.crossOrigin = 'anonymous';
    var checkReady = function checkReady() {
      if (playing && timeupdate) {
        _this.isLoaded = true;
      }
    };
    video.addEventListener('playing', function () {
      playing = true;
      _this.width = video.videoWidth || 0;
      _this.height = video.videoHeight || 0;
      checkReady();
    }, true);
    video.addEventListener('timeupdate', function () {
      timeupdate = true;
      checkReady();
    }, true);
    video.src = url;
    // video.play();

    return video;
  });
  _defineProperty(this, "makePowerOfTwo", function (image) {
    if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap) {
      if (_this.pow2canvas === undefined) _this.pow2canvas = document.createElement('canvas');
      _this.pow2canvas.width = floorPowerOfTwo(image.width);
      _this.pow2canvas.height = floorPowerOfTwo(image.height);
      var context = _this.pow2canvas.getContext('2d');
      context.drawImage(image, 0, 0, _this.pow2canvas.width, _this.pow2canvas.height);

      // eslint-disable-next-line
      console.warn(SRLOG("Image is not power of two ".concat(image.width, " x ").concat(image.height, ". Resized to ").concat(_this.pow2canvas.width, " x ").concat(_this.pow2canvas.height, ";")));
      return _this.pow2canvas;
    }
    return image;
  });
  _defineProperty(this, "load", function (textureArgs, channelId) {
    var gl = _this.gl;
    var url = textureArgs.url,
      wrapS = textureArgs.wrapS,
      wrapT = textureArgs.wrapT,
      minFilter = textureArgs.minFilter,
      magFilter = textureArgs.magFilter,
      _textureArgs$flipY = textureArgs.flipY,
      flipY = _textureArgs$flipY === void 0 ? -1 : _textureArgs$flipY;
    if (!url) {
      return Promise.reject(new Error(SRLOG(_templateObject || (_templateObject = _taggedTemplateLiteral(["Missing url, please make sure to pass the url of your texture { url: ... }"])))));
    }
    var isImage = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i.exec(url);
    var isVideo = /(\.mp4|\.3gp|\.webm|\.ogv)$/i.exec(url);
    if (isImage === null && isVideo === null) {
      return Promise.reject(new Error(SRLOG(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Please upload a video or an image with a valid format"]))), url));
    }
    Object.assign(_this, {
      url: url,
      wrapS: wrapS,
      wrapT: wrapT,
      minFilter: minFilter,
      magFilter: magFilter,
      flipY: flipY
    });
    var level = 0;
    var internalFormat = gl.RGBA;
    var width = 1;
    var height = 1;
    var border = 0;
    var srcFormat = gl.RGBA;
    var srcType = gl.UNSIGNED_BYTE;
    var pixel = new Uint8Array([255, 255, 255, 0]);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
    if (isVideo) {
      var video = _this.setupVideo(url);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      _this._webglTexture = texture;
      _this.source = video;
      _this.isVideo = true;
      return video.play().then(function () {
        return _this;
      });
    }
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = function () {
        return resolve(image);
      };
      image.onerror = function () {
        return reject(new Error(SRLOG("failed loading url: ".concat(url))));
      };
      image.src = url;
    }).then(function (image) {
      var isPowerOfTwoImage = isPowerOf2(image.width) && isPowerOf2(image.height);
      if (textureNeedsPowerOfTwo(textureArgs) && isPowerOfTwoImage === false) {
        image = _this.makePowerOfTwo(image);
        isPowerOfTwoImage = true;
      }
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
      if (textureNeedsGenerateMipmaps(textureArgs, isPowerOfTwoImage)) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, _this.wrapS || RepeatWrapping);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, _this.wrapT || RepeatWrapping);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, _this.minFilter || LinearMipMapLinearFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, _this.magFilter || LinearFilter);
      _this._webglTexture = texture;
      _this.source = image;
      _this.isVideo = false;
      _this.isLoaded = true;
      _this.width = image.width || 0;
      _this.height = image.height || 0;
      return _this;
    });
  });
  this.gl = _gl;
});

;// ./src/uniformsType.js
var uniformsType_templateObject;
function uniformsType_taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }

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
      gl.uniform3i(location, value[0], value[1], value[2], value[3]);
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
      console.error(SRLOG(uniformsType_templateObject || (uniformsType_templateObject = uniformsType_taggedTemplateLiteral(["The uniform type \"", "\" is not valid, please make sure your uniform type is valid"])), type));
  }
};
;// ./src/index.jsx
var src_templateObject, src_templateObject2;
function src_typeof(o) { "@babel/helpers - typeof"; return src_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, src_typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { src_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function src_taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
function src_defineProperty(e, r, t) { return (r = src_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function src_toPropertyKey(t) { var i = src_toPrimitive(t, "string"); return "symbol" == src_typeof(i) ? i : i + ""; }
function src_toPrimitive(t, r) { if ("object" != src_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != src_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var PRECISIONS = ["lowp", "mediump", "highp"];
var FS_MAIN_SHADER_WEBGL1 = "\nvoid main(void){\n    vec4 color = vec4(0.0,0.0,0.0,1.0);\n    mainImage( color, gl_FragCoord.xy );\n    gl_FragColor = color;\n}";
var FS_MAIN_SHADER_WEBGL2 = "\nvoid main(void){\n    vec4 color = vec4(0.0,0.0,0.0,1.0);\n    mainImage( color, gl_FragCoord.xy );\n    fragColor = color;\n}";
var BASIC_FS = // Basic shadertoy shader
"void mainImage( out vec4 fragColor, in vec2 fragCoord ) {\n    vec2 uv = fragCoord/iResolution.xy;\n    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));\n    fragColor = vec4(col,1.0);\n}";
var BASIC_VS_WEBGL1 = "attribute vec3 aVertexPosition;\nvoid main(void) {\n    gl_Position = vec4(aVertexPosition, 1.0);\n}";
var BASIC_VS_WEBGL2 = "in vec3 aVertexPosition;\nvoid main(void) {\n    gl_Position = vec4(aVertexPosition, 1.0);\n}";

// Shadertoy built-in uniforms
var UNIFORM_TIME = "iTime";
var UNIFORM_TIMEDELTA = "iTimeDelta";
var UNIFORM_DATE = "iDate";
var UNIFORM_FRAME = "iFrame";
var UNIFORM_MOUSE = "iMouse";
var UNIFORM_RESOLUTION = "iResolution";
var UNIFORM_CHANNEL = "iChannel";
var UNIFORM_CHANNELRESOLUTION = "iChannelResolution";

// Uniforms not built-int in shadertoy
var UNIFORM_DEVICEORIENTATION = "iDeviceOrientation";

/* eslint-disable */

/* eslint-enable */

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
  if (versionMatch) {
    index = versionMatch[0].length;
  }
  var rest = source.slice(index);
  var precisionMatch = rest.match(/^(?:\s*precision\s+(?:lowp|mediump|highp)\s+float\s*;\s*\n)+/);
  if (precisionMatch) {
    index += precisionMatch[0].length;
  }
  var afterPrecision = source.slice(index);
  var outMatch = afterPrecision.match(/^\s*out\s+vec4\s+\w+\s*;\s*\n/);
  if (outMatch) {
    index += outMatch[0].length;
  }
  return index;
};
var insertAfterShaderHeader = function insertAfterShaderHeader(source, insertion) {
  return insertStringAtIndex(source, insertion, getShaderHeaderEndIndex(source));
};
var ShadertoyReact = /*#__PURE__*/function (_Component) {
  function ShadertoyReact(props) {
    var _this;
    src_classCallCheck(this, ShadertoyReact);
    _this = _callSuper(this, ShadertoyReact, [props]);
    src_defineProperty(_this, "componentDidMount", function () {
      _this.initWebGL();
      var _this$props = _this.props,
        fs = _this$props.fs,
        vs = _this$props.vs,
        _this$props$clearColo = _this$props.clearColor,
        clearColor = _this$props$clearColo === void 0 ? [0, 0, 0, 1] : _this$props$clearColo;
      var _this2 = _this,
        gl = _this2.gl;
      if (gl) {
        gl.clearColor.apply(gl, _toConsumableArray(clearColor));
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.viewport(0, 0, _this.canvas.width, _this.canvas.height);
        _this.canvas.height = _this.canvas.clientHeight;
        _this.canvas.width = _this.canvas.clientWidth;
        _this.processCustomUniforms();
        _this.processTextures();
        var defaultVs = _this.isWebGL2 ? BASIC_VS_WEBGL2 : BASIC_VS_WEBGL1;
        var shaders = _this.preProcessShaders(fs || BASIC_FS, vs || defaultVs);
        _this.initShaders(shaders);
        _this.initBuffers();
        _this.drawScene();
        _this.addEventListeners();
        _this.onResize();
      }
    });
    src_defineProperty(_this, "shouldComponentUpdate", function () {
      return false;
    });
    src_defineProperty(_this, "setupChannelRes", function (_ref, id) {
      var width = _ref.width,
        height = _ref.height;
      var _this$props$devicePix = _this.props.devicePixelRatio,
        devicePixelRatio = _this$props$devicePix === void 0 ? 1 : _this$props$devicePix;
      _this.uniforms.iChannelResolution.value[id * 3] = width * devicePixelRatio;
      _this.uniforms.iChannelResolution.value[id * 3 + 1] = height * devicePixelRatio;
      _this.uniforms.iChannelResolution.value[id * 3 + 2] = 0;
      // console.log(this.uniforms);
    });
    src_defineProperty(_this, "initWebGL", function () {
      var _this$props2 = _this.props,
        contextAttributes = _this$props2.contextAttributes,
        _this$props2$webgl = _this$props2.webgl,
        webgl = _this$props2$webgl === void 0 ? "auto" : _this$props2$webgl;
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
        if (webgl === "2") {
          console.error(SRLOG("Failed to create a WebGL2 context. Check browser support and contextAttributes."));
        } else if (webgl === "1") {
          console.error(SRLOG("Failed to create a WebGL1 context. Check browser support and contextAttributes."));
        } else {
          console.error(SRLOG("Failed to create a WebGL context. Neither WebGL2 nor WebGL1 is available."));
        }
      }
      if (gl) {
        gl.getExtension("OES_standard_derivatives");
        if (!_this.isWebGL2) {
          gl.getExtension("EXT_shader_texture_lod");
        }
      }
    });
    src_defineProperty(_this, "initBuffers", function () {
      var _this3 = _this,
        gl = _this3.gl;
      _this.squareVerticesBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, _this.squareVerticesBuffer);
      var vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    });
    src_defineProperty(_this, "addEventListeners", function () {
      var options = {
        passive: true
      };
      if (_this.uniforms.iMouse.isNeeded) {
        _this.canvas.addEventListener("mousemove", _this.mouseMove, options);
        _this.canvas.addEventListener("mouseout", _this.mouseUp, options);
        _this.canvas.addEventListener("mouseup", _this.mouseUp, options);
        _this.canvas.addEventListener("mousedown", _this.mouseDown, options);
        _this.canvas.addEventListener("touchmove", _this.mouseMove, options);
        _this.canvas.addEventListener("touchend", _this.mouseUp, options);
        _this.canvas.addEventListener("touchstart", _this.mouseDown, options);
      }
      if (_this.uniforms.iDeviceOrientation.isNeeded) {
        window.addEventListener("deviceorientation", _this.onDeviceOrientationChange, options);
      }
      window.addEventListener("resize", _this.onResize, options);
    });
    src_defineProperty(_this, "removeEventListeners", function () {
      var options = {
        passive: true
      };
      if (_this.uniforms.iMouse.isNeeded) {
        _this.canvas.removeEventListener("mousemove", _this.mouseMove, options);
        _this.canvas.removeEventListener("mouseout", _this.mouseUp, options);
        _this.canvas.removeEventListener("mouseup", _this.mouseUp, options);
        _this.canvas.removeEventListener("mousedown", _this.mouseDown, options);
        _this.canvas.removeEventListener("touchmove", _this.mouseMove, options);
        _this.canvas.removeEventListener("touchend", _this.mouseUp, options);
        _this.canvas.removeEventListener("touchstart", _this.mouseDown, options);
      }
      if (_this.uniforms.iDeviceOrientation.isNeeded) {
        window.removeEventListener("deviceorientation", _this.onDeviceOrientationChange, options);
      }
      window.removeEventListener("resize", _this.onResize, options);
    });
    src_defineProperty(_this, "onDeviceOrientationChange", function (_ref2) {
      var alpha = _ref2.alpha,
        beta = _ref2.beta,
        gamma = _ref2.gamma;
      _this.uniforms.iDeviceOrientation.value = [alpha, beta, gamma, window.orientation || 0];
    });
    src_defineProperty(_this, "mouseDown", function (e) {
      var clientX = e.clientX || e.changedTouches[0].clientX;
      var clientY = e.clientY || e.changedTouches[0].clientY;
      var mouseX = clientX - _this.canvasPosition.left - window.pageXOffset;
      var mouseY = _this.canvasPosition.height - clientY - _this.canvasPosition.top - window.pageYOffset;
      _this.mousedown = true;
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
    src_defineProperty(_this, "mouseUp", function (e) {
      _this.uniforms.iMouse.value[2] = 0;
      _this.uniforms.iMouse.value[3] = 0;
    });
    src_defineProperty(_this, "onResize", function () {
      var _this4 = _this,
        gl = _this4.gl;
      var _this$props$devicePix2 = _this.props.devicePixelRatio,
        devicePixelRatio = _this$props$devicePix2 === void 0 ? 1 : _this$props$devicePix2;
      _this.canvasPosition = _this.canvas.getBoundingClientRect();
      var realToCSSPixels = devicePixelRatio; // Force pixel ratio to be one to avoid expensive calculus on retina display

      var displayWidth = Math.floor(_this.canvasPosition.width * realToCSSPixels);
      var displayHeight = Math.floor(_this.canvasPosition.height * realToCSSPixels);
      gl.canvas.width = displayWidth;
      gl.canvas.height = displayHeight;
      if (_this.uniforms.iResolution.isNeeded) {
        var rUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_RESOLUTION);
        // $FlowFixMe
        gl.uniform2fv(rUniform, [gl.canvas.width, gl.canvas.height]);
      }
    });
    src_defineProperty(_this, "drawScene", function (timestamp) {
      var _this5 = _this,
        gl = _this5.gl;
      var _this$props$lerp2 = _this.props.lerp,
        lerp = _this$props$lerp2 === void 0 ? 1 : _this$props$lerp2;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // eslint-disable-line no-bitwise

      gl.bindBuffer(gl.ARRAY_BUFFER, _this.squareVerticesBuffer);
      gl.vertexAttribPointer(_this.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
      _this.setUniforms(timestamp);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (_this.uniforms.iMouse.isNeeded && lerp !== 1) {
        _this.uniforms.iMouse.value[0] = lerpVal(_this.uniforms.iMouse.value[0], _this.lastMouseArr[0], lerp);
        _this.uniforms.iMouse.value[1] = lerpVal(_this.uniforms.iMouse.value[1], _this.lastMouseArr[1], lerp);
      }
      _this.animFrameId = requestAnimationFrame(_this.drawScene);
    });
    src_defineProperty(_this, "createShader", function (type, shaderCodeAsText) {
      var _this6 = _this,
        gl = _this6.gl;
      var shader = gl.createShader(type);
      gl.shaderSource(shader, shaderCodeAsText);
      gl.compileShader(shader);

      /* eslint-disable no-console */
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(SRLOG(src_templateObject || (src_templateObject = src_taggedTemplateLiteral(["Error compiling the shader:"]))), shaderCodeAsText);
        var compilationLog = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        console.error(SRLOG("Shader compiler log: ".concat(compilationLog)));
      }
      /* eslint-enable no-console */

      return shader;
    });
    src_defineProperty(_this, "initShaders", function (_ref3) {
      var fs = _ref3.fs,
        vs = _ref3.vs;
      var _this7 = _this,
        gl = _this7.gl;
      // console.log(fs, vs);
      var fragmentShader = _this.createShader(gl.FRAGMENT_SHADER, fs);
      var vertexShader = _this.createShader(gl.VERTEX_SHADER, vs);
      _this.shaderProgram = gl.createProgram();
      gl.attachShader(_this.shaderProgram, vertexShader);
      gl.attachShader(_this.shaderProgram, fragmentShader);
      gl.linkProgram(_this.shaderProgram);

      /* eslint-disable no-console */
      if (!gl.getProgramParameter(_this.shaderProgram, gl.LINK_STATUS)) {
        // $FlowFixMe
        console.error(SRLOG("Unable to initialize the shader program: ".concat(gl.getProgramInfoLog(_this.shaderProgram))));
        return;
      }
      /* eslint-enable no-console */

      gl.useProgram(_this.shaderProgram);
      _this.vertexPositionAttribute = gl.getAttribLocation(_this.shaderProgram, "aVertexPosition");
      gl.enableVertexAttribArray(_this.vertexPositionAttribute);
    });
    src_defineProperty(_this, "processCustomUniforms", function () {
      var uniforms = _this.props.uniforms;
      if (uniforms) {
        Object.keys(uniforms).forEach(function (name, id) {
          var _this$props$uniforms$ = _this.props.uniforms[name],
            value = _this$props$uniforms$.value,
            type = _this$props$uniforms$.type;
          var glslType = uniformTypeToGLSLType(type);
          if (!glslType) return; // If the type specified doesn't exist

          var tempObject = {};
          if (type.includes("Matrix")) {
            var arrayLength = type.length;
            var val = type.charAt(arrayLength - 3);
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
      }
    });
    src_defineProperty(_this, "processTextures", function () {
      var _this8 = _this,
        gl = _this8.gl;
      var _this$props3 = _this.props,
        textures = _this$props3.textures,
        onDoneLoadingTextures = _this$props3.onDoneLoadingTextures;
      if (textures && textures.length > 0) {
        _this.uniforms["".concat(UNIFORM_CHANNELRESOLUTION)] = {
          type: "vec3",
          isNeeded: false,
          arraySize: "[".concat(textures.length, "]"),
          value: []
        };
        var texturePromisesArr = textures.map(function (texture, id) {
          _this.uniforms["".concat(UNIFORM_CHANNEL).concat(id)] = {
            type: "sampler2D",
            isNeeded: false
          }; // Dynamically add textures uniforms

          _this.setupChannelRes(texture, id); // initialize array with 0s
          _this.texturesArr[id] = new Texture(gl);
          return _this.texturesArr[id].load(texture, id).then(function (texture) {
            return _this.setupChannelRes(texture, id);
          });
        });
        Promise.all(texturePromisesArr).then(function () {
          return onDoneLoadingTextures && onDoneLoadingTextures();
        })["catch"](function (e) {
          console.error(e);
          if (onDoneLoadingTextures) onDoneLoadingTextures();
        });
      } else {
        if (onDoneLoadingTextures) onDoneLoadingTextures();
      }
    });
    src_defineProperty(_this, "preProcessShaders", function (fs, vs) {
      var _this$props4 = _this.props,
        precision = _this$props4.precision,
        _this$props4$devicePi = _this$props4.devicePixelRatio,
        devicePixelRatio = _this$props4$devicePi === void 0 ? 1 : _this$props4$devicePi;
      var dprString = "#define DPR ".concat(devicePixelRatio.toFixed(1), "\n");
      var isValidPrecision = PRECISIONS.includes(precision);
      var precisionString = "precision ".concat(isValidPrecision ? precision : PRECISIONS[1], " float;\n");
      if (!isValidPrecision) console.warn(SRLOG(src_templateObject2 || (src_templateObject2 = src_taggedTemplateLiteral(["wrong precision type ", ", please make sure to pass one of a valid precision lowp, mediump, highp, by default you shader precision will be set to highp."])), precision));
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
        fsString = insertAfterShaderHeader(fsString, dprString);
        fsString = fsString.replace(/gl_FragColor/g, "fragColor").replace(/texture2D\(/g, "texture(").replace(/textureCube\(/g, "texture(");
      } else {
        fsString = precisionString.concat(dprString).concat(fs).replace(/texture\(/g, "texture2D(");
      }
      var uniformInsertIndex = _this.isWebGL2 ? getShaderHeaderEndIndex(fsString) : fsString.lastIndexOf(precisionString) + precisionString.length;
      Object.keys(_this.uniforms).forEach(function (uniform) {
        if (fs.includes(uniform)) {
          fsString = insertStringAtIndex(fsString, "uniform ".concat(_this.uniforms[uniform].type, " ").concat(uniform).concat(_this.uniforms[uniform].arraySize || "", "; \n"), uniformInsertIndex);
          _this.uniforms[uniform].isNeeded = true;
        }
      });
      var isShadertoy = /mainImage/.test(fs);
      if (isShadertoy) {
        fsString = fsString.concat(_this.isWebGL2 ? FS_MAIN_SHADER_WEBGL2 : FS_MAIN_SHADER_WEBGL1);
      }
      var vsString = _this.isWebGL2 ? hasGlsl300Version(vs) ? vs.replace(/attribute /g, "in ") : "#version 300 es\n".concat(vs.replace(/attribute /g, "in ")) : vs;
      return {
        fs: fsString,
        vs: vsString
      };
    });
    src_defineProperty(_this, "setUniforms", function (timestamp) {
      var _this9 = _this,
        gl = _this9.gl;
      var delta = _this.lastTime ? (timestamp - _this.lastTime) / 1000 : 0;
      _this.lastTime = timestamp;
      if (_this.props.uniforms) {
        Object.keys(_this.props.uniforms).forEach(function (name) {
          var currentUniform = _this.props.uniforms[name];
          if (_this.uniforms[name].isNeeded) {
            var customUniformLocation = gl.getUniformLocation(_this.shaderProgram, name);
            processUniform(gl, customUniformLocation, currentUniform.type, currentUniform.value);
          }
        });
      }
      if (_this.uniforms.iMouse.isNeeded) {
        var mouseUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_MOUSE);
        // $FlowFixMe
        gl.uniform4fv(mouseUniform, _this.uniforms.iMouse.value);
      }
      if (_this.uniforms.iChannelResolution && _this.uniforms.iChannelResolution.isNeeded) {
        var channelResUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_CHANNELRESOLUTION);
        gl.uniform3fv(channelResUniform, _this.uniforms.iChannelResolution.value);
      }
      if (_this.uniforms.iDeviceOrientation.isNeeded) {
        var deviceOrientationUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_DEVICEORIENTATION);
        gl.uniform4fv(deviceOrientationUniform, _this.uniforms.iDeviceOrientation.value);
      }
      if (_this.uniforms.iTime.isNeeded) {
        var timeUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_TIME);
        gl.uniform1f(timeUniform, _this.timer += delta);
      }
      if (_this.uniforms.iTimeDelta.isNeeded) {
        var timeDeltaUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_TIMEDELTA);
        gl.uniform1f(timeDeltaUniform, delta);
      }
      if (_this.uniforms.iDate.isNeeded) {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var year = d.getFullYear();
        var time = d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() * 0.001;
        var dateUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_DATE);
        gl.uniform4fv(dateUniform, [year, month, day, time]);
      }
      if (_this.uniforms.iFrame.isNeeded) {
        var _timeDeltaUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_FRAME);
        gl.uniform1i(_timeDeltaUniform, _this.uniforms.iFrame.value++);
      }
      if (_this.texturesArr.length > 0) {
        _this.texturesArr.forEach(function (texture, id) {
          var isVideo = texture.isVideo,
            _webglTexture = texture._webglTexture,
            source = texture.source,
            flipY = texture.flipY,
            isLoaded = texture.isLoaded;
          if (!isLoaded) return;
          if (_this.uniforms["iChannel".concat(id)].isNeeded) {
            var iChannel = gl.getUniformLocation(_this.shaderProgram, "iChannel".concat(id));
            gl.activeTexture(gl["TEXTURE".concat(id)]);
            gl.bindTexture(gl.TEXTURE_2D, _webglTexture);
            gl.uniform1i(iChannel, id);
            if (isVideo) texture.updateTexture(_webglTexture, source, flipY);
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
    src_defineProperty(_this, "timeoutId", void 0);
    src_defineProperty(_this, "canvas", void 0);
    src_defineProperty(_this, "mousedown", false);
    src_defineProperty(_this, "canvasPosition", void 0);
    src_defineProperty(_this, "timer", 0);
    src_defineProperty(_this, "lastMouseArr", [0, 0]);
    src_defineProperty(_this, "texturesArr", []);
    src_defineProperty(_this, "lastTime", 0);
    src_defineProperty(_this, "render", function () {
      var style = _this.props.style;
      var currentStyle = {
        glCanvas: _objectSpread({
          height: "100%",
          width: "100%"
        }, style)
      };
      return /*#__PURE__*/external_react_default().createElement("canvas", {
        style: currentStyle.glCanvas,
        ref: _this.registerCanvas
      });
    });
    _this.uniforms = src_defineProperty(src_defineProperty(src_defineProperty(src_defineProperty(src_defineProperty(src_defineProperty(src_defineProperty({}, UNIFORM_TIME, {
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
    });
    return _this;
  }
  _inherits(ShadertoyReact, _Component);
  return src_createClass(ShadertoyReact, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var gl = this.gl;
      if (gl) {
        var loseContext = gl.getExtension("WEBGL_lose_context");
        if (loseContext) loseContext.loseContext();
        gl.useProgram(null);
        gl.deleteProgram(this.shaderProgram);
        if (this.texturesArr.length > 0) {
          this.texturesArr.forEach(function (texture) {
            gl.deleteTexture(texture._webglTexture);
          });
        }
        this.shaderProgram = null;
      }
      this.removeEventListeners();
      cancelAnimationFrame(this.animFrameId);
    }
  }]);
}(external_react_namespaceObject.Component);
src_defineProperty(ShadertoyReact, "defaultProps", {
  textures: [],
  contextAttributes: {},
  devicePixelRatio: 1,
  precision: "highp",
  webgl: "auto"
});

module.exports = __webpack_exports__;
/******/ })()
;