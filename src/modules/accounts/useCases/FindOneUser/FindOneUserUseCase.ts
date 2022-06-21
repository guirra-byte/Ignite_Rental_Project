import { User } from '../../model/User';
import { AppError } from '../../../../Shared/infra/http/Errors/AppError';
import { IUserRepository } from '../../repositories/IUserRepository';

export class FindOneUserUseCase {

  constructor(private userRepository: IUserRepository) { }

  async execute(email: string): Promise<User> {

    const findUser = await this
      .userRepository
      .findOne(email);

    if (findUser === undefined) {

      throw new AppError("User does exists");
    }

    return findUser;
  }
}

