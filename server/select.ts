import { getTagNames } from "./getTagNames.ts";
import { getContentLength } from "./getContentLength.ts";
import { stdoutCommand } from "./stdoutCommand.ts";


export const select = (__dirname: string) => {
  return async (request: Request) => {
    if (request.method === 'GET') {
      const description = "Show note selected by tag or web pages\n"
      return getTagNames(__dirname, description);
    }
  
    const command = "select.bash"
    const contentLength = getContentLength(request)
  
    if (contentLength === '0') {
      return stdoutCommand(__dirname, command);
    }
  
    const formData = await request.formData()
    const name = formData.get("name") // $1
    const counter = formData.get("counter") ?? ''//$2
  
    if (
      typeof name !== 'object' &&
      typeof counter !== 'object'
    ) {
      return stdoutCommand(
        __dirname,
        command,
        {
          args: [name, counter]
        }
      );
    }
  
    return "Invalid request";
  };
}
