import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import styled, { createGlobalStyle } from "styled-components";
import GlslCanvas, { ShadertoyReact } from "../../src/index.jsx";
import fs from "./shaders/fs";
import fsImages from "./shaders/fsImages";
import mouse from "./shaders/mouse";
import clock from "./shaders/clock";
import deviceorientation from "./shaders/deviceorientation.js";
import classicSyntax from "./shaders/classicSyntax.js";
import customUniforms from "./shaders/customUniforms.js";
import keyboard from "./shaders/keyboard.js";
import persistentTime from "./shaders/persistentTime.js";
import camera from "./shaders/camera.js";
import dataTexture from "./shaders/dataTexture.js";
import cube, { cubeUrls } from "./shaders/cube.js";
import srcSetShader from "./shaders/srcSet.js";
import { bufferPass, finalPass } from "./shaders/multiPass.js";

const GlobalStyle = createGlobalStyle`
  body, html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Parent = styled.div`
  flex-grow: 1;
  height: calc(100vh / 3);
  width: calc(100vw / 3);
  position: relative;
`;

const TileLabel = styled.div`
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 1;
  font: 11px/1.3 sans-serif;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  pointer-events: none;
`;

const TestCallbackFading = styled(Parent)`
  opacity: 0;
  transition: opacity 500ms;
  opacity: ${(props) => (props.fadeIn ? 1 : 0)};
`;

const makeDataTexture = () => {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      data[i] = (x / size) * 255;
      data[i + 1] = (y / size) * 255;
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }
  return { width: size, height: size, data };
};

const DATA_TEX = makeDataTexture();
let counter = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeIn: false,
      val: 0,
      textureUrl: "https://i.imgur.com/uIEexIc.jpg",
    };
    this._tickId = setInterval(() => {
      this.setState({ val: (counter += 0.1) });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this._tickId);
  }

  render() {
    return (
      <Container>
        <TestCallbackFading fadeIn={this.state.fadeIn}>
          <TileLabel>image + fade in</TileLabel>
          <GlslCanvas
            fs={fsImages}
            precision="highp"
            textures={[{ url: this.state.textureUrl }]}
            onDoneLoadingTextures={() => {
              this.setState({ fadeIn: true });
            }}
          />
        </TestCallbackFading>
        <Parent>
          <TileLabel>mouse</TileLabel>
          <GlslCanvas fs={mouse} />
        </Parent>
        <Parent>
          <TileLabel>clock + defines</TileLabel>
          <GlslCanvas fs={clock} defines={{ PI: "3.14159" }} />
        </Parent>
        <Parent>
          <TileLabel>device orientation</TileLabel>
          <GlslCanvas fs={deviceorientation} />
        </Parent>
        <Parent>
          <TileLabel>custom uniforms</TileLabel>
          <GlslCanvas
            fs={customUniforms}
            uniforms={{
              uTest: { type: "1f", value: this.state.val },
            }}
          />
        </Parent>
        <Parent>
          <TileLabel>classic GLSL syntax</TileLabel>
          <GlslCanvas fs={classicSyntax} webgl="auto" />
        </Parent>
        <Parent>
          <TileLabel>keyboard — focus page, arrow keys</TileLabel>
          <GlslCanvas
            fs={keyboard}
            webgl="2"
            textures={[{ type: "keyboard" }]}
          />
        </Parent>
        <Parent>
          <TileLabel>multi-pass</TileLabel>
          <GlslCanvas
            passes={[
              { fs: bufferPass, target: "bufferA" },
              { fs: finalPass, inputs: ["bufferA"] },
            ]}
          />
        </Parent>
        <Parent>
          <TileLabel>persistent time — refresh to test</TileLabel>
          <GlslCanvas fs={persistentTime} persistentTime />
        </Parent>
        <Parent>
          <TileLabel>camera — allow permission</TileLabel>
          <GlslCanvas
            fs={camera}
            webgl="2"
            textures={[{ type: "camera", facingMode: "user" }]}
          />
        </Parent>
        <Parent>
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
        <Parent>
          <TileLabel>cube map</TileLabel>
          <GlslCanvas
            fs={cube}
            webgl="2"
            textures={[{ type: "cube", urls: cubeUrls }]}
          />
        </Parent>
        <Parent>
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
        <Parent>
          <TileLabel>ShadertoyReact (deprecated)</TileLabel>
          <ShadertoyReact fs={fs} />
        </Parent>
        <Parent>
          <TileLabel>basic</TileLabel>
          <GlslCanvas fs={fs} />
        </Parent>
        <GlobalStyle />
      </Container>
    );
  }
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
