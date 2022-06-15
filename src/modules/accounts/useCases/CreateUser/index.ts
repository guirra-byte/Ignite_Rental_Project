import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

import { Request, Response } from 'express';

const CreateUserInstanceIndex = async (request: Request, response: Response) => {

  const userRepository = UserRepository.getInstance();

  const createUserUseCase = new CreateUserUseCase(userRepository);

  const createUserController = new CreateUserController(createUserUseCase);

  await createUserController
    .handle(request, response);

  return createUserController;
}

export { CreateUserInstanceIndex }