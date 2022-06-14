import { FindOneCategoryUseCase } from "./FindOneCategoryUseCase";
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export class FindOneCategoryController {

  async handle(request: Request, response: Response) {

    const { name } = request.params;

    const findOneCategory = container.resolve(FindOneCategoryUseCase);
    await findOneCategory.execute(name);


    return response.status(201).json("Aqui está seu Categoria");

  }
}