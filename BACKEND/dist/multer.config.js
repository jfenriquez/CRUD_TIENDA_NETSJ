"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, callback) => {
            const name = file.originalname.split('.')[0];
            const fileExtName = (0, path_1.extname)(file.originalname);
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            callback(null, `${name}-${uniqueSuffix}${fileExtName}`);
        },
    }),
};
//# sourceMappingURL=multer.config.js.map