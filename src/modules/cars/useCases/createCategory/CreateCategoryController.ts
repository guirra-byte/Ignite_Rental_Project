import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { container } from 'tsyringe';

//Importando pois nas Routes sabe-se da existência do Request e do Response
//Por conta do Router()

export class CreateCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { name, description } = request.body

    try {

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      await createCategoryUseCase.execute({ name, description });

      return response
        .send()
        .status(201);
    }

    catch (exception) {

      return response.status(400).send(exception);
    }

  }
}