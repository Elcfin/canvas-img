"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvasSmall_1 = require("./canvasSmall");
const canvasBig_1 = require("./canvasBig");
const mipmap_1 = require("./mipmap");
const canvasMipmapShow = document.querySelector("#mipmap-canvas-show");
const contextMipmapShow = canvasMipmapShow.getContext("2d");
let mipmap; // 存储新生成的每层图像
const image = new Image();
image.crossOrigin = "";
image.src = "http://127.0.0.1:8080/asset/white.jpg";
image.onload = () => {
    canvasBig_1.contextMipmapBig.drawImage(image, 0, 0, canvasBig_1.canvasMipmapBig.width, canvasBig_1.canvasMipmapBig.height);
    const imageDataMipmapBig = canvasBig_1.contextMipmapBig.getImageData(0, 0, canvasBig_1.canvasMipmapBig.width, canvasBig_1.canvasMipmapBig.height);
    const dataMipmapBig = imageDataMipmapBig.data;
    const dataMipmapBigSide = Math.sqrt(dataMipmapBig.length / 4);
    const dataMipmapSmallSide = 128;
    const dataMipmapSmall = canvasSmall_1.contextMipmapSmall.createImageData(dataMipmapSmallSide, dataMipmapSmallSide);
    const ratio = (dataMipmapBigSide - 1) / dataMipmapSmallSide;
    mipmap = (0, mipmap_1.mipmapStore)(dataMipmapBig, dataMipmapBigSide, contextMipmapShow);
    for (let y = 0; y < dataMipmapSmallSide; y++) {
        for (let x = 0; x < dataMipmapSmallSide; x++) {
            const index = 4 * (x + y * dataMipmapSmallSide);
            const bigX = x * ratio;
            const bigY = y * ratio;
            const anotherBigPos = [
                { x: (x + 1) * ratio, y: bigY },
                { x: bigX, y: (y + 1) * ratio },
            ];
            const l = Math.max(Math.sqrt(Math.pow(anotherBigPos[0].x - bigX, 2) +
                Math.pow(anotherBigPos[0].y - bigY, 2)), Math.sqrt(Math.pow(anotherBigPos[1].x - bigX, 2) +
                Math.pow(anotherBigPos[1].y - bigY, 2)));
            const d = Math.log(l) / Math.log(2);
            const dFloor = Math.floor(d);
            const dCeil = Math.ceil(d);
        }
    }
};
