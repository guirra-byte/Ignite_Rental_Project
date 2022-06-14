import { verify } from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

import { AppError } from '@error/AppError';
import { UserRepository } from '@modules/accounts/repositories/implementations/UserRepository';

interface IPayloadProps {

  name: string
  email: string
  sub: string
}

export async function VerifyUserAuthToken(request: Request, response: Response, next: NextFunction) {

  const bearerToken = request.headers.authorization;

  if (!bearerToken) {

    throw new AppError("Token is missing!");
  }

  const token = bearerToken.split(" ");
  const authToken = token[1];

  try {

    const user = verify(authToken, "f750766d2e4617e94eb4f943625ceeaa") as IPayloadProps;

    const userRepository = new UserRepository();
    await userRepository.findById(user.sub);

    if (!userRepository) {

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