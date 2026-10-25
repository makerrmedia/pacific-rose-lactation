import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: "/home/claude/prl-site/tina/__generated__/.cache/1792897104137", url: "https://content.tinajs.io/4.0/content/dummy-id/github/main", token: "dummy-token", queries,  });
export default client;
  