import { getSearchParam } from "./getSearchParam.ts";
import { getTagNames } from "./getTagNames.ts";
import { createColumn } from "./createColumn.ts";
// import { spawnCommandProcess } from "./spawnCommandProcess.ts";
import { stdoutCommand } from "./stdoutCommand.ts";

export const create = (__dirname: string) => {
  return (request: Request) => {
    const command = "create_file.bash"
    const $1 = getSearchParam(request, "tag")
    console.log($1)
    if ($1 === null) {
      const description = "Create new note file/save web page\n"
      return createColumn(getTagNames(__dirname, "/create?tag=", true, description));
    }

    return stdoutCommand(
      __dirname,
      command,
      {
        args: [$1]
      }
    );

    // const commandProcess = await spawnCommandProcess(__dirname, command)
    // console.log(commandProcess.pid)
    // const commandReader = commandProcess.stdout.getReader()
    // const commandWriter = commandProcess.stdin.getWriter()
    // const stdout = await commandReader.read()
    // console.log("===============================")
    // return commandProcess.stdout;

    // console.log('stdout.done:',stdout.done)
    // commandProcess.kill("SIGINT")
    // return stdout.value;

    // commandWriter.write(new TextEncoder().encode("3"));
    // commandWriter.releaseLock();

    // await commandProcess.stdin.close();

    // const result = await commandProcess.output();
    // console.log(new TextDecoder().decode(result.stdout));
    // commandProcess.kill()
    // const menu = (await commandProcess.output()).stdout
    // console.log(new TextDecoder().decode(stdout.value))
    // commandProcess.stdout
    // return stdoutCommand(command);



    // OLD VERSION NOT USE
    // if (request.method === 'GET') {
    //   const description = "Create new note file/save web page\n"
    //   return getTagNames(description);
    // }

    // const command = "create_file.bash"
    // const contentLength = getContentLength(request)

    // if (contentLength === '0') {
    //   const commandProcess = await spawnCommandProcess(command)
    //   const menu = await commandProcess.output()
    //   console.log(menu)
    //   // commandProcess.stdout
    //   commandProcess.kill("SIGINT")
    //   return menu;
    //   // return stdoutCommand(command);
    // }

    // const formData = await request.formData()
    // const tag = formData.get("name") // $1

    // if (typeof tag !== 'object') {
    //   return stdoutCommand(
    //     command,
    //     {
    //       args: [tag]
    //     }
    //   );
    // }

    return "Invalid request";
  };
}
