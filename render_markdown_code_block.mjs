#!/usr/bin/env node
import { job } from "./render_markdown_job.mjs";
import { inCodeBlock, isInCodeBlock } from "./render_markdown_in_code.mjs";
import { argv } from "process";

let formatedString = [];

const setWidth = () => {
  return argv[2] ? Number(argv[2]) : 120;
}

const codeBlockSetWidth = (row = "") => {
  return row.padEnd(setWidth(), " ");
}

const codeBlockSetColor = (row) => {
  return `\x1B[100;97m${row}\x1B[0m`;
}

const isContainCodeInline = (row = "") => {
  return row.includes(" `");
}

const codeInline = (row = "") => {
  let inCodeInlineSection = false;
  const symbolsArray = row.split("");

  const formaterRow = symbolsArray.map((letter) => {
    if ("`" === letter && false === inCodeInlineSection) {
      inCodeInlineSection = true;
      return "\x1B[100;97m ";
    }

    if ("`" === letter && inCodeInlineSection) {
      inCodeInlineSection = false;
      return " \x1B[0m";
    }

    return letter;
  });

  return formaterRow.join("");
}

const jobAction = (rowsArray) => {
  rowsArray.forEach((row) => {
    if ("break" === isInCodeBlock(row)) {
      return;
    }

    if (inCodeBlock) {
      formatedString.push(codeBlockSetColor(codeBlockSetWidth(row)));
      return;
    }

    if (isContainCodeInline(row)) {
      formatedString.push(codeInline(row));
      return;
    }

    formatedString.push(row);
  });

  return formatedString;
}

job(jobAction);
