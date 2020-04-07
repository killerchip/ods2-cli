import * as fs from 'fs';
import { NormalizedConfig } from './types';

interface TabOpts {
    sheetIndex?: number;
    sheet?: string;
}

const sheet = require('spreadsheet-stream');
const format = require('format-data');

const getTabOpts = (tab?: string | number): TabOpts => {
    let tabOpts: TabOpts = { sheetIndex: 0 };

    if (tab) {
        if (typeof tab === 'string') {
            tabOpts = { sheet: tab };
        } else {
            tabOpts = { sheetIndex: tab };
        }
    }

    return tabOpts;
};

const convert = ({
    inputFile,
    tab,
    output,
    format: formatOpts
}: NormalizedConfig) => {
    fs.createReadStream(inputFile)
        .pipe(sheet(getTabOpts(tab)))
        .pipe(format(formatOpts))
        .pipe(
            output === undefined
                ? process.stdout
                : fs.createWriteStream(<string>output)
        );
};

export default convert;
