import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path
    .dirname(
        path.fromFileUrl(import.meta.url)
    );

export const notImplemented = () => {
    console.log("Not implemented");
    Deno.exit();
}

export const create = () => {
    notImplemented();
    return "";
}

export const random = () => {
    const command = new Deno
        .Command(
            __dirname + "/show_random_note.bash"
        );
    const { stdout } = command.outputSync();
    return new TextDecoder().decode(stdout);
}

export const select = () => {
    notImplemented();
    return "";
}

export const tag = () => {
    notImplemented();
    return "";
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