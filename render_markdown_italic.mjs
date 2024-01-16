#!/usr/bin/env node
import { job } from "./render_markdown_job.mjs";
import { inCodeBlock } from "./render_markdown_in_code.mjs";

const letters = {
    "*": "*",
    "_": "_",
}
const formatToRegexp = {
    "*": /\*/,
    "_": /_/,
}
const formatEscape = {
    start: "\x1B[1m",
    end: "\x1B[0m", // Reset all
}
const formatedString = [];

const isContainBoldFormat = (row = "") => {
    return row.includes(letters["*"]) || row.includes(letters["_"]);
}

const whatIsFirstLetter = (row = "") => {
    return row.includes(letters["*"]) ? letters["*"] : letters["_"];
}

const replacePair = (row = "") => {
    const boldFormat = whatIsFirstLetter(row);
    let formatedPair = row.replace(formatToRegexp[boldFormat], formatEscape.start);
    formatedPair = formatedPair.replace(formatToRegexp[boldFormat], formatEscape.end);
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
