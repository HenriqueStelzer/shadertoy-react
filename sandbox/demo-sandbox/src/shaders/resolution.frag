void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  vec3 col = vec3(uv, 0.25 + 0.75 * (iResolution.x / max(iResolution.y, 1.0)) / 3.0);
  fragColor = vec4(col, 1.0);
}
