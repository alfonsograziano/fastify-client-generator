const fp = require("fastify-plugin");
const fs = require("fs/promises");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function fastifyClientGenerator(fastify, opts) {
  await fastify.register(
    require("@fastify/swagger"),
    opts.fastifySwaggerOptions
  );

  fastify.addHook("onReady", async function () {
    const currentDefinition = fastify.swagger({ yaml: true });
    try {
      const oldDefinition = await fs.readFile(
        opts.openApiDefinitionPath,
        "utf8"
      );
      if (oldDefinition === currentDefinition) return;
    } catch (error) {
      fastify.log.warn(
        "OpenAPI definition file not found. Creating a new one."
      );
    }

    if (opts.openApiDefinitionPath) {
      await fs.writeFile(opts.openApiDefinitionPath, currentDefinition);
    }

    for (const client of opts.clients) {
      const command = `openapi-generator-cli generate -i ${opts.openApiDefinitionPath} -g ${client.type} -o ${client.outputPath}`;
      const { stderr } = await exec(command);
      if (stderr) {
        throw new Error(stderr);
      }
    }
    fastify.log.info("Clients generated successfully!");
  });
}

module.exports = fp(fastifyClientGenerator, {
  fastify: "4.x",
  name: "fastifyClientGenerator",
});
module.exports.default = fastifyClientGenerator;
module.exports.fastifyClientGenerator = fastifyClientGenerator;
