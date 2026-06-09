void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  vec4 buf = texture(iChannel0, uv);
  fragColor = vec4(buf.rgb * (0.5 + 0.5 * cos(iTime + uv.x * 6.0)), 1.0);
}
