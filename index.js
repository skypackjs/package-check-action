const path = require("path");
const core = require("@actions/core");

main();

async function main() {
  const cwd = core.getInput("cwd");

  try {
    const args = [];
    if (cwd) {
      core.info(`Setting working directory to ${path.resolve(cwd)}`);
      args.push("--cwd", path.resolve(cwd));
    }

    const cli = require("@skypack/package-check");
    const run = cli.run || cli.cli || cli.default;
    await run(args);
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}
