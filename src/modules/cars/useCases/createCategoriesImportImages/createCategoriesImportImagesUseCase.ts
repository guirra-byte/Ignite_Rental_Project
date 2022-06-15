import { parse } from 'csv-parse';
import fs from 'fs';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string,
  description: string
}

export class CreateCategoriesImportImagesUseCase {

  constructor(
    private categoriesRepository: ICategoriesRepository) { }

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {

    return new Promise((resolve, reject) => {

      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = [];
      //Meu banco de Dados em Memória
      //Importar meu banco de dados
      //Mas primeiro devo gerar minhas Migrations

      const parseFile = parse();

      stream
      .pipe(parseFile);

      parseFile.on("data", async (line) => {

        const [name, description] = line;

        const create = await this.categoriesRepository.create(name, description);
        return create;
      })

        .on("end", () => {
          resolve(categories)
        })

        .on("error", (err) => {

          reject(err)
        })

    })

  }

  async execute(file: Express.Multer.File): Promise<void> {

    const categories = await this.loadCategories(file);

    categories.map(async (category) => {

      const { name, description } = category;

      const existCategory = this
        .categoriesRepository
        .findOneCategory(name);

      if (!existCategory) {

        this
          .categoriesRepository
          .create(name, description);
      }

    })
  }
}