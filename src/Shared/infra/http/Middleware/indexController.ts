import { VerifyCategoriesAlreadyExistsMiddleware } from ".";
import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';

export class VerifyCategoriesAlreadyExistsMiddlewareController {

  async handle(request: Request, response: Response, next: NextFunction) {

    const verify = container.resolve(VerifyCategoriesAlreadyExistsMiddleware);
    const find = await verify.verifyCategory(request, response, next);
    return find;
  }
}