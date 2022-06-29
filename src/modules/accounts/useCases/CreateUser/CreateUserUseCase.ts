import { IUserRepository } from "../../repositories/IUserRepository";
import { hash } from "bcryptjs";
import { AppError } from '../../../../Shared/infra/http/Errors/AppError';

export class CreateUserUseCase {

  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute(name: string, username: string, email: string, password: string, driver_license: string): Promise<void> {

    const passwordHash = await hash(password, 8);

    const findUser = await this
      .userRepository
      .findOne(name);

    if (findUser) {

      throw new AppError("User already exists!");
    }

    console.log("Chegou aqui");

    await this
      .userRepository
      .create({
        name, username, email,
        password: passwordHash, driver_license
      });

    const findUserTest = await this
      .userRepository
      .findOne(username);

    console.log(findUserTest);

  }
}
