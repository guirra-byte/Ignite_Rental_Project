import { Category } from "../model/Category";

interface ICategoriesRepository {

  findOneCategory(category_id: String): Promise<Category>;
  list(): Promise<Category[]>;
  create(name: string, description: string): Promise<void>;
}

//"Contrato" -> o que deve fazer ou como deve ser comportar

export { ICategoriesRepository }

