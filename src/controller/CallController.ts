import "../../utils/types.d.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import {
  CallRepository,
  createCallData,
} from "../repository/CallRepository.js";

import { CallService } from "../service/CallService.js";

// Utils
import { capitalizeFirstLetter } from "../../utils/capitalizeLetter.js";

export default {
  async createCall(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { category, description } = req.body as createCallData;

      const callService = new CallService(new CallRepository());

      const data = {
        category,
        description,
        authorId: req.user.userId,
      };

      const result = await callService.createCall(data);

      return reply.send({
        id: result.id,
      });
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({
          message: error.message,
        });
      }
    }
  },

  async deleteCallById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const callService = new CallService(new CallRepository());

      const callsParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = callsParamsSchema.parse(req.params);

      await callService.deleteCallById(id, req.user.userId);

      return reply.send({ message: "Call deleted successfully !" });
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({
          mesage: error.message,
        });
      }
    }
  },

  async getCallById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const callService = new CallService(new CallRepository());

      const validateParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = validateParamsSchema.parse(req.params);

      const call = await callService.getCallById(id);

      return reply.send(call);
    } catch (error: any) {
      if (error instanceof Error) {
        return reply.status(400).send({
          message: error.message,
        });
      }
    }
  },

  async getAllCalls(req: FastifyRequest, reply: FastifyReply) {
    const callService = new CallService(new CallRepository());

    const allCalls = await callService.getAllCalls();

    const allCallsFormated = allCalls.map((item) => {
      return {
        ...item,
        author: {
          ...item.author,
          username: capitalizeFirstLetter(item.author.username),
        },
      };
    });

    return reply.send(allCallsFormated);
  },
};
