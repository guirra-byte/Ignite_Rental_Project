import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory';

import { AppError } from '../../../../Shared/infra/http/Errors/AppError';

//Implementação de Teste Unitário
//Testagem de parte da aplicação;

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: CategoriesRepositoryInMemory;

describe("Create new Category", () => {

  beforeEach(() => {

    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  });

  it("Should be able create a new Category", async () => {

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

  it("Should be able verify Category already exists", async () => {

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