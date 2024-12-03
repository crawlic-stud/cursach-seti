import type { Pipeline, Config } from "pipelight";

const CONTAINER_NAME = "best-api-tests";

// docs:
// https://pipelight.dev/introduction/description.html

const pre_commit: Pipeline = {
  name: "pre-commit-job",
  steps: [
    {
      name: "Run tests",
      commands: [
        `docker compose -f src/docker-compose.yml up tests --build \
        && if [ $(docker inspect best-api-tests --format='{{.State.ExitCode}}') -ne 0 ]; then exit 1; fi`
      ],
      on_failure: [{
        name: "Do nothing",
        commands: ["echo FAILURE"]
      }],
      on_success: [{name: "Success!", commands: ["echo SUCCESS"]}],
    }
  ],
  triggers: [{
    actions: ["pre-commit"],
    branches: ["master"]
  }]
};


const on_change: Pipeline = {
  name: "on-change-job",
  steps: [
    {
      name: "Run linter",
      commands: ["black ."],
      on_failure: [{
        name: "Do nothing",
        commands: ["echo FAILURE"]
      }],
      on_success: [{name: "Success!", commands: ["echo SUCCESS"]}],
    }
  ],
  triggers: [{
    actions: ["watch"],
  }]
}

const config: Config = {
  pipelines: [pre_commit, on_change],
};

export default config;
