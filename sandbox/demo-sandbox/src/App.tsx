import { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
import GlslCanvas from "glsl-helpers-react";
import fsImages from "./shaders/fsImages.frag?raw";
import mouse from "./shaders/mouse.frag?raw";
import clock from "./shaders/clock.frag?raw";
import deviceorientation from "./shaders/deviceorientation.frag?raw";
import classicSyntax from "./shaders/classicSyntax.frag?raw";
import customUniforms from "./shaders/customUniforms.frag?raw";

const GlobalStyle = createGlobalStyle`
  body, html {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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

const TestCallbackFading = styled(Parent)<{ $fadeIn: boolean }>`
  opacity: ${(p) => (p.$fadeIn ? 1 : 0)};
  transition: opacity 500ms;
`;

let counter = 0;

type State = { fadeIn: boolean; val: number };

export default class App extends Component<object, State> {
  private _tickId: ReturnType<typeof setInterval> | undefined;

  constructor(props: object) {
    super(props);
    this.state = { fadeIn: false, val: 0 };
    this._tickId = setInterval(() => {
      this.setState({ val: (counter += 0.1) });
    }, 100);
  }

  componentWillUnmount() {
    if (this._tickId) clearInterval(this._tickId);
  }

  render() {
    const { fadeIn, val } = this.state;

    return (
      <>
        <Container>
          <TestCallbackFading $fadeIn={fadeIn}>
            <TileLabel>image + fade in</TileLabel>
            <GlslCanvas
              fs={fsImages}
              precision="highp"
              textures={[{ url: "https://i.imgur.com/uIEexIc.jpg" }]}
              onDoneLoadingTextures={() => this.setState({ fadeIn: true })}
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
            <TileLabel>classic GLSL syntax</TileLabel>
            <GlslCanvas fs={classicSyntax} webgl="auto" />
          </Parent>
          <Parent>
            <TileLabel>custom uniforms</TileLabel>
            <GlslCanvas
              fs={customUniforms}
              uniforms={{ uTest: { type: "1f", value: val } }}
            />
          </Parent>
        </Container>
        <GlobalStyle />
      </>
    );
  }
}
