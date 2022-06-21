import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import { UserRepository } from '../../../../../modules/accounts/repositories/implementations/UserRepository';
import { AppError } from '../../Errors/AppError';

interface IPayloadProps {

  name: string
  email: string
  sub: string
}

const VerifyUserAuthToken = async (request: Request, response: Response, next: NextFunction) => {

  const bearerToken = request.headers.authorization;

  if (!bearerToken) {

    throw new AppError("Token is missing!", 400);
  }

  const token = await bearerToken.split(" ");
  const authToken = token[1];

  try {

    const user = verify(authToken, "f750766d2e4617e94eb4f943625ceeaa") as IPayloadProps;

    const { sub } = user;

    const userRepository = UserRepository
      .getInstance();

    const findUser = await userRepository
      .findById(sub);

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