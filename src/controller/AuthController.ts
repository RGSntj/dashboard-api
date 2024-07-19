import "../../utils/types.d.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthService } from "../service/AuthService.js";

export default {
  async authenticate(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userSchema = z.object({
        username: z.string(),
        password: z.string(),
      });

      const { username, password } = userSchema.parse(req.body);

      const authService = new AuthService();

      const user = await authService.auth({
        username,
        password,
      });

      const token = req.jwt.sign(
        { username, userId: user.id },
        {
          expiresIn: "1d",
        }
      );

      return reply.send({
        token: token,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return reply.status(400).send({
          message: error.message,
        });
      }
    }
  },
};
