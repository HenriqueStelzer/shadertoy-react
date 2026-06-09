import { useState } from "react";
import GlslCanvas from "glsl-helpers-react";
import mouse from "./mouse.frag?raw";
import texture from "./texture.frag?raw";
import bufferPass from "./bufferPass.frag?raw";
import finalPass from "./finalPass.frag?raw";

const DEMOS = [
  { id: "mouse", label: "Mouse", fs: mouse },
  {
    id: "texture",
    label: "Texture",
    fs: texture,
    textures: [{ url: "https://i.imgur.com/uIEexIc.jpg" }],
  },
  {
    id: "multipass",
    label: "Multi-pass",
    passes: [
      { fs: bufferPass, target: "bufferA" },
      { fs: finalPass, inputs: ["bufferA"] },
    ],
  },
] as const;

export default function App() {
  const [active, setActive] = useState<(typeof DEMOS)[number]["id"]>("mouse");
  const demo = DEMOS.find((d) => d.id === active)!;

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <nav
        style={{
          display: "flex",
          gap: 8,
          padding: "8px 12px",
          background: "#111",
          fontFamily: "sans-serif",
          fontSize: 13,
        }}
      >
        {DEMOS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActive(d.id)}
            style={{
              padding: "4px 10px",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              background: d.id === active ? "#444" : "#222",
              color: "#fff",
            }}
          >
            {d.label}
          </button>
        ))}
      </nav>
      <div style={{ flex: 1, minHeight: 0 }}>
        {"passes" in demo ? (
          <GlslCanvas passes={demo.passes} />
        ) : (
          <GlslCanvas
            fs={demo.fs}
            textures={"textures" in demo ? demo.textures : undefined}
          />
        )}
      </div>
    </div>
  );
}
