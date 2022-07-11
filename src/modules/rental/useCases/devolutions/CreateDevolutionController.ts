import { Request, Response } from 'express';
import { CreateDevolutionUseCase } from './CreateDevolutionUseCase';

export class CreateDevolutionController {

  constructor(private createDevolutionUseCase: CreateDevolutionUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { car_id, rental_id } = request.params;
    const user_id = request.user.id;

    try {

      await this
        .createDevolutionUseCase
        .execute({
          user_id: user_id,
          car_id: car_id,
          rental_id: rental_id
        });

      return response
        .status(201)
        .send();
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: exception });
    }
  }
}