import { Category } from '../../model/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { Repository, getRepository } from 'typeorm';
import { getManager } from 'typeorm';
//Renomeação 

//Singleton Pattern -> Criação de uma única Instância Global 
//Singleton Pattern -> tem como definição garatir que um classe tenha apenas uma instância 
//de si mesma e que forneça um ponto global de acesso e ela.


class CategoriesRepository implements ICategoriesRepository {

  private repository: Repository<Category>;
  //Acesso Private restrito apenas a esta classe;

  constructor() {

    this.repository = getRepository(Category);

  }

  async create(name: string, description: string): Promise<void> {

    //INSERT name, description INTO categories VALUES ("name", "description", "created_at")
    const category = await this.repository.create({

      name,
      description
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {

    //SELECT * FROM categories
    const findOneCategory = await this
      .repository
      .find();
    return findOneCategory;
  }

  async findOneCategory(name: String): Promise<Category> {

    const category = await this
      .repository
      .findOne({ where: { name: name } });
    return category;
  }

}

export { CategoriesRepository }