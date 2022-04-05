export const canvasSmall: HTMLCanvasElement | null =
  document.querySelector("#bi-canvas-small");
export const contextSmall = canvasSmall!.getContext("2d");

export const canvasMipmapSmall: HTMLCanvasElement | null =
  document.querySelector("#mipmap-canvas-small");
export const contextMipmapSmall = canvasMipmapSmall!.getContext("2d");
