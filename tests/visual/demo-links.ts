/** Keep in sync with examples/src/tiles/layout.ts DEMO_LINKS */
export const DEMO_LINKS = [
  { id: "demo-image-fade", label: "image + fade in" },
  { id: "demo-mouse", label: "mouse" },
  { id: "demo-clock", label: "clock + defines" },
  { id: "demo-orientation", label: "device orientation" },
  { id: "demo-uniforms", label: "custom uniforms" },
  { id: "demo-classic", label: "classic GLSL" },
  { id: "demo-keyboard", label: "keyboard" },
  { id: "demo-multipass", label: "multi-pass" },
  { id: "demo-persistent-time", label: "persistent time" },
  { id: "demo-camera", label: "camera" },
  { id: "demo-data-texture", label: "data texture" },
  { id: "demo-cube", label: "cube map" },
  { id: "demo-srcset", label: "srcSet + DPR" },
  { id: "demo-deprecated", label: "ShadertoyReact" },
  { id: "demo-basic", label: "basic" },
] as const;

export type DemoId = (typeof DEMO_LINKS)[number]["id"];

const ANIMATED_TILES = new Set<DemoId>([
  "demo-clock",
  "demo-uniforms",
  "demo-mouse",
  "demo-multipass",
  "demo-persistent-time",
  "demo-orientation",
  "demo-basic",
  "demo-deprecated",
  "demo-image-fade",
  "demo-srcset",
]);

const HIGH_VARIANCE_TILES = new Set<DemoId>(["demo-basic", "demo-persistent-time"]);

export function screenshotTolerance(id: DemoId): number {
  // Time-driven shaders vary frame-to-frame; tolerate animation + GPU variance.
  if (HIGH_VARIANCE_TILES.has(id)) return 0.85;
  return ANIMATED_TILES.has(id) ? 0.75 : 0.4;
}
