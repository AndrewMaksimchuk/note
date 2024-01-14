#!/usr/bin/env node
import { job } from "./render_markdown_job.mjs";
import { inCodeBlock } from "./render_markdown_in_code.mjs";

const formatToRegexp = {
    "**": /\*\*/,
    "__": /__/,
}
const formatedString = [];

const isContainBoldFormat = (row = "") => {
    return row.includes("**") || row.includes("__");
}

const whatIsFirstLetter = (row = "") => {
    return row.includes("**") ? "**" : "__";
}

const replacePair = (row = "") => {
    const boldFormat = whatIsFirstLetter(row);
    let formatedPair = row.replace(formatToRegexp[boldFormat], "\x1B[1m");
    formatedPair = formatedPair.replace(formatToRegexp[boldFormat], "\x1B[0m");
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
