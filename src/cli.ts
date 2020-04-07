import commander from 'commander';
import { Config, NormalizedConfig } from './types';

const exitWithError = (message: string, errorCode = 1) => {
    // eslint-disable-next-line no-console
    console.log(message);

    process.exit(errorCode);
};

const parseArguments = (program = commander) => {
    program
        .description(
            'Read and parse an ODS file to JSON or CSV \nFor formatting it uses the "format-data" package: https://www.npmjs.com/package/format-data'
        )
        .name('ods2-cli')
        .usage('<source-file> [options] [-f <format arguments>]')
        .option('-t <tab>', 'tab index or title to process')
        .option(
            '-o <target-file>',
            'destination file to be created. If missing stoud will be used'
        )
        .option(
            '-f',
            'if present any remaining arguments will be passed at format-data package as options object. Default value: "format:json" Example arguments: "format:json" "style:object"'
        );

    program.parse(process.argv);

    return { options: program.opts(), args: program.args };
};

const validateAndNormalizeFormatArguments = (args: string[]) =>
    args.reduce((acc, arg) => {
        const [key, value] = arg.split(':');
        if (!value) {
            exitWithError(`Error parsing format argument: "${arg}"`);
        }

        return { ...acc, [key]: value };
    }, {});

const validateAndNormalizeConfig = (config: Config) => {
    const {
        args,
        options: { T, O, F }
    } = config;

    const result: NormalizedConfig = {
        inputFile: '',
        tab: Number.isNaN(Number(T)) ? T : Number(T), // if it is number typecast it as such.
        output: O,
        format: { format: 'json' }
    };

    if (args.length === 0) {
        // eslint-disable-next-line no-console
        exitWithError('Error: <source-file> is missing');
    } else {
        [result.inputFile] = args; // first argument is the inputFile
    }

    if (F) {
        if (args.length < 2) {
            exitWithError('Error: Found format flag but no format arguments!');
        }

        const formatArguments = args.slice(1);
        result.format = validateAndNormalizeFormatArguments(formatArguments);
    }

    return result;
};

const config = parseArguments() as Config;

const normalizedConfig = validateAndNormalizeConfig(config);
export default normalizedConfig;
