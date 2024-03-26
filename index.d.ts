import { FastifyInstance } from "fastify";
import {
  FastifyDynamicSwaggerOptions,
  FastifyStaticSwaggerOptions,
} from "@fastify/swagger";

type SwaggerOptions =
  | FastifyStaticSwaggerOptions
  | FastifyDynamicSwaggerOptionsWithoutSwagger;

// We force the user to use the OpenAPI V3 definition
// Since @openapitools/openapi-generator-cli only supports OpenAPI V3 in the latest versions
type FastifyDynamicSwaggerOptionsWithoutSwagger = Omit<
  FastifyDynamicSwaggerOptions,
  "swagger"
>;

export default ClientGenerator;

declare function ClientGenerator(
  instance: FastifyInstance,
  opts: {
    openApiDefinitionPath: string;
    clients: {
      type: string;
      outputPath: string;
    }[];
    fastifySwaggerOptions: SwaggerOptions;
  }
): Promise<void>;

declare namespace ClientGenerator {}
