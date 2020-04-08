"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var sheet = require('spreadsheet-stream');
var format = require('format-data');
var getTabOpts = function (tab) {
    var tabOpts = { sheetIndex: 0 };
    if (tab) {
        if (typeof tab === 'string') {
            tabOpts = { sheet: tab };
        }
        else {
            tabOpts = { sheetIndex: tab };
        }
    }
    return tabOpts;
};
var convert = function (_a) {
    var inputFile = _a.inputFile, tab = _a.tab, output = _a.output, formatOpts = _a.format;
    fs.createReadStream(inputFile)
        .pipe(sheet(getTabOpts(tab)))
        .pipe(format(formatOpts))
        .pipe(output === undefined
        ? process.stdout
        : fs.createWriteStream(output));
};
exports.default = convert;
