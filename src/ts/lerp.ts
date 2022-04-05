import { genPixelInfo } from "./gen";

export const simpleInterpolation = (
  srcData: Uint8ClampedArray,
  tarData: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  index: number
) => {
  const indexSrc = 4 * (Math.round(x) + Math.round(y) * width);
  for (let i = 0; i < 4; i++) tarData[index + i] = srcData[indexSrc + i];
};

export const lerp = (x: number, v0: number, v1: number) => v0 + x * (v1 - v0);

export const bilinearInterpolation = (
  srcData: Uint8ClampedArray,
  tarData: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  index: number
) => {
  const u01Info = genPixelInfo(srcData, Math.floor(x), Math.floor(y), width);
  const u11Info = genPixelInfo(srcData, Math.ceil(x), Math.floor(y), width);
  const u00Info = genPixelInfo(srcData, Math.floor(x), Math.ceil(y), width);
  const u10Info = genPixelInfo(srcData, Math.ceil(x), Math.ceil(y), width);

  const t = Math.ceil(y) - y;
  const s = x - Math.floor(x);

  const lerpSth = (cur: number) => {
    return lerp(
      t,
      lerp(
        s,
        srcData[u00Info.index * 4 + cur],
        srcData[u10Info.index * 4 + cur]
      ),
      lerp(
        s,
        srcData[u01Info.index * 4 + cur],
        srcData[u11Info.index * 4 + cur]
      )
    );
  };

  for (let i = 0; i < 4; i++) tarData[index + i] = lerpSth(i);
};
