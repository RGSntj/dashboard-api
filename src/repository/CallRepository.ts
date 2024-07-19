import { z } from "zod";
import { db } from "../database/prisma";

export const createCallSchema = z.object({
  category: z.string(),
  description: z.string(),
  authorId: z.string(),
});

export type createCallData = z.infer<typeof createCallSchema>;

export class CallRepository {
  async save(data: createCallData) {
    return await db.call.create({
      data,
    });
  }

  async getCall(id: string) {
    const call = await db.call.findUnique({
      where: {
        id,
      },
    });

    return call;
  }

  async delete(id: string) {
    await db.call.delete({
      where: {
        id,
      },
    });
  }

  async getAll() {
    const calls = await db.call.findMany({
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    return calls;
  }
}
