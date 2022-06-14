import { Request, Response } from 'express';
import { CreateCategoriesImportImagesUseCase } from './createCategoriesImportImagesUseCase';
import { container } from 'tsyringe';

export class CreateCategoriesImportImagesController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { file } = request;

    const categoriesRepository = container.resolve(CreateCategoriesImportImagesUseCase);

    const importCategory = await categoriesRepository.execute(file);

    return response.status(201).send(importCategory);


  }
}