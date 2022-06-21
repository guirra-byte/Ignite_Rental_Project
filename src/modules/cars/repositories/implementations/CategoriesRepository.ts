import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { prisma } from '../../../../Shared/infra/Prisma/Client/Client';

//Renomeação 

//Singleton Pattern -> Criação de uma única Instância Global 
//Singleton Pattern -> tem como definição garatir que um classe tenha apenas uma instância 
//de si mesma e que forneça um ponto global de acesso e ela.


class CategoriesRepository implements ICategoriesRepository {

  constructor(private repository: typeof prisma) { }

  private static INSTANCE: CategoriesRepository;

  static getInstance(): CategoriesRepository {

    if (!CategoriesRepository.INSTANCE) {

      CategoriesRepository.INSTANCE = new CategoriesRepository(prisma);

    }

    return CategoriesRepository.INSTANCE;

  }

  async create(name: string, description: string): Promise<void> {

    await this
      .repository
      .category
      .create({ data: { name, description } });

  }

  async list(): Promise<Category[]> {

    const findAllCategories = await this
      .repository
      .category
      .findMany();

    return findAllCategories;
  }

  async findOneCategory(name: string): Promise<Category> {

    const findOneCategory = await this
      .repository
      .category
      .findUnique({ where: { name: name } });

    return findOneCategory;
  }

}

export { CategoriesRepository }