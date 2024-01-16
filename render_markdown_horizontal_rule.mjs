#!/usr/bin/env node
import { job } from "./render_markdown_job.mjs";
import { inCodeBlock } from "./render_markdown_in_code.mjs";
import { argv } from "process";

const setWidth = () => {
    return argv[2] ? Number(argv[2]) : 120;
}

const letters = {
    "***": "***",
    "---": "---",
}
const formatedString = [];

const isContainFormat = (row = "") => {
    return row.startsWith(letters["---"]) || row.startsWith(letters["***"]);
}

const horizontalRule = () => {
    return "".padEnd(setWidth(), "\u2500");
}

const jobAction = (rowsArray) => {
    rowsArray.forEach((row) => {
        if (inCodeBlock) {
            return;
        }

        if (isContainFormat(row)) {
            formatedString.push(horizontalRule());
            return;
        }

        formatedString.push(row);
    });

    return formatedString;
}

job(jobAction);
