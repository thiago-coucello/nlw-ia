import { FastifyInstance } from "fastify";
import { z } from "zod";
import fs from "node:fs";
import { prisma } from "../lib/prisma";
import { openai } from "../lib/openai";

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post("/videos/:id/transcription", async (req, rep) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      prompt: z.string(),
    });

    const { id } = paramsSchema.parse(req.params);
    const { prompt } = bodySchema.parse(req.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id
      }
    });

    const audioReadStream = fs.createReadStream(video.path);

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: "whisper-1",
      language: "pt",
      response_format: "json",
      temperature: 0,
      prompt
    })

    const transcription = response.text;

    const updatedVideo = await prisma.video.update({
      where: {
        id,
      },
      data: {
        transcription
      }
    })

    return updatedVideo;
  });
}