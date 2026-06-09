import GlslCanvas from "glsl-helpers-react";
import shader from "./shader.frag?raw";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GlslCanvas fs={shader} />
    </div>
  );
}
