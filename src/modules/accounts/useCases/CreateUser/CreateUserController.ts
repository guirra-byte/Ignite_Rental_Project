import { CreateUserUseCase } from './CreateUserUseCase';
import { Request, Response } from 'express';

export class CreateUserController {

  constructor(private createUserUseCase: CreateUserUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { name, username, email, password, driver_license } = request.body;

    try {

      const user = await this
        .createUserUseCase
        .execute(name, username, email, password, driver_license);

      return response
        .status(201)
        .send();
    }
    catch (exception) {

      return response
        .status(400)
        .json({ message: { exception } });
    }
  }
}