void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  float band = step(
    0.5,
    fract(float(iFrame) / 30.0 + fragCoord.x / max(iResolution.x, 1.0) * 8.0)
  );
  vec3 col = mix(vec3(0.08), vec3(0.85, 0.9, 1.0), band);
  fragColor = vec4(col, 1.0);
}
