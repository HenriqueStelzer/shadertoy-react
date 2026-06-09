void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  float t = iPersistentTime;
  vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.0, 4.0) + t + uv.xyx);
  col *= 1.0 + 0.35 * exp(-iTime * 3.0);
  fragColor = vec4(col, 1.0);
}
