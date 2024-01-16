#!/usr/bin/env node
import { job } from "./render_markdown_job.mjs";
import { inCodeBlock } from "./render_markdown_in_code.mjs";

const letters = {
    "***": "***",
    "___": "___",
    "__*": "__*", // different end symbols: *__
    "**_": "**_", // different end symbols: _**
}
const formatToRegexp = {
    "***": /\*\*\*/,
    "___": /___/,
    "__*": /__\*/, // start
    "*__": /\*__/, // end
    "**_": /\*\*_/, // start
    "_**": /_\*\*/, // end
}
const formatEscape = {
    start: "\x1B[1;3m",
    end: "\x1B[0m", // Reset all
}
const formatedString = [];

const isContainBoldFormat = (row = "") => {
    return Object.values(letters).some((symbols) => {
        return row.includes(symbols);
    });
}

const whatIsFirstLetter = (row = "") => {
    return Object.keys(letters).find((symbols) => {
        return row.includes(symbols);
    });
}

const replacePair = (row = "") => {
    const startSymbols = whatIsFirstLetter(row);
    let formatedPair = row.replace(formatToRegexp[startSymbols], formatEscape.start);
    const endSymbols = startSymbols?.split("").reverse().join("");
    formatedPair = formatedPair.replace(formatToRegexp[endSymbols], formatEscape.end);
    return formatedPair;
}

const bold = (row = "") => {
    let processingString = row;
    while (isContainBoldFormat(processingString)) {
        processingString = replacePair(processingString);
    }
    return processingString;
}

const jobAction = (rowsArray) => {
    rowsArray.forEach((row) => {
        if (inCodeBlock) {
            return;
        }

        if (isContainBoldFormat(row)) {
            formatedString.push(bold(row));
            return;
        }

        formatedString.push(row);
    });

    return formatedString;
}

job(jobAction);
