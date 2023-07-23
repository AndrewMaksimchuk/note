import * as path from "https://deno.land/std@0.57.0/path/mod.ts";


const __dirname = path
  .dirname(
    path.fromFileUrl(import.meta.url)
  );


export const notImplemented = () => {
  console.log("Not implemented");
  Deno.exit();
}


type DenoCommandParameters = ConstructorParameters<typeof Deno.Command>
type StdoutCommandParameters = [
  command:Exclude<DenoCommandParameters[0], URL>,
  oprions?:DenoCommandParameters[1]
]
const stdoutCommand = (
  ...[command, options]: StdoutCommandParameters
) => {
  const runCommand = new Deno
    .Command(
      path.join(__dirname, command),
      options,
    );
  const { stdout } = runCommand.outputSync();
  return new TextDecoder().decode(stdout);
}


const getContentLength = (request: Request) => {
  return request
    .headers
    .get("content-length")
}


// COMMANDS
export const create = () => {
  notImplemented();
  return "";
}


export const random = () => {
  return stdoutCommand("show_random_note.bash");
}


export const select = () => {
  notImplemented();
  return "";
}


// Method: POST
export const tag = async (request: Request) => {
  if(request.method === 'GET') {
    return "Invalid request";
  }

  const contentLength = getContentLength(request)

  if (contentLength === '0') {
    return stdoutCommand("add_tag.bash");
  }

  const formData = await request.formData()
  const tagName = formData.get("tag")

  if (tagName && typeof tagName !== 'object') {
    return stdoutCommand(
      "add_tag.bash",
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


// Method: POST
export const select_all = async (request: Request) => {
  if(request.method === 'GET') {
    return "Invalid request";
  }
  
  const contentLength = getContentLength(request)

    if (contentLength === '0') {
      return stdoutCommand("show_notes.bash");
    }

  const formData = await request.formData()
  const tagName = formData.get("tag")

  if (tagName && typeof tagName !== 'object') {
    return stdoutCommand(
      "show_notes.bash",
      {
        args: [tagName]
      }
    );
  }

  return "Invalid request";
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
