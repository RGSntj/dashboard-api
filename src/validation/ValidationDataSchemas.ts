import { createCallData } from "../repository/CallRepository";
import { createUserData } from "../repository/UserRepository";

export class ValidationDataSchema {
  validateCallSchema(data: createCallData) {
    this.validateField(data.category, "Categoria é obrigátorio !");

    this.validateField(data.description, "Descrição é obrigátorio !");
  }

  validateUserSchema(data: createUserData) {
    this.validateField(data.username, "Usuário é obrigátorio");

    this.validateField(data.password, "Password é obrigátorio");
  }

  private validateField(field: string, errorMessage: string) {
    if (!field) throw new Error(errorMessage);
  }
}
