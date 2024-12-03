import type { Pipeline, Config } from "pipelight";

const my_pipe: Pipeline = {
  name: "pre-commit-job",
  steps: [
    {
      name: "Remove old container",
      commands: [`docker compose -f src/docker-compose.yml down`],
    },
    {
      name: "Run tests",
      commands: [`docker compose -f src/docker-compose.yml up tests --build`],
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
