"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mipmapStore = void 0;
const mipmapStore = (initData, initSide, context) => {
    const mipmap = [];
    mipmap[0] = initData;
    console.log(mipmap[0]);
    for (let i = 1, w = 1; w < initSide; w *= 2, i++) {
        // 低一层的每四个像素在高一层为一个像素
        // 第 i 层的边长为 initSide / (2 ^ i)
        let curSide = Math.floor(initSide / Math.pow(2, i)); // 如果不是整数了直接向下取整
        if (!curSide)
            curSide = 1;
        const preSide = curSide * 2;
        const imageDataMipmapShow = context.createImageData(curSide, curSide);
        const dataMipmapShow = imageDataMipmapShow.data;
        for (let x = 0; x < curSide; x++) {
            for (let y = 0; y < curSide; y++) {
                const curIndex = 4 * (x + y * curSide);
                const preX = x * 2, preY = y * 2;
                const indexArray = [
                    4 * (preX + preY * preSide),
                    4 * (preX + 1 + preY * preSide),
                    4 * (preX + (preY + 1) * preSide),
                    4 * (preX + 1 + (preY + 1) * preSide),
                ]; // i - 1 层对应的四个点的索引
                for (let j = 0; j < 4; j++) {
                    dataMipmapShow[curIndex + j] =
                        indexArray.reduce((sum, cur) => sum + mipmap[i - 1][cur + j], 0) /
                            4;
                }
            }
        }
        context.putImageData(imageDataMipmapShow, 0, 0);
        mipmap[i] = dataMipmapShow;
    }
    return mipmap;
};
exports.mipmapStore = mipmapStore;
