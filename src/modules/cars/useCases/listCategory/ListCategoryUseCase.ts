import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { Category } from '../../model/Category';

export class ListCategoryUseCase {

  constructor(private categoriesRepository: ICategoriesRepository) { }

  async execute(): Promise<Category[]> {

    const categoriesList = await this
      .categoriesRepository
      .list();

    return categoriesList;

  }
}