// @flow

import { SRLOG } from "./prefixLogs";
import KeyboardTexture, { resolveKeyboardUrl } from "./KeyboardTexture";
import { isWebGL2, rgbaInternalFormat } from "./glFormats";

export const NearestFilter = 9728;
export const LinearFilter = 9729;
export const NearestMipMapNearestFilter = 9984;
export const LinearMipMapNearestFilter = 9985;
export const NearestMipMapLinearFilter = 9986;
export const LinearMipMapLinearFilter = 9987;
export const ClampToEdgeWrapping = 33071;
export const MirroredRepeatWrapping = 33648;
export const RepeatWrapping = 10497;

const isPowerOf2 = (value: number) => (value & (value - 1)) === 0;
const floorPowerOfTwo = (value: number) =>
  2 ** Math.floor(Math.log(value) / Math.LN2);

const textureNeedsGenerateMipmaps = (
  texture: TextureType,
  isPow2: boolean
) =>
  isPow2 &&
  texture.minFilter !== NearestFilter &&
  texture.minFilter !== LinearFilter;

const textureNeedsPowerOfTwo = (texture: TextureType) => {
  if (
    texture.wrapS !== ClampToEdgeWrapping ||
    texture.wrapT !== ClampToEdgeWrapping
  )
    return true;
  if (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter)
    return true;
  return false;
};

export const resolveTextureUrl = (
  textureArgs: TextureType,
  devicePixelRatio: number = 1
): string => {
  const { url, srcSet } = textureArgs;
  if (!srcSet) return url || "";

  if (typeof srcSet === "string") {
    const entries = srcSet.split(",").map((part) => part.trim());
    let bestUrl = url || "";
    let bestDensity = 0;
    entries.forEach((entry) => {
      const match = entry.match(/^(\S+)(?:\s+(\d+(?:\.\d+)?)x)?$/);
      if (!match) return;
      const entryUrl = match[1];
      const density = match[2] ? parseFloat(match[2]) : 1;
      if (density <= devicePixelRatio && density >= bestDensity) {
        bestDensity = density;
        bestUrl = entryUrl;
      }
    });
    return bestUrl || url || "";
  }

  const densities = Object.keys(srcSet)
    .map(Number)
    .filter((d) => !Number.isNaN(d))
    .sort((a, b) => a - b);
  if (densities.length === 0) return url || "";
  let selected = densities[0];
  densities.forEach((d) => {
    if (d <= devicePixelRatio) selected = d;
  });
  return srcSet[selected] || url || "";
};

export const getTextureKind = (textureArgs: TextureType): string => {
  if (textureArgs.type) return textureArgs.type;
  if (resolveKeyboardUrl(textureArgs)) return "keyboard";
  if (textureArgs.urls && textureArgs.urls.length === 6) return "cube";
  if (textureArgs.data) return "data";
  const url = textureArgs.url || "";
  if (/(\.mp4|\.3gp|\.webm|\.ogv)$/i.test(url)) return "video";
  if (/(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i.test(url)) return "image";
  if (url === "camera") return "camera";
  return "image";
};

export default class Texture {
  constructor(gl) {
    this.gl = gl;
  }

  isLoaded: boolean = false;
  url: string;
  wrapS: number;
  wrapT: number;
  minFilter: number;
  magFilter: number;
  source: HTMLImageElement | HTMLVideoElement | MediaStream;
  flipY: number = -1;
  width: number = 0;
  height: number = 0;
  _webglTexture: WebGLTexture = null;
  isVideo: boolean = false;
  isCube: boolean = false;
  isCamera: boolean = false;
  isKeyboard: boolean = false;
  kind: string = "image";
  channelStartTime: number = 0;
  keyboard: ?KeyboardTexture = null;
  mediaStream: ?MediaStream = null;
  textureArgs: ?TextureType = null;
  channelId: number = 0;

  updateTexture = (
    texture: WebGLTexture,
    video: HTMLVideoElement,
    flipY: boolean
  ) => {
    const { gl } = this;
    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      srcFormat,
      srcType,
      video
    );
  };

  setupVideo = (url: string) => {
    const video = document.createElement("video");
    let playing = false;
    let timeupdate = false;

    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.crossOrigin = "anonymous";

    const checkReady = () => {
      if (playing && timeupdate) {
        this.isLoaded = true;
      }
    };

    video.addEventListener(
      "playing",
      () => {
        playing = true;
        this.width = video.videoWidth || 0;
        this.height = video.videoHeight || 0;
        checkReady();
      },
      true
    );

    video.addEventListener(
      "timeupdate",
      () => {
        timeupdate = true;
        checkReady();
      },
      true
    );

    video.src = url;
    return video;
  };

  setupCamera = (textureArgs: TextureType) => {
    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;

    const constraints = {
      video: {
        facingMode: textureArgs.facingMode || "user",
        width: textureArgs.width || 640,
        height: textureArgs.height || 480,
      },
      audio: false,
    };

    return navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        this.mediaStream = stream;
        video.srcObject = stream;
        return video.play().then(() => {
          this.width = video.videoWidth || textureArgs.width || 640;
          this.height = video.videoHeight || textureArgs.height || 480;
          this.isLoaded = true;
          this.source = video;
          return video;
        });
      })
      .catch((err) => {
        console.error(SRLOG(`Camera access failed: ${err.message}`));
        throw err;
      });
  };

  makePowerOfTwo = (
    image: HTMLImageElement | HTMLCanvasElement | ImageBitmap
  ) => {
    if (
      image instanceof HTMLImageElement ||
      image instanceof HTMLCanvasElement ||
      image instanceof ImageBitmap
    ) {
      if (this.pow2canvas === undefined)
        this.pow2canvas = document.createElement("canvas");

      this.pow2canvas.width = floorPowerOfTwo(image.width);
      this.pow2canvas.height = floorPowerOfTwo(image.height);

      const context = this.pow2canvas.getContext("2d");
      context.drawImage(
        image,
        0,
        0,
        this.pow2canvas.width,
        this.pow2canvas.height
      );

      console.warn(
        SRLOG(
          `Image is not power of two ${image.width} x ${image.height}. Resized to ${this.pow2canvas.width} x ${this.pow2canvas.height};`
        )
      );

      return this.pow2canvas;
    }
    return image;
  };

  loadDataTexture = (textureArgs: TextureType) => {
    const { gl } = this;
    const {
      width,
      height,
      data,
      format = "rgba8",
      flipY = -1,
      wrapS,
      wrapT,
      minFilter,
      magFilter,
    } = textureArgs;

    if (!width || !height || !data) {
      return Promise.reject(
        new Error(SRLOG("Data texture requires width, height, and data"))
      );
    }

    Object.assign(this, {
      wrapS,
      wrapT,
      minFilter,
      magFilter,
      flipY,
    });

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);

    if (format === "rgba32f") {
      if (!isWebGL2(gl) && !gl.getExtension("OES_texture_float")) {
        return Promise.reject(
          new Error(
            SRLOG(
              "rgba32f data textures require WebGL2 or OES_texture_float extension"
            )
          )
        );
      }
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        rgbaInternalFormat(gl, { float: true }),
        width,
        height,
        0,
        gl.RGBA,
        gl.FLOAT,
        data
      );
    } else {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        rgbaInternalFormat(gl),
        width,
        height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        data
      );
    }

    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_WRAP_S,
      this.wrapS || ClampToEdgeWrapping
    );
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_WRAP_T,
      this.wrapT || ClampToEdgeWrapping
    );
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      this.minFilter || LinearFilter
    );
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MAG_FILTER,
      this.magFilter || LinearFilter
    );

    this._webglTexture = texture;
    this.width = width;
    this.height = height;
    this.isLoaded = true;
    this.isVideo = false;
    this.isCube = false;
    return Promise.resolve(this);
  };

  loadCubeTexture = (textureArgs: TextureType) => {
    const { gl } = this;
    const { urls, minFilter, magFilter } = textureArgs;

    if (!urls || urls.length !== 6) {
      return Promise.reject(
        new Error(SRLOG("Cube texture requires exactly 6 urls"))
      );
    }

    Object.assign(this, { minFilter, magFilter });

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    const targets = [
      gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
    ];

    return Promise.all(
      urls.map(
        (faceUrl) =>
          new Promise((resolve, reject) => {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = () => resolve(image);
            image.onerror = () =>
              reject(new Error(SRLOG(`failed loading cube face: ${faceUrl}`)));
            image.src = faceUrl;
          })
      )
    ).then((images) => {
      images.forEach((image, i) => {
        gl.texImage2D(
          targets[i],
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          image
        );
      });

      gl.texParameteri(
        gl.TEXTURE_CUBE_MAP,
        gl.TEXTURE_MIN_FILTER,
        this.minFilter || LinearFilter
      );
      gl.texParameteri(
        gl.TEXTURE_CUBE_MAP,
        gl.TEXTURE_MAG_FILTER,
        this.magFilter || LinearFilter
      );
      gl.texParameteri(
        gl.TEXTURE_CUBE_MAP,
        gl.TEXTURE_WRAP_S,
        ClampToEdgeWrapping
      );
      gl.texParameteri(
        gl.TEXTURE_CUBE_MAP,
        gl.TEXTURE_WRAP_T,
        ClampToEdgeWrapping
      );

      this._webglTexture = texture;
      this.width = images[0].width;
      this.height = images[0].height;
      this.isLoaded = true;
      this.isCube = true;
      this.isVideo = false;
      return this;
    });
  };

  loadKeyboard = () => {
    this.keyboard = new KeyboardTexture(this.gl);
    this.isKeyboard = true;
    return this.keyboard.load().then((kb) => {
      this._webglTexture = kb._webglTexture;
      this.width = kb.width;
      this.height = kb.height;
      this.isLoaded = true;
      return this;
    });
  };

  reloadImage = (textureArgs: TextureType, devicePixelRatio: number) => {
    const resolvedUrl = resolveTextureUrl(textureArgs, devicePixelRatio);
    if (resolvedUrl === this.url && this.isLoaded) return Promise.resolve(this);
    this.url = resolvedUrl;
    return this.loadImage(resolvedUrl, textureArgs);
  };

  loadImage = (url: string, textureArgs: TextureType) => {
    const { gl } = this;
    const { wrapS, wrapT, minFilter, magFilter, flipY = -1 } = textureArgs;

    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = () =>
        reject(new Error(SRLOG(`failed loading url: ${url}`)));
      image.src = url;
    }).then((image) => {
      let isPowerOfTwoImage =
        isPowerOf2(image.width) && isPowerOf2(image.height);
      let processedImage = image;

      if (textureNeedsPowerOfTwo(textureArgs) && !isPowerOfTwoImage) {
        processedImage = this.makePowerOfTwo(image);
        isPowerOfTwoImage = true;
      }

      let texture = this._webglTexture;
      if (!texture) {
        texture = gl.createTexture();
        this._webglTexture = texture;
      }

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        processedImage
      );

      if (textureNeedsGenerateMipmaps(textureArgs, isPowerOfTwoImage)) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }

      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        wrapS || RepeatWrapping
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        wrapT || RepeatWrapping
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        minFilter || LinearMipMapLinearFilter
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        magFilter || LinearFilter
      );

      this.source = processedImage;
      this.isVideo = false;
      this.isCube = false;
      this.isCamera = false;
      this.isLoaded = true;
      this.width = processedImage.width || 0;
      this.height = processedImage.height || 0;
      return this;
    });
  };

  load = (textureArgs: TextureType, channelId: number, devicePixelRatio: number = 1) => {
    const { gl } = this;
    this.textureArgs = textureArgs;
    this.channelId = channelId;
    this.channelStartTime = performance.now() / 1000;

    const {
      wrapS,
      wrapT,
      minFilter,
      magFilter,
      flipY = -1,
    } = textureArgs;

    const kind = getTextureKind(textureArgs);
    this.kind = kind;

    Object.assign(this, { wrapS, wrapT, minFilter, magFilter, flipY });

    if (kind === "keyboard") return this.loadKeyboard();
    if (kind === "data") return this.loadDataTexture(textureArgs);
    if (kind === "cube") return this.loadCubeTexture(textureArgs);
    if (kind === "camera") {
      this.isCamera = true;
      this.isVideo = true;
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      this._webglTexture = texture;
      return this.setupCamera(textureArgs).then((video) => {
        this.source = video;
        return this;
      });
    }

    const resolvedUrl = resolveTextureUrl(textureArgs, devicePixelRatio);
    if (!resolvedUrl) {
      return Promise.reject(
        new Error(SRLOG("Missing url, please pass { url: ... }"))
      );
    }

    this.url = resolvedUrl;

    if (kind === "video") {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      this._webglTexture = texture;
      this.isVideo = true;
      const video = this.setupVideo(resolvedUrl);
      this.source = video;
      return video.play().then(() => this);
    }

    return this.loadImage(resolvedUrl, textureArgs);
  };

  getChannelTime = (): number => {
    if (this.isVideo && this.source instanceof HTMLVideoElement) {
      return this.source.currentTime || 0;
    }
    return performance.now() / 1000 - this.channelStartTime;
  };

  dispose = () => {
    const { gl } = this;
    if (this.keyboard) {
      this.keyboard.dispose();
      this.keyboard = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    if (gl && this._webglTexture) {
      gl.deleteTexture(this._webglTexture);
      this._webglTexture = null;
    }
    this.isLoaded = false;
  };
}
