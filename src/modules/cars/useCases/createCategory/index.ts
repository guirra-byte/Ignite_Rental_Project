import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CreateCategoryController } from "./CreateCategoryController";

import { Request, Response } from 'express';

const CreateCategoryInstanceIndex = async (request: Request, response: Response) => {

  const categoryRepository = CategoriesRepository.getInstance();

  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

  const createCategoryController = new CreateCategoryController(createCategoryUseCase);

  await createCategoryController
    .handle(request, response);

  return createCategoryController;
}

export { CreateCategoryInstanceIndex }