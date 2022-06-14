import 'reflect-metadata';
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../Errors/AppError';

interface IRequest {
  name: string,
  description: string
}

@injectable()
class CreateCategoryUseCase {

  constructor(

    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) { }

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