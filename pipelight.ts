import type { Pipeline, Config } from "pipelight";

const CONTAINER_NAME = "best-api";

const my_pipe: Pipeline = {
  name: "pre-commit-job",
  steps: [
    {
      name: "Remove old container",
      commands: [`docker rm -f ${CONTAINER_NAME}`],
    },
    {
      name: "Build new container",
      commands: [`docker build . -f src/Dockerfile -t ${CONTAINER_NAME}`],
    },
    {
      name: "Run tests",
      commands: [`docker run --entrypoint "python -m pytest" ${CONTAINER_NAME}`],
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
