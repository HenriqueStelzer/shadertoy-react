// @flow
import React, { Component } from "react";
import Texture, {
  NearestFilter,
  LinearFilter,
  NearestMipMapNearestFilter,
  LinearMipMapNearestFilter,
  NearestMipMapLinearFilter,
  LinearMipMapLinearFilter,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  RepeatWrapping,
} from "./Texture";
import FramebufferPool from "./FramebufferPool";
import { SRLOG } from "./prefixLogs";
import { uniformTypeToGLSLType, processUniform } from "./uniformsType";
import {
  resolvePersistentTimeConfig,
  initPersistentEpoch,
  getPersistentTimeSeconds,
  persistentTimeEqual,
} from "./persistentTime";

export {
  NearestFilter,
  LinearFilter,
  NearestMipMapNearestFilter,
  LinearMipMapNearestFilter,
  NearestMipMapLinearFilter,
  LinearMipMapLinearFilter,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  RepeatWrapping,
};

let shadertoyDeprecationWarned = false;

const warnShadertoyDeprecated = () => {
  if (!shadertoyDeprecationWarned && process.env.NODE_ENV !== "production") {
    shadertoyDeprecationWarned = true;
    console.warn(
      SRLOG(
        "ShadertoyReact is deprecated. Use GlslCanvas instead: import GlslCanvas from 'glsl-helpers-react'"
      )
    );
  }
};

const PRECISIONS = ["lowp", "mediump", "highp"];

const FS_MAIN_SHADER_WEBGL1 = `\nvoid main(void){
    vec4 color = vec4(0.0,0.0,0.0,1.0);
    mainImage( color, gl_FragCoord.xy );
    gl_FragColor = color;
}`;

const FS_MAIN_SHADER_WEBGL2 = `\nvoid main(void){
    vec4 color = vec4(0.0,0.0,0.0,1.0);
    mainImage( color, gl_FragCoord.xy );
    fragColor = color;
}`;

const BASIC_FS = `void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord/iResolution.xy;
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
    fragColor = vec4(col,1.0);
}`;

const BASIC_VS_WEBGL1 = `attribute vec3 aVertexPosition;
void main(void) {
    gl_Position = vec4(aVertexPosition, 1.0);
}`;

const BASIC_VS_WEBGL2 = `in vec3 aVertexPosition;
void main(void) {
    gl_Position = vec4(aVertexPosition, 1.0);
}`;

const UNIFORM_TIME = "iTime";
const UNIFORM_TIMEDELTA = "iTimeDelta";
const UNIFORM_DATE = "iDate";
const UNIFORM_FRAME = "iFrame";
const UNIFORM_MOUSE = "iMouse";
const UNIFORM_RESOLUTION = "iResolution";
const UNIFORM_CHANNEL = "iChannel";
const UNIFORM_CHANNELRESOLUTION = "iChannelResolution";
const UNIFORM_CHANNELTIME = "iChannelTime";
const UNIFORM_DEVICEORIENTATION = "iDeviceOrientation";
const UNIFORM_PERSISTENT_TIME = "iPersistentTime";

const BUILTIN_UNIFORMS = {
  [UNIFORM_TIME]: { type: "float", isNeeded: false, value: 0 },
  [UNIFORM_TIMEDELTA]: { type: "float", isNeeded: false, value: 0 },
  [UNIFORM_DATE]: { type: "vec4", isNeeded: false, value: [0, 0, 0, 0] },
  [UNIFORM_MOUSE]: { type: "vec4", isNeeded: false, value: [0, 0, 0, 0] },
  [UNIFORM_RESOLUTION]: { type: "vec2", isNeeded: false, value: [0, 0] },
  [UNIFORM_FRAME]: { type: "int", isNeeded: false, value: 0 },
  [UNIFORM_DEVICEORIENTATION]: {
    type: "vec4",
    isNeeded: false,
    value: [0, 0, 0, 0],
  },
  [UNIFORM_PERSISTENT_TIME]: { type: "float", isNeeded: false, value: 0 },
};

type PassConfig = {
  fs: string,
  target?: string,
  inputs?: Array<string>,
};

type Props = {
  fs?: string,
  vs?: string,
  passes?: Array<PassConfig>,
  textures?: Array<Object>,
  uniforms?: Object,
  defines?: Object,
  clearColor?: Array<number>,
  precision?: string,
  style?: Object,
  contextAttributes?: Object,
  onDoneLoadingTextures?: Function,
  lerp?: number,
  devicePixelRatio?: number,
  webgl?: "auto" | "1" | "2",
  persistentTime?: boolean | Object,
};

const lerpVal = (v0: number, v1: number, t: number) => v0 * (1 - t) + v1 * t;

const insertStringAtIndex = (
  currentString: string,
  string: string,
  index: number
) =>
  index > 0
    ? currentString.substring(0, index) +
      string +
      currentString.substring(index, currentString.length)
    : string + currentString;

const hasGlsl300Version = (source: string) =>
  /^#version\s+300\s+es\b/m.test(source.trimStart());

const hasPrecisionFloat = (source: string) =>
  /\bprecision\s+(?:lowp|mediump|highp)\s+float\s*;/i.test(source);

const hasFragColorOut = (source: string) =>
  /\bout\s+vec4\s+fragColor\s*;/i.test(source);

const getShaderHeaderEndIndex = (source: string) => {
  let index = 0;
  const versionMatch = source.match(/^\s*#version[^\n]*\n/);
  if (versionMatch) index = versionMatch[0].length;

  const rest = source.slice(index);
  const precisionMatch = rest.match(
    /^(?:\s*precision\s+(?:lowp|mediump|highp)\s+float\s*;\s*\n)+/
  );
  if (precisionMatch) index += precisionMatch[0].length;

  const afterPrecision = source.slice(index);
  const outMatch = afterPrecision.match(/^\s*out\s+vec4\s+\w+\s*;\s*\n/);
  if (outMatch) index += outMatch[0].length;

  return index;
};

const insertAfterShaderHeader = (source: string, insertion: string) =>
  insertStringAtIndex(source, insertion, getShaderHeaderEndIndex(source));

const isValidDefineName = (name: string) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);

const formatDefineValue = (value: number | string | boolean) => {
  if (typeof value === "boolean") return value ? "1" : "0";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "0";
  return String(value);
};

const buildDefinesString = (defines: ?Object) => {
  if (!defines) return "";
  return Object.entries(defines)
    .filter(([name]) => {
      if (!isValidDefineName(name)) {
        console.warn(SRLOG(`Invalid #define name skipped: ${name}`));
        return false;
      }
      return true;
    })
    .map(([name, value]) => `#define ${name} ${formatDefineValue(value)}`)
    .join("\n")
    .concat("\n");
};

const texturesEqual = (a: ?Array<Object>, b: ?Array<Object>) =>
  JSON.stringify(a || []) === JSON.stringify(b || []);

const uniformsSchemaEqual = (a: ?Object, b: ?Object) => {
  const keysA = Object.keys(a || {})
    .map((k) => `${k}:${(a || {})[k].type}`)
    .sort()
    .join("|");
  const keysB = Object.keys(b || {})
    .map((k) => `${k}:${(b || {})[k].type}`)
    .sort()
    .join("|");
  return keysA === keysB;
};

const definesEqual = (a: ?Object, b: ?Object) =>
  JSON.stringify(a || {}) === JSON.stringify(b || {});

const passesEqual = (a: ?Array<PassConfig>, b: ?Array<PassConfig>) =>
  JSON.stringify(a || []) === JSON.stringify(b || []);

const clearColorEqual = (a: ?Array<number>, b: ?Array<number>) =>
  JSON.stringify(a || [0, 0, 0, 1]) === JSON.stringify(b || [0, 0, 0, 1]);

const propsAffectingScene = (prev: Props, next: Props): boolean =>
  prev.style !== next.style ||
  prev.webgl !== next.webgl ||
  prev.fs !== next.fs ||
  prev.vs !== next.vs ||
  prev.devicePixelRatio !== next.devicePixelRatio ||
  prev.lerp !== next.lerp ||
  prev.precision !== next.precision ||
  !definesEqual(prev.defines, next.defines) ||
  !passesEqual(prev.passes, next.passes) ||
  !texturesEqual(prev.textures, next.textures) ||
  !uniformsSchemaEqual(prev.uniforms, next.uniforms) ||
  !clearColorEqual(prev.clearColor, next.clearColor) ||
  !persistentTimeEqual(prev.persistentTime, next.persistentTime);

const isTextureChannelUniform = (uniform: string) =>
  uniform.startsWith(UNIFORM_CHANNEL) &&
  uniform !== UNIFORM_CHANNELRESOLUTION &&
  uniform !== UNIFORM_CHANNELTIME;

const uniformMatchesSource = (
  uniform: string,
  uniformSource: string,
  channelOffset: number
) => {
  if (isTextureChannelUniform(uniform)) {
    const id = parseInt(uniform.slice(UNIFORM_CHANNEL.length), 10);
    if (!Number.isNaN(id)) {
      return uniformSource.includes(`${UNIFORM_CHANNEL}${id + channelOffset}`);
    }
  }
  return uniformSource.includes(uniform);
};

const shaderUniformName = (uniform: string, channelOffset: number) => {
  if (isTextureChannelUniform(uniform) && channelOffset > 0) {
    const id = parseInt(uniform.slice(UNIFORM_CHANNEL.length), 10);
    if (!Number.isNaN(id)) {
      return `${UNIFORM_CHANNEL}${id + channelOffset}`;
    }
  }
  return uniform;
};

export default class GlslCanvas extends Component<Props, *> {
  constructor(props: Props) {
    super(props);
    this.instanceId = Math.random().toString(36).slice(2);
    this.persistentEpochMs = null;
    this.resetUniforms();
    this.passPrograms = [];
    this.framebufferPool = null;
  }

  initPersistentTime = () => {
    const config = resolvePersistentTimeConfig(
      this.props.persistentTime,
      this.instanceId
    );
    this.persistentEpochMs = config.enabled
      ? initPersistentEpoch(config)
      : null;
  };

  resetUniforms = () => {
    this.uniforms = JSON.parse(JSON.stringify(BUILTIN_UNIFORMS));
  };

  static defaultProps = {
    textures: [],
    defines: {},
    contextAttributes: {},
    devicePixelRatio: 1,
    precision: "highp",
    webgl: "auto",
  };

  componentDidMount = () => {
    this.initWebGL();
    if (!this.gl) return;
    this.initPersistentTime();
    this.bootstrapScene();
  };

  bootstrapScene = () => {
    const { clearColor = [0, 0, 0, 1] } = this.props;
    const { gl } = this;

    gl.clearColor(...clearColor);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    this.framebufferPool = new FramebufferPool(gl);
    this.resetUniforms();
    this.processCustomUniforms();
    this.processTextures();
    this.initBuffers();
    this.addEventListeners();
    this.onResize();
    const hasTextures = (this.props.textures || []).length > 0;
    if (!hasTextures) {
      this.compileShaders();
    }
    this.drawScene();
  };

  shouldComponentUpdate(nextProps: Props) {
    return propsAffectingScene(this.props, nextProps);
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.gl) return;

    const webglChanged = prevProps.webgl !== this.props.webgl;
    const fsChanged = prevProps.fs !== this.props.fs;
    const vsChanged = prevProps.vs !== this.props.vs;
    const definesChanged = !definesEqual(prevProps.defines, this.props.defines);
    const passesChanged = !passesEqual(prevProps.passes, this.props.passes);
    const texturesChanged = !texturesEqual(
      prevProps.textures,
      this.props.textures
    );
    const uniformsSchemaChanged = !uniformsSchemaEqual(
      prevProps.uniforms,
      this.props.uniforms
    );
    const clearColorChanged =
      JSON.stringify(prevProps.clearColor || [0, 0, 0, 1]) !==
      JSON.stringify(this.props.clearColor || [0, 0, 0, 1]);
    const persistentTimeChanged = !persistentTimeEqual(
      prevProps.persistentTime,
      this.props.persistentTime
    );
    const precisionChanged = prevProps.precision !== this.props.precision;

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
      this.gl.clearColor(...(this.props.clearColor || [0, 0, 0, 1]));
    }

    if (texturesChanged) {
      this.disposeTextures();
      this.processTextures(true);
    } else if (prevProps.devicePixelRatio !== this.props.devicePixelRatio) {
      this.onResize();
      if (this.texturesArr.some((t) => t.textureArgs && t.textureArgs.srcSet)) {
        this.reloadSrcSetTextures();
      }
    }

    if (uniformsSchemaChanged) {
      Object.keys(this.uniforms).forEach((key) => {
        if (!BUILTIN_UNIFORMS[key] && !key.startsWith(UNIFORM_CHANNEL)) {
          delete this.uniforms[key];
        }
      });
      this.processCustomUniforms();
    }

    if (
      fsChanged ||
      vsChanged ||
      definesChanged ||
      passesChanged ||
      uniformsSchemaChanged ||
      precisionChanged
    ) {
      this.recompileShaders();
    }

    if (
      prevProps.lerp !== this.props.lerp ||
      uniformsSchemaChanged ||
      fsChanged ||
      passesChanged
    ) {
      this.syncEventListeners(prevProps);
    }
  }

  syncEventListeners = (prevProps: Props) => {
    this.removeEventListeners();
    this.addEventListeners();
  };

  teardownGl = () => {
    this.removeEventListeners();
    cancelAnimationFrame(this.animFrameId);
    this.disposeTextures();
    this.disposePassPrograms();
    if (this.framebufferPool) {
      this.framebufferPool.dispose();
      this.framebufferPool = null;
    }
    const { gl } = this;
    if (gl) {
      const loseContext = gl.getExtension("WEBGL_lose_context");
      if (loseContext) loseContext.loseContext();
      if (this.shaderProgram) gl.deleteProgram(this.shaderProgram);
    }
    this.shaderProgram = null;
  };

  componentWillUnmount() {
    this.teardownGl();
  }

  disposeTextures = () => {
    this.texturesArr.forEach((texture) => texture.dispose && texture.dispose());
    this.texturesArr = [];
    Object.keys(this.uniforms).forEach((key) => {
      if (
        key.startsWith(UNIFORM_CHANNEL) ||
        key === UNIFORM_CHANNELRESOLUTION ||
        key === UNIFORM_CHANNELTIME
      ) {
        delete this.uniforms[key];
      }
    });
  };

  disposePassPrograms = () => {
    const { gl } = this;
    if (!gl) return;
    this.passPrograms.forEach((p) => p && gl.deleteProgram(p));
    this.passPrograms = [];
  };

  reloadSrcSetTextures = () => {
    const { devicePixelRatio = 1 } = this.props;
    const promises = this.texturesArr.map((texture, id) => {
      if (!texture.textureArgs || !texture.textureArgs.srcSet) {
        return Promise.resolve(texture);
      }
      return texture
        .reloadImage(texture.textureArgs, devicePixelRatio)
        .then((t) => {
          this.setupChannelRes(t, id);
          return t;
        });
    });
    Promise.all(promises).catch((e) => console.error(e));
  };

  setupChannelRes = ({ width, height }: Texture, id: number) => {
    const { devicePixelRatio = 1 } = this.props;
    if (!this.uniforms.iChannelResolution) return;
    this.uniforms.iChannelResolution.value[id * 3] = width * devicePixelRatio;
    this.uniforms.iChannelResolution.value[id * 3 + 1] =
      height * devicePixelRatio;
    this.uniforms.iChannelResolution.value[id * 3 + 2] = 0;
  };

  initWebGL = () => {
    const { contextAttributes, webgl = "auto" } = this.props;
    let gl = null;

    if (webgl === "2" || webgl === "auto") {
      gl = this.canvas.getContext("webgl2", contextAttributes);
    }
    if (!gl && (webgl === "1" || webgl === "auto")) {
      gl =
        this.canvas.getContext("webgl", contextAttributes) ||
        this.canvas.getContext("experimental-webgl", contextAttributes);
    }

    this.isWebGL2 = !!(gl && gl.createVertexArray);
    this.gl = gl;

    if (!gl) {
      const msg =
        webgl === "2"
          ? "Failed to create a WebGL2 context."
          : webgl === "1"
          ? "Failed to create a WebGL1 context."
          : "Failed to create a WebGL context.";
      console.error(SRLOG(msg));
    } else {
      gl.getExtension("OES_standard_derivatives");
      if (!this.isWebGL2) gl.getExtension("EXT_shader_texture_lod");
    }
  };

  initBuffers = () => {
    const { gl } = this;
    this.squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticesBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0,
      ]),
      gl.STATIC_DRAW
    );
  };

  addEventListeners = () => {
    const options = { passive: true };
    if (this.uniforms.iMouse && this.uniforms.iMouse.isNeeded) {
      this.canvas.addEventListener("mousemove", this.mouseMove, options);
      this.canvas.addEventListener("mouseout", this.mouseUp, options);
      this.canvas.addEventListener("mouseup", this.mouseUp, options);
      this.canvas.addEventListener("mousedown", this.mouseDown, options);
      this.canvas.addEventListener("touchmove", this.mouseMove, options);
      this.canvas.addEventListener("touchend", this.mouseUp, options);
      this.canvas.addEventListener("touchstart", this.mouseDown, options);
    }
    if (this.uniforms.iDeviceOrientation && this.uniforms.iDeviceOrientation.isNeeded) {
      window.addEventListener(
        "deviceorientation",
        this.onDeviceOrientationChange,
        options
      );
    }
    window.addEventListener("resize", this.onResize, options);
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(this.canvas);
    }
  };

  removeEventListeners = () => {
    const options = { passive: true };
    if (this.uniforms.iMouse && this.uniforms.iMouse.isNeeded) {
      this.canvas.removeEventListener("mousemove", this.mouseMove, options);
      this.canvas.removeEventListener("mouseout", this.mouseUp, options);
      this.canvas.removeEventListener("mouseup", this.mouseUp, options);
      this.canvas.removeEventListener("mousedown", this.mouseDown, options);
      this.canvas.removeEventListener("touchmove", this.mouseMove, options);
      this.canvas.removeEventListener("touchend", this.mouseUp, options);
      this.canvas.removeEventListener("touchstart", this.mouseDown, options);
    }
    if (this.uniforms.iDeviceOrientation && this.uniforms.iDeviceOrientation.isNeeded) {
      window.removeEventListener(
        "deviceorientation",
        this.onDeviceOrientationChange,
        options
      );
    }
    window.removeEventListener("resize", this.onResize, options);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  };

  onDeviceOrientationChange = ({ alpha, beta, gamma }) => {
    this.uniforms.iDeviceOrientation.value = [
      alpha,
      beta,
      gamma,
      window.orientation || 0,
    ];
  };

  toShaderPixelCoords = (clientX: number, clientY: number): [number, number] => {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (rect.height - (clientY - rect.top)) * scaleY;
    return [x, y];
  };

  mouseDown = (e) => {
    this.canvasPosition = this.canvas.getBoundingClientRect();
    const clientX = e.clientX || e.changedTouches[0].clientX;
    const clientY = e.clientY || e.changedTouches[0].clientY;
    const [mouseX, mouseY] = this.toShaderPixelCoords(clientX, clientY);
    this.uniforms.iMouse.value[2] = mouseX;
    this.uniforms.iMouse.value[3] = mouseY;
    this.lastMouseArr[0] = mouseX;
    this.lastMouseArr[1] = mouseY;
  };

  mouseMove = (e) => {
    this.canvasPosition = this.canvas.getBoundingClientRect();
    const { lerp = 1 } = this.props;
    const clientX = e.clientX || e.changedTouches[0].clientX;
    const clientY = e.clientY || e.changedTouches[0].clientY;
    const [mouseX, mouseY] = this.toShaderPixelCoords(clientX, clientY);
    if (lerp !== 1) {
      this.lastMouseArr[0] = mouseX;
      this.lastMouseArr[1] = mouseY;
    } else {
      this.uniforms.iMouse.value[0] = mouseX;
      this.uniforms.iMouse.value[1] = mouseY;
    }
  };

  mouseUp = () => {
    this.uniforms.iMouse.value[2] = 0;
    this.uniforms.iMouse.value[3] = 0;
  };

  syncCanvasSize = () => {
    const { gl } = this;
    if (!gl || !this.canvas) return;
    const { devicePixelRatio = 1 } = this.props;
    this.canvasPosition = this.canvas.getBoundingClientRect();
    const displayWidth = Math.max(
      1,
      Math.round(this.canvasPosition.width * devicePixelRatio)
    );
    const displayHeight = Math.max(
      1,
      Math.round(this.canvasPosition.height * devicePixelRatio)
    );
    gl.canvas.width = displayWidth;
    gl.canvas.height = displayHeight;
    gl.viewport(0, 0, displayWidth, displayHeight);

    if (this.uniforms.iResolution && this.uniforms.iResolution.isNeeded && this.shaderProgram) {
      const rUniform = gl.getUniformLocation(this.shaderProgram, UNIFORM_RESOLUTION);
      gl.uniform2fv(rUniform, [gl.canvas.width, gl.canvas.height]);
    }

    if (this.texturesArr.some((t) => t.textureArgs && t.textureArgs.srcSet)) {
      this.reloadSrcSetTextures();
    }
  };

  onResize = () => {
    this.syncCanvasSize();
  };

  advanceFrameClock = (timestamp: number) => {
    const delta = this.lastTime ? (timestamp - this.lastTime) / 1000 : 0;
    this.frameDelta = delta;
    this.lastTime = timestamp;
    if (this.uniforms.iTime && this.uniforms.iTime.isNeeded) {
      this.timer += delta;
    }
    if (this.uniforms.iFrame && this.uniforms.iFrame.isNeeded) {
      this.uniforms.iFrame.value++;
    }
  };

  drawScene = (timestamp: number) => {
    const { gl } = this;
    const { lerp = 1, passes } = this.props;

    this.advanceFrameClock(timestamp);

    if (passes && passes.length > 0) {
      this.drawMultiPass(timestamp);
    } else {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticesBuffer);
      gl.vertexAttribPointer(
        this.vertexPositionAttribute,
        3,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.useProgram(this.shaderProgram);
      this.setUniforms(timestamp, this.shaderProgram);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    if (this.uniforms.iMouse && this.uniforms.iMouse.isNeeded && lerp !== 1) {
      this.uniforms.iMouse.value[0] = lerpVal(
        this.uniforms.iMouse.value[0],
        this.lastMouseArr[0],
        lerp
      );
      this.uniforms.iMouse.value[1] = lerpVal(
        this.uniforms.iMouse.value[1],
        this.lastMouseArr[1],
        lerp
      );
    }

    this.animFrameId = requestAnimationFrame(this.drawScene);
  };

  drawMultiPass = (timestamp: number) => {
    const { passes } = this.props;
    const { gl } = this;
    if (!passes || !this.framebufferPool || !gl) return;

    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;

    passes.forEach((pass, index) => {
      const program = this.passPrograms[index];
      if (!program) return;

      const isLast = index === passes.length - 1;
      const targetEntry =
        pass.target && !isLast
          ? this.framebufferPool.getOrCreate(pass.target, width, height)
          : null;

      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        targetEntry ? targetEntry.framebuffer : null
      );
      gl.viewport(0, 0, width, height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticesBuffer);
      const attr = gl.getAttribLocation(program, "aVertexPosition");
      gl.enableVertexAttribArray(attr);
      gl.vertexAttribPointer(attr, 3, gl.FLOAT, false, 0, 0);

      (pass.inputs || []).forEach((inputName, inputIdx) => {
        const buffer = this.framebufferPool.buffers[inputName];
        if (!buffer) return;
        gl.activeTexture(gl.TEXTURE0 + inputIdx);
        gl.bindTexture(gl.TEXTURE_2D, buffer.texture);
        const loc = gl.getUniformLocation(program, `iChannel${inputIdx}`);
        if (loc) gl.uniform1i(loc, inputIdx);
      });

      const inputCount = (pass.inputs || []).length;
      this.texturesArr.forEach((texture, id) => {
        if (!texture.isLoaded) return;
        const textureUniformKey = `${UNIFORM_CHANNEL}${id}`;
        if (
          !this.uniforms[textureUniformKey] ||
          !this.uniforms[textureUniformKey].isNeeded
        ) {
          return;
        }
        const channelIdx = inputCount + id;
        gl.activeTexture(gl.TEXTURE0 + channelIdx);
        if (texture.isCube) {
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture._webglTexture);
        } else {
          gl.bindTexture(gl.TEXTURE_2D, texture._webglTexture);
        }
        const loc = gl.getUniformLocation(
          program,
          `${UNIFORM_CHANNEL}${channelIdx}`
        );
        if (loc) gl.uniform1i(loc, channelIdx);
        if (texture.isVideo && texture.source) {
          texture.updateTexture(
            texture._webglTexture,
            texture.source,
            texture.flipY
          );
        }
        if (texture.isKeyboard && texture.keyboard) {
          texture.keyboard.updateTexture();
        }
      });

      this.setUniforms(timestamp, program, width, height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    });

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  };

  createShader = (type: number, shaderCodeAsText: string) => {
    const { gl } = this;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, shaderCodeAsText);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn(SRLOG("Error compiling the shader:"), shaderCodeAsText);
      const log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      console.error(SRLOG(`Shader compiler log: ${log}`));
      return null;
    }
    return shader;
  };

  linkProgram = (fs: string, vs: string) => {
    const { gl } = this;
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fs);
    const vertexShader = this.createShader(gl.VERTEX_SHADER, vs);
    if (!fragmentShader || !vertexShader) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(
        SRLOG(`Unable to initialize shader program: ${gl.getProgramInfoLog(program)}`)
      );
      gl.deleteProgram(program);
      return null;
    }
    return program;
  };

  compileShaders = () => {
    const { fs, vs, passes } = this.props;
    const defaultVs = this.isWebGL2 ? BASIC_VS_WEBGL2 : BASIC_VS_WEBGL1;

    if (passes && passes.length > 0) {
      this.disposePassPrograms();
      this.passPrograms = passes.map((pass) => {
        const inputCount = (pass.inputs || []).length;
        const shaders = this.preProcessShaders(
          pass.fs,
          vs || defaultVs,
          pass.fs,
          inputCount,
          inputCount
        );
        return this.linkProgram(shaders.fs, shaders.vs);
      });
      return;
    }

    const shaders = this.preProcessShaders(fs || BASIC_FS, vs || defaultVs, fs || BASIC_FS);
    if (this.shaderProgram) this.gl.deleteProgram(this.shaderProgram);
    this.shaderProgram = this.linkProgram(shaders.fs, shaders.vs);
    if (this.shaderProgram) {
      this.gl.useProgram(this.shaderProgram);
      this.vertexPositionAttribute = this.gl.getAttribLocation(
        this.shaderProgram,
        "aVertexPosition"
      );
      this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
    }
  };

  recompileShaders = () => {
    Object.keys(this.uniforms).forEach((key) => {
      if (this.uniforms[key]) this.uniforms[key].isNeeded = false;
    });
    this.compileShaders();
    this.syncEventListeners();
    if (this.uniforms.iResolution && this.uniforms.iResolution.isNeeded) {
      this.onResize();
    }
  };

  initShaders = () => {
    this.compileShaders();
  };

  processCustomUniforms = () => {
    const { uniforms } = this.props;
    if (!uniforms) return;
    Object.keys(uniforms).forEach((name) => {
      const { value, type } = uniforms[name];
      const glslType = uniformTypeToGLSLType(type);
      if (!glslType) return;

      const tempObject = {};
      if (type.includes("Matrix")) {
        const val = type.charAt(type.length - 3);
        const numberOfMatrices = Math.floor(value.length / (val * val));
        if (value.length > val * val) {
          tempObject.arraySize = `[${numberOfMatrices}]`;
        }
      } else if (type.includes("v") && value.length > type.charAt(0)) {
        tempObject.arraySize = `[${Math.floor(value.length / type.charAt(0))}]`;
      }

      this.uniforms[name] = {
        type: glslType,
        isNeeded: false,
        value,
        ...tempObject,
      };
    });
  };

  processTextures = (isUpdate: boolean = false) => {
    const { gl } = this;
    const { textures, onDoneLoadingTextures, devicePixelRatio = 1 } = this.props;
    const list = textures || [];

    if (list.length === 0) {
      if (onDoneLoadingTextures) onDoneLoadingTextures();
      return;
    }

    const channelCount = list.length;
    this.uniforms[UNIFORM_CHANNELRESOLUTION] = {
      type: "vec3",
      isNeeded: false,
      arraySize: `[${channelCount}]`,
      value: new Array(channelCount * 3).fill(0),
    };
    this.uniforms[UNIFORM_CHANNELTIME] = {
      type: "float",
      isNeeded: false,
      arraySize: `[${channelCount}]`,
      value: new Array(channelCount).fill(0),
    };

    const texturePromisesArr = list.map((textureArgs, id) => {
      const isCube = textureArgs.type === "cube" || (textureArgs.urls && textureArgs.urls.length === 6);
      this.uniforms[`${UNIFORM_CHANNEL}${id}`] = {
        type: isCube ? "samplerCube" : "sampler2D",
        isNeeded: false,
      };
      this.setupChannelRes(textureArgs, id);
      this.texturesArr[id] = new Texture(gl);
      return this.texturesArr[id]
        .load(textureArgs, id, devicePixelRatio)
        .then((texture) => {
          this.setupChannelRes(texture, id);
          return texture;
        });
    });

    Promise.all(texturePromisesArr)
      .then(() => {
        if (!isUpdate) this.recompileShaders();
        if (onDoneLoadingTextures) onDoneLoadingTextures();
      })
      .catch((e) => {
        console.error(e);
        if (!isUpdate) this.compileShaders();
        if (onDoneLoadingTextures) onDoneLoadingTextures();
      });
  };

  preProcessShaders = (
    fs: string,
    vs: string,
    uniformSource: string,
    channelOffset: number = 0,
    inputChannelCount: number = 0
  ) => {
    const { precision, devicePixelRatio = 1, defines } = this.props;

    const dprString = `#define DPR ${devicePixelRatio.toFixed(1)}\n`;
    const definesString = buildDefinesString(defines);
    const isValidPrecision = PRECISIONS.includes(precision);
    const precisionString = `precision ${
      isValidPrecision ? precision : PRECISIONS[1]
    } float;\n`;

    if (!isValidPrecision) {
      console.warn(
        SRLOG(
          `wrong precision type ${precision}, use lowp, mediump, or highp. Defaulting to mediump.`
        )
      );
    }

    let fsString;
    if (this.isWebGL2) {
      const fsAlreadyGlsl300 = hasGlsl300Version(fs);
      if (fsAlreadyGlsl300) {
        fsString = fs;
        if (!hasPrecisionFloat(fsString)) {
          fsString = insertAfterShaderHeader(fsString, precisionString);
        }
        if (!hasFragColorOut(fsString)) {
          fsString = insertAfterShaderHeader(fsString, "out vec4 fragColor;\n");
        }
      } else {
        fsString = `#version 300 es\n${precisionString}out vec4 fragColor;\n${fs}`;
      }
      fsString = insertAfterShaderHeader(fsString, dprString + definesString);
      fsString = fsString
        .replace(/gl_FragColor/g, "fragColor")
        .replace(/texture2D\(/g, "texture(")
        .replace(/textureCube\(/g, "texture(");
    } else {
      fsString = precisionString
        .concat(dprString)
        .concat(definesString)
        .concat(fs)
        .replace(/texture\(/g, "texture2D(")
        .replace(/textureCube\(/g, "textureCube(");
    }

    const uniformInsertIndex = this.isWebGL2
      ? getShaderHeaderEndIndex(fsString)
      : fsString.indexOf(fs) >= 0
      ? fsString.indexOf(fs)
      : fsString.length;

    for (let i = 0; i < inputChannelCount; i++) {
      const channelName = `${UNIFORM_CHANNEL}${i}`;
      if (uniformSource.includes(channelName)) {
        fsString = insertStringAtIndex(
          fsString,
          `uniform sampler2D ${channelName}; \n`,
          uniformInsertIndex
        );
      }
    }

    Object.keys(this.uniforms).forEach((uniform) => {
      if (!uniformMatchesSource(uniform, uniformSource, channelOffset)) return;
      const declaredName = shaderUniformName(uniform, channelOffset);
      fsString = insertStringAtIndex(
        fsString,
        `uniform ${this.uniforms[uniform].type} ${declaredName}${
          this.uniforms[uniform].arraySize || ""
        }; \n`,
        uniformInsertIndex
      );
      this.uniforms[uniform].isNeeded = true;
    });

    if (/mainImage/.test(fs)) {
      fsString = fsString.concat(
        this.isWebGL2 ? FS_MAIN_SHADER_WEBGL2 : FS_MAIN_SHADER_WEBGL1
      );
    }

    const vsString = this.isWebGL2
      ? hasGlsl300Version(vs)
        ? vs.replace(/attribute /g, "in ")
        : `#version 300 es\n${vs.replace(/attribute /g, "in ")}`
      : vs;

    return { fs: fsString, vs: vsString };
  };

  setUniforms = (
    timestamp: number,
    program: WebGLProgram = this.shaderProgram,
    overrideWidth?: number,
    overrideHeight?: number
  ) => {
    const { gl } = this;
    if (!program) return;

    if (this.props.uniforms) {
      Object.keys(this.props.uniforms).forEach((name) => {
        const currentUniform = this.props.uniforms[name];
        if (this.uniforms[name] && this.uniforms[name].isNeeded) {
          const loc = gl.getUniformLocation(program, name);
          processUniform(gl, loc, currentUniform.type, currentUniform.value);
        }
      });
    }

    if (this.uniforms.iMouse && this.uniforms.iMouse.isNeeded) {
      const loc = gl.getUniformLocation(program, UNIFORM_MOUSE);
      gl.uniform4fv(loc, this.uniforms.iMouse.value);
    }

    if (this.uniforms.iChannelResolution && this.uniforms.iChannelResolution.isNeeded) {
      const loc = gl.getUniformLocation(program, UNIFORM_CHANNELRESOLUTION);
      gl.uniform3fv(loc, this.uniforms.iChannelResolution.value);
    }

    if (this.uniforms.iChannelTime && this.uniforms.iChannelTime.isNeeded) {
      this.texturesArr.forEach((texture, id) => {
        if (this.uniforms.iChannelTime.value) {
          this.uniforms.iChannelTime.value[id] = texture.getChannelTime
            ? texture.getChannelTime()
            : 0;
        }
      });
      const loc = gl.getUniformLocation(program, UNIFORM_CHANNELTIME);
      gl.uniform1fv(loc, this.uniforms.iChannelTime.value);
    }

    if (this.uniforms.iDeviceOrientation && this.uniforms.iDeviceOrientation.isNeeded) {
      const loc = gl.getUniformLocation(program, UNIFORM_DEVICEORIENTATION);
      gl.uniform4fv(loc, this.uniforms.iDeviceOrientation.value);
    }

    if (this.uniforms.iTime && this.uniforms.iTime.isNeeded) {
      const loc = gl.getUniformLocation(program, UNIFORM_TIME);
      gl.uniform1f(loc, this.timer);
    }

    if (
      this.uniforms.iPersistentTime &&
      this.uniforms.iPersistentTime.isNeeded &&
      this.persistentEpochMs != null
    ) {
      const loc = gl.getUniformLocation(program, UNIFORM_PERSISTENT_TIME);
      gl.uniform1f(loc, getPersistentTimeSeconds(this.persistentEpochMs));
    }

    if (this.uniforms.iTimeDelta && this.uniforms.iTimeDelta.isNeeded) {
      const loc = gl.getUniformLocation(program, UNIFORM_TIMEDELTA);
      gl.uniform1f(loc, this.frameDelta);
    }

    if (this.uniforms.iDate && this.uniforms.iDate.isNeeded) {
      const d = new Date();
      const loc = gl.getUniformLocation(program, UNIFORM_DATE);
      gl.uniform4fv(loc, [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours() * 3600 +
          d.getMinutes() * 60 +
          d.getSeconds() +
          d.getMilliseconds() * 0.001,
      ]);
    }

    if (this.uniforms.iFrame && this.uniforms.iFrame.isNeeded) {
      const loc = gl.getUniformLocation(program, UNIFORM_FRAME);
      gl.uniform1i(loc, this.uniforms.iFrame.value);
    }

    if (this.uniforms.iResolution && this.uniforms.iResolution.isNeeded) {
      const loc = gl.getUniformLocation(program, UNIFORM_RESOLUTION);
      gl.uniform2f(
        loc,
        overrideWidth || gl.drawingBufferWidth,
        overrideHeight || gl.drawingBufferHeight
      );
    }

    if (this.texturesArr.length > 0 && (!this.props.passes || this.props.passes.length === 0)) {
      this.texturesArr.forEach((texture, id) => {
        if (!texture.isLoaded) return;
        const channelKey = `${UNIFORM_CHANNEL}${id}`;
        if (!this.uniforms[channelKey] || !this.uniforms[channelKey].isNeeded) return;

        const loc = gl.getUniformLocation(program, channelKey);
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
  };

  registerCanvas = (r: HTMLCanvasElement) => {
    this.canvas = r;
  };

  gl: WebGLRenderingContext | WebGL2RenderingContext;
  isWebGL2: boolean = false;
  squareVerticesBuffer: WebGLBuffer;
  shaderProgram: WebGLProgram;
  vertexPositionAttribute: number;
  animFrameId: AnimationFrameID;
  canvas: HTMLCanvasElement;
  canvasPosition: ClientRect;
  instanceId: string;
  persistentEpochMs: ?number = null;
  timer: number = 0;
  frameDelta: number = 0;
  lastMouseArr: Array<number> = [0, 0];
  texturesArr: Array<Texture> = [];
  lastTime: number = 0;
  passPrograms: Array<?WebGLProgram> = [];
  framebufferPool: ?FramebufferPool = null;
  resizeObserver: ?ResizeObserver = null;

  render = () => {
    const { style } = this.props;
    return (
      <canvas
        style={{ height: "100%", width: "100%", ...style }}
        ref={this.registerCanvas}
        tabIndex={0}
      />
    );
  };
}

/** @deprecated Use GlslCanvas instead. */
export class ShadertoyReact extends GlslCanvas {
  constructor(props: Props) {
    super(props);
    warnShadertoyDeprecated();
  }
}
