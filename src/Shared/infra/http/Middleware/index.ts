import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

@injectable()
export class VerifyCategoriesAlreadyExistsMiddleware {

  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) { }

  async verifyCategory(request: Request, response: Response, next: NextFunction) {

    const { name } = request.body

    const verifyCategory = await this
      .categoriesRepository
      .findOneCategory(name);

    if (verifyCategory) {

      return response
        .status(400)
        .json("This Category already created");
    }

    next();
  }

}