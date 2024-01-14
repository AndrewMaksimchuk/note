#!/usr/bin/env node
export const job = (jobFunction = (rowsArray = [""]) => [""]) => {
    process.stdin.on("data", data => {
      const dataString = data.toString("utf8");
      const rowsArray = dataString.split("\n");
      process.stdout.write(jobFunction(rowsArray).join("\n"));
    });
}
