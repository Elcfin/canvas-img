"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./bilinearInterpolationPart");
require("./trilinearInterpolationPart");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const width = 100;
const height = 100;
// 创建了一个 100 * 100 像素的 imageData 对象
const imageData = context.createImageData(width, height);
// 在 imageData.data 数组中每一个像素包含 4 个字节的值，即每一个像素由 4 个字节表示
// 分别为 红色 绿色 蓝色 和 透明度 alpha 通道 （RGBA），值都在 0 到 255 之间
const data = imageData.data;
// 可以通过如下代码读取一个像素的值，像素坐标为 (x, y)
let x = 0, y = 0;
let pixelIndex = x + y * width; // 像素索引
let index = 4 * pixelIndex; // data 数组中的索引
const red = data[index];
const green = data[index + 1];
const blue = data[index + 2];
const alpha = data[index + 3];
// 将像素复制到 canvas 上
// canvas 上插入 x 和 y 的坐标
const canvasX = 25;
const canvasY = 25;
context.putImageData(imageData, canvasX, canvasY);
const sx = 0;
const sy = 0;
const sWidth = 25;
const sHeight = 25;
context.putImageData(imageData, canvasX, canvasY, sx, sy, sWidth, sHeight);
// 从 canvas 获取像素
const newImageData = context.getImageData(sx, sy, sWidth, sHeight);
