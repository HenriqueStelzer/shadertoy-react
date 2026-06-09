export const makeDataTexture = () => {
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

export const DATA_TEX = makeDataTexture();
