import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "@hoarder/trpc/routers/_app";

import { getGlobalOptions } from "./globals";

export function getAPIClient() {
  const globals = getGlobalOptions();
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${globals.serverAddr}/api/trpc`,
        transformer: superjson,
        headers() {
          return {
            authorization: `Bearer ${globals.apiKey}`,
          };
        },
      }),
    ],
  });
}
