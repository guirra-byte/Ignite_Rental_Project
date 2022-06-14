import { AppError } from '../../../../Errors/AppError';
import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {

  private categories: Category[] = [];

  async create(name: string, description: string): Promise<void> {

    const category: Category = {

      name: name,
      description: description,
      created_at: new Date()
    }

    const createCategory = new Category();

    Object.assign(createCategory, {

      name: category.name,
      description: category.description
    });

    this
      .categories
      .push(createCategory);
  }

  async findOneCategory(category_name: String): Promise<Category> {

    const findCategory = this
      .categories
      .find(category => category_name === category.name);

    return findCategory;
  }

  async list(): Promise<Category[]> {

    const listAllCategories = this
      .categories
      .map((category) => {

        return category
      });

    return listAllCategories
  }
}