import { Component } from "react";
import GlslCanvas from "glsl-helpers-react";
import basic from "./shaders/basic.frag?raw";
import fsImages from "./shaders/fsImages.frag?raw";
import customUniforms from "./shaders/customUniforms.frag?raw";
import resolution from "./shaders/resolution.frag?raw";
import mouse from "./shaders/mouse.frag?raw";
import date from "./shaders/date.frag?raw";
import frame from "./shaders/frame.frag?raw";
import channelResolution from "./shaders/channelResolution.frag?raw";
import deviceorientation from "./shaders/deviceorientation.frag?raw";

const TEXTURE_URL = "https://i.imgur.com/uIEexIc.jpg";

let counter = 0;

type CustomUniformsState = { val: number };

export class CustomUniformsPage extends Component<object, CustomUniformsState> {
  private _tickId: ReturnType<typeof setInterval> | undefined;

  constructor(props: object) {
    super(props);
    this.state = { val: 0 };
    this._tickId = setInterval(() => {
      this.setState({ val: (counter += 0.1) });
    }, 100);
  }

  componentWillUnmount() {
    if (this._tickId) clearInterval(this._tickId);
  }

  render() {
    return (
      <GlslCanvas
        fs={customUniforms}
        uniforms={{ uTest: { type: "1f", value: this.state.val } }}
      />
    );
  }
}

export function BasicPage() {
  return <GlslCanvas fs={basic} />;
}

export function TexturesPage() {
  return (
    <GlslCanvas
      fs={fsImages}
      precision="highp"
      textures={[{ url: TEXTURE_URL }]}
    />
  );
}

export function ResolutionPage() {
  return <GlslCanvas fs={resolution} />;
}

export function MousePage() {
  return <GlslCanvas fs={mouse} />;
}

export function DatePage() {
  return <GlslCanvas fs={date} />;
}

export function FramePage() {
  return <GlslCanvas fs={frame} />;
}

export function ChannelResolutionPage() {
  return (
    <GlslCanvas
      fs={channelResolution}
      textures={[{ url: TEXTURE_URL }]}
    />
  );
}

export function DeviceOrientationPage() {
  return <GlslCanvas fs={deviceorientation} />;
}
