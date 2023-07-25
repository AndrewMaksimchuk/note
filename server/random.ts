import { stdoutCommand } from "./stdoutCommand.ts";

export const random = (__dirname: string) => {
  return () => stdoutCommand(__dirname, "show_random_note.bash");
}
