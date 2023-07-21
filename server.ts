#!/usr/bin/env -S deno run --allow-net --allow-run

import { serve } from "https://deno.land/std@0.194.0/http/server.ts";
import { getNetworkAddr } from "./server_get_network_addr.ts";
import { COMMAND } from "./server_commands.ts";

const port = 8080;
const netAddr = getNetworkAddr(port);


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

const handler = (request: Request): Response => {
  const url = new URL<ProjectURL>(request.url)

  console.log(url.pathname)
  const key = url.pathname.slice<keyof typeof COMMAND>(1)
  const stdout = COMMAND[key]?.()

  return new Response(stdout, { status: 200 });
};

console.log(`Local network ip: ${netAddr}`);
await serve(handler, { port });
