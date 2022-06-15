import { Category } from "../model/Category";

interface ICategoriesRepository {

  create(name: string, description: string): Promise<void>;
  findOneCategory(category_id: String): Promise<Category>;
  list(): Promise<Category[]>;
}

//Funcionamento de Interface como contrato;
//Como a Implementação deve responder e retornar valores;

export { ICategoriesRepository }

