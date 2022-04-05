const canvasBig: HTMLCanvasElement | null =
  document.querySelector("#canvas-big");
export const contextBig = canvasBig!.getContext("2d");

export const imageDataBig = contextBig!.createImageData(100, 100);
export const dataBig = imageDataBig.data;
