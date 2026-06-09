void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  if (iChannelResolution[0].x < 1.0) {
    fragColor = vec4(0.1, 0.1, 0.15, 1.0);
    return;
  }
  vec3 cam = texture(iChannel0, uv).rgb;
  vec2 c = uv - 0.5;
  float vignette = 1.0 - dot(c, c) * 1.5;
  fragColor = vec4(cam * vignette, 1.0);
}
