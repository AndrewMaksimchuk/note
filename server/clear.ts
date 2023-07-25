import { notImplemented } from "./notImplemented.ts";

export const clear = (__dirname: string) => {
  return () => {
    notImplemented();
    return "";
  }
}
