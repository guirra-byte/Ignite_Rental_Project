import { Request, Response, NextFunction } from 'express';
import { AUTH } from '../../../../../Config/auth';

import { verify } from 'jsonwebtoken';

import { UserRepository } from '../../../../../modules/accounts/repositories/implementations/UserRepository';
import { RefreshTokenRepository } from '../../../../../modules/accounts/repositories/implementations/RefreshTokenRepository';
import { AppError } from '../../Errors/AppError';

interface IPayloadProps {

  name: string
  email: string
  sub: string
}

const VerifyUserAuthToken = async (request: Request, response: Response, next: NextFunction) => {

  const bearerToken = request.headers.authorization;
  const machine_ip = request.ip;

  if (!bearerToken) {

    throw new AppError("Token is missing!", 400);
  }

  const token = await bearerToken.split(" ");
  const authToken = token[1];

  try {

    const user = verify(authToken, AUTH.EXPIRES_IN_REFRESH_TOKEN) as IPayloadProps;

    const { sub } = user;

    const refreshTokenRepository: RefreshTokenRepository = RefreshTokenRepository.getInstance();

    const findUser = await refreshTokenRepository
      .ensureUserAlreadyHaveARefreshToken(sub, machine_ip);

    if (!findUser) {

      throw new AppError("This user does not exists!");
    }

    request.user = {

      id: user.sub
    }

    next();

  }
  catch (exception) {

    throw new AppError("Token are invalid!");
  }
}

export { VerifyUserAuthToken }  