#!/usr/bin/env -S deno run --allow-net --allow-run
import * as path from "https://deno.land/std@0.57.0/path/mod.ts";
import { serve } from "https://deno.land/std@0.194.0/http/server.ts";
import { getNetworkAddr } from "./server/server_get_network_addr.ts";
import { COMMAND } from "./server/server_commands.ts";

const port = 8080;
const netAddr = getNetworkAddr(port);

const __dirname = path.dirname(
  path.fromFileUrl(import.meta.url)
)


interface ProjectURL extends Omit<URL, "pathname"> {
  pathname: `/${keyof typeof COMMAND}`
}

declare const URL: {
  new <T = URL>(url: string | URL, base?: string | URL): T;
}

declare global {
  interface String {
    slice<T = string>(start?: number, end?: number): T;
  }
}

const handler = async (request: Request): Promise<Response> => {
  const url = new URL<ProjectURL>(request.url)
  const key = url.pathname.slice<keyof typeof COMMAND>(1)
  const stdout = await COMMAND[key]?.(__dirname)?.(request)

  return new Response(stdout, { status: 200, headers: {
    // "Content-Type": "text/plain; charset=utf-8",
    "Content-Type": "text/html; charset=utf-8",
  }});
};

console.log(`Local network ip: ${netAddr}`);
await serve(handler, { port });
