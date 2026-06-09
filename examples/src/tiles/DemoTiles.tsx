import React from "react";
import GlslCanvas, { ShadertoyReact } from "../../../src/index.jsx";
import fs from "../shaders/fs.frag";
import fsImages from "../shaders/fsImages.frag";
import mouse from "../shaders/mouse.frag";
import clock from "../shaders/clock.frag";
import deviceorientation from "../shaders/deviceorientation.frag";
import classicSyntax from "../shaders/classicSyntax.frag";
import customUniforms from "../shaders/customUniforms.frag";
import keyboard from "../shaders/keyboard.frag";
import persistentTime from "../shaders/persistentTime.frag";
import camera from "../shaders/camera.frag";
import dataTexture from "../shaders/dataTexture.frag";
import cubeFrag from "../shaders/cube.frag";
import { cubeUrls } from "../shaders/cube";
import srcSetShader from "../shaders/srcSet.frag";
import bufferPass from "../shaders/bufferPass.frag";
import finalPass from "../shaders/finalPass.frag";
import { Parent, TestCallbackFading, TileLabel } from "./layout";
import { DATA_TEX } from "./dataTexture";

type ImageFadeTileProps = {
  textureUrl: string;
  fadeIn: boolean;
  onLoaded: () => void;
};

export function ImageFadeTile({
  textureUrl,
  fadeIn,
  onLoaded,
}: ImageFadeTileProps) {
  return (
    <TestCallbackFading id="demo-image-fade" $fadeIn={fadeIn}>
      <TileLabel>image + fade in</TileLabel>
      <GlslCanvas
        fs={fsImages}
        precision="highp"
        textures={[{ url: textureUrl }]}
        onDoneLoadingTextures={onLoaded}
      />
    </TestCallbackFading>
  );
}

export function MouseTile() {
  return (
    <Parent id="demo-mouse">
      <TileLabel>mouse</TileLabel>
      <GlslCanvas fs={mouse} />
    </Parent>
  );
}

export function ClockTile() {
  return (
    <Parent id="demo-clock">
      <TileLabel>clock + defines</TileLabel>
      <GlslCanvas fs={clock} defines={{ PI: "3.14159" }} />
    </Parent>
  );
}

export function DeviceOrientationTile() {
  return (
    <Parent id="demo-orientation">
      <TileLabel>device orientation</TileLabel>
      <GlslCanvas fs={deviceorientation} />
    </Parent>
  );
}

export function CustomUniformsTile({ val }: { val: number }) {
  return (
    <Parent id="demo-uniforms">
      <TileLabel>custom uniforms</TileLabel>
      <GlslCanvas
        fs={customUniforms}
        uniforms={{ uTest: { type: "1f", value: val } }}
      />
    </Parent>
  );
}

export function ClassicSyntaxTile() {
  return (
    <Parent id="demo-classic">
      <TileLabel>classic GLSL syntax</TileLabel>
      <GlslCanvas fs={classicSyntax} webgl="auto" />
    </Parent>
  );
}

export function KeyboardTile() {
  return (
    <Parent id="demo-keyboard">
      <TileLabel>keyboard — focus page, arrow keys</TileLabel>
      <GlslCanvas fs={keyboard} webgl="2" textures={[{ type: "keyboard" }]} />
    </Parent>
  );
}

export function MultiPassTile() {
  return (
    <Parent id="demo-multipass">
      <TileLabel>multi-pass</TileLabel>
      <GlslCanvas
        passes={[
          { fs: bufferPass, target: "bufferA" },
          { fs: finalPass, inputs: ["bufferA"] },
        ]}
      />
    </Parent>
  );
}

export function PersistentTimeTile() {
  return (
    <Parent id="demo-persistent-time">
      <TileLabel>persistent time — refresh to test</TileLabel>
      <GlslCanvas fs={persistentTime} persistentTime />
    </Parent>
  );
}

export function CameraTile() {
  return (
    <Parent id="demo-camera">
      <TileLabel>camera — allow permission</TileLabel>
      <GlslCanvas
        fs={camera}
        webgl="2"
        textures={[{ type: "camera", facingMode: "user" }]}
      />
    </Parent>
  );
}

export function DataTextureTile() {
  return (
    <Parent id="demo-data-texture">
      <TileLabel>data texture</TileLabel>
      <GlslCanvas
        fs={dataTexture}
        textures={[
          {
            type: "data",
            width: DATA_TEX.width,
            height: DATA_TEX.height,
            data: DATA_TEX.data,
          },
        ]}
      />
    </Parent>
  );
}

export function CubeTile() {
  return (
    <Parent id="demo-cube">
      <TileLabel>cube map</TileLabel>
      <GlslCanvas
        fs={cubeFrag}
        webgl="2"
        textures={[{ type: "cube", urls: cubeUrls }]}
      />
    </Parent>
  );
}

export function SrcSetTile() {
  return (
    <Parent id="demo-srcset">
      <TileLabel>srcSet + DPR grid</TileLabel>
      <GlslCanvas
        fs={srcSetShader}
        devicePixelRatio={window.devicePixelRatio || 1}
        textures={[
          {
            url: "https://i.imgur.com/uIEexIc.jpg",
            srcSet: {
              1: "https://i.imgur.com/uIEexIc.jpg",
              2: "https://i.imgur.com/DrEP4Y8.jpg",
            },
          },
        ]}
      />
    </Parent>
  );
}

export function DeprecatedTile() {
  return (
    <Parent id="demo-deprecated">
      <TileLabel>ShadertoyReact (deprecated)</TileLabel>
      <ShadertoyReact fs={fs} />
    </Parent>
  );
}

export function BasicTile() {
  return (
    <Parent id="demo-basic">
      <TileLabel>basic</TileLabel>
      <GlslCanvas fs={fs} />
    </Parent>
  );
}
