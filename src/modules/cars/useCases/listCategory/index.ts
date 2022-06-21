import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoryUseCase } from "./ListCategoryUseCase";
import { ListCategoryController } from "./ListCategoryController";

import { Request, Response } from 'express';

const ListCategoryInstanceIndex = async (request: Request, response: Response) => {

  const categoryRepository = CategoriesRepository.getInstance();

  const findAllCategoriesUseCase = new ListCategoryUseCase(categoryRepository);

  const findAllCategoriesController = new ListCategoryController(findAllCategoriesUseCase);

  await findAllCategoriesController
    .handle(request, response);

  return findAllCategoriesController;
}

export { ListCategoryInstanceIndex }
