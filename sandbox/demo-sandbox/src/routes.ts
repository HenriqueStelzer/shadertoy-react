export type DemoRoute = {
  path: string;
  label: string;
};

export type DemoSection = {
  title: string;
  routes: DemoRoute[];
};

/** Matches upstream shadertoy-react CodeSandbox (434qm4x4w0) nav structure. */
export const DEMO_SECTIONS: DemoSection[] = [
  {
    title: "Component Props",
    routes: [
      { path: "/", label: "Basic" },
      { path: "/Textures", label: "Textures" },
      { path: "/CustomUniforms", label: "Custom Uniforms" },
    ],
  },
  {
    title: "Built-ins Uniforms",
    routes: [
      { path: "/Resolution", label: "iResolution" },
      { path: "/Mouse", label: "iMouse" },
      { path: "/Date", label: "iDate" },
      { path: "/Frame", label: "iFrame" },
      { path: "/ChannelResolution", label: "iChannelResolution" },
      { path: "/DeviceOrientation", label: "iDeviceOrientation (Mobile )" },
    ],
  },
];
