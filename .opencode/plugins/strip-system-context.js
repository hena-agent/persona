// Strips framework-authored context from the system message for every agent
// in this project: the "# Your Model" identity block, the built-in
// "<env>...</env>" environment block, and the "Today's date" line.
// Useful together with a minimal custom agent (see .opencode/agents/minimal.md).
export default {
  id: "local.strip-system-context",
  async setup(ctx) {
    await ctx.session.hook("context", (event) => {
      event.system = event.system.filter((part) => {
        const text = typeof part.text === "string" ? part.text : "";
        return !(
          text.startsWith("# Your Model") ||
          text.includes("<env>") ||
          text.startsWith("Today's date")
        );
      });
    });
  },
};
