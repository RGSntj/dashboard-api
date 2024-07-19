import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { UserService } from "../service/UserService";
import { UserRepository } from "../repository/UserRepository";

export default {
  async createUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const createUserSchema = z.object({
        username: z.string(),
        password: z.string(),
      });

      const { username, password } = createUserSchema.parse(req.body);

      const userService = new UserService(new UserRepository());

      const result = await userService.save({
        username,
        password,
      });

      return reply.status(201).send(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return reply.status(400).send({
          message: err.message,
        });
      }
    }
  },
};
