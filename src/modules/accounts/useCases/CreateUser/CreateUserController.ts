import { container } from "tsyringe";
import { CreateUserUseCase } from "@modules/accounts/useCases/CreateUser/CreateUserController";
import { Request, Response } from 'express';

export class CreateUserController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { name, email, password, driver_license } = request.body;

    const createUser = await container.resolve(CreateUserUseCase);
    const user = await createUser.execute(name, email, password, driver_license);

    return response
      .status(201)
      .send();
  }
}