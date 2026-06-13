import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { DEMO_SECTIONS } from "./routes";

export const GlobalStyle = createGlobalStyle`
  body, html, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`;

const Shell = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const CanvasLayer = styled.div`
  position: absolute;
  inset: 0;

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  font: 13px/1.45 "Times New Roman", Times, serif;
`;

const Trigger = styled.button`
  margin: 0;
  padding: 4px 10px;
  border: 1px solid #000;
  background: #fff;
  font: inherit;
  cursor: pointer;
`;

const Menu = styled.div`
  margin-top: 2px;
  padding: 8px 12px 10px;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  min-width: 200px;
`;

const SectionTitle = styled.div`
  margin: 6px 0 4px;
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.03em;

  &:first-child {
    margin-top: 0;
  }
`;

const MenuLink = styled(Link)`
  display: block;
  padding: 2px 0;
  color: #000;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

type DemoLayoutProps = {
  children: ReactNode;
};

export function DemoLayout({ children }: DemoLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <Shell>
      <Dropdown
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Trigger type="button" onClick={() => setOpen((v) => !v)}>
          + More
        </Trigger>
        {open && (
        <Menu>
          {DEMO_SECTIONS.map((section) => (
            <div key={section.title}>
              <SectionTitle>{section.title}</SectionTitle>
              <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
                {section.routes.map((route) => (
                  <li key={route.path}>
                    <MenuLink to={route.path} onClick={() => setOpen(false)}>
                      {route.label}
                    </MenuLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Menu>
        )}
      </Dropdown>
      <CanvasLayer>{children}</CanvasLayer>
      <GlobalStyle />
    </Shell>
  );
}
