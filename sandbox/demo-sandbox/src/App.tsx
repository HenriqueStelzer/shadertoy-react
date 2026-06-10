import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DemoLayout } from "./layout";
import {
  BasicPage,
  ChannelResolutionPage,
  CustomUniformsPage,
  DatePage,
  DeviceOrientationPage,
  FramePage,
  MousePage,
  ResolutionPage,
  TexturesPage,
} from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <DemoLayout>
        <Routes>
          <Route path="/" element={<BasicPage />} />
          <Route path="/Textures" element={<TexturesPage />} />
          <Route path="/CustomUniforms" element={<CustomUniformsPage />} />
          <Route path="/Resolution" element={<ResolutionPage />} />
          <Route path="/Mouse" element={<MousePage />} />
          <Route path="/Date" element={<DatePage />} />
          <Route path="/Frame" element={<FramePage />} />
          <Route path="/ChannelResolution" element={<ChannelResolutionPage />} />
          <Route
            path="/DeviceOrientation"
            element={<DeviceOrientationPage />}
          />
        </Routes>
      </DemoLayout>
    </BrowserRouter>
  );
}
