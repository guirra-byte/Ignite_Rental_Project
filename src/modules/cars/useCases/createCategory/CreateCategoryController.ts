import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {

  constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { name, description } = request.body

    try {

      await this
        .createCategoryUseCase
        .execute({ name, description });

      return response
        .send()
        .status(201);
    }

    catch (exception) {

      return response
        .status(400
        ).send(exception);
    }

  }
}