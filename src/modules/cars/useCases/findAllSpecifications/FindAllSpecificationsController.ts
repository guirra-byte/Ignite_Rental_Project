import { Request, Response } from 'express';
import { FindAllSpecificationsUseCase } from './FindAllSpecificationsUseCase';

export class FindAllSpecificationsController {

  constructor(private findAllSpecifications: FindAllSpecificationsUseCase) { }

  async handle(request: Request, response: Response) {

    try {

      const findAllSpecifications = await this
        .findAllSpecifications
        .execute();

      return response
        .status(200)
        .json({ findAllSpecifications });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: exception });
    }
  }
}