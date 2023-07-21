export const getNetworkAddr = (port: number) => {
  const command = new Deno
    .Command(
      "/usr/bin/hostname",
      {
        args: ["-I"]
      }
    );
  const { stdout } = command.outputSync();
  const ip = new TextDecoder()
    .decode(stdout)
    .trimEnd();
  return `${ip}:${port}`;
}