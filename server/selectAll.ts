import { getTagNames } from "./getTagNames.ts";
import { getContentLength } from "./getContentLength.ts";
import { stdoutCommand } from "./stdoutCommand.ts";


export const select_all = (__dirname: string) => {
  console.log('select all:',__dirname)
  return async (request: Request) => {
  console.log("async:", __dirname)

    if (request.method === 'GET') {
      const description = "Show all notes selected by tag\n"
      return getTagNames(__dirname, description);
    }

    const contentLength = getContentLength(request)

    if (contentLength === '0') {
      return stdoutCommand(
        __dirname,
        "show_notes.bash"
      );
    }

    const formData = await request.formData()
    const tagName = formData.get("tag")

    if (tagName && typeof tagName !== 'object') {
      return stdoutCommand(
        __dirname,
        "show_notes.bash",
        {
          args: [tagName]
        }
      );
    }

    return "Invalid request";
  };
}
