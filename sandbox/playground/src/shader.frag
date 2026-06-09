// glsl-helpers-react playground shader
// ------------------------------------
// SYNTAX (vs classic GLSL)
//   Shadertoy:  void mainImage(out vec4 fragColor, in vec2 fragCoord) { ... }
//   Classic:    void main() { vec2 uv = gl_FragCoord.xy / iResolution.xy; ... }
//   This file uses Shadertoy syntax — the component wraps it for WebGL1/2.
//
// UNIFORMS (vs Shadertoy.com)
//   Referenced names are injected automatically — no declarations needed.
//   Unused uniforms do NOT add listeners or GPU uploads (string match at compile).
//
//   Shadertoy builtins (when used in source):
//     iTime, iTimeDelta, iFrame, iResolution, iDate, iMouse
//     iChannel0…n, iChannelResolution, iChannelTime (video/camera sync)
//
//   glsl-helpers-react extensions:
//     iDeviceOrientation  — phone gyro (alpha, beta, gamma, window.orientation)
//     iPersistentTime     — wall clock; survives refresh (needs persistentTime prop on <GlslCanvas>)
//     #define DPR         — from devicePixelRatio prop (default 1)
//
//   iMouse / iResolution use backing-store pixels (CSS size × DPR), like fragCoord.
//   iTime resets on remount; iPersistentTime continues across page reloads.
//
//   Textures, keyboard, camera, multi-pass buffers come from React props — not Shadertoy tabs.
//   See: https://github.com/HenriqueStelzer/glsl-helpers-react#props

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;

  // Left: session clock (iTime). Right: persistent clock (iPersistentTime) — refresh page to compare.
  float t = uv.x < 0.5 ? iTime : iPersistentTime;
  vec3 col = 0.5 + 0.5 * cos(t + uv.xyx * 3.0 + vec3(0.0, 2.0, 4.0));

  // Subtle scanlines from frame index
  col *= 0.92 + 0.08 * sin(float(iFrame) * 0.1 + uv.y * 120.0);

  // Label bands (rough UV regions)
  float band = smoothstep(0.48, 0.5, abs(uv.x - 0.5));
  col = mix(col, vec3(0.08), band);

  fragColor = vec4(col, 1.0);
}
