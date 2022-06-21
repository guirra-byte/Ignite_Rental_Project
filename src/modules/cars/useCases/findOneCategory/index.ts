import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { FindOneCategoryUseCase } from "./FindOneCategoryUseCase";
import { FindOneCategoryController } from "./FindOneCategoryController";

import { Request, Response } from 'express';

const FindOneCategoryInstanceIndex = async (request: Request, response: Response) => {

  const categoryRepository = CategoriesRepository.getInstance();

  const findOneCategoryUseCase = new FindOneCategoryUseCase(categoryRepository);

  const findOneCategoryController = new FindOneCategoryController(findOneCategoryUseCase);

  await findOneCategoryController
    .handle(request, response);

  return findOneCategoryController;
}

export { FindOneCategoryInstanceIndex }