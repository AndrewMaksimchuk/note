#!/usr/bin/env node

export let inCodeBlock = false;

export const isInCodeBlock = (row = "") => {
    if (row.startsWith("```") && false === inCodeBlock) {
        inCodeBlock = true;
        return "break";
    }
    
    if (row.startsWith("```") && true === inCodeBlock) {
        inCodeBlock = false;
        return "break";
    }

    return "continue";
}
