#!/usr/bin/env node
import { job } from "./render_markdown_job.mjs";
import { inCodeBlock } from "./render_markdown_in_code.mjs";
import { argv } from "process";

const setWidth = () => {
    return argv[2] ? Number(argv[2]) : 120;
}

const letters = {
    ">": ">",
}
const formatToRegexp = {
    ">": />/,
}
const formatEscape = {
    start: "\x1B[100;97m",
    end: "\x1B[0m", // Reset all
}
const formatedString = [];

export const codeBlockSetWidth = (row = "") => {
    return row.padEnd(setWidth(), " ");
}

const isContainFormat = (row = "") => {
    return row.startsWith(letters[">"]);
}

const putStartSymbol = () => {
    return "\x1B[31m" + "\u2588" + formatEscape.start;
}

const replaceStartSymbol = (row = "") => {
    return row.replace(letters[">"], putStartSymbol());
}

const blockquotes = (row = "") => {
    let processingString = replaceStartSymbol(row);
    return processingString + formatEscape.end;
}

const jobAction = (rowsArray) => {
    rowsArray.forEach((row) => {
        if (inCodeBlock) {
            return;
        }

        if (isContainFormat(row)) {
            formatedString.push(blockquotes(codeBlockSetWidth(row)));
            return;
        }

        formatedString.push(row);
    });

    return formatedString;
}

job(jobAction);
