"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextMipmapSmall = exports.canvasMipmapSmall = exports.contextSmall = exports.canvasSmall = void 0;
exports.canvasSmall = document.querySelector("#bi-canvas-small");
exports.contextSmall = exports.canvasSmall.getContext("2d");
exports.canvasMipmapSmall = document.querySelector("#mipmap-canvas-small");
exports.contextMipmapSmall = exports.canvasMipmapSmall.getContext("2d");
