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

    return (
      <Page>
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
        <Container>
          <ImageFadeTile
            textureUrl={textureUrl}
            fadeIn={fadeIn}
            onLoaded={() => this.setState({ fadeIn: true })}
          />
          <MouseTile />
          <ClockTile />
          <DeviceOrientationTile />
          <CustomUniformsTile val={val} />
          <ClassicSyntaxTile />
          <KeyboardTile />
          <MultiPassTile />
          <PersistentTimeTile />
          <CameraTile />
          <DataTextureTile />
          <CubeTile />
          <SrcSetTile />
          <DeprecatedTile />
          <BasicTile />
          <GlobalStyle />
        </Container>
      </Page>
    );
  }
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
