import type { Pipeline, Config } from "pipelight";

const CONTAINER_NAME = "best-api-tests";

const my_pipe: Pipeline = {
  name: "pre-commit-job",
  steps: [
    {
      name: "Run tests",
      commands: [
        `docker compose -f src/docker-compose.yml up tests --build \
        && if [ $(docker inspect best-api-tests --format='{{.State.ExitCode}}) -ne 0 ]; then exit 1; fi`
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


const config: Config = {
  pipelines: [my_pipe],
};

export default config;
