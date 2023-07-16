#!/usr/bin/env -S deno run --allow-net --allow-run

import { serve } from "https://deno.land/std@0.194.0/http/server.ts";
import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path
  .dirname(
    path.fromFileUrl(import.meta.url)
  );

const create = () => {
  return "";
}

const random = () => {
  const command = new Deno
    .Command(
      __dirname + "/show_random_note.bash"
    );
  const { stdout } = command.outputSync();
  return new TextDecoder().decode(stdout);
}

const select = () => {
  return "";
}

const tag = () => {
  return "";
}

const edit = () => {
  return "";
}

const clear = () => {
  return "";
}

const update = () => {
  return "";
}

const select_all = () => {
  return "";
}

const search = () => {
  return "";
}

const port = 8080;
const COMMAND = {
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

console.log(`Webserver running: http://localhost:${port}/`);
await serve(handler, { port });