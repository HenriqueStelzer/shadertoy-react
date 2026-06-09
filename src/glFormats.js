// @flow

export const isWebGL2 = (gl: WebGLRenderingContext | WebGL2RenderingContext) =>
  !!gl.createVertexArray;

export const rgbaInternalFormat = (
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  { float = false }: { float?: boolean } = {}
) => (isWebGL2(gl) ? (float ? gl.RGBA32F : gl.RGBA8) : gl.RGBA);
