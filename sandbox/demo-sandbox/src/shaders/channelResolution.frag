void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iChannelResolution[0].xy;
  vec3 tex = texture(iChannel0, uv).rgb;
  float grid = step(0.98, fract(uv.x * 12.0)) * step(0.98, fract(uv.y * 12.0));
  vec3 col = mix(tex, vec3(1.0, 0.85, 0.2), grid * 0.45);
  fragColor = vec4(col, 1.0);
}
