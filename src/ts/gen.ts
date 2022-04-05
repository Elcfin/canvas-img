export const genPixelInfo = (
  data: Uint8ClampedArray,
  x: number,
  y: number,
  width: number
) => {
  const index = 4 * (x + y * width);
  return {
    x,
    y,
    index: index / 4,
    red: data[index],
    green: data[index + 1],
    blue: data[index + 2],
    alpha: data[index + 3],
  };
};
