import styled, { createGlobalStyle } from "styled-components";

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

export const GlobalStyle = createGlobalStyle`
  body, html {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    scroll-behavior: smooth;
  }
`;

export const Page = styled.div`
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const Parent = styled.div`
  flex-grow: 1;
  height: calc(100vh / 3);
  width: calc(100vw / 3);
  position: relative;
  scroll-margin-top: 8px;
`;

export const TileLabel = styled.div`
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 1;
  font: 11px/1.3 sans-serif;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  pointer-events: none;
`;

export const TestCallbackFading = styled(Parent)<{ $fadeIn: boolean }>`
  opacity: ${(props) => (props.$fadeIn ? 1 : 0)};
  transition: opacity 500ms;
`;

export const ScrollFade = styled.div<{ $visible: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 120px;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.45) 40%,
    rgba(0, 0, 0, 0.85)
  );
  z-index: 10;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 300ms ease;
`;

export const ScrollCue = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11;
  font: 13px/1.4 sans-serif;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
  pointer-events: none;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 300ms ease;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${(props) => (props.$visible ? "scrollCueBounce 2s ease-in-out infinite" : "none")};
  }

  @keyframes scrollCueBounce {
    0%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(6px);
    }
  }
`;

export const JumpNav = styled.nav`
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 12;
  max-height: calc(100vh - 16px);
  overflow-y: auto;
  padding: 8px 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(4px);
  font: 11px/1.5 sans-serif;

  a {
    display: block;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }

  strong {
    display: block;
    margin-bottom: 4px;
    color: rgba(255, 255, 255, 0.55);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 10px;
  }
`;
