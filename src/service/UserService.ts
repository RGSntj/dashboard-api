import { UserRepository, createUserData } from "../repository/UserRepository";
import { ValidationDataSchema } from "../validation/ValidationDataSchemas";

import { hash } from "bcrypt";

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  async save(user: createUserData) {
    const validate = new ValidationDataSchema();

    validate.validateUserSchema(user);

    const userExists = await this.userRepository.findUserByUsername(
      user.username
    );

    if (userExists) {
      throw new Error("Usuário já existe.");
    }

    const hashedPassword = await hash(user.password, 8);

    return await this.userRepository.save({
      username: user.username,
      password: hashedPassword,
    });
  }
}
