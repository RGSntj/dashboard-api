import "../utils/types.d.ts";
import fastifyJWT from "@fastify/jwt";
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import cors from "@fastify/cors";

import UserController from "./controller/UserController";
import CallController from "./controller/CallController";
import AuthController from "./controller/AuthController";

const app: FastifyInstance = Fastify();

app.register(fastifyJWT, {
  secret: process.env.SECRET_TOKEN!,
});

app.addHook("preHandler", (req, res, next) => {
  req.jwt = app.jwt;
  return next();
});

app.register(cors, {
  origin: "*",
});

app.decorate(
  "authenticate",
  async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      reply.send({
        message: "JWT inválido !",
      });
    }
  }
);

app.post("/create-user", UserController.createUser);

app.post("/auth", AuthController.authenticate);

app.post(
  "/create-call",
  { preHandler: [app.authenticate] },
  CallController.createCall
);

app.get("/get-all-calls", CallController.getAllCalls);

app.get("/get-call/:id", CallController.getCallById);

app.delete(
  "/delete-call/:id",
  { preHandler: [app.authenticate] },
  CallController.deleteCallById
);

app
  .listen({ port: 3333, host: "0.0.0.0" })
  .then(() => console.log("Server is running 🚀🚀"));
