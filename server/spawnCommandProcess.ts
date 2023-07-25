import * as path from "https://deno.land/std@0.57.0/path/mod.ts";
import type { StdoutCommandParameters } from "./stdoutCommand.ts";


export const spawnCommandProcess = async (
  __dirname: string,
  ...[command, options]: StdoutCommandParameters
) => {
  const runCommand = new Deno
    .Command(
      path.join(__dirname, command),
      {
        ...options,
        stdin: "piped",
        stdout: "piped",
        stderr: "piped",
      }
    )
  return await runCommand.spawn();
}
