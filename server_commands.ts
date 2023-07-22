import * as path from "https://deno.land/std@0.57.0/path/mod.ts";


const __dirname = path
  .dirname(
    path.fromFileUrl(import.meta.url)
  );


export const notImplemented = () => {
  console.log("Not implemented");
  Deno.exit();
}


type StdoutCommandParameters = ConstructorParameters<typeof Deno.Command>
const stdoutCommand = (
  ...[command, options]: StdoutCommandParameters
) => {
  const runCommand = new Deno
    .Command(
      command,
      options,
    );
  const { stdout } = runCommand.outputSync();
  return new TextDecoder().decode(stdout);
}


export const create = () => {
  notImplemented();
  return "";
}


export const random = () => {
  return stdoutCommand(
    __dirname + "/show_random_note.bash"
  );
}


export const select = () => {
  notImplemented();
  return "";
}


// Method: POST
export const tag = async (request: Request) => {
  const contentLength = request
    .headers
    .get("content-length")

  if (contentLength === '0') {
    return stdoutCommand(
      __dirname + "/add_tag.bash"
    );
  }

  const formData = await request.formData()
  const tagName = formData.get("tag")

  if (tagName && typeof tagName !== 'object') {
    return stdoutCommand(
      __dirname + "/add_tag.bash",
      {
        args: [tagName]
      }
    );
  }

  return "Invalid request";
}


export const edit = () => {
  notImplemented();
  return "";
}


export const clear = () => {
  notImplemented();
  return "";
}


export const update = () => {
  notImplemented();
  return "";
}


export const select_all = () => {
  notImplemented();
  return "";
}


export const search = () => {
  notImplemented();
  return "";
}


export const COMMAND = {
  create: create,
  random: random,
  select: select,
  tag: tag,
  edit: edit,
  clear: clear,
  update: update,
  select_all: select_all,
  search: search,
}
