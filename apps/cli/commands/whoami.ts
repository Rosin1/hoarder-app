import { Command } from "@commander-js/extra-typings";
import { getAPIClient } from "lib/trpc";

export const whoamiCmd = new Command()
  .name("whoami")
  .description("returns info about the owner of this API key")
  .action(async () => {
    const resp = await getAPIClient().users.whoami.query();
    console.log(resp);
  });
