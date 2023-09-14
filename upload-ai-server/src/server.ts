import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { getAllPromptsRoute } from "./routes/getAllPrompts";
import { uploadVideoRoute } from "./routes/uploadVideo";
import { createTranscriptionRoute } from "./routes/createTranscription";
import { generateAiCompletionRoute } from "./routes/generateAiCompletion";

const app = fastify();

app.register(fastifyCors, {
  origin: "*"
});

app.register(getAllPromptsRoute);

app.register(uploadVideoRoute);

app.register(createTranscriptionRoute);

app.register(generateAiCompletionRoute);

app.listen({
  port: 3333,
  host: "0.0.0.0",
}).then(() => {
  console.log(`HTTP Server running on: 0.0.0.0:3333`)
});