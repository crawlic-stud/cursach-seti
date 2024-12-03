import type { Pipeline, Config } from "pipelight";

const my_pipe: Pipeline = {
  name: "pre-commit-job",
  steps: [
    {
      name: "Remove old container",
      commands: [`docker compose down -f src/docker-compose.yml`],
    },
    {
      name: "Build new container",
      commands: [`docker compose build -f src/docker-compose.yml`],
    },
    {
      name: "Run tests",
      commands: [`docker compose up -f src/docker-compose.yml tests --build`],
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
