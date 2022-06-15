import { FindOneCategoryUseCase } from "./FindOneCategoryUseCase";
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export class FindOneCategoryController {

  constructor(private findOneCategoryUseCase: FindOneCategoryUseCase) { }

  async handle(request: Request, response: Response) {

    const { name } = request.params;

    try {

      const findOneCategory = await this
        .findOneCategoryUseCase
        .execute(name);

      return response
        .status(200)
        .json({ findOneCategory });
    }
    catch (exception) {

      return response
        .status(400)
        .json({ message: { exception } });
    }

  }
}