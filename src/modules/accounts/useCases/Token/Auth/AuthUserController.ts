import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthUserUseCase } from './AuthUserUseCase';

export class AuthUserController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { email, password } = request.body;

    const createAuth = container
      .resolve(AuthUserUseCase);

    const authToken = await createAuth
      .execute({ email, password });

    return response
      .status(201)
      .json({ authToken });
  }
}
