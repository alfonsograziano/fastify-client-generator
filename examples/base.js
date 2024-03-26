const fastify = require("fastify")({
  logger: true,
});
const fastifyClientGenerator = require("../index.js").default;

const buildApp = async () => {
  await fastify.register(fastifyClientGenerator, {
    fastifySwaggerOptions: {
      openapi: {
        info: {
          title: "OpenAPI 3.0 Example",
          description: "Description of the API.",
          version: "0.2.0",
        },
      },
    },
    openApiDefinitionPath: "./openapi.yaml",
    clients: [
      {
        type: "typescript",
        outputPath: "./ts-client",
      },
    ],
  });

  fastify.put(
    "/some-route/:id",
    {
      schema: {
        description: "post some data",
        tags: ["user", "code"],
        summary: "qwerty",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "user id",
            },
          },
        },
        body: {
          type: "object",
          properties: {
            hello: { type: "string" },
            obj: {
              type: "object",
              properties: {
                some: { type: "string" },
              },
            },
          },
        },
        response: {
          201: {
            description: "Successful response",
            type: "object",
            properties: {
              hello: { type: "string" },
            },
          },
          default: {
            description: "Default response",
            type: "object",
            properties: {
              foo: { type: "string" },
            },
          },
        },
      },
    },
    (req, reply) => {}
  );

  await fastify.ready();
};

buildApp();
