import z from "zod";
import { db } from "../database/prisma";

const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type createUserData = z.infer<typeof createUserSchema>;

export class UserRepository {
  async findUserByUsername(username: string) {
    const response = await db.user.findUnique({
      where: {
        username,
      },
    });

    return response;
  }

  async save(data: createUserData) {
    return await db.user.create({
      data: {
        username: data.username,
        password: data.password,
      },
      select: {
        id: true,
        username: true,
      },
    });
  }
}
