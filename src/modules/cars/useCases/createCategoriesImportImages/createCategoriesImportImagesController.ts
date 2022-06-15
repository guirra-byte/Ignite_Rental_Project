import { Request, Response } from 'express';
import { CreateCategoriesImportImagesUseCase } from './createCategoriesImportImagesUseCase';

export class CreateCategoriesImportImagesController {

  constructor(private createCategoryImportImagesUseCase: CreateCategoriesImportImagesUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { file } = request;

    const importCategory = await this
      .createCategoryImportImagesUseCase
      .execute(file);

    return response
      .status(201)
      .send(importCategory);
  }
}