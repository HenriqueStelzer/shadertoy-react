void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
  float t = iTime * 0.3;
  vec3 dir = normalize(vec3(uv, 1.0));
  float cosT = cos(t);
  float sinT = sin(t);
  dir = mat3(cosT, 0.0, sinT, 0.0, 1.0, 0.0, -sinT, 0.0, cosT) * dir;
  vec3 col = texture(iChannel0, dir).rgb;
  fragColor = vec4(col, 1.0);
}
