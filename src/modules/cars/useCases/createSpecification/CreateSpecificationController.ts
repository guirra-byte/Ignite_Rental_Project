import { Request, Response } from 'express';
import { CreateSpecificationsUseCase } from './CreateSpecificationUseCase';

export class CreateSpecificationController {

  constructor(private createSpecificationUseCase: CreateSpecificationsUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { name, description, car } = request.body;

    try {

      await this
        .createSpecificationUseCase
        .execute({ name, description, car });

      return response
        .send()
        .status(201);
    }
    catch (exception) {

      return response
        .status(400)
        .json("Deu erro aqui");
    }

  }
}