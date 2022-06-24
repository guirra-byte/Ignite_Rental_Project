import { Request, Response } from 'express';
import { ListCarsAvailableUseCase } from './ListCarsAvailableUseCase';

export class ListCarsAvailableController {

  constructor(private listCarsAvailableUseCase: ListCarsAvailableUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    try {

      const findAllCarsAvailable = await this
        .listCarsAvailableUseCase
        .execute();

      return response
        .status(200)
        .json({ findAllCarsAvailable });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ exception });
    }
  }
}