import { Command, Option } from "@commander-js/extra-typings";
import { bookmarkCmd } from "commands/bookmarks";
import { whoamiCmd } from "commands/whoami";
import { setGlobalOptions } from "lib/globals";

const program = new Command()
  .name("hoarder-cli")
  .description("A CLI interface to interact with the hoarder api")
  .addOption(
    new Option("--api-key <key>", "The API key to interact with the API")
      .makeOptionMandatory(true)
      .env("HOARDER_API_KEY"),
  )
  .addOption(
    new Option(
      "--server-addr <addr>",
      "The address of the server to connect to",
    )
      .makeOptionMandatory(true)
      .env("HOARDER_SERVER_ADDR"),
  )
  .version(process.env.SERVER_VERSION ?? "nightly");

program.addCommand(bookmarkCmd);
program.addCommand(whoamiCmd);

setGlobalOptions(program.opts());

program.parse();
