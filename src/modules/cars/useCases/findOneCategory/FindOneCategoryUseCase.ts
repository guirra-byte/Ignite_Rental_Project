import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from 'tsyringe';
import { Category } from "../../model/Category";
import { AppError } from "../../../../Errors/AppError";

@injectable()
export class FindOneCategoryUseCase {

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository) { }

  async execute(name: string): Promise<Category> {

    const findOneCategory = await this.categoryRepository.findOneCategory(name);

    if (!findOneCategory) {


      throw new AppError('This Category not Exists');

    }

    return findOneCategory;
  }
}