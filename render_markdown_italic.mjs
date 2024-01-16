#!/usr/bin/env node
import { job } from "./render_markdown_job.mjs";
import { inCodeBlock, isInCodeBlock } from "./render_markdown_in_code.mjs";

const letters = {
    "*": "*",
    "_": "_",
}
const formatToRegexp = {
    "*": /\*/,
    "_": /_/,
}
const formatEscape = {
    start: "\x1B[3m",
    end: "\x1B[0m", // Reset all
}
const formatedString = [];


const isContainPair = (row = "", symbols = "") => {
    const counter = row.split(symbols).filter(Boolean).length; // .filter(Boolean) - remove first and last empty elements
    return counter > 2 && Boolean(counter & 1);
}

const isContainBoldFormat = (row = "") => {
    const expr1 = () => row.includes(letters["*"]) && isContainPair(row, letters["*"]);
    const expr2 = () => row.includes(letters["_"]) && isContainPair(row, letters["_"]);
    return expr1() || expr2();
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
        isInCodeBlock(row);

        if (false === inCodeBlock && isContainBoldFormat(row)) {
            formatedString.push(bold(row));
            return;
        }

        formatedString.push(row);
    });

    return formatedString;
}

job(jobAction);
