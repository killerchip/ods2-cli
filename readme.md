# ods2-cli

CLI utility for reading `ods`,`xls`,`xlsx` files and parsing them to `csv` and `json` formats.

**Supports:**

-   Input files: `ods`, `xls(x)` and whatever is supported by [spreadsheet-stream](https://www.npmjs.com/package/spreadsheet-stream) package.
-   Output format: `csv`, `json` and whatever is supported by [format-data](https://www.npmjs.com/package/format-data) package
-   Output to file or `process.stdout`

## How to install

Install in your project:

```
npm install --save-dev ods2-cli
```

or globally

```
npm install -g ods2-cli
```

## Usage

### Output to stdout

Read file's fist tab and output to console in json format.

```
ods2-cli <source file>
```

example:

```
ods2-cli ./mydata/data.ods
```

## Output to new file

Read `ods` file's first tab and create a `json` file.

```
ods2-cli <source file> -o <target file>
```

example:

```
ods2-cli ./mydata/data.ods -o ./mydata/data.json
```

## Read specific tab of file

Read source file's tab indicated with index number:

```
ods2-cli <source file> -t <tab index>
```

example:

```
ods2-cli ./data.ods -t 2
```

or by tab name:

```
ods2-cli ./data.ods -t "Monthly Summary"
```

## Export to other formats than JSON (default)

Package uses the [format-data](https://www.npmjs.com/package/format-data) package to format data. So any supported options by the package can be passed.

Use the `-f <key1:value1> <key2:value2> ... <keyN:valueN>` to pass the options object to [format-data](https://www.npmjs.com/package/format-data)

**Example:**

To pass the object `{format: 'csv', separator: '-'}` to the package use the following command:

```
ods2-cli <source file> -f format:csv separator:-
```

> Note that the `-f` option and its arguments must always be at the last part of the command.

## License

License: [MIT](https://opensource.org/licenses/MIT)
