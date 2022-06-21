import { IUserRepository } from '../../../repositories/IUserRepository';
import { AppError } from '../../../../../Shared/infra/http/Errors/AppError';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthUserRequestProps {

  email: string
  password: string
}

interface IRequestReturnProps {

  user: {
    name: string,
    email: string,
    id: string
  },
  token: string
}

export const passwordKey = "f750766d2e4617e94eb4f943625ceeaa";

export class AuthUserUseCase {

  constructor(
    private userRepository: IUserRepository) { }

  async execute({ email, password }: IAuthUserRequestProps): Promise<IRequestReturnProps> {

    const user = await this
      .userRepository
      .findOne(email);

    if (user === undefined) {

      throw new AppError("Email or password incorrect, but now is the Email!");
    }

    const passwordComparison = await compare(password, user.password);

    if (passwordComparison === undefined) {

      throw new AppError("Email or password are incorrect!");
    }

    const token = sign({}, passwordKey, {

      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IRequestReturnProps = {

      token,
      user: {
        name: user.name,
        email: user.email,
        id: user.id
      }
    }

    return tokenReturn;
  }
}