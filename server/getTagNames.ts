import { stdoutCommand } from "./stdoutCommand.ts";
import { createLink } from "./createLink.ts";


export const getTagNames = (
  __dirname: string,
  href: string,
  add: boolean,
  prefix = "",
  suffix = "",
) => {
  const tags = stdoutCommand(
    __dirname,
    "show_tags.bash"
  )
  const tagsLinks = tags
    .trim()
    .split("\n")
    .reduce((previousValue, currentValue, currentIndex) => {
      return currentIndex === 0
        ? previousValue + currentValue
        : previousValue + createLink(add ? href + currentValue : href, currentValue)
    }, "")
  return `${prefix}<br>${tagsLinks}<br>${suffix}`;
}
