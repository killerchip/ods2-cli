"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cli_1 = __importDefault(require("./cli"));
var convert_1 = __importDefault(require("./convert"));
convert_1.default(cli_1.default);
