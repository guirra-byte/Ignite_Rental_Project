import { Request, Response } from 'express';
import { CreateSpecificationsUseCase } from './CreateSpecificationUseCase';

export class CreateSpecificationController {

  constructor(private createSpecificationUseCase: CreateSpecificationsUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { name, description, car_id } = request.body;

    try {

      await this
        .createSpecificationUseCase
        .execute({ name, description, car_id });

      return response
        .send()
        .status(201);
    }
    catch (exception) {

      return response
        .status(400)
        .json({ message: exception });
    }

  }
}