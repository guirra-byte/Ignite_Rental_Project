import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { hash } from "bcryptjs";
import { AppError } from '../../../../Errors/AppError';

@injectable()
export class CreateUserUseCase {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute(name: string, email: string, password: string, driver_license: string) {

    const passwordHash = await hash(password, 8);

    const findUser = await this
      .userRepository
      .findOne(name);

    if (findUser) {

      throw new AppError("User already exists!", 404);
    }

    const user = await this
      .userRepository
      .create({ name, email, password: passwordHash, driver_license });

    return user;


  }
}
