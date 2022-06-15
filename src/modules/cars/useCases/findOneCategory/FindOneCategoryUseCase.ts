import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { Category } from "../../model/Category";
import { AppError } from "Shared/infra/http/Errors/AppError";

export class FindOneCategoryUseCase {

  constructor(
    private categoryRepository: ICategoriesRepository) { }

  async execute(name: string): Promise<Category> {

    const findOneCategory = await this
      .categoryRepository
      .findOneCategory(name);

    if (!findOneCategory) {

      throw new AppError("This Category does exists, try again!");

    }

    return findOneCategory;
  }
}