import { Request, Response } from 'express';
import { ListCarsUseCase } from './ListCarsUseCase';

export class ListCarsController {

  constructor(private listCarsUseCase: ListCarsUseCase) { }

  async handle(request: Request, response: Response) {

    try {

      const findAllCars = await this
        .listCarsUseCase
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