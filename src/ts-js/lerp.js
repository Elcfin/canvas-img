"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bilinearInterpolation = exports.lerp = exports.simpleInterpolation = void 0;
const gen_1 = require("./gen");
const simpleInterpolation = (srcData, tarData, x, y, width, index) => {
    const indexSrc = 4 * (Math.round(x) + Math.round(y) * width);
    for (let i = 0; i < 4; i++)
        tarData[index + i] = srcData[indexSrc + i];
};
exports.simpleInterpolation = simpleInterpolation;
const lerp = (x, v0, v1) => v0 + x * (v1 - v0);
exports.lerp = lerp;
const bilinearInterpolation = (srcData, tarData, x, y, width, index) => {
    const u01Info = (0, gen_1.genPixelInfo)(srcData, Math.floor(x), Math.floor(y), width);
    const u11Info = (0, gen_1.genPixelInfo)(srcData, Math.ceil(x), Math.floor(y), width);
    const u00Info = (0, gen_1.genPixelInfo)(srcData, Math.floor(x), Math.ceil(y), width);
    const u10Info = (0, gen_1.genPixelInfo)(srcData, Math.ceil(x), Math.ceil(y), width);
    const t = Math.ceil(y) - y;
    const s = x - Math.floor(x);
    const lerpSth = (cur) => {
        return (0, exports.lerp)(t, (0, exports.lerp)(s, srcData[u00Info.index * 4 + cur], srcData[u10Info.index * 4 + cur]), (0, exports.lerp)(s, srcData[u01Info.index * 4 + cur], srcData[u11Info.index * 4 + cur]));
    };
    for (let i = 0; i < 4; i++)
        tarData[index + i] = lerpSth(i);
};
exports.bilinearInterpolation = bilinearInterpolation;
