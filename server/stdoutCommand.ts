import * as path from "https://deno.land/std@0.57.0/path/mod.ts";


export type DenoCommandParameters = ConstructorParameters<typeof Deno.Command>


export type StdoutCommandParameters = [
  command: Exclude<DenoCommandParameters[0], URL>,
  oprions?: DenoCommandParameters[1]
]


export const stdoutCommand = (
  __dirname: string,
  ...[command, options]: StdoutCommandParameters
) => {
  const runCommand = new Deno
    .Command(
      path.join(__dirname, command),
      options,
    )
  const { stdout } = runCommand.outputSync()
  return new TextDecoder().decode(stdout);
}
