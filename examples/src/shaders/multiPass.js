export const bufferPass = `void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  fragColor = vec4(uv, 0.5 + 0.5 * sin(iTime), 1.0);
}`;

export const finalPass = `void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  vec4 buf = texture(iChannel0, uv);
  fragColor = vec4(buf.rgb * (0.5 + 0.5 * cos(iTime + uv.x * 6.0)), 1.0);
}`;
