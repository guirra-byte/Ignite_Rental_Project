import { Request, Response } from 'express';
import { ListCategoryUseCase } from './ListCategoryUseCase';
import { container } from 'tsyringe';

export class ListCategoryController {

  constructor(private findAllCategories: ListCategoryUseCase) { }

  async handle(request: Request, response: Response) {

    try {

      const allCategories = await this
        .findAllCategories
        .execute();

      return response
        .status(200)
        .json({ allCategories });

    }
    catch (exception) {

      return response
        .status(400)
        .json({ message: { exception } });
    }
  }
}



