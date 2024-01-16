#!/usr/bin/env node
import { job } from "./render_markdown_job.mjs";
import { inCodeBlock } from "./render_markdown_in_code.mjs";

const formatedString = [];
const regexp = /\[(.+\w+)]\((.+\w+)\)/gm;

const isContainLinkFormat = (row = "") => {
    return Boolean(row.match(regexp));
}

const setLinkFormat = (text = "") => {
    return `\x1B[34m${text}\x1B[0m`;
}

const createLink = (_match, text = "", url = "") => {
    return setLinkFormat(`\x1B]8;;${url}\x1B\\${text}\x1B]8;;\x1B\\`);
}

const link = (row = "") => {
 return row.replaceAll(regexp, createLink);
}

const jobAction = (rowsArray) => {
    rowsArray.forEach((row) => {
        if (inCodeBlock) {
            return;
        }

        if (isContainLinkFormat(row)) {
            formatedString.push(link(row));
            return;
        }

        formatedString.push(row);
    });

    return formatedString;
}

job(jobAction);
