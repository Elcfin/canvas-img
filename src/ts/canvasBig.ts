const canvasBig: HTMLCanvasElement | null =
  document.querySelector("#bi-canvas-big");
export const contextBig = canvasBig!.getContext("2d");

export const imageDataBig = contextBig!.createImageData(100, 100);
export const dataBig = imageDataBig.data;

export const canvasMipmapBig: HTMLCanvasElement | null =
  document.querySelector("#mipmap-canvas-big");
export const contextMipmapBig = canvasMipmapBig!.getContext("2d");
