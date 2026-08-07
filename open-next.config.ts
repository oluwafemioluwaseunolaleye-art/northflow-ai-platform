import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default config — this app doesn't yet need custom incremental cache /
// queue overrides. See https://opennext.js.org/cloudflare for options
// (e.g. R2-backed ISR cache) if that becomes necessary later.
export default defineCloudflareConfig();
