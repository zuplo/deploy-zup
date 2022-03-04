import core from "@actions/core";
import { deploy } from "@zuplo/orchestration";

const project = core.getInput("project");
const environment = core.getInput("environment");

deploy({
  deploymentName: project,
  environment,
  sourceDirectory: process.cwd(),
}).catch((error) => {
  core.setFailed(error.message);
});
