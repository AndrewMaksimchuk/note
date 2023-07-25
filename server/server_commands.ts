// [command_script, $1, $2, $3]
import { create } from "./create.ts";
import { random } from "./random.ts";
import { select } from "./select.ts";
import { tag } from "./tag.ts";
import { edit } from "./edit.ts";
import { clear } from "./clear.ts";
import { update } from "./update.ts";
import { select_all } from "./selectAll.ts";
import { search } from "./search.ts";


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
