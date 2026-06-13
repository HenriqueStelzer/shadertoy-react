void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  vec3 col = vec3(
    iDate.x / 2050.0,
    iDate.y / 12.0,
    iDate.z / 31.0
  );
  col += 0.15 * sin(iDate.w * 2.0 + uv.x * 6.283);
  fragColor = vec4(col, 1.0);
}
