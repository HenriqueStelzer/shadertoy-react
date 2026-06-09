// @flow
import { SRLOG } from "./prefixLogs";
import { rgbaInternalFormat } from "./glFormats";

const KEYBOARD_WIDTH = 256;
const KEYBOARD_HEIGHT = 3;

export default class KeyboardTexture {
  constructor(gl) {
    this.gl = gl;
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
  }

  load = () => {
    const { gl } = this;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    this.uploadData(texture);
    this._webglTexture = texture;
    this.isLoaded = true;
    this.attachListeners();
    return Promise.resolve(this);
  };

  uploadData = (texture?: WebGLTexture) => {
    const { gl } = this;
    const target = texture || this._webglTexture;
    if (!target) return;

    for (let i = 0; i < KEYBOARD_WIDTH; i++) {
      const base = i * 4;
      this.data[base] = this.keyState[i];
      this.data[base + KEYBOARD_WIDTH * 4] = this.keyPress[i];
      this.data[base + KEYBOARD_WIDTH * 8] = this.keyToggle[i];
    }

    gl.bindTexture(gl.TEXTURE_2D, target);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      rgbaInternalFormat(gl),
      KEYBOARD_WIDTH,
      KEYBOARD_HEIGHT,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      this.data
    );
  };

  attachListeners = () => {
    if (this._boundHandlers) return;

    this._boundHandlers = {
      keydown: this.onKeyDown,
      keyup: this.onKeyUp,
    };

    window.addEventListener("keydown", this._boundHandlers.keydown);
    window.addEventListener("keyup", this._boundHandlers.keyup);
  };

  removeListeners = () => {
    if (!this._boundHandlers) return;
    window.removeEventListener("keydown", this._boundHandlers.keydown);
    window.removeEventListener("keyup", this._boundHandlers.keyup);
    this._boundHandlers = null;
  };

  onKeyDown = (e: KeyboardEvent) => {
    const code = e.keyCode;
    if (code < 0 || code >= KEYBOARD_WIDTH) return;
    if (!this.keyState[code]) {
      this.keyPress[code] = 255;
    }
    this.keyState[code] = 255;
    this.keyToggle[code] = this.keyToggle[code] ? 0 : 255;
    this.uploadData();
  };

  onKeyUp = (e: KeyboardEvent) => {
    const code = e.keyCode;
    if (code < 0 || code >= KEYBOARD_WIDTH) return;
    this.keyState[code] = 0;
    this.keyPress[code] = 0;
    this.uploadData();
  };

  updateTexture = () => {
    for (let i = 0; i < KEYBOARD_WIDTH; i++) {
      this.keyPress[i] = 0;
    }
    this.uploadData();
  };

  dispose = () => {
    this.removeListeners();
    const { gl } = this;
    if (gl && this._webglTexture) {
      gl.deleteTexture(this._webglTexture);
      this._webglTexture = null;
    }
    this.isLoaded = false;
  };
}

export const resolveKeyboardUrl = (textureArgs: Object) =>
  textureArgs.type === "keyboard" || textureArgs.url === "keyboard";
