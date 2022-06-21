import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../../../modules/accounts/repositories/implementations/UserRepository';
import { AppError } from '../Errors/AppError';

const ensureAdmin = async (request: Request, response: Response, next: NextFunction) => {

  const { id } = request.user;

  const repository = UserRepository.getInstance();

  const findUserById = await repository
    .findById(id);

  if (findUserById === undefined) {

    throw new AppError("User does exists");
  }

  const verifyUserIsAdmin = findUserById.isAdmin;

  if (verifyUserIsAdmin === false) {

    throw new AppError("User isn't Admin", 404);
  }

  return next();

}

export { ensureAdmin }