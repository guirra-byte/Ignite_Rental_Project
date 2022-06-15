import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '../../../../modules/accounts/repositories/implementations/UserRepository';


export interface ITokenRequestPayload {

  token: string,
  user: {

    id: string,
    name: string,
    username: string
    email: string
  }
}


export interface IVerifyAuthPayloadProps {

  sub: string
}

const verifyUserIsAdmin = async (request: Request, response: Response, next: NextFunction) => {

  const tokenPass = "f750766d2e4617e94eb4f943625ceeaa";

  const userAuthToken = request.headers.authorization;

  if (userAuthToken === undefined) {

    return response
      .status(400)
      .json({ message: "Token is missing" });
  }

  const token = userAuthToken.split(" ");
  const authToken = token[1];

  try {

    const verifyAuthTokenValidation = await verify(authToken, tokenPass) as IVerifyAuthPayloadProps;
    const { sub } = verifyAuthTokenValidation;

    const repository = UserRepository.getInstance();

    const findUserById = await repository
      .findById(sub);

    if (!findUserById) {

      return response
        .status(400)
        .json({ message: "This User does exists" });
    }

    const verifyUserIsAdmin = await repository
      .verifyUserIsAdmin(sub);

    if (!verifyUserIsAdmin) {

      return response
        .status(400)
        .json({ message: "This session permission is a private" });
    }

    const { name, username, email, id } = findUserById;

    const requestAuthToken: ITokenRequestPayload = {

      token: authToken,
      user: {

        name: name,
        email: email,
        username: username,
        id: id
      }
    }

    return requestAuthToken;
  }
  catch {

    return response
      .status(400)
      .json({ message: "Token are invalid" });
  }
}

export { verifyUserIsAdmin }