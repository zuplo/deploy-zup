const core = require("@actions/core");
const github = require("@actions/github");
const { deploy } = require("@zuplo/orchestration");

try {
  const project = core.getInput("project");
  const environment = core.getInput("environment");

  deploy({
    deploymentName: project,
    environment,
    sourceDirectory: process.cwd(),
  })
    .then(() => {
      github.context.repo;
    })
    .catch((error) => {
      core.setFailed(error.message);
    });
} catch (err) {
  core.setFailed(error.message);
}
