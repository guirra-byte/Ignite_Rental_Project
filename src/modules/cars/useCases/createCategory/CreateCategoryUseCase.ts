import 'reflect-metadata';
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from '../../../../Shared/infra/http/Errors/AppError';

interface IRequest {
  name: string,
  description: string
}

class CreateCategoryUseCase {

  constructor(private categoriesRepository: ICategoriesRepository) { }

  async execute({ name, description }: IRequest) {

    const verifyCategoryAlreadyExists = await this
      .categoriesRepository
      .findOneCategory(name);

    if (verifyCategoryAlreadyExists) {

      throw new AppError("Category Already Exists!");
    }

    await this
      .categoriesRepository
      .create(name, description);
  }
}

export { CreateCategoryUseCase };