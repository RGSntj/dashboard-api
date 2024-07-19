import { JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

interface UserPayload {
  username: string;
  userId: string;
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserPayload;
  }
}
