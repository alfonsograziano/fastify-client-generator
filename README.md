# Fastify Client Generator

The Fastify Client Generator plugin for Fastify enables automatic generation of client libraries based on your Fastify application's OpenAPI (formerly Swagger) definitions.

This approach addresses several common issues associated with using REST APIs by automating the synchronization between server-side APIs and client-side applications, ensuring type safety, reducing manual errors, and speeding up the development process.

## Problems with REST APIs

- **Lack of Type Safety**: Traditional REST APIs often lead to manual type definitions on the client side, increasing the risk of mismatches and errors.
- **Manual Synchronization**: Keeping client-side applications in sync with server-side API updates requires manual effort, leading to potential inconsistencies.
- **Increased Development Time**: Developers spend considerable time writing and updating client libraries for different languages or platforms.

## **Solution: Official Client Generation**

Having official clients in multiple languages automatically generated for your backend can significantly improve the development workflow:

- **Type Safety**: In languages like Typescript, this tool generates type definitions automatically from your API schemas, ensuring that the client and server agree on the data structures being exchanged.
- **Automatic Synchronization**: Any updates to the API are immediately reflected in the client library, eliminating manual synchronization efforts.
- **Reduced Development Time**: Developers can focus on building features rather than maintaining API clients across different languages or platforms.

## **TypeScript Example: Auto-generating Types**

With **`fastifyClientGenerator`**, you define your API using Fastify's schema definitions, and it takes care of generating a TypeScript client library where all types are automatically derived from your schema. This means you write your API schema once, and you get a type-safe TypeScript client for free.

### **Usage**

This Fastify plugin generates automatically one or more clients by leveraging [Fastify Swagger](https://www.npmjs.com/package/@fastify/swagger) and the [OpenAPI Generator](https://openapi-generator.tech/).

### **Usage**

1. **Install Dependencies**:

```bash
npm install fastify fastify-client-generator
```

2. **Setup Your Fastify Application**:

Define your routes and schemas as usual with Fastify. Here's a simple example:

```js
const fastify = require("fastify")({ logger: true });

fastify.put("/some-route/:id", {
  schema: {
    // Define your schema here
  },
  handler: (req, reply) => {
    // Your handler logic
  },
});
```

For a complete example with a real schema, you can refer to [examples/base.js](./examples/base.js) 3. **Register `fastifyClientGenerator`**:

```js
const fastifyClientGenerator = require("fastifyClientGenerator");

fastify.register(fastifyClientGenerator, {
  fastifySwaggerOptions: {
    openapi: {
      info: {
        title: "Your API Title",
        version: "1.0.0",
      },
    },
  },
  openApiDefinitionPath: "./openapi.yaml",
  // Define here all the clients you need
  // Based on the OpenAPI Generator
  clients: [
    {
      type: "typescript",
      outputPath: "./ts-client",
    },
  ],
});
```

4. **Generate Clients**:

Simply run your Fastify application. The plugin generates or updates the TypeScript client based on the current API definitions.

### **Potential Usage**

The generated clients can be imported into any application, providing immediate access to typed API functions. This makes API calls straightforward, with editors offering autocompletion for API functions and their parameters.

In case of popular languages like Typescript, OpenAPI Generators offers even more generators per language using different fetching alternatives like Axios or the Node.js fetch function.

### **Useful Resources**

- [Fastify](https://www.fastify.io/): The core framework used for creating the server.
- [@fastify/swagger](https://github.com/fastify/fastify-swagger): Fastify plugin for serving Swagger UI generated from your routes' schemas.
- [OpenAPI Generator](https://openapi-generator.tech/): Tool used by the plugin to generate client libraries from OpenAPI specifications.

## **Contributing**

Contributions are welcome! Please submit a pull request or open an issue for any feature requests or bug reports. The generation also works in watch mode with tools like nodemon. The clients are regenerated every time the OpenAPI definition change. In case you change your backend and the API schema didn't change, the clients will not be generated.

## **License**

This project is licensed under the MIT License.
