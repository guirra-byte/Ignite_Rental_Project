import { Request, Response } from 'express';
import { FindOneCarUseCase } from './FindOneCarUseCase';

export class FindOneCarController {

  constructor(private findOneCarUseCase: FindOneCarUseCase) { }

  async handle(request: Request, response: Response) {

    const { name } = request.body;

    try {

      const findOneCar = await this
        .findOneCarUseCase
        .execute(name);

      return response
        .status(200)
        .json({ findOneCar });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: { exception } });
    }
  }
}