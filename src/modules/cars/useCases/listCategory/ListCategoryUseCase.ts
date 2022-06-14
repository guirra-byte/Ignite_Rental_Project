import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { Category } from '../../model/Category';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListCategoryUseCase {

  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) { }

  async execute(): Promise<Category[]> {

    const categoriesList = await this.categoriesRepository.list();
    return categoriesList;

  }
}