import { Request, Response, NextFunction } from 'express';
import { CategoriesRepository } from '../../../../modules/cars/repositories/implementations/CategoriesRepository';
import { AppError } from '../Errors/AppError';

const verifyCategoryAlreadyExists = async (request: Request, response: Response, next: NextFunction) => {


  const { name } = request.body;

  const categoryRepository = CategoriesRepository.getInstance();

  const findCategoryByName = await categoryRepository
    .findOneCategory(name);

  if (findCategoryByName) {

    throw new AppError("This Category Already Exists!");
  }

  next();

}

export { verifyCategoryAlreadyExists }