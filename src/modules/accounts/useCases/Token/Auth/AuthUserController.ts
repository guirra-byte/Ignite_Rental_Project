import { Request, Response } from 'express';
import { AuthUserUseCase } from './AuthUserUseCase';

export class AuthUserController {

  constructor(private authUserUseCase: AuthUserUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { email, password } = request.body;

    const createAuth = await this
      .authUserUseCase
      .execute({ email, password });

    return response
      .status(201)
      .json(createAuth);
  }
}
