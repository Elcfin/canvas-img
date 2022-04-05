import { contextMipmapSmall } from "./canvasSmall";
import { contextMipmapBig, canvasMipmapBig } from "./canvasBig";
import { mipmapStore } from "./mipmap";
import { bilinearInterpolation } from "./lerp";

const canvasMipmapShow: HTMLCanvasElement | null = document.querySelector(
  "#mipmap-canvas-show"
);
const contextMipmapShow = canvasMipmapShow!.getContext("2d");

let mipmap: Uint8ClampedArray[]; // 存储新生成的每层图像
const image = new Image();
image.crossOrigin = "";
image.src = "http://127.0.0.1:8080/asset/white.jpg";

image.onload = () => {
  contextMipmapBig!.drawImage(
    image,
    0,
    0,
    canvasMipmapBig!.width,
    canvasMipmapBig!.height
  );

  const imageDataMipmapBig = contextMipmapBig!.getImageData(
    0,
    0,
    canvasMipmapBig!.width,
    canvasMipmapBig!.height
  );

  const dataMipmapBig = imageDataMipmapBig.data;
  const dataMipmapBigSide = Math.sqrt(dataMipmapBig.length / 4);
  const dataMipmapSmallSide = 128;
  const dataMipmapSmall = contextMipmapSmall!.createImageData(
    dataMipmapSmallSide,
    dataMipmapSmallSide
  );
  const ratio = (dataMipmapBigSide - 1) / dataMipmapSmallSide;

  mipmap = mipmapStore(dataMipmapBig, dataMipmapBigSide, contextMipmapShow!);

  for (let y = 0; y < dataMipmapSmallSide; y++) {
    for (let x = 0; x < dataMipmapSmallSide; x++) {
      const index = 4 * (x + y * dataMipmapSmallSide);
      const bigX = x * ratio;
      const bigY = y * ratio;
      const anotherBigPos = [
        { x: (x + 1) * ratio, y: bigY },
        { x: bigX, y: (y + 1) * ratio },
      ];
      const l = Math.max(
        Math.sqrt(
          Math.pow(anotherBigPos[0].x - bigX, 2) +
            Math.pow(anotherBigPos[0].y - bigY, 2)
        ),
        Math.sqrt(
          Math.pow(anotherBigPos[1].x - bigX, 2) +
            Math.pow(anotherBigPos[1].y - bigY, 2)
        )
      );
      const d = Math.log(l) / Math.log(2);
      const dFloor = Math.floor(d);
      const dCeil = Math.ceil(d);
    }
  }
};
