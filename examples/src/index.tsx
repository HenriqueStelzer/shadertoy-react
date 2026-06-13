import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import {
  Container,
  DEMO_LINKS,
  GlobalStyle,
  JumpNav,
  Page,
  ScrollCue,
  ScrollFade,
  getSoloTileId,
  isTileVisible,
} from "./tiles/layout";
import {
  BasicTile,
  CameraTile,
  ClassicSyntaxTile,
  ClockTile,
  CubeTile,
  CustomUniformsTile,
  DataTextureTile,
  DeprecatedTile,
  DeviceOrientationTile,
  ImageFadeTile,
  KeyboardTile,
  MouseTile,
  MultiPassTile,
  PersistentTimeTile,
  SrcSetTile,
} from "./tiles/DemoTiles";

let counter = 0;

type AppState = {
  fadeIn: boolean;
  val: number;
  textureUrl: string;
  showScrollCue: boolean;
};

class App extends Component<object, AppState> {
  private _tickId: ReturnType<typeof setInterval> | undefined;

  constructor(props: object) {
    super(props);
    this.state = {
      fadeIn: false,
      val: 0,
      textureUrl: "https://i.imgur.com/uIEexIc.jpg",
      showScrollCue: false,
    };
    this._tickId = setInterval(() => {
      this.setState({ val: (counter += 0.1) });
    }, 100);
  }

  componentDidMount() {
    this.updateScrollHint();
    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.updateScrollHint);
  }

  componentWillUnmount() {
    if (this._tickId) clearInterval(this._tickId);
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.updateScrollHint);
  }

  updateScrollHint = () => {
    const scrollable =
      document.documentElement.scrollHeight > window.innerHeight + 32;
    this.setState({
      showScrollCue: scrollable && window.scrollY <= 24,
    });
  };

  onScroll = () => {
    this.updateScrollHint();
  };

  render() {
    const { showScrollCue, fadeIn, textureUrl, val } = this.state;
    const solo = getSoloTileId();

    return (
      <Page>
        {!solo && (
          <>
            <JumpNav aria-label="Demo index">
              <strong>Demos</strong>
              {DEMO_LINKS.map(({ id, label }) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </JumpNav>
            <ScrollFade $visible={showScrollCue} aria-hidden="true" />
            <ScrollCue $visible={showScrollCue}>Scroll for more demos ↓</ScrollCue>
          </>
        )}
        <Container>
          {isTileVisible("demo-image-fade") && (
            <ImageFadeTile
              textureUrl={textureUrl}
              fadeIn={fadeIn}
              onLoaded={() => this.setState({ fadeIn: true })}
            />
          )}
          {isTileVisible("demo-mouse") && <MouseTile />}
          {isTileVisible("demo-clock") && <ClockTile />}
          {isTileVisible("demo-orientation") && <DeviceOrientationTile />}
          {isTileVisible("demo-uniforms") && <CustomUniformsTile val={val} />}
          {isTileVisible("demo-classic") && <ClassicSyntaxTile />}
          {isTileVisible("demo-keyboard") && <KeyboardTile />}
          {isTileVisible("demo-multipass") && <MultiPassTile />}
          {isTileVisible("demo-persistent-time") && <PersistentTimeTile />}
          {isTileVisible("demo-camera") && <CameraTile />}
          {isTileVisible("demo-data-texture") && <DataTextureTile />}
          {isTileVisible("demo-cube") && <CubeTile />}
          {isTileVisible("demo-srcset") && <SrcSetTile />}
          {isTileVisible("demo-deprecated") && <DeprecatedTile />}
          {isTileVisible("demo-basic") && <BasicTile />}
          <GlobalStyle />
        </Container>
      </Page>
    );
  }
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
