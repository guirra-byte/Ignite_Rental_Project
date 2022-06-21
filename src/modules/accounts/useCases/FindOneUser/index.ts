import { UserRepository } from '../../repositories/implementations/UserRepository';
import { FindOneUserUseCase } from './FindOneUserUseCase';
import { FindOneUserController } from './FindOneUserController';

import { Request, Response } from 'express';

const FindOneUserInstanceIndex = async (request: Request, response: Response) => {

  const userRepository = UserRepository.getInstance();

  const findOneUserUseCase = new FindOneUserUseCase(userRepository);

  const findOneUserController = new FindOneUserController(findOneUserUseCase);

  await findOneUserController
    .handle(request, response);

  return findOneUserController;
}

export { FindOneUserInstanceIndex }