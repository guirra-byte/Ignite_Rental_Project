import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationsUseCase } from './CreateSpecificationUseCase';

export class CreateSpecificationController {

  constructor(private createSpecificationUseCase: CreateSpecificationsUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { name, description } = request.body;

    try {

      await this
        .createSpecificationUseCase
        .execute({ name, description });

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