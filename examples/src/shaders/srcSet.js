export default `void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  vec3 tex = texture(iChannel0, uv).rgb;
  float grid = step(0.98, fract(uv.x * float(DPR) * 20.0))
             * step(0.98, fract(uv.y * float(DPR) * 20.0));
  vec3 col = mix(tex, vec3(1.0, 0.9, 0.2), grid * 0.5);
  fragColor = vec4(col, 1.0);
}`;
