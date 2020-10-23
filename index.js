const core = require("@actions/core");

main();

async function main() {
  const cwd = core.getInput("cwd");

  try {
    if (cwd) {
      core.debug(`cwd input is set to "${cwd}". Changing working directory`);
      process.chdir(cwd);
      core.info(`working directory is ${process.cwd()}`);
    }

    const cli = require("@skypack/package-check");
    const run = cli.run || cli.cli || cli.default;
    await run();
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}
