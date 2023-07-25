import { getContentLength } from "./getContentLength.ts";
import { stdoutCommand } from "./stdoutCommand.ts";


export const tag = (__dirname: string) => {
  return async (request: Request) => {
    if (request.method === 'GET') {
      return "Add new tag";
    }
  
    const contentLength = getContentLength(request)
  
    if (contentLength === '0') {
      return stdoutCommand(
        __dirname,
        "add_tag.bash"
      );
    }
  
    const formData = await request.formData()
    const tagName = formData.get("tag")
  
    if (tagName && typeof tagName !== 'object') {
      return stdoutCommand(
        __dirname,
        "add_tag.bash",
        {
          args: [tagName]
        }
      );
    }
  
    return "Invalid request";
  };
}
