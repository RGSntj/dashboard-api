import { CallRepository, createCallData } from "../repository/CallRepository";
import { ValidationDataSchema } from "../validation/ValidationDataSchemas";

export class CallService {
  private callRepository: CallRepository;

  constructor(repository: CallRepository) {
    this.callRepository = repository;
  }

  async createCall(data: createCallData) {
    const callValidation = new ValidationDataSchema();

    callValidation.validateCallSchema(data);

    return await this.callRepository.save(data);
  }

  async getCallById(id: string) {
    const call = await this.callRepository.getCall(id);

    if (!call) {
      throw new Error("Chamado não encotrado !");
    }

    return call;
  }

  async deleteCallById(id: string, userId: string) {
    const call = await this.getCallById(id);

    if (!call) {
      throw new Error("Chamado não encotrada");
    }

    if (call.authorId !== userId) {
      throw new Error("Este chamado não pertence a este usuário.");
    }

    await this.callRepository.delete(id);
  }

  async getAllCalls() {
    const calls = await this.callRepository.getAll();

    return calls;
  }
}
