"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextMipmapBig = exports.canvasMipmapBig = exports.dataBig = exports.imageDataBig = exports.contextBig = void 0;
const canvasBig = document.querySelector("#bi-canvas-big");
exports.contextBig = canvasBig.getContext("2d");
exports.imageDataBig = exports.contextBig.createImageData(100, 100);
exports.dataBig = exports.imageDataBig.data;
exports.canvasMipmapBig = document.querySelector("#mipmap-canvas-big");
exports.contextMipmapBig = exports.canvasMipmapBig.getContext("2d");
