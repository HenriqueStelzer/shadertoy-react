// @flow

export default class FramebufferPool {
  constructor(gl: WebGLRenderingContext | WebGL2RenderingContext) {
    this.gl = gl;
    this.buffers = {};
  }

  getOrCreate = (name: string, width: number, height: number) => {
    const existing = this.buffers[name];
    if (
      existing &&
      existing.width === width &&
      existing.height === height
    ) {
      return existing;
    }

    if (existing) {
      this.disposeBuffer(existing);
    }

    const { gl } = this;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      width,
      height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );

    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    const entry = { name, width, height, texture, framebuffer };
    this.buffers[name] = entry;
    return entry;
  };

  disposeBuffer = (entry: Object) => {
    const { gl } = this;
    if (entry.framebuffer) gl.deleteFramebuffer(entry.framebuffer);
    if (entry.texture) gl.deleteTexture(entry.texture);
  };

  dispose = () => {
    Object.keys(this.buffers).forEach((name) => {
      this.disposeBuffer(this.buffers[name]);
    });
    this.buffers = {};
  };
}
