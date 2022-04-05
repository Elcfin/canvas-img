"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.image = void 0;
const canvas_big_1 = require("./canvas-big");
const lerp_1 = require("./lerp");
const canvasSmall = document.querySelector("#canvas-small");
const contextSmall = canvasSmall.getContext("2d");
exports.image = new Image();
exports.image.crossOrigin = "";
exports.image.src = "http://127.0.0.1:8080/asset/white.jpg";
exports.image.onload = () => {
    // 设置加载完成后的回调函数
    contextSmall.drawImage(exports.image, 0, 0, canvasSmall.width, canvasSmall.height);
    const imageDataSmall = contextSmall.getImageData(0, 0, canvasSmall.width, canvasSmall.height);
    const dataSmall = imageDataSmall.data;
    const dataSmallSide = Math.sqrt(dataSmall.length / 4); // 边长
    const dataBigSide = Math.sqrt(canvas_big_1.dataBig.length / 4); // 边长
    const ratio = (dataSmallSide - 1) / dataBigSide;
    for (let y = 0; y < dataBigSide; y++) {
        for (let x = 0; x < dataBigSide; x++) {
            // 遍历 big 画布上每一个像素点
            const index = 4 * (x + y * dataBigSide);
            // 映射到小画布上对应的坐标
            const smallX = x * ratio;
            const smallY = y * ratio;
            (0, lerp_1.bilinearInterpolation)(dataSmall, canvas_big_1.dataBig, smallX, smallY, dataSmallSide, index);
            /*       // 用距离最近的 texel 值作为当前 pixel 值
            simpleInterpolation(
              dataSmall,
              dataBig,
              smallX,
              smallY,
              dataSmallSide,
              index
            ); */
        }
    }
    canvas_big_1.contextBig.putImageData(canvas_big_1.imageDataBig, 0, 0);
};
