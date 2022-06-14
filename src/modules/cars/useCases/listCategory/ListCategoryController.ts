import { Request, Response } from 'express';
import { ListCategoryUseCase } from './ListCategoryUseCase';
import { container } from 'tsyringe';

export class ListCategoryController {

  async handle(request: Request, response: Response) {

    const listAllCategories = container.resolve(ListCategoryUseCase);

    const all = await listAllCategories.execute();

    return response.json(all).status(201);


  }
}



