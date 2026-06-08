import * as React from "react";

export declare const NearestFilter: number;
export declare const LinearFilter: number;
export declare const NearestMipMapNearestFilter: number;
export declare const LinearMipMapNearestFilter: number;
export declare const NearestMipMapLinearFilter: number;
export declare const LinearMipMapLinearFilter: number;
export declare const ClampToEdgeWrapping: number;
export declare const MirroredRepeatWrapping: number;
export declare const RepeatWrapping: number;

export type WebGLMode = "auto" | "1" | "2";

export interface TextureProps {
  url?: string;
  type?: "image" | "video" | "camera" | "data" | "cube" | "keyboard";
  srcSet?: Record<number, string> | string;
  urls?: string[];
  width?: number;
  height?: number;
  data?: Uint8Array | Float32Array;
  format?: "rgba8" | "rgba32f";
  facingMode?: "user" | "environment";
  wrapS?: number;
  wrapT?: number;
  minFilter?: number;
  magFilter?: number;
  flipY?: number;
}

export interface UniformProps {
  type: string;
  value: number | number[];
}

export interface PassProps {
  fs: string;
  target?: string;
  inputs?: string[];
}

export interface PersistentTimeProps {
  epoch?: number | string | Date;
  storageKey?: string;
  shared?: boolean;
}

export interface GlslCanvasProps {
  fs?: string;
  vs?: string;
  passes?: PassProps[];
  textures?: TextureProps[];
  uniforms?: Record<string, UniformProps>;
  defines?: Record<string, number | string | boolean>;
  clearColor?: [number, number, number, number];
  precision?: "lowp" | "mediump" | "highp";
  style?: React.CSSProperties;
  contextAttributes?: WebGLContextAttributes;
  onDoneLoadingTextures?: () => void;
  lerp?: number;
  devicePixelRatio?: number;
  webgl?: WebGLMode;
  persistentTime?: boolean | PersistentTimeProps;
}

export default class GlslCanvas extends React.Component<GlslCanvasProps> {}

/** @deprecated Use GlslCanvas instead. */
export class ShadertoyReact extends GlslCanvas {}
