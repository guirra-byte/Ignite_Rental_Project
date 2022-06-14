import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory';

import { AppError } from 'Shared/infra/http/Errors/AppError';
import { Category } from '../../model/Category';


//Implementação de Teste Unitário
//Testagem de parte da aplicação;

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: CategoriesRepositoryInMemory;

describe("Create Category", () => {

  beforeEach(() => {

    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  });

  it("Create a new Category", async () => {

    const category = {

      name: "Category Test",
      description: "Category Description Test"
    }

    await createCategoryUseCase.execute({

      name: category.name,
      description: category.description
    });

    const findCategory = await categoriesRepository
      .findOneCategory(category.name);

    expect(findCategory)
      .toHaveProperty("id");
  });

  it("Category already exists", async () => {

    expect(async () => {

      const category = {

        name: "Category Test",
        description: "Category Description Test"
      }

      await createCategoryUseCase
        .execute({

          name: category.name,
          description: category.description
        });

      await createCategoryUseCase
        .execute({

          name: category.name,
          description: category.description

        });
    }).rejects
      .toBeInstanceOf(AppError);
  });
});