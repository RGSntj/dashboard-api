import { createUserData, UserRepository } from "../repository/UserRepository";

import { compare } from "bcrypt";

export class AuthService {
  async auth(data: createUserData) {
    const userRepository = new UserRepository();

    const user = await userRepository.findUserByUsername(data.username);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const verifyPassword = await compare(data.password, user.password);

    if (!verifyPassword) {
      throw new Error("Senha incorreta !");
    }

    return user;
  }
}
