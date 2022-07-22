import { IUserRepository } from '../../../repositories/IUserRepository';
import { AppError } from '../../../../../Shared/infra/http/Errors/AppError';
import { AUTH } from '../../../../../Config/auth';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthUserRequestProps {

  email: string
  password: string
}

interface IAuthRequest {

  user: {
    name: string,
    email: string,
    id: string
  },
  token: string,
  refresh_token: string
}

export class AuthUserUseCase {

  constructor(
    private userRepository: IUserRepository) { }

  async execute({ email, password }: IAuthUserRequestProps): Promise<IAuthRequest> {

    const user = await this
      .userRepository
      .findOne(email);

    if (user === undefined) {

      throw new AppError("Email or password incorrect, but now is the Email!");
    }

    const {
      EXPIRES_IN_REFRESH_TOKEN,
      EXPIRES_IN_TOKEN,
      REFRESH_TOKEN_SECRET_KEY,
      TOKEN_SECRET_KEY } = AUTH;

    const passwordComparison = await compare(password, user.password);

    if (passwordComparison === undefined) {

      throw new AppError("Email or password are incorrect!");
    }

    const token = sign({}, TOKEN_SECRET_KEY, {

      subject: user.id,
      expiresIn: EXPIRES_IN_TOKEN
    });

    const refresh_token = sign(
      { email },
      REFRESH_TOKEN_SECRET_KEY,
      {
        subject: user.id,
        expiresIn: EXPIRES_IN_REFRESH_TOKEN
      });

    const requireTokens: IAuthRequest = {

      user: {
        name: user.name,
        email: user.email,
        id: user.id
      },
      token: token,
      refresh_token: refresh_token
    }

    return requireTokens;
  }
}