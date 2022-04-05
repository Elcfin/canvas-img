"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPixelInfo = void 0;
const genPixelInfo = (data, x, y, width) => {
    const index = 4 * (x + y * width);
    return {
        x,
        y,
        index: index / 4,
        red: data[index],
        green: data[index + 1],
        blue: data[index + 2],
        alpha: data[index + 3],
    };
};
exports.genPixelInfo = genPixelInfo;
