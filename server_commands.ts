import * as path from "https://deno.land/std@0.57.0/path/mod.ts";
// [command_script, $1, $2, $3]


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
  command: Exclude<DenoCommandParameters[0], URL>,
  oprions?: DenoCommandParameters[1]
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
export const create = (request: Request) => {
  if (request.method === 'GET') {
    return "create new note file/save web page";
  }

  notImplemented();
  return "";
}


export const random = () => {
  return stdoutCommand("show_random_note.bash");
}


export const select = async (request: Request) => {
  if (request.method === 'GET') {
    return "Show note selected by tag or web pages";
  }

  const command = "select.bash"
  const contentLength = getContentLength(request)

  if (contentLength === '0') {
    return stdoutCommand(command);
  }

  const formData = await request.formData()
  const name = formData.get("name") // $1
  const counter = formData.get("counter") ?? ''//$2
  
  if (
    typeof name !== 'object' &&
    typeof counter !== 'object'
  ) {
    return stdoutCommand(
      command,
      {
        args: [name, counter]
      }
    );
  }

  return "Invalid request";
}


export const tag = async (request: Request) => {
  if (request.method === 'GET') {
    return "Add new tag";
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


export const select_all = async (request: Request) => {
  if (request.method === 'GET') {
    return "Show all notes selected by tag";
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
