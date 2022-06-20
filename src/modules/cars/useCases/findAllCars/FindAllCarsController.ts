import { Request, Response } from 'express';
import { FindAllCarsUseCase } from './FindAllCarsUseCase';

export class FindAllCarsController {

  constructor(private findAllCarsUseCase: FindAllCarsUseCase) { }

  async handle(request: Request, response: Response) {

    try {

      const findAllCars = await this
        .findAllCarsUseCase
        .execute();

      return response
        .status(200)
        .json({ findAllCars });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: { exception } });
    }
  }
}