export default `void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  vec4 data = texture(iChannel0, uv + 0.02 * sin(iTime + uv.yx * 6.0));
  vec3 col = data.rgb;
  col += 0.2 * vec3(sin(iTime), sin(iTime * 1.3), sin(iTime * 1.7));
  fragColor = vec4(col, 1.0);
}`;
