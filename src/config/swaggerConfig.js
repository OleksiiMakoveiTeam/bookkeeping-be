import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookkeeping Bot API",
      version: "1.0.0",
      description: "API documentation for the Bookkeeping Bot system",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./src/api/routes/*.js", "./src/api/models/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("✅ Swagger Docs available at: http://localhost:5000/api-docs");

  if (process.env.NODE_ENV !== "production") {
    return;
  }
  const outputPath = path.resolve("./swagger.json");
  fs.writeFileSync(outputPath, JSON.stringify(swaggerDocs, null, 2));
  console.log(`📄 Swagger JSON file generated at: ${outputPath}`);
}

export default swaggerDocs;
