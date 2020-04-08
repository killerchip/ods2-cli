"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var exitWithError = function (message, errorCode) {
    if (errorCode === void 0) { errorCode = 1; }
    // eslint-disable-next-line no-console
    console.log(message);
    process.exit(errorCode);
};
var parseArguments = function (program) {
    if (program === void 0) { program = commander_1.default; }
    program
        .description('Read and parse an ODS file to JSON or CSV \nFor formatting it uses the "format-data" package: https://www.npmjs.com/package/format-data')
        .name('ods2-cli')
        .usage('<source-file> [options] [-f <format arguments>]')
        .option('-t <tab>', 'tab index or title to process')
        .option('-o <target-file>', 'destination file to be created. If missing stoud will be used')
        .option('-f', 'if present any remaining arguments will be passed at format-data package as options object. Default value: "format:json" Example arguments: "format:json" "style:object"');
    program.parse(process.argv);
    return { options: program.opts(), args: program.args };
};
var validateAndNormalizeFormatArguments = function (args) {
    return args.reduce(function (acc, arg) {
        var _a;
        var _b = arg.split(':'), key = _b[0], value = _b[1];
        if (!value) {
            exitWithError("Error parsing format argument: \"" + arg + "\"");
        }
        return __assign(__assign({}, acc), (_a = {}, _a[key] = value, _a));
    }, {});
};
var validateAndNormalizeConfig = function (config) {
    var args = config.args, _a = config.options, T = _a.T, O = _a.O, F = _a.F;
    var result = {
        inputFile: '',
        tab: Number.isNaN(Number(T)) ? T : Number(T),
        output: O,
        format: { format: 'json' }
    };
    if (args.length === 0) {
        // eslint-disable-next-line no-console
        exitWithError('Error: <source-file> is missing');
    }
    else {
        result.inputFile = args[0]; // first argument is the inputFile
    }
    if (F) {
        if (args.length < 2) {
            exitWithError('Error: Found format flag but no format arguments!');
        }
        var formatArguments = args.slice(1);
        result.format = validateAndNormalizeFormatArguments(formatArguments);
    }
    return result;
};
var config = parseArguments();
var normalizedConfig = validateAndNormalizeConfig(config);
exports.default = normalizedConfig;
